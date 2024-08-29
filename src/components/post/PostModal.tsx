import React, { useRef } from "react";
import NewPostForm from "./NewPostForm";
import { LuX } from "react-icons/lu";

const PostModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  function openDialog() {
    dialogRef.current?.showModal();
  }
  function closeDialog() {
    dialogRef.current?.close();
  }
  return (
    <>
      <button
        onClick={openDialog}
        className="mt-4 w-full rounded-3xl bg-sky-500 px-8 py-3 text-lg font-bold text-white hover:bg-sky-400"
      >
        Post
      </button>
      <dialog ref={dialogRef} className="relative rounded-xl p-8 md:w-[600px]">
        <button
          onClick={closeDialog}
          className="absolute right-0 top-0 p-4 text-slate-500 hover:text-slate-400"
        >
          <LuX className="h-8 w-8" />
        </button>
        <NewPostForm
          autoFocus
          onPostCreated={closeDialog}
          className="border-b-0"
        />
      </dialog>
    </>
  );
};

export default PostModal;
