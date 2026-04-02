"use client";

import { useCartStore } from "@/lib/store";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Plus, 
  Settings,
  LogOut,
  ChevronRight,
  TrendingDown,
  Activity
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  // Mock statistics for the dashboard
  const stats = [
    { title: "Total Revenue", value: "$12,450.00", trend: "+12.5%", icon: TrendingUp },
    { title: "Active Orders", value: "24", trend: "+4.2%", icon: ShoppingCart },
    { title: "Total Customers", value: "1,200", trend: "+8.9%", icon: Users },
    { title: "Active Inventory", value: "156", trend: "-2.1%", icon: Package },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 sm:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Admin Console.</h1>
          <Button variant="default" className="h-12 uppercase tracking-widest font-bold" render={<Link href="/admin/inventory" />}>
            <Plus className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="bg-muted/30 border border-border/50 p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-muted-foreground opacity-50" />
                <span className={`text-[10px] font-black uppercase tracking-widest ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-black tracking-tighter uppercase">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links / Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
              <Activity className="h-4 w-4" /> Recent Activity
            </h2>
            <div className="border border-border/50 bg-background/50 overflow-hidden">
               <div className="p-4 border-b border-border/20 text-[10px] uppercase font-mono tracking-widest text-muted-foreground flex justify-between bg-muted/10">
                 <span>Order ID</span>
                 <span>Status</span>
                 <span>Total</span>
               </div>
               {[...Array(5)].map((_, i) => (
                 <div key={i} className="p-6 flex items-center justify-between border-b border-border/10 last:border-0 hover:bg-muted/10 transition-colors cursor-pointer group">
                   <div className="space-y-1">
                      <p className="font-bold uppercase">ORD-2024-00{i+1}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-mono">Customer: user00{i+1}@example.com</p>
                   </div>
                   <div className="flex items-center gap-6">
                      <span className="text-[10px] px-2 py-0.5 font-bold uppercase tracking-widest border border-foreground/5 bg-foreground/5">Processing</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity" />
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-tight">Management</h2>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/admin/inventory" className="p-6 border border-border/50 bg-muted/20 hover:bg-foreground hover:text-background transition-all group flex flex-col gap-2">
                 <Package className="h-5 w-5 opacity-40 group-hover:opacity-100" />
                 <span className="text-sm font-bold uppercase tracking-widest">Inventory Management</span>
                 <p className="text-[10px] opacity-60 group-hover:opacity-100">Add, edit, or delete posters and categories.</p>
              </Link>
              <Link href="/admin/orders" className="p-6 border border-border/50 bg-muted/20 hover:bg-foreground hover:text-background transition-all group flex flex-col gap-2">
                 <ShoppingCart className="h-5 w-5 opacity-40 group-hover:opacity-100" />
                 <span className="text-sm font-bold uppercase tracking-widest">Order Management</span>
                 <p className="text-[10px] opacity-60 group-hover:opacity-100">Review, update, and manage customer orders.</p>
              </Link>
              <Link href="/profile" className="p-6 border border-border/50 bg-muted/20 hover:bg-foreground hover:text-background transition-all group flex flex-col gap-2">
                 <Users className="h-5 w-5 opacity-40 group-hover:opacity-100" />
                 <span className="text-sm font-bold uppercase tracking-widest">Customer Support</span>
                 <p className="text-[10px] opacity-60 group-hover:opacity-100">Access user profiles and dispute resolutions.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
