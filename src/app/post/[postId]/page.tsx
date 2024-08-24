import Header from "@/components/layout/Header";
import Post from "@/components/post/Post";
import { db, likes, posts, profiles } from "@/lib/db";
import { eq, sql } from "drizzle-orm";
import { notFound } from "next/navigation";

async function getPostDetails(postId: string) {
  const [post] = await db
    .select({
      postId: posts.id,
      content: posts.content,
      createdAt: posts.createdAt,
      profileId: posts.profileId,
      username: profiles.username,
      likeCount: sql<number>`CAST(COUNT(DISTINCT ${likes.id}) as int)`,
    })
    .from(posts)
    .innerJoin(profiles, eq(posts.profileId, profiles.id))
    .leftJoin(likes, eq(likes.postId, posts.id))
    .where(eq(posts.id, postId))
    .groupBy(posts.id, profiles.id);
  return post;
}

interface PostPageProps {
  params: {
    postId: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostDetails(params.postId);
  if (!post) {
    notFound();
  }
  return (
    <div>
      <Header hasBackButton>Posts</Header>

      <Post {...post} commentCount={0} />
    </div>
  );
}
