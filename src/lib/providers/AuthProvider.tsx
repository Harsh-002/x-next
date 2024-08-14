import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import createBrowserClient from "../../../supabase/clients/browser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  handleSignOut: () => Promise<void>;
  handleLogin: (
    email: string,
    password: string
  ) => Promise<{ success: boolean }>;
  handleSignUp: (
    email: string,
    username: string,
    password: string
  ) => Promise<{ success: boolean }>;
  updateUser: (username: string) => Promise<{ success: boolean }>;
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event === "SIGNED_IN" ||
        event === "INITIAL_SESSION" ||
        event === "USER_UPDATED"
      ) {
        setUser(session?.user ?? null);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      router.refresh();
    }
    setLoading(false);
  }

  async function handleLogin(email: string, password: string) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
      return { success: false };
    } else {
      router.refresh();
      return { success: true };
    }
    setLoading(false);
  }

  async function handleSignUp(
    email: string,
    username: string,
    password: string
  ) {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    setLoading(false);

    if (error) {
      if (error.message === "Database error saving new user") {
        toast.error("Username already taken");
      } else {
        toast.error(error.message);
      }
      return { success: false };
    } else {
      router.refresh();
      return { success: true };
    }
  }

  async function updateUser(username: string) {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: { username },
    });
    setLoading(false);
    if (error) {
      if (error.message === "Database error saving new user") {
        toast.error("Username already taken");
      } else {
        toast.error(error.message);
      }
      return { success: false };
    } else {
      router.refresh();
      return { success: true };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleSignOut,
        handleLogin,
        handleSignUp,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
