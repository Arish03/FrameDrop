"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/lib/store";
import { Upload, Type, Layout, Image as ImageIcon, ShoppingBag } from "lucide-react";

export default function CreatePosterPage() {
  const [headline, setHeadline] = useState("YOUR TEXT HERE");
  const [subtext, setSubtext] = useState("Add your subtitle or coordinates");
  const [layout, setLayout] = useState<"classic" | "minimal" | "bold">("classic");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    // Add custom poster to cart
    addItem({
      product: {
        id: `custom-${Date.now()}`,
        title: "Custom Design",
        slug: "custom",
        price: 59.0,
        category: "custom",
        image: "/cats/minimal.jpg", // Placeholder
        description: "Your unique custom poster design.",
      },
      size: "A3",
      frame: "Unframed",
      quantity: 1
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 md:py-16">
      <div className="mb-12 border-b border-border pb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">Designer Studio</h1>
        <p className="text-muted-foreground max-w-2xl text-lg font-medium tracking-tight">
          Create your own premium poster. Upload imagery, set typography, and craft your narrative.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Editor sidebar */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8 order-2 lg:order-1">
          {/* Section: Upload */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 border-b border-border pb-2">
              <Upload className="h-4 w-4" /> Imagery
            </h3>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
              <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-semibold">Drop your image here</p>
              <p className="text-xs text-muted-foreground">High res JPG or PNG, up to 20MB</p>
              <Button variant="outline" size="sm" className="mt-4">Browse Files</Button>
            </div>
          </section>

          {/* Section: Typography */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 border-b border-border pb-2">
              <Type className="h-4 w-4" /> Typography
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="headline" className="text-xs font-semibold uppercase tracking-wider">Headline</Label>
                <Input 
                  id="headline" 
                  value={headline} 
                  onChange={(e) => setHeadline(e.target.value)} 
                  className="font-mono bg-transparent border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtext" className="text-xs font-semibold uppercase tracking-wider">Subtext</Label>
                <Textarea 
                  id="subtext" 
                  value={subtext} 
                  onChange={(e) => setSubtext(e.target.value)} 
                  className="font-mono bg-transparent border-border resize-none h-24"
                />
              </div>
            </div>
          </section>

          {/* Section: Layout & Theme */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 border-b border-border pb-2">
              <Layout className="h-4 w-4" /> Layout & Theme
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-xs font-semibold uppercase tracking-wider">Style</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["classic", "minimal", "bold"] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => setLayout(l)}
                      className={`py-2 text-xs font-bold uppercase tracking-wider border transition-all ${layout === l ? 'border-foreground bg-foreground text-background' : 'border-border/50 hover:border-foreground'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-xs font-semibold uppercase tracking-wider">Theme</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTheme("light")}
                    className={`py-2 text-xs font-bold uppercase tracking-wider border transition-all ${theme === "light" ? 'border-foreground border-2' : 'border-border/50'}`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`py-2 text-xs font-bold uppercase tracking-wider border transition-all bg-foreground text-background ${theme === "dark" ? 'border-foreground opacity-100' : 'opacity-50'}`}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </section>

          <Button size="lg" className="h-14 mt-4 uppercase tracking-widest font-bold" onClick={handleAddToCart}>
            <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart — $59
          </Button>
        </div>

        {/* Live Preview canvas */}
        <div className="w-full lg:w-2/3 flex items-center justify-center order-1 lg:order-2 bg-muted/30 border border-border/50 p-4 sm:p-12 relative min-h-[600px]">
          <div className="absolute top-4 left-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Live Preview
          </div>
          
          {/* The Poster */}
          <div 
            className={`aspect-[3/4] w-full max-w-lg shadow-2xl relative overflow-hidden transition-all duration-500 ease-in-out border border-border/20 flex flex-col justify-between ${theme === 'dark' ? 'bg-[#111111] text-white' : 'bg-[#FAFAFA] text-[#111111]'}`}
          >
            {/* Image Placeholder inside poster */}
            <div className={`w-full aspect-square ${theme === 'dark' ? 'bg-[#222]' : 'bg-[#EAEAEA]'} flex items-center justify-center`}>
               <span className="opacity-20 font-mono tracking-widest">[ IMAGE ]</span>
            </div>
            
            <div className={`p-8 sm:p-12 flex flex-col ${layout === 'classic' ? 'items-center text-center' : layout === 'minimal' ? 'items-start text-left' : 'items-end text-right'}`}>
              <h2 className={`font-black uppercase tracking-tighter leading-none mb-4 ${layout === 'bold' ? 'text-5xl' : 'text-3xl'}`}>
                {headline || "YOUR TEXT"}
              </h2>
              <p className={`font-mono text-sm uppercase tracking-widest leading-relaxed max-w-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {subtext || "Enter subtext"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
