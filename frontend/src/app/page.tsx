import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryScroll } from "@/components/shop/CategoryScroll";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:32px_32px]" />
        
        <div className="container relative z-10 mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
          <div className="inline-block rounded-full border border-border px-3 py-1 mb-6 text-xs font-semibold tracking-wide uppercase bg-background shadow-xs">
            New Collection Dropped
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase mb-6 max-w-5xl leading-[0.85] text-foreground">
            Design Your <br className="hidden sm:block" /> Story.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl font-medium tracking-tight">
            Minimal posters. Maximum expression. Create your own premium quality prints or explore our curated collections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button nativeButton={false} size="lg" className="h-14 px-8 text-base font-semibold uppercase tracking-wider rounded-none" render={<Link href="/create" />}>
              Create Poster
            </Button>
            <Button nativeButton={false} size="lg" variant="outline" className="h-14 px-8 text-base font-semibold uppercase tracking-wider rounded-none" render={<Link href="/shop" />}>
              Explore Shop
            </Button>
          </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="w-full border-y border-border overflow-hidden bg-foreground text-background py-3 sm:py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-4 text-sm font-semibold uppercase tracking-widest flex items-center gap-8">
              Premium Quality <span className="h-1 w-1 rounded-full bg-background/50" />
              Minimal Design <span className="h-1 w-1 rounded-full bg-background/50" />
              Museum Grade Paper
            </span>
          ))}
        </div>
      </div>

      {/* Horizontal Category Scroll */}
      <CategoryScroll />

      {/* Featured Categories */}
      <section className="py-24 sm:py-32 container mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12 gap-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Curated Collections</h2>
          <Link href="/categories" className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest hover:text-muted-foreground transition-colors">
            View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Minimal", href: "/categories/minimal", count: "124", bg: "bg-muted" },
            { title: "Cinema", href: "/categories/cinema", count: "86", bg: "bg-foreground/5" },
            { title: "Typography", href: "/categories/typography", count: "42", bg: "bg-muted/50" },
          ].map((category, i) => (
            <Link key={i} href={category.href} className={`group block relative aspect-[4/5] overflow-hidden ${category.bg} p-8 border border-border/50 hover:border-foreground transition-all duration-500`}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-b from-transparent to-background/20 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <span className="text-xs font-mono">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-300">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} Posters</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}} />
    </div>
  );
}
