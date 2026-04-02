"use client";

import { useState } from "react";
import { Product } from "@/lib/mock";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

export function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState("A3");
  const [frame, setFrame] = useState("Unframed");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  const priceMultiplier = size === "A4" ? 0.8 : size === "A3" ? 1 : size === "A2" ? 1.5 : size === "A1" ? 2 : 2.5;
  const framePrice = frame === "Unframed" ? 0 : frame === "Black Wood" ? 20 : 25;
  const finalPrice = product.price * priceMultiplier + framePrice;

  const handleAddToCart = () => {
    addItem({
      product: { ...product, price: finalPrice },
      size,
      frame,
      quantity
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 md:py-16">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Images */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="aspect-[3/4] bg-muted w-full relative overflow-hidden border border-border flex items-center justify-center">
            {/* Main Image Placeholder */}
            <div className="text-muted-foreground font-mono text-sm uppercase tracking-widest">{product.title}</div>
            {product.isNew && (
              <Badge className="absolute top-6 left-6 rounded-none px-3 py-1 font-semibold tracking-wider text-xs">NEW DROP</Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-muted/50 border border-border hover:border-foreground transition-colors cursor-pointer" />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4 font-mono">
              <Link href={`/categories/${product.category}`} className="hover:text-foreground transition-colors">
                {product.category}
              </Link>
            </p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">{product.title}</h1>
            <p className="text-2xl font-mono">${finalPrice.toFixed(2)}</p>
          </div>

          <div className="space-y-8 mb-10">
            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Size</h3>
                <span className="text-xs text-muted-foreground underline underline-offset-4 cursor-pointer">Size Guide</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {['A4', 'A3', 'A2', 'A1', '50x70'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-3 text-sm font-mono border transition-all ${size === s ? 'border-foreground bg-foreground text-background font-bold' : 'border-border/50 bg-transparent hover:border-foreground text-muted-foreground'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Selector */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Frame</h3>
              <div className="grid grid-cols-3 gap-2">
                {['Unframed', 'Black Wood', 'White Wood'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFrame(f)}
                    className={`py-3 text-sm font-medium border transition-all ${frame === f ? 'border-foreground bg-accent text-foreground font-bold' : 'border-border/50 bg-transparent hover:border-foreground text-muted-foreground'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Quantity</h3>
              <div className="flex items-center border border-border w-32">
                <button 
                  className="p-3 hover:bg-muted transition-colors flex-1 flex justify-center disabled:opacity-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-mono text-center w-12">{quantity}</span>
                <button 
                  className="p-3 hover:bg-muted transition-colors flex-1 flex justify-center"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <Button size="lg" className="h-16 text-lg font-bold uppercase tracking-widest w-full rounded-none" onClick={handleAddToCart}>
            <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
          </Button>

          <div className="mt-12">
            <Accordion defaultValue={["description"]} className="w-full border-t border-border">
              <AccordionItem value="description" className="border-border">
                <AccordionTrigger className="hover:no-underline font-semibold uppercase tracking-wider text-sm py-4">Description</AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 text-muted-foreground leading-relaxed">
                  {product.description}
                  <br /><br />
                  Printed on 200gsm museum-quality fine art paper. Uncoated and archive-ready. Engineered to last a lifetime without fading.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-border">
                <AccordionTrigger className="hover:no-underline font-semibold uppercase tracking-wider text-sm py-4">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 text-muted-foreground leading-relaxed">
                  Free worldwide shipping on all orders over $100. Dispatched within 48 hours. Express options available at checkout.
                  <br /><br />
                  If you're not completely satisfied with your print, return it within 30 days for a full refund.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
