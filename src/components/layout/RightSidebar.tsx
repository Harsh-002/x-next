import Link from "next/link";
import React from "react";

//TODO replace with real
const topHashtags = [
  { name: "react", count: 1234 },
  { name: "nextjs", count: 1234 },
  { name: "tailwindess", count: 1234 },
  { name: "typescript", count: 1234 },
  { name: "javascript", count: 1234 },
];

const topProfiles = [
  { id: 1, username: "alice", followerCount: 1234 },
  { id: 2, username: "bob", followerCount: 1234 },
  { id: 3, username: "charlie", followerCount: 1234 },
  { id: 4, username: "dave", followerCount: 1234 },
  { id: 5, username: "eve", followerCount: 1234 },
];

const RightSidebar: React.FC = () => {
  return (
    <aside className="hidden p-6 mb-4 overflow-y-auto md:block xl:w-1/5">
      <section className="mb-4 rounded-lg bg-gray-100 p-6 w-full">
        <h2 className="mb-2 text-xl font-bold">{`What's happening`}</h2>
        <ul>
          {topHashtags.map((tag, idx) => (
            <li key={idx}>
              <Link
                href={`/explore?h=${tag.name}`}
                className="text-sky-500 hover:underline"
              >
                #{tag.name}
              </Link>
              <div className="text-gray-600">{tag.count}</div>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-4 rounded-lg bg-gray-100 p-6 w-full">
        <h2 className="mb-2 text-xl font-bold">{`Top Profiles`}</h2>
        <ul>
          {topProfiles.map((profile, idx) => (
            <li key={idx}>
              <Link
                href={`/explore?h=${profile.username}`}
                className="text-sky-500 hover:underline"
              >
                {profile.username}
              </Link>
              <div className="text-gray-600">{profile.followerCount}</div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default RightSidebar;
