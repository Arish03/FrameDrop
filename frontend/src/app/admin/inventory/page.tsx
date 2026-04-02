"use client";

import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/lib/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Package, 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  Filter,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12">
      <div className="mb-12">
        <Link href="/admin" className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-4 group">
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Inventory.</h1>
          <Button className="h-12 uppercase tracking-widest font-bold px-8">
            <Plus className="h-4 w-4 mr-2" /> Add New Product
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Input 
            placeholder="Search products by title or category..." 
            className="pl-10 h-14 bg-muted/20 border-border/50 rounded-none font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground opacity-50" />
        </div>
        <Button variant="outline" className="h-14 px-8 uppercase tracking-widest font-bold rounded-none">
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Inventory List */}
      <div className="border border-border/50 bg-background/50 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-border/20 text-[10px] uppercase font-mono tracking-widest text-muted-foreground bg-muted/10">
          <div className="col-span-6">Product</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-24 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground opacity-30" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-24 text-center">
            <p className="text-muted-foreground uppercase tracking-widest font-bold text-sm">No products found.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 p-6 items-center border-b border-border/10 last:border-0 hover:bg-muted/10 transition-colors">
              <div className="col-span-1 md:col-span-6 flex gap-4">
                <div className="h-16 w-12 bg-muted shrink-0 border border-border flex items-center justify-center overflow-hidden">
                   {product.image ? (
                     <img src={product.image} className="w-full h-full object-cover" alt={product.title} onError={(e) => {
                       (e.target as any).src = "https://picsum.photos/100/100";
                     }} />
                   ) : (
                     <ImageIcon className="h-4 w-4 text-muted-foreground opacity-30" />
                   )}
                </div>
                <div className="flex flex-col justify-center">
                   <h3 className="font-bold uppercase tracking-tight text-sm line-clamp-1">{product.title}</h3>
                   <p className="text-[10px] font-mono text-muted-foreground uppercase truncate max-w-[200px]">ID: {product.id}</p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 flex items-center">
                 <span className="text-xs uppercase font-semibold text-muted-foreground bg-muted/40 px-2 py-1">{product.category}</span>
              </div>
              <div className="col-span-1 md:col-span-2 flex items-center">
                 <span className="font-mono text-sm">${product.price.toFixed(2)}</span>
              </div>
              <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-2">
                 <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                   <Edit className="h-4 w-4" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-10 w-10 text-destructive hover:bg-destructive/5">
                   <Trash2 className="h-4 w-4" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground" render={
                   <Link href={`/product/${product.id}`} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                   </Link>
                 } />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cloudinary Integration Note */}
      <div className="mt-12 bg-foreground text-background p-8 border border-border">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 max-w-2xl">
               <h3 className="text-xl font-bold uppercase tracking-tight">Cloudinary Integration</h3>
               <p className="text-xs opacity-70 leading-relaxed uppercase tracking-widest font-mono">
                 The admin suite is ready for server-side Cloudinary integration. New products will automatically upload images to your cloud bucket and sync the IDs to MongoDB.
               </p>
            </div>
            <Button variant="outline" className="bg-background text-foreground hover:bg-muted border-0 uppercase tracking-widest font-black h-12">
               Configure Credentials
            </Button>
         </div>
      </div>
    </div>
  );
}
