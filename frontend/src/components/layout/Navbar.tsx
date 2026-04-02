"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { ShoppingCart, Search, User, Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function Navbar() {
  const { items, setIsOpen } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="-ml-2 shrink-0" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] flex flex-col p-8 bg-white border-r border-border/50">
              <SheetTitle className="sr-only">Studio Navigation</SheetTitle>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-16 border-b border-border/10 pb-8">
                  <span className="text-2xl font-black tracking-[0.2em] uppercase">F.</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mt-1">Studio</span>
                </div>
                <nav className="flex flex-col gap-10 text-2xl font-black uppercase tracking-tighter">
                  <Link href="/" className="hover:text-muted-foreground transition-colors group flex items-center justify-between">
                    Home <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 -rotate-45" />
                  </Link>
                  <Link href="/shop" className="hover:text-muted-foreground transition-colors group flex items-center justify-between">
                    Shop <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 -rotate-45" />
                  </Link>
                  <Link href="/categories" className="hover:text-muted-foreground transition-colors group flex items-center justify-between">
                    Categories <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 -rotate-45" />
                  </Link>
                  <Link href="/about" className="hover:text-muted-foreground transition-colors group flex items-center justify-between">
                    About <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 -rotate-45" />
                  </Link>
                </nav>
              </div>

              {/* Bottom Profile Section */}
              <div className="mt-auto pt-8 border-t border-border/50">
                <Link href="/auth/login" className="flex items-center justify-between w-full p-4 bg-black text-white hover:bg-black/90 transition-all group">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Profile Portal</span>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="text-[8px] text-center mt-4 text-muted-foreground/40 font-bold uppercase tracking-tight">
                  FrameDrop Studios · Member Access 2026
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <span className="text-xl font-bold tracking-tighter uppercase sm:text-2xl">FrameDrop.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-muted-foreground">
            Home
          </Link>
          <Link href="/shop" className="transition-colors hover:text-muted-foreground">
            Shop
          </Link>
          <Link href="/categories" className="transition-colors hover:text-muted-foreground">
            Categories
          </Link>
          <Link href="/create" className="transition-colors hover:text-muted-foreground">
            Create
          </Link>
          <Link href="/about" className="transition-colors hover:text-muted-foreground">
            About Us
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="flex">
            <Search className="h-5 w-5" strokeWidth={2.5} />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex" nativeButton={false} render={<Link href="/auth/login" />}>
            <User className="h-5 w-5" strokeWidth={2.5} />
            <span className="sr-only">Account</span>
          </Button>
          <Link href="/cart" className="relative group p-2 hover:bg-muted transition-colors rounded-full">
            <ShoppingCart className="h-5 w-5 stroke-[2.5px] group-hover:scale-110 transition-transform" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[8px] font-black text-background border border-background">
                {itemCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
