import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { getProduct, products } from "@/lib/products";

export const Route = createFileRoute("/shop/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Maison` },
          { name: "description", content: loaderData.product.tagline },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.tagline },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Product — Maison" }],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-4xl">Not in the catalogue</h1>
        <p className="mt-3 text-muted-foreground">This piece may have sold out or moved on.</p>
        <Link to="/shop" className="mt-6 inline-block underline">Return to the shop</Link>
      </div>
    </div>
  ),
  errorComponent: ErrorView,
});

function ErrorView({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-4xl">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 underline">Try again</button>
      </div>
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
          <Link to="/shop" className="hover:text-accent">Shop</Link>
          <span className="mx-2">/</span>
          <span>{product.category}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="aspect-[4/5] bg-muted overflow-hidden">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div className="md:sticky md:top-28">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
            <h1 className="text-5xl mt-3 leading-tight">{product.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground italic font-serif">{product.tagline}</p>
            <p className="mt-2 text-2xl tabular-nums">${product.price}</p>

            <div className="mt-8 h-px bg-border" />

            <p className="mt-8 leading-relaxed text-foreground/80">{product.description}</p>

            <button
              className="mt-10 w-full bg-primary text-primary-foreground py-4 text-sm uppercase tracking-[0.2em] hover:bg-accent transition-colors"
            >
              Enquire
            </button>
            <p className="mt-3 text-xs text-muted-foreground text-center">Made to order. Ships in 2–3 weeks.</p>
          </div>
        </div>

        <section className="mt-32">
          <h2 className="text-2xl mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link key={p.id} to="/shop/$productId" params={{ productId: p.id }} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-muted mb-3">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-lg">{p.name}</h3>
                  <span className="text-sm tabular-nums">${p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
