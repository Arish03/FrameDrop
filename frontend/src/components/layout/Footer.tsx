"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  
  // Do not show footer on login or register pages
  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/register";
  
  if (isAuthPage) return null;

  return (
    <footer className="border-t border-border bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold tracking-tighter uppercase">FrameDrop.</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Minimal posters for maximal expression. Premium quality, distraction-free aesthetic.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground transition-colors">All Posters</Link></li>
              <li><Link href="/categories/minimal" className="hover:text-foreground transition-colors">Minimal</Link></li>
              <li><Link href="/categories/cinema" className="hover:text-foreground transition-colors">Cinema</Link></li>
              <li><Link href="/categories/music" className="hover:text-foreground transition-colors">Music</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-foreground transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-foreground transition-colors">Returns</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Subscribe for exclusive drops and 10% off your first order.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                aria-label="Email Address"
              />
              <button type="submit" className="border-b border-border py-2 px-2 hover:text-muted-foreground transition-colors" aria-label="Submit">
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FrameDrop. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
