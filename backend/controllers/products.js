import Product from "../models/products.js";
import { uploadImages } from "../utils/awsUploads.js";


// Get a list of all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    if (!products) {
      return res.status(404).json({ message: 'No products found' });
    }
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.body.name });
    if (product) {
      return res.status(400).json({ message: 'Product already exists' });
    }
    const newProduct = new Product(req.body);
    await newProduct.save();

    let imageUrls = [];
    // Upload Image to s3 bucket
    if (req.files) {
      imageUrls = await uploadImages(newProduct._id, req.files);
      if (!imageUrls) {
        return res.status(500).json({ message: 'Failed to upload images' });
      }
    }

    newProduct.images = imageUrls;
    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Get a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Search for products using indexing 
const searchProducts = async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.find({ 
      $text: { 
        $search: query,
        $caseSensitive: false,
        $diacriticSensitive: false,
      }, 
    })
    .project({ score: { $meta: 'textScore' }, _id: 0})
    .sort({ score: { $meta: 'textScore' } })
    .limit(10).exec();

    if (!products) {
      return res.status(404).json({ message: 'No products found' });
    }
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export default {
  getProducts,
  createProduct,
  getProductById,
  searchProducts
}