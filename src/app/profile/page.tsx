import { getCurrentProfleUsername } from "@/lib/data/profile/getProfile";
import { redirect } from "next/navigation";
import React from "react";

const ProfileUsernamePage = () => {
  const currentUsername = getCurrentProfleUsername();
  if (currentUsername) {
    redirect(`/profile/${currentUsername}`);
  } else {
    redirect(`/login`);
  }
  return <div>page</div>;
};

export default ProfileUsernamePage;
