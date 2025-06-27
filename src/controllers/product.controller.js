const ProductService = require("../services/product.service");
const client = require("../config/redisClient");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 0;
      const pageSize = parseInt(req.query.pageSize) || 0;
      console.log("🚀 ~ getAllProducts: ~ pageSize:", pageSize)
     
      const extra = 4;
      let limit, offset;
      if (page === 0) {
        limit = pageSize;
        offset = 0;
      } else {
        limit = extra;
        offset = pageSize + (page - 1) * extra;
      }
      const cacheKey = `products:${limit}:${offset}`;
      const cacheData = await client.get(cacheKey);

      if (cacheData) return res.json(JSON.parse(cacheData));

      const { data, total } = await ProductService.getAllProducts(
        limit,
        offset,
      );

      const hasMore = offset + limit < total;
      if (!data) return res.status(404).json({ message: "No products found" });
      const dataCache = { products: data, total, hasMore };
      await client.setEx(cacheKey, 600, JSON.stringify(dataCache));
      res.json(dataCache);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const cacheKey = `productById${req.params.id}`;
      const cacheData = await client.get(cacheKey);
      if (cacheData) return res.json(JSON.parse(cacheData));

      const product = await ProductService.getProductById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      await client.setEx(cacheKey, 600, JSON.stringify(product));
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
module.exports = productController;
