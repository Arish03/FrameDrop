import { ArrowRight, Star, Globe, ShieldCheck } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-background py-24 sm:py-32 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
              Artifacts of <br /> Expression.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium tracking-tight leading-relaxed">
              FrameDrop. was born from a simple observation: most spaces lack identity. We create museum-grade posters for the modern minimalist, the cinephile, and the dreamer.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-foreground text-background flex items-center justify-center">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">Curation First</h3>
              <p className="text-muted-foreground leading-relaxed">
                We don't just sell paper. We curate narratives. Every design in our shop is selected for its visual impact and timeless aesthetic.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-foreground text-background flex items-center justify-center">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">Museum Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Printed on 200gsm archive-ready paper with pigment-based inks. Our prints are built to last a lifetime without fading.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-foreground text-background flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">Ethical Sourcing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Carbon-neutral shipping and FSC-certified paper. We believe premium design shouldn't cost the Earth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 container mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 aspect-square bg-muted relative border border-border overflow-hidden flex items-center justify-center">
             <span className="text-xs font-mono uppercase tracking-[0.2em] opacity-30">Our Studio / 2024</span>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-4xl font-black uppercase tracking-tighter">The Vision</h2>
            <p className="text-lg text-muted-foreground italic leading-relaxed">
              "We believe that a single poster can change the temperature of a room. It's not just decoration; it's a declaration of taste, memory, and ambition."
            </p>
            <div className="pt-4">
              <p className="font-bold uppercase tracking-widest text-xs mb-2">Join the Movement</p>
              <p className="text-muted-foreground text-sm uppercase font-mono">EST. 2024 / BERLIN — LONDON — TOKYO</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
