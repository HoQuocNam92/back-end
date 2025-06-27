const db = require("../config/db");

class ProductModel {
  static async create(product) {
    const [result] = await db.query(
      "INSERT INTO book (title, price, stock_quantity, author, description, image_url, image_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        product.title,
        product.price,
        product.stock_quantity,
        product.author,
        product.description,
        product.image_url,
        product.image_id,
      ],
    );
    return result.insertId;
  }

  static async findAll(limit, offset) {
    const [data] = await db.query(
      "SELECT * FROM book order by created_at desc limit ? offset ?",
      [limit, offset],
    );
    const [[{ total }]] = await db.query("select count(*) as total from book");
    return { data, total };
  }

  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM book WHERE id = ?", [id]);
    return rows[0];
  }

  static async findByIdAndDelete(id) {
    const [rows] = await db.query("DELETE FROM book WHERE id = ?", [id]);
    return rows;
  }
  static async editProduct(id) {
    const [rows] = await db.query("DELETE FROM book WHERE id = ?", [id]);
    return rows;
  }
}
module.exports = ProductModel;
