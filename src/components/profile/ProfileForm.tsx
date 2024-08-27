"use client";
import React, { useState } from "react";
import { LuX } from "react-icons/lu";
import SubmitButton from "../ui/SubmitButton";
import { useAuth } from "@/lib/providers/AuthProvider";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
  username: string;
}

const ProfileForm = ({ username }: ProfileFormProps) => {
  const { updateUser } = useAuth();
  const [editableUsername, setEditableUsername] = useState(username);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  async function handleFormAction(formData: FormData) {
    setEditMode(false);
    const { success } = await updateUser(editableUsername);
    if (success) {
      router.push(`/profile/${editableUsername}`);
    }
  }
  function handleCancel() {
    setEditMode(false);
    setEditableUsername(username);
  }
  return (
    <>
      {editMode ? (
        <form
          action={handleFormAction}
          className="flex justify-between w-full items-center gap-2"
        >
          <input
            autoFocus
            name="username"
            required
            maxLength={20}
            className="w-full rounded-2xl border border-slate-300 px-2"
            value={editableUsername}
            onChange={(e) => setEditableUsername(e.target.value)}
          />
          <div>
            <LuX
              role="button"
              onClick={handleCancel}
              className="h-8 w-8 text-slate-500 hover:text-slate-400 cursor-pointer"
            />
          </div>
          <SubmitButton className="rounded-3xl text-base font-normal">
            Save
          </SubmitButton>
        </form>
      ) : (
        <div className="flex justify-between w-full items-center">
          <h1>{username}</h1>
          <button
            className="bg-sky-500 hover:bg-sky-400 text-white rounded-3xl px-4 py-2 text-base font-normal "
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileForm;
