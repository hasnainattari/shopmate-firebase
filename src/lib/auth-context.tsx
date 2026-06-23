import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signInEmail: (e: string, p: string) => Promise<void>;
  signUpEmail: (e: string, p: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value: AuthCtx = {
    user,
    loading,
    signInEmail: async (e, p) => {
      await signInWithEmailAndPassword(auth, e, p);
    },
    signUpEmail: async (e, p) => {
      await createUserWithEmailAndPassword(auth, e, p);
    },
    signInGoogle: async () => {
      await signInWithPopup(auth, googleProvider);
    },
    logout: async () => {
      await signOut(auth);
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
}
