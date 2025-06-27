const db = require("../config/db");

class UserModel {
  static async register (user) {
    const {name , email , password} = user;
    const [users] = await db.query("INSERT INTO customers (userName, email , password) VALUES (?, ?, ?)" ,[name , email , password]);
    return users;
  }
  static async getAllUser() {
    const [rows] = await db.query("SELECT * FROM customers");
    return rows;
  }
  static async updatePassword(userId, hashPassword) {
    const [rows] = await db.query(
      "update customers set password = ? where id = ?",
      [hashPassword, userId],
    );
    return rows;
  }
  static async updateRoleUser(roles, id) {
    const [rows] = await db.query(
      "update customers set role = ? where id = ?",
      [roles, id],
    );
    return rows;
  }
  static async editUser(role, id) {
    const [rows] = await db.query(
      "UPDATE customers set role = ? where id = ? ",
      [role, id],
    );
    return rows;
  }
  static async deleteUser(id) {
    const [rows] = await db.query("delete from customers where id = ? ", [id]);
    return rows;
  }
  static async findID(id) {
    const [row] = await db.query("Select * from customers where id = ? ", [
      id,
    ]);
    return row[0];
  }
  static async findOne(email) {
    const [row] = await db.query("Select * from customers where email = ? ", [
      email,
    ]);
    return row[0];
  }
  static async updateProfile(props){
    const {userName , phone ,dob , gender , email , id}  = props;
    const [row] = await db.query("update customers set userName = ?  ,email = ? , phone = ? , dob = ? , gender = ? where id = ?" , 

      [userName , email ,  phone ,dob , gender   , id]
    )
    return row;
  }
  static async getProfile (id) {
    const [rows] = await db.query("select * from customers where id = ?"  ,[id]);
    return rows[0];
  }
  static async loginGmail (data) {
    const { google_id, email, userName } = data;
    const [exist] = await db.query("SELECT * FROM customers WHERE google_id = ?", [google_id]);
    if (exist.length > 0) {
      return exist[0];
    }
  
    const [rows] = await db.query("INSERT INTO customers (userName, google_id, email) VALUES (?, ?, ?)", [userName, google_id, email]);
    const [newUser] = await db.query("SELECT * FROM customers WHERE id = ?", [rows.insertId]);
    return newUser[0];
  }
}

module.exports = UserModel;
