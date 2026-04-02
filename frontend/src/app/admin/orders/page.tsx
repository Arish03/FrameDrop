"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Truck, 
  CheckCircle, 
  Clock,
  ExternalLink,
  MapPin
} from "lucide-react";
import Link from "next/link";

export default function OrderManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock orders data for management view
  const [orders, setOrders] = useState([
    { id: "ORD-2024-001", date: "Oct 24, 2024", customer: "john@example.com", total: 110.00, status: "Processing", items: 2 },
    { id: "ORD-2024-002", date: "Oct 25, 2024", customer: "jane@doe.com", total: 55.00, status: "Shipped", items: 1 },
    { id: "ORD-2024-003", date: "Oct 26, 2024", customer: "mike@ross.com", total: 240.00, status: "Delivered", items: 4 },
    { id: "ORD-2024-004", date: "Oct 27, 2024", customer: "sarah@connor.com", total: 85.00, status: "Processing", items: 2 },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500/10 text-green-600 border-green-600/20';
      case 'Shipped': return 'bg-blue-500/10 text-blue-600 border-blue-600/20';
      case 'Processing': return 'bg-orange-500/10 text-orange-600 border-orange-600/20';
      default: return 'bg-muted/50 text-muted-foreground border-border/50';
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="mb-12">
        <Link href="/admin" className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-4 group">
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Dashboard
        </Link>
        <h1 className="text-4xl font-black uppercase tracking-tighter">Orders.</h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground opacity-50" />
          <input 
            type="text"
            placeholder="Search by Order ID or Customer Email..." 
            className="w-full h-14 pl-10 pr-4 bg-muted/20 border border-border/50 rounded-none font-medium focus:outline-none focus:border-foreground transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-14 px-8 uppercase tracking-widest font-bold rounded-none">
          <Filter className="h-4 w-4 mr-2" /> Filter By Status
        </Button>
      </div>

      {/* Orders List */}
      <div className="border border-border/50 bg-background/50 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-border/20 text-[10px] uppercase font-mono tracking-widest text-muted-foreground bg-muted/10">
          <div className="col-span-2">Order ID</div>
          <div className="col-span-3">Customer</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-center">Items</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y divide-border/10">
          {filteredOrders.map((order) => (
            <div key={order.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center hover:bg-muted/10 transition-colors">
              <div className="col-span-1 md:col-span-2 font-bold uppercase text-sm">{order.id}</div>
              <div className="col-span-1 md:col-span-3">
                <p className="text-sm font-medium">{order.customer}</p>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mt-1">Total: ${order.total.toFixed(2)}</p>
              </div>
              <div className="col-span-1 md:col-span-2 text-xs text-muted-foreground font-semibold">{order.date}</div>
              <div className="col-span-1 md:col-span-1 text-center font-mono text-sm">{order.items}</div>
              <div className="col-span-1 md:col-span-2 flex justify-center">
                <span className={`text-[10px] px-3 py-1 font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
                <div className="flex gap-1">
                   <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground" onClick={() => updateStatus(order.id, "Shipped")} title="Mark as Shipped">
                     <Truck className="h-4 w-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground" onClick={() => updateStatus(order.id, "Delivered")} title="Mark as Delivered">
                     <CheckCircle className="h-4 w-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                     <Eye className="h-4 w-4" />
                   </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <p className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground italic">
          Tip: Click on the icons to update order status instantly.
        </p>
      </div>
    </div>
  );
}
