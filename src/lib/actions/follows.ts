"use server";

import { and, eq } from "drizzle-orm";
import { getServerUserId } from "../auth/getServerUserId";
import { db, follows, likes } from "../db";
import { revalidatePath } from "next/cache";

export async function followProfile(profileId: string, username: string) {
  const userId = await getServerUserId();

  if (userId) {
    const existingFollow = await db
      .select()
      .from(follows)
      .where(
        and(eq(follows.followerId, userId), eq(follows.followedId, profileId))
      );

    if (existingFollow.length) {
      return;
    }
    await db
      .insert(follows)
      .values({ followerId: userId, followedId: profileId })
      .returning();
  }
  revalidatePath(`/profile/${username}`);
}

export async function unFollowProfile(profileId: string, username: string) {
  const userId = await getServerUserId();

  if (userId) {
    const existingFollow = await db
      .select()
      .from(follows)
      .where(
        and(eq(follows.followerId, userId), eq(follows.followedId, profileId))
      );

    if (!existingFollow.length) {
      return;
    }
    await db
      .delete(follows)
      .where(
        and(eq(follows.followerId, userId), eq(follows.followedId, profileId))
      );
  }
  revalidatePath(`/profile/${username}`);
}
