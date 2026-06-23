import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison — Objects, chosen slowly" },
      { name: "description", content: "A small editorial shop for considered objects: linen, leather, ceramics, and quiet light." },
      { property: "og:title", content: "Maison — Objects, chosen slowly" },
      { property: "og:description", content: "A small editorial shop for considered objects." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 3);
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24 grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Issue No. 07 · Summer</p>
          <h1 className="text-6xl md:text-8xl leading-[0.95]">
            A quieter <span className="italic text-accent">way</span> to buy.
          </h1>
          <p className="mt-8 max-w-lg text-lg text-muted-foreground leading-relaxed">
            Maison is a small catalogue of objects made by hand, in small runs, by people whose names we know. Nothing is rushed.
          </p>
          <div className="mt-10 flex gap-6 items-center">
            <Link to="/shop" className="bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-accent transition-colors">
              Enter the shop
            </Link>
            <Link to="/auth" className="text-sm underline underline-offset-4 hover:text-accent">
              Sign in
            </Link>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
              alt="Editorial still life"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground italic">Still life, studio no. 4 — Lisbon, May.</p>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">This week</p>
              <h2 className="text-4xl">New in the catalogue</h2>
            </div>
            <Link to="/shop" className="hidden md:inline text-sm underline hover:text-accent">See all</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((p) => (
              <Link key={p.id} to="/shop/$productId" params={{ productId: p.id }} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-muted mb-4">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-xl">{p.name}</h3>
                  <span className="text-sm tabular-nums">${p.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 italic">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-28 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">On making</p>
        <p className="font-serif text-3xl md:text-4xl leading-relaxed italic">
          "We don't make many things. We try to make each one well, and to know who made it, and to know why."
        </p>
        <p className="mt-6 text-sm text-muted-foreground">— Letter from the founder</p>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Maison. All rights reserved.</p>
          <p className="font-serif italic">Made slowly, in three cities.</p>
        </div>
      </footer>
    </div>
  );
}
