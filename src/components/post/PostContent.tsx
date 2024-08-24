"use client";

import { hashtagRegex } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React from "react";

interface PostContentProps {
  content: string;
}
const PostContent = ({ content }: PostContentProps) => {
  const router = useRouter();
  function parseContent(text: string) {
    const parts = text.split(hashtagRegex);
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return (
          <span
            role="link"
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              router.push(`/explore?h=${encodeURIComponent(part)}`);
            }}
            className="cursor-pointer text-sky-500 hover:underline"
          >
            #{part}
          </span>
        );
      } else {
        return part;
      }
    });
  }
  return <p className="mb-2">{parseContent(content)}</p>;
};

export default PostContent;
