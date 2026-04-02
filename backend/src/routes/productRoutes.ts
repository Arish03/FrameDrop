import express from "express";
import { Product } from "../models/Product";

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    // Map _id to id to match frontend expectation
    const formattedProducts = products.map(p => ({
      ...p.toObject(),
      id: p._id.toString()
    }));
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching products" });
  }
});

// @desc    Fetch single product by id or slug
// @route   GET /api/products/:idOrSlug
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    // Try to find by id first, then slug
    let product;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(req.params.id);
    }
    
    if (!product) {
      product = await Product.findOne({ slug: req.params.id });
    }

    if (product) {
      res.json({ ...product.toObject(), id: product._id.toString() });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching product" });
  }
});

export default router;
