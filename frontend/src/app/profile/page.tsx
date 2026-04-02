"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { User, Package, Settings, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"orders" | "settings">("orders");
  
  // Mock user data - in real app, these would come from the login context
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    isAdmin: true // Special flag for demo
  };

  const mockOrders = [
    { id: "ORD-1002", date: "Oct 24, 2024", total: 110.00, status: "Delivered" },
    { id: "ORD-1005", date: "Nov 02, 2024", total: 55.00, status: "Processing" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 md:py-24">
      <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
        
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-1">
          <div className="p-6 bg-muted/30 border border-border/50 mb-4 text-center sm:text-left">
            <h2 className="text-xl font-bold uppercase tracking-tight">{user.firstName} {user.lastName}</h2>
            <p className="text-xs text-muted-foreground uppercase font-mono tracking-widest mt-1">{user.email}</p>
          </div>
          
          <button 
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors border ${activeTab === 'orders' ? 'bg-foreground text-background border-foreground' : 'hover:bg-muted border-transparent'}`}
          >
            <Package className="h-4 w-4" /> My Orders
          </button>
          
          <button 
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors border ${activeTab === 'settings' ? 'bg-foreground text-background border-foreground' : 'hover:bg-muted border-transparent'}`}
          >
            <Settings className="h-4 w-4" /> Account Settings
          </button>

          {user.isAdmin && (
            <Link 
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors border border-transparent hover:bg-muted text-foreground/70"
            >
              <ChevronRight className="h-4 w-4" /> Admin Controls
            </Link>
          )}

          <div className="mt-8 pt-6 border-t border-border/50">
            <button className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest text-destructive hover:bg-destructive/5 transition-colors w-full">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          {activeTab === "orders" ? (
            <div className="space-y-8">
              <h1 className="text-3xl font-black uppercase tracking-tighter">Order History.</h1>
              
              <div className="space-y-4">
                {mockOrders.map(order => (
                  <div key={order.id} className="border border-border/50 p-6 flex flex-col sm:flex-row justify-between items-center bg-muted/5 gap-4">
                    <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">{order.date}</span>
                      <span className="font-bold uppercase text-lg">{order.id}</span>
                      <span className="text-xs uppercase font-semibold text-muted-foreground">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`text-[10px] px-3 py-1 font-black uppercase tracking-widest border ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-600 border-green-600/20' : 'bg-orange-500/10 text-orange-600 border-orange-600/20'}`}>
                        {order.status}
                      </span>
                      <Button variant="outline" className="h-10 text-xs px-6 uppercase tracking-widest rounded-none">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <h1 className="text-3xl font-black uppercase tracking-tighter">Account Settings.</h1>
              <div className="bg-muted/10 border border-border/50 p-8 max-w-xl space-y-6">
                <p className="text-muted-foreground text-sm">Update your personal information and contact settings here.</p>
                {/* Setting fields placeholder */}
                <div className="space-y-4 pt-4 border-t border-border/20">
                   <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">Login Method: Email / Password</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
