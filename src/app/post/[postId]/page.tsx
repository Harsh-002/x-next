import Header from "@/components/layout/Header";
import NewPostForm from "@/components/post/NewPostForm";
import Post from "@/components/post/Post";
import { getServerUserId } from "@/lib/auth/getServerUserId";
import { db, likes, posts, profiles } from "@/lib/db";
import { and, desc, eq, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { notFound } from "next/navigation";

async function getPostDetails(postId: string, userId?: string) {
  const userLikes = alias(likes, "userLikes");
  const childPosts = alias(posts, "childPosts");
  const postQuery = db
    .select({
      postId: posts.id,
      content: posts.content,
      createdAt: posts.createdAt,
      profileId: posts.profileId,
      username: profiles.username,
      likeCount: sql<number>`CAST(COUNT(DISTINCT ${likes.id}) as int)`,
      ...(userId
        ? { likedByUser: sql<boolean>`count(${userLikes.id}) > 0` }
        : {}),
    })
    .from(posts)
    .innerJoin(profiles, eq(posts.profileId, profiles.id))
    .leftJoin(likes, eq(likes.postId, posts.id))
    .where(eq(posts.id, postId))
    .groupBy(posts.id, profiles.id);

  if (userId) {
    postQuery.leftJoin(
      userLikes,
      and(eq(userLikes.profileId, userId), eq(userLikes.postId, posts.id))
    );
  }
  const repliesQuery = db
    .select({
      postId: posts.id,
      content: posts.content,
      createdAt: posts.createdAt,
      profileId: posts.profileId,
      username: profiles.username,
      likeCount: sql<number>`CAST(COUNT(DISTINCT ${likes.id}) as int)`,
      commentCount: sql<number>`CAST(COUNT(DISTINCT ${childPosts.id}) as int)`,
      ...(userId
        ? { likedByUser: sql<boolean>`count(${userLikes.id}) > 0` }
        : {}),
    })
    .from(posts)
    .innerJoin(profiles, eq(posts.profileId, profiles.id))
    .leftJoin(likes, eq(likes.postId, posts.id))
    .leftJoin(childPosts, eq(childPosts.parentId, posts.id))
    .where(eq(posts.parentId, postId))
    .groupBy(posts.id, profiles.id)
    .orderBy(desc(posts.createdAt));

  if (userId) {
    repliesQuery.leftJoin(
      userLikes,
      and(eq(userLikes.profileId, userId), eq(userLikes.postId, posts.id))
    );
  }
  const [postResult, repliesResult] = await Promise.all([
    postQuery,
    repliesQuery,
  ]);

  const [post] = postResult;
  return { post, replies: repliesResult };
}

interface PostPageProps {
  params: {
    postId: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const userId = await getServerUserId();
  const { post, replies } = await getPostDetails(params.postId, userId);
  if (!post) {
    notFound();
  }
  return (
    <div>
      <Header hasBackButton>Posts</Header>
      <Post {...post} commentCount={replies.length} />
      <NewPostForm parentId={params.postId} />
      {replies.map((reply) => (
        <Post {...reply} key={reply.postId} hasLink />
      ))}
    </div>
  );
}
