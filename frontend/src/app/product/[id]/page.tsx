import { notFound } from "next/navigation";
import { fetchProduct } from "@/lib/api";
import { ProductDetail } from "@/components/product/ProductDetail";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await fetchProduct(id);
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
