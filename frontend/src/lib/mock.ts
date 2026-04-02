export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  description: string;
  isNew?: boolean;
};

export const CATEGORIES: Category[] = [
  { id: "1", name: "Minimal", slug: "minimal", image: "/cats/minimal.jpg", count: 124 },
  { id: "2", name: "Cinema", slug: "cinema", image: "/cats/cinema.jpg", count: 86 },
  { id: "3", name: "Typography", slug: "typography", image: "/cats/typography.jpg", count: 42 },
  { id: "4", name: "Abstract", slug: "abstract", image: "/cats/abstract.jpg", count: 56 },
  { id: "5", name: "Photography", slug: "photography", image: "/cats/photography.jpg", count: 91 },
  { id: "6", name: "Music", slug: "music", image: "/cats/music.jpg", count: 64 },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Bauhaus Geometry",
    slug: "bauhaus-geometry",
    price: 45.0,
    category: "minimal",
    image: "/products/p1.jpg",
    description: "A tribute to the Bauhaus movement, featuring stark geometric shapes and absolute minimalism.",
    isNew: true,
  },
  {
    id: "p2",
    title: "The Noir Director",
    slug: "the-noir-director",
    price: 55.0,
    category: "cinema",
    image: "/products/p2.jpg",
    description: "Classic cinematic framing in high-contrast black and white. Perfect for film enthusiasts.",
  },
  {
    id: "p3",
    title: "Helvetica Standard",
    slug: "helvetica-standard",
    price: 40.0,
    category: "typography",
    image: "/products/p3.jpg",
    description: "A celebration of the world's most ubiquitous typeface. Clean, structured, and timeless.",
    isNew: true,
  },
  {
    id: "p4",
    title: "Brutalist Concrete",
    slug: "brutalist-concrete",
    price: 60.0,
    category: "photography",
    image: "/products/p4.jpg",
    description: "Harsh shadows and raw textures captured from brutalist architecture.",
  },
  {
    id: "p5",
    title: "Negative Space I",
    slug: "negative-space-1",
    price: 35.0,
    category: "minimal",
    image: "/products/p5.jpg",
    description: "An exploration of emptiness. Less is genuinely more.",
  },
  {
    id: "p6",
    title: "Audio Waves",
    slug: "audio-waves",
    price: 50.0,
    category: "music",
    image: "/products/p6.jpg",
    description: "Visual representation of sound frequencies in a stark monochrome palette.",
  },
  {
    id: "p7",
    title: "Swiss Grid",
    slug: "swiss-grid",
    price: 42.0,
    category: "typography",
    image: "/products/p7.jpg",
    description: "Perfectly aligned modernist design principles on paper.",
  },
  {
    id: "p8",
    title: "Midnight Drive",
    slug: "midnight-drive",
    price: 65.0,
    category: "cinema",
    image: "/products/p8.jpg",
    description: "A moody, cinematic still capturing the essence of neo-noir.",
    isNew: true,
  },
];
