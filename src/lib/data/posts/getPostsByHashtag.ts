import { getServerUserId } from "@/lib/auth/getServerUserId";
import { db, hashtags, likes, postHashtags, posts, profiles } from "@/lib/db";
import { and, desc, eq, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import "server-only";

export async function getPostsByHashtag(hashtag?: any) {
  const userId = await getServerUserId();
  const userLikes = alias(likes, "userLikes");
  const childPosts = alias(posts, "childPosts");

  const postsRecordQuery = db
    .select({
      postId: posts.id,
      content: posts.content,
      createdAt: posts.createdAt,
      profileId: posts.profileId,
      username: profiles.username,
      parentId: posts.parentId,
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
    .leftJoin(postHashtags, eq(postHashtags.postId, posts.id))
    .leftJoin(hashtags, eq(hashtags.id, postHashtags.hashtagId))
    .where(eq(hashtags.name, hashtag))
    .groupBy(posts.id, profiles.id)
    .orderBy(desc(posts.createdAt));

  if (userId) {
    postsRecordQuery.leftJoin(
      userLikes,
      and(eq(userLikes.profileId, userId), eq(userLikes.postId, posts.id))
    );
  }

  const postRecords = await postsRecordQuery;
  return postRecords;
}
