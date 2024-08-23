"use client";

import React, { useRef } from "react";
import SubmitButton from "../ui/SubmitButton";
import RequiresAuth from "../auth/RequiresAuth";
import Avatar from "../ui/Avatar";
import { useAuth } from "@/lib/providers/AuthProvider";
import { createPost } from "@/lib/actions/createPost";
import { toast } from "sonner";

interface NewPostFormProps {
  className?: string;
  parentId?: string;
  autoFocus?: boolean;
  onPostCreated?: () => void;
}

const NewPostForm = ({
  className,
  parentId,
  autoFocus = false,
  onPostCreated,
}: NewPostFormProps) => {
  const { user } = useAuth();
  const ref = useRef<HTMLFormElement>(null);

  async function handleFormAction(formData: FormData) {
    const { success } = await createPost(formData);
    if (success) {
      toast("Post created successfully");
      if (onPostCreated) {
        onPostCreated();
      }
      ref?.current?.reset();
    } else {
      toast.error("An error occurred, please try again");
    }
  }

  return (
    <form
      className={`border-b border-slate-200 p-4 ${className}`}
      action={handleFormAction}
      ref={ref}
    >
      <div className="mb-4 flex w-full items-start gap-4">
        <Avatar username={user?.user_metadata?.username} profileId={user?.id} />
        <textarea
          name="content"
          required
          autoFocus={autoFocus}
          maxLength={250}
          rows={3}
          placeholder="What's happening"
          className="w-full rounded-lg p-2 text-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        {parentId && <input type="hidden" name="parentId" value={parentId} />}
      </div>
      <div className="flex items-center justify-end">
        <RequiresAuth as="div">
          <SubmitButton>Post</SubmitButton>
        </RequiresAuth>
      </div>
    </form>
  );
};

export default NewPostForm;
