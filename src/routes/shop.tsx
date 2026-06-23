import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Maison" },
      { name: "description", content: "A small, considered catalogue of objects for home and wardrobe." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">The Catalogue</p>
          <h1 className="text-5xl md:text-6xl leading-[1.05]">Objects, chosen slowly.</h1>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Each piece is made in small runs by people we know. Nothing is rushed, and nothing is here by accident.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {products.map((p) => (
            <Link key={p.id} to="/shop/$productId" params={{ productId: p.id }} className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-muted mb-4">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-xl">{p.name}</h3>
                <span className="text-sm tabular-nums">${p.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{p.category}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
