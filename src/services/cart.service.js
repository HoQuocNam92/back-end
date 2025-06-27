const CartModel = require("../model/cart.model");
class CartService {
  static async AddCart(product ,id) {
    try {
      return await CartModel.AddCart(product, id);
    } catch (error) {
      throw new Error("Error when adding to cart");
    }
  }

  static async GetCart(id) {
    try {
      return await CartModel.GetCart(id);
    } catch (error) {
      throw new Error("Error when retrieving cart items");
    }
  }

  static async DeleteCart(id) {
    try {
      return await CartModel.DeleteCart(id);
    } catch (error) {
      throw new Error("Error when deleting from cart");
    }
  }
}

module.exports = CartService;
