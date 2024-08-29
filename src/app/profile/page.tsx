import { getCurrentProfleUsername } from "@/lib/data/profile/getProfile";
import { redirect } from "next/navigation";

const ProfileUsernamePage = async () => {
  const currentUsername = await getCurrentProfleUsername();

  if (currentUsername) {
    redirect(`/profile/${currentUsername}`);
  } else {
    redirect(`/login`);
  }
};

export default ProfileUsernamePage;
