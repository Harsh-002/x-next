import React from "react";
import { LuShare } from "react-icons/lu";
import { toast } from "sonner";

interface SharePostProps {
  postId: string;
}

const SharePost = ({ postId }: SharePostProps) => {
  function copyPermaLink(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const permaLink = window.location.origin + "/post/" + postId;
    try {
      navigator.clipboard.writeText(permaLink);
      toast("Link copied to clipboard");
    } catch (error) {
      console.error("Failed to copy the link");
    }
  }
  return (
    <button onClick={copyPermaLink}>
      <LuShare className="h-5 w-5" />
    </button>
  );
};

export default SharePost;
