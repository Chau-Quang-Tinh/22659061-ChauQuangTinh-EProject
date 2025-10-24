const axios = require("axios");
const Product = require("../models/product");

/**
 * Controller for Product Service
 */
class ProductController {
  constructor() {
    this.createProduct = this.createProduct.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
  }

  // ✅ Tạo sản phẩm mới
  async createProduct(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const product = new Product(req.body);
      const validationError = product.validateSync();
      if (validationError) {
        return res.status(400).json({ message: validationError.message });
      }

      await product.save();
      return res.status(201).json({ message: "Product created", product });
    } catch (error) {
      console.error("Error creating product:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }

  // ✅ Đặt hàng (gọi tới Order Service)
  async createOrder(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { productId, quantity } = req.body;
      if (!productId || !quantity) {
        return res
          .status(400)
          .json({ message: "Missing productId or quantity" });
      }

      // Kiểm tra sản phẩm có tồn tại không
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Gọi sang Order service
      const response = await axios.post("http://order:3002/orders", {
        productId,
        quantity,
        userId: req.user.id,
      });

      return res.status(201).json({
        message: "Order created successfully",
        order: response.data,
      });
    } catch (error) {
      console.error("Error creating order:", error.message);
      res.status(500).json({ message: "Failed to create order" });
    }
  }

  // ✅ Lấy tất cả sản phẩm
  async getProducts(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const products = await Product.find();
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error getting products:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }

  // ✅ Lấy chi tiết sản phẩm (theo yêu cầu sát hạch /id)
  async getProductById(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error("Error getting product by id:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = ProductController;
