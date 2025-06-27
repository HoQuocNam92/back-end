const ProductModel = require("../model/product.model");

class ProductService {
  static async getAllProducts(limit, offset) {
    return await ProductModel.findAll(limit, offset);
  }

  static async getProductById(productId) {
    return await ProductModel.findById(productId);
  }
}

module.exports = ProductService;
