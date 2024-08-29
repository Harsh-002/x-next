"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface HashtagSearchInputProps {
  hashtagParam?: string;
}

const HashtagSearchInput = ({ hashtagParam }: HashtagSearchInputProps) => {
  const router = useRouter();
  const searchParams = useParams();
  const [hashtag, setHashtag] = useState("");

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (hashtag) {
      newParams.set("h", hashtag);
    } else {
      newParams.delete("h");
    }
    router.push(`?${newParams.toString()}`);
  }, [hashtag, router, searchParams]);

  useEffect(() => {
    if (hashtagParam) {
      setHashtag(hashtagParam);
    }
  }, [hashtagParam]);

  return (
    <input
      type="text"
      value={hashtag}
      onChange={(e) => setHashtag(e.target.value)}
      placeholder="Search Hashtags"
      className="ml-2 w-full rounded-lg bg-transparent px-2 focus:outline focus:ring-2 focus:ring-sky-500"
    />
  );
};

export default HashtagSearchInput;
