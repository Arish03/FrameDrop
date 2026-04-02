import express from "express";
import { Category } from "../models/Category";

const router = express.Router();

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    const formattedCategories = categories.map(c => ({
      ...c.toObject(),
      id: c._id.toString()
    }));
    res.json(formattedCategories);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching categories" });
  }
});

// @desc    Fetch single category
// @route   GET /api/categories/:slug
// @access  Public
router.get("/:slug", async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (category) {
      res.json({ ...category.toObject(), id: category._id.toString() });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching category" });
  }
});

export default router;
