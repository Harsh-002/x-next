"use client";

import React from "react";
import Spinner from "./Spinner";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  className: string;
  children: React.ReactNode;
  loading?: boolean;
}

const SubmitButton = ({ className, children, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={loading ?? pending}
      className={`flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-2 font-bold text-white hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
      {(loading || pending) && <Spinner className="h-3 w-3" />}
    </button>
  );
};

export default SubmitButton;
