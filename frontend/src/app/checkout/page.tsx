"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, CreditCard, Apple } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "paypal">("card");

  const validItems = items.filter(item => item && item.product);
  const subtotal = validItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/orders/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderItems: validItems.map(item => ({
            product: item.product.id,
            quantity: item.quantity,
            size: item.size,
            frame: item.frame,
            price: item.product.price,
          })),
          shippingAddress: {
            firstName: (document.getElementById("firstName") as HTMLInputElement).value,
            lastName: (document.getElementById("lastName") as HTMLInputElement).value,
            address: (document.getElementById("address") as HTMLInputElement).value,
            city: (document.getElementById("city") as HTMLInputElement).value,
            state: (document.getElementById("state") as HTMLInputElement).value,
            zip: (document.getElementById("zip") as HTMLInputElement).value,
          },
          paymentMethod,
          itemsPrice: subtotal,
          shippingPrice: shipping,
          totalPrice: total,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to place order");
      }
      
      alert("Order placed successfully! (Backend Integration Complete)");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 md:py-16">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Checkout Form */}
        <div className="w-full lg:w-[60%]">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <h1 className="text-3xl font-black tracking-tighter uppercase">Checkout</h1>
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <Lock className="h-3 w-3" /> Secure SSL Encryption
            </span>
          </div>

          <form onSubmit={handleCheckout} className="space-y-12">
            {/* Express Checkout */}
            <div className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Express Checkout</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button type="button" variant="outline" className="h-12 border-border/70 hover:border-foreground bg-background rounded-none" onClick={() => setPaymentMethod("apple")}>
                  <Apple className="h-5 w-5 mr-2" /> Pay
                </Button>
                <Button type="button" variant="outline" className="h-12 border-[#0079C1] text-[#0079C1] hover:bg-[#0079C1] hover:text-white transition-colors bg-background rounded-none uppercase tracking-wider font-bold" onClick={() => setPaymentMethod("paypal")}>
                  PayPal
                </Button>
              </div>
              
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="shrink-0 mx-4 text-muted-foreground text-xs uppercase tracking-widest font-semibold">Or pay with card</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-xl font-bold uppercase tracking-tight">Contact Information</h2>
                <Link href="/auth/login" className="text-xs font-semibold uppercase tracking-wider underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors">
                  Have an account? Log in
                </Link>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider">Email Address</Label>
                <Input id="email" type="email" required className="h-12 border-border/50 bg-background rounded-none" placeholder="Enter your email" />
              </div>
            </div>

            {/* Shipping Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-tight mb-2">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider">First Name</Label>
                  <Input id="firstName" required className="h-12 border-border/50 bg-background rounded-none" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider">Last Name</Label>
                  <Input id="lastName" required className="h-12 border-border/50 bg-background rounded-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs font-semibold uppercase tracking-wider">Address</Label>
                <Input id="address" required className="h-12 border-border/50 bg-background rounded-none" placeholder="Street address or P.O. Box" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 space-y-2">
                  <Label htmlFor="city" className="text-xs font-semibold uppercase tracking-wider">City</Label>
                  <Input id="city" required className="h-12 border-border/50 bg-background rounded-none" />
                </div>
                <div className="col-span-1 space-y-2">
                  <Label htmlFor="state" className="text-xs font-semibold uppercase tracking-wider">State</Label>
                  <Input id="state" required className="h-12 border-border/50 bg-background rounded-none" />
                </div>
                <div className="col-span-1 space-y-2">
                  <Label htmlFor="zip" className="text-xs font-semibold uppercase tracking-wider">ZIP Code</Label>
                  <Input id="zip" required className="h-12 border-border/50 bg-background rounded-none" />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-6 pt-6 border-t border-border">
              <h2 className="text-xl font-bold uppercase tracking-tight mb-2 flex items-center gap-2">
                Payment <span className="text-xs text-muted-foreground font-normal tracking-normal">(Stripe Stub)</span>
              </h2>
              
              <div className="border border-foreground bg-background p-4 relative">
                <div className="absolute top-4 right-4 flex gap-1">
                  <div className="h-5 w-8 bg-muted border border-border rounded-sm" />
                  <div className="h-5 w-8 bg-muted border border-border rounded-sm" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-4 w-4 rounded-full border-[4px] border-foreground" />
                  <span className="font-semibold text-sm">Credit Card</span>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-xs font-semibold uppercase tracking-wider">Name on Card</Label>
                    <Input id="cardName" required className="h-12 border-border/50 bg-background rounded-none font-mono" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-xs font-semibold uppercase tracking-wider">Card Number</Label>
                    <div className="relative">
                      <Input id="cardNumber" required className="h-12 border-border/50 bg-background rounded-none font-mono tracking-widest pl-10" placeholder="0000 0000 0000 0000" />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-xs font-semibold uppercase tracking-wider">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required className="h-12 border-border/50 bg-background rounded-none font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc" className="text-xs font-semibold uppercase tracking-wider">CVC</Label>
                      <Input id="cvc" placeholder="123" required className="h-12 border-border/50 bg-background rounded-none font-mono" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-16 text-lg font-bold uppercase tracking-widest rounded-none"
              disabled={isProcessing || items.length === 0}
            >
              {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-[40%]">
          <div className="bg-muted/30 border border-border p-6 lg:p-8 sticky top-24">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-6">In Your Bag</h2>
            
            <div className="flex flex-col gap-6 mb-6">
              {validItems.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="h-20 w-16 bg-muted relative border border-border shrink-0 flex justify-center items-center">
                    <span className="text-[8px] uppercase font-mono text-muted-foreground text-center line-clamp-2 px-1">
                      {item.product.title}
                    </span>
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <h3 className="font-bold text-sm uppercase leading-tight line-clamp-1">{item.product.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1">{item.size} / {item.frame}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
              {validItems.length === 0 && (
                <p className="text-sm text-muted-foreground py-4">Your bag is empty.</p>
              )}
            </div>
            
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-wider text-xs font-semibold">Subtotal</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground uppercase tracking-wider text-xs font-semibold">Shipping</span>
                <span className="font-mono">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-border/50 pt-4 flex justify-between items-center mt-2">
                <span className="font-bold uppercase tracking-wider">Total</span>
                <span className="font-mono text-2xl font-bold border-b-2 border-foreground">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
