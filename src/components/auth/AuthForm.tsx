"use client";

import { useAuth } from "@/lib/providers/AuthProvider";
import React, { useState } from "react";
import SubmitButton from "../ui/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const { handleSignUp, handleLogin, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (type === "login") {
      const { success } = await handleLogin(email, password);
      if (success) {
        router.replace("/");
      }
    }
    if (type === "signup") {
      const { success } = await handleSignUp(email, username, password);
      if (success) {
        router.replace("/");
      }
    }
  }

  return (
    <form
      className="flex flex-col space-y-4 p-4 md:p-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-slate-500">
        {type === "login" ? "Login" : "Sign up"}
      </h2>
      <div className="flex flex-col gap-1">
        {type === "signup" && (
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              autoComplete="username"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="rounded-2xl border border-slate-300 p-2"
            />
          </div>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          autoComplete="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-2xl border border-slate-300 p-2"
        />
        <label htmlFor="password">Password</label>
        <input
          minLength={6}
          type="password"
          name="password"
          autoComplete={type === "signup" ? "new-password" : "old-password"}
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-2xl border border-slate-300 p-2"
        />
      </div>
      <SubmitButton loading={loading} className="w-max px-8">
        {type === "signup" ? "Sign Up" : "Login"}
      </SubmitButton>
      <p>
        {type === "signup"
          ? "Already have an account?"
          : "Don't have an account?"}
        <Link
          href={`/${type === "signup" ? "login" : "sign-up"}`}
          className="ml-2 text-sky-500"
        >
          {type === "signup" ? "Login" : "Sign Up"}
        </Link>
      </p>
    </form>
  );
};

export default AuthForm;
