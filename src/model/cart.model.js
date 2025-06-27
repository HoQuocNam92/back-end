const db = require("../config/db");

class CartModel {
  static async AddCart(product , id) {
    const [rows] = await db.query("SELECT * FROM cart WHERE ID = ? and customers_id = ? ", [
      product.id,id
    ]);
    const row = rows[0];
    if (rows.length > 0) {
      const newQuantity = row.quantity + product.quantity;
      const newTotal = newQuantity * row.price;
      const [rows] = await db.query(
        "UPDATE cart set quantity = ? , total = ?  where id = ?",
        [newQuantity, newTotal, row.id],
      );
      return rows;
    } else {
      const [rows] = await db.query(
        "INSERT INTO cart (id ,customers_id , title, price, image_url, quantity , total) VALUES (?, ? ,?, ?, ?, ?, ?)",
        [
          product.id,
          id,
          product.title,
          product.price,
          product.image_url,
          product.quantity,
          product.total,
        ],
      );
      console.log("Chekc rows add  cart" , rows)
      return rows;
    }
  }
  static async GetCart(id) {
   
    const [rows] = await db.query("select * from cart where customers_id = ? " , [id]);
    return rows;
  }
  static async DeleteCart(id) {
    const [rows] = await db.query("delete from cart where id = ?", [id]);
    return rows;
  }
}

module.exports = CartModel;
