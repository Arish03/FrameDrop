"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/mock";

export function CategoryScroll() {
  // Using picsum photos as requested by user in their snippet
  const displayCategories = [
    { name: "Custom", slug: "create", img: "https://picsum.photos/100?1" },
    { name: "Superhero", slug: "superhero", img: "https://picsum.photos/100?2" },
    { name: "Cars", slug: "cars", img: "https://picsum.photos/100?3" },
    { name: "Movies", slug: "movies", img: "https://picsum.photos/100?4" },
    { name: "Music", slug: "music", img: "https://picsum.photos/100?5" },
    ...CATEGORIES.map((c, i) => ({
      name: c.name,
      slug: `categories/${c.slug}`,
      img: `https://picsum.photos/100?${i + 6}`
    }))
  ];

  return (
    <div className="w-full bg-background border-b border-border/50">
      <div className="flex gap-[25px] overflow-x-auto py-[30px] px-[20px] no-scrollbar scroll-smooth justify-start md:justify-center">
        {displayCategories.map((cat, i) => (
          <Link 
            key={i} 
            href={cat.slug.startsWith('create') ? '/create' : `/${cat.slug}`}
            className="flex flex-col items-center text-center min-w-[90px] group cursor-pointer"
          >
            <div className="relative w-[75px] h-[75px] mb-2">
              <img 
                src={cat.img} 
                alt={cat.name}
                className="w-full h-full rounded-full border border-black/15 transition-transform duration-300 group-hover:scale-[1.15] object-cover bg-muted"
              />
            </div>
            <p className="text-[12px] opacity-60 uppercase font-black tracking-tighter group-hover:opacity-100 transition-opacity">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
