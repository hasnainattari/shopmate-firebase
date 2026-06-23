import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Maison" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { user, signInEmail, signUpEmail, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/shop" });
  }, [user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "signin") await signInEmail(email, password);
      else await signUpEmail(email, password);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setError(null);
    setBusy(true);
    try { await signInGoogle(); }
    catch (err: any) { setError(err?.message ?? "Google sign-in failed"); }
    finally { setBusy(false); }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-md px-6 py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Account</p>
        <h1 className="text-4xl mt-3">{mode === "signin" ? "Welcome back." : "Create an account."}</h1>
        <p className="mt-3 text-muted-foreground">
          {mode === "signin" ? "Sign in to follow new arrivals and save what you love." : "We'll keep your wishlist and orders in one place."}
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-border bg-transparent py-2 focus:border-accent outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Password</label>
            <input
              type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-border bg-transparent py-2 focus:border-accent outline-none transition-colors"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit" disabled={busy}
            className="w-full bg-primary text-primary-foreground py-4 text-sm uppercase tracking-[0.2em] hover:bg-accent transition-colors disabled:opacity-50"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="my-8 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <div className="h-px flex-1 bg-border" />or<div className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={onGoogle} disabled={busy}
          className="w-full border border-border py-4 text-sm uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
        >
          Continue with Google
        </button>

        <p className="mt-8 text-sm text-muted-foreground text-center">
          {mode === "signin" ? "New here? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="underline hover:text-accent">
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </main>
    </div>
  );
}
