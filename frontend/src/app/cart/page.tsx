"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const validItems = items.filter(item => item && item.product);
  const total = validItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (validItems.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-8 py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button nativeButton={false} size="lg" className="h-14 px-8 uppercase tracking-widest font-bold" render={<Link href="/shop" />}>
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-12">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="hidden md:grid grid-cols-12 gap-4 border-b border-border pb-4 mb-6 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>
          
          <div className="flex flex-col gap-8">
            {validItems.map((item) => (
              <div key={`${item.product.id}-${item.size}-${item.frame}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center border-b border-border/50 pb-8">
                <div className="col-span-1 md:col-span-6 flex gap-6">
                  <div className="h-32 w-24 bg-muted shrink-0 relative overflow-hidden border border-border flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] uppercase font-mono text-muted-foreground px-2 text-center">{item.product.title}</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold uppercase tracking-tight text-lg mb-1">{item.product.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.size} / {item.frame}</p>
                    <button 
                      onClick={() => removeItem(item.product.id, item.size, item.frame)}
                      className="text-xs font-semibold tracking-wider uppercase text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1 w-fit"
                    >
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-3 flex md:justify-center">
                  <div className="flex items-center border border-border w-32 h-12">
                    <button 
                      className="h-full px-3 hover:bg-muted transition-colors flex-1 flex justify-center items-center disabled:opacity-50"
                      onClick={() => updateQuantity(item.product.id, item.size, item.frame, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-mono text-center w-10">{item.quantity}</span>
                    <button 
                      className="h-full px-3 hover:bg-muted transition-colors flex-1 flex justify-center items-center"
                      onClick={() => updateQuantity(item.product.id, item.size, item.frame, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-3 flex md:justify-end">
                  <span className="font-mono text-lg">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-muted/30 border border-border p-8">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 border-b border-border/50 pb-6">
              <div className="flex items-center gap-2">
                <Input placeholder="Promo code" className="bg-background rounded-none" />
                <Button variant="outline" className="rounded-none uppercase tracking-widest font-semibold text-xs">Apply</Button>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-wider">Subtotal</span>
                <span className="font-mono">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-wider">Shipping</span>
                <span className="text-xs">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-wider">Taxes</span>
                <span className="text-xs">Calculated at checkout</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between items-center mt-4">
                <span className="font-bold uppercase tracking-wider">Estimated Total</span>
                <span className="font-mono text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button nativeButton={false} size="lg" className="h-16 w-full uppercase tracking-widest font-bold text-lg rounded-none group" render={<Link href="/checkout" />}>
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
