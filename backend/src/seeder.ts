import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { Product } from "./models/Product";
import { Category } from "./models/Category";
import { User } from "./models/User";

dotenv.config();
connectDB();

const categoriesData = [
  { name: "Minimal", slug: "minimal", image: "/cats/minimal.jpg", count: 124 },
  { name: "Cinema", slug: "cinema", image: "/cats/cinema.jpg", count: 86 },
  { name: "Typography", slug: "typography", image: "/cats/typography.jpg", count: 42 },
  { name: "Abstract", slug: "abstract", image: "/cats/abstract.jpg", count: 56 },
  { name: "Photography", slug: "photography", image: "/cats/photography.jpg", count: 91 },
  { name: "Music", slug: "music", image: "/cats/music.jpg", count: 64 },
];

const productsData = [
  {
    title: "Bauhaus Geometry",
    slug: "bauhaus-geometry",
    price: 45.0,
    category: "minimal",
    image: "/products/p1.jpg",
    description: "A tribute to the Bauhaus movement, featuring stark geometric shapes and absolute minimalism.",
    isNewProduct: true,
  },
  {
    title: "The Noir Director",
    slug: "the-noir-director",
    price: 55.0,
    category: "cinema",
    image: "/products/p2.jpg",
    description: "Classic cinematic framing in high-contrast black and white. Perfect for film enthusiasts.",
  },
  {
    title: "Helvetica Standard",
    slug: "helvetica-standard",
    price: 40.0,
    category: "typography",
    image: "/products/p3.jpg",
    description: "A celebration of the world's most ubiquitous typeface. Clean, structured, and timeless.",
    isNewProduct: true,
  },
  {
    title: "Brutalist Concrete",
    slug: "brutalist-concrete",
    price: 60.0,
    category: "photography",
    image: "/products/p4.jpg",
    description: "Harsh shadows and raw textures captured from brutalist architecture.",
  },
  {
    title: "Negative Space I",
    slug: "negative-space-1",
    price: 35.0,
    category: "minimal",
    image: "/products/p5.jpg",
    description: "An exploration of emptiness. Less is genuinely more.",
  },
  {
    title: "Audio Waves",
    slug: "audio-waves",
    price: 50.0,
    category: "music",
    image: "/products/p6.jpg",
    description: "Visual representation of sound frequencies in a stark monochrome palette.",
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    await Category.insertMany(categoriesData);
    await Product.insertMany(productsData);

    console.log("Data Imported successfully!");
    process.exit();
  } catch (error) {
    console.error("Error importing data", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error("Error destroying data", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
