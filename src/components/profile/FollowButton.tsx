"use client";

import React, { useOptimistic, useTransition } from "react";
import RequiresAuth from "../auth/RequiresAuth";
import { followProfile, unFollowProfile } from "@/lib/actions/follows";

interface FollowButtonProps {
  followedByUser: boolean;
  profileId: string;
  username: string;
}

const FollowButton = ({
  followedByUser,
  profileId,
  username,
}: FollowButtonProps) => {
  const [oending, startTransition] = useTransition();
  const [optimisticFollowedByUser, setOptimisticFollowedByUser] =
    useOptimistic(followedByUser);

  async function handleFollowOrUnfollow() {
    startTransition(async () => {
      if (optimisticFollowedByUser) {
        setOptimisticFollowedByUser(false);
        await unFollowProfile(profileId, username);
      } else {
        await followProfile(profileId, username);
      }
    });
  }
  return (
    <RequiresAuth
      onClick={handleFollowOrUnfollow}
      className={`flex items-center rounded-3xl px-4 py-2 text-base ${optimisticFollowedByUser ? "bg-sky-500 hover:bg-slate-400" : "bg-slate-400 hover:bg-sky-500"}`}
    >
      <span>{optimisticFollowedByUser ? "Unfollow" : "Follow"}</span>
    </RequiresAuth>
  );
};

export default FollowButton;
