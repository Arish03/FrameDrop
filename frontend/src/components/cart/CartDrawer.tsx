"use client";

import { useCartStore } from "@/lib/store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem } = useCartStore();

  const validItems = items.filter((item) => item && item.product);
  const total = validItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col pt-10">
        <SheetHeader className="px-1 text-left">
          <SheetTitle className="text-2xl font-bold tracking-tight uppercase">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 px-1 flex flex-col gap-6">
          {validItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
              <div className="h-16 w-16 border border-dashed border-border rounded-full flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-border" />
              </div>
              <p className="font-medium text-sm">Your cart is empty.</p>
              <Button variant="outline" className="mt-4" onClick={() => setIsOpen(false)} nativeButton={false} render={<Link href="/shop" />}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            validItems.map((item) => (
              <div key={`${item.product.id}-${item.size}-${item.frame}`} className="flex gap-4 border-b border-border/50 pb-4">
                <div className="h-24 w-20 bg-muted shrink-0 relative overflow-hidden border border-border/50">
                  {/* Image placeholder for now until we have real assets */}
                  <div className="absolute inset-0 bg-secondary flex items-center justify-center text-[10px] text-muted-foreground">{item.product.id}</div>
                </div>
                
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-sm leading-tight uppercase">{item.product.title}</h4>
                      <button 
                        onClick={() => removeItem(item.product.id, item.size, item.frame)}
                        className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.size} / {item.frame}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border rounded-sm">
                      <button 
                        className="p-1 hover:bg-muted transition-colors disabled:opacity-50"
                        onClick={() => updateQuantity(item.product.id, item.size, item.frame, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-mono w-6 text-center">{item.quantity}</span>
                      <button 
                        className="p-1 hover:bg-muted transition-colors"
                        onClick={() => updateQuantity(item.product.id, item.size, item.frame, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-semibold text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {validItems.length > 0 && (
          <SheetFooter className="flex-col gap-4 border-t border-border/50 pt-4 px-1 sm:flex-col sm:space-x-0">
            <div className="flex items-center justify-between font-bold text-lg w-full">
              <span className="uppercase tracking-tight text-sm text-muted-foreground">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center mb-2">Shipping and taxes calculated at checkout.</p>
            <Button className="w-full text-base h-14 uppercase tracking-widest font-bold" onClick={() => setIsOpen(false)} nativeButton={false} render={<Link href="/checkout" />}>
              Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
