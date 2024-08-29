import { db, follows, hashtags, postHashtags, profiles } from "@/lib/db";
import { desc, eq, sql } from "drizzle-orm";
import Link from "next/link";
import React from "react";

async function getTopHashtags() {
  return db
    .select({
      name: hashtags.name,
      count: sql<number>`CAST(COUNT(${postHashtags.postId}) as int)`,
    })
    .from(hashtags)
    .innerJoin(postHashtags, eq(hashtags.id, postHashtags.hashtagId))
    .groupBy(hashtags.id)
    .orderBy(desc(sql`count`))
    .limit(5);
}

async function getTopProfiles() {
  return db
    .select({
      username: profiles.username,
      followerCount: sql<number>`CAST(COUNT(${follows.followedId}) as int) as followerCount`,
    })
    .from(profiles)
    .leftJoin(follows, eq(profiles.id, follows.followedId))
    .groupBy(profiles.id)
    .orderBy(desc(sql`followerCount`))
    .limit(5);
}

const RightSidebar: React.FC = async () => {
  const [topHashtags, topProfiles] = await Promise.all([
    getTopHashtags(),
    getTopProfiles(),
  ]);
  return (
    <aside className="hidden p-6 mb-4 overflow-y-auto md:top-0 md:block xl:w-1/5">
      <section className="mb-4 rounded-lg bg-slate-100 p-6 w-full">
        <h2 className="mb-2 text-xl font-bold">{`What's happening`}</h2>
        <ul>
          {topHashtags.map((tag, idx) => (
            <li key={idx} className="flex flex-wrap gap-2">
              <Link
                href={`/explore?h=${tag.name}`}
                className="text-sky-500 hover:underline"
              >
                #{tag.name}
              </Link>
              <div className="text-slate-500">({tag.count})</div>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-4 rounded-lg bg-slate-100 p-6 w-full">
        <h2 className="mb-2 text-xl font-bold">{`Top Profiles`}</h2>
        <ul>
          {topProfiles.map((profile, idx) => (
            <li key={idx} className="flex flex-wrap gap-2">
              <Link
                href={`/explore?h=${profile.username}`}
                className="text-sky-500 hover:underline"
              >
                {profile.username}
              </Link>
              <div className="text-slate-500">({profile.followerCount})</div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default RightSidebar;
