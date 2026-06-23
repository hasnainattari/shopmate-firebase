import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";

export function SiteHeader() {
  const { user, logout, loading } = useAuth();
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="font-serif text-2xl tracking-tight">
          Maison<span className="text-accent">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className="hover:text-accent transition-colors" activeProps={{ className: "text-accent" }}>Journal</Link>
          <Link to="/shop" className="hover:text-accent transition-colors" activeProps={{ className: "text-accent" }}>Shop</Link>
        </nav>
        <div className="flex items-center gap-4 text-sm">
          {loading ? null : user ? (
            <>
              <span className="hidden sm:inline text-muted-foreground">{user.email ?? user.displayName}</span>
              <button onClick={() => logout()} className="hover:text-accent">Sign out</button>
            </>
          ) : (
            <Link to="/auth" className="hover:text-accent">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  );
}
