import HashtagSearchInput from "@/components/explore/HashtagSearchInput";
import Header from "@/components/layout/Header";
import Post from "@/components/post/Post";
import BlockSpinner from "@/components/ui/BlockSpinner";
import { getPostsByHashtag } from "@/lib/data/posts/getPostsByHashtag";
import React, { Suspense } from "react";
import { LuSearch } from "react-icons/lu";

interface ExplorePageProps {
  searchParams: {
    h?: string;
  };
}

const ExplorePage = async ({ searchParams }: ExplorePageProps) => {
  const { h: hashtag } = searchParams;
  const parsedHashtag = hashtag ? decodeURIComponent(hashtag) : "";
  return (
    <div className="w-full">
      <Header>
        <div className="flex w-full items-center">
          <LuSearch className="h-6 w-6 text-slate-500" />
          <HashtagSearchInput hashtagParam={parsedHashtag} />
        </div>
      </Header>
      <Suspense fallback={<BlockSpinner />} key={hashtag}>
        <PostsLoader hashtag={parsedHashtag} />
      </Suspense>
    </div>
  );
};

interface PostsLoaderProps {
  hashtag?: string;
}

async function PostsLoader({ hashtag }: PostsLoaderProps) {
  const posts = await getPostsByHashtag(hashtag);
  return posts.map((post) => <Post key={post.postId} {...post} hasLink />);
}

export default ExplorePage;
