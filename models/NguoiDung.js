const db = require("../config/db");
const bcrypt = require("bcryptjs");

class NguoiDung {
  static getall = async () => {
    const sql = "SELECT * FROM nguoidung";
    const [result] = await db.query(sql);
    return result;
  };

  static getuserbyid = async (id) => {
    const sql = "SELECT * FROM nguoidung WHERE ma_nguoi_dung = ? ";
    const [result] = await db.query(sql, id);
    return result;
  };

  static deleteuser = async (id_nguoidung) => {
    const sql = "DELETE FROM nguoidung WHERE ma_nguoi_dung = ?";
    const [result] = await db.query(sql, id_nguoidung);
    return result;
  };

  static updateuser = async (
    ho_ten,
    gioi_tinh,
    ngay_sinh,
    so_dien_thoai,
    ma
  ) => {
    const sql =
      "UPDATE nguoidung SET ho_ten = ? , gioi_tinh = ? , so_dien_thoai = ?  , ngay_sinh = ? WHERE ma_nguoi_dung = ? ";
    const [result] = await db.query(sql, [
      ho_ten,
      gioi_tinh,
      so_dien_thoai,
      ngay_sinh,
      ma,
    ]);
    return result;
  };

  static regeister = async (
    ho_ten,
    email,
    mat_khau,
    gioi_tinh,
    ngay_sinh,
    so_dien_thoai
  ) => {
    const pass = await bcrypt.hash(mat_khau, 10);
    const sql =
      "INSERT INTO nguoidung (ho_ten,email,mat_khau,gioi_tinh,ngay_sinh,so_dien_thoai) VALUES (?,?,?,?,?,?)";
    const [result] = await db.query(sql, [
      ho_ten,
      email,
      pass,
      gioi_tinh,
      ngay_sinh,
      so_dien_thoai,
    ]);
    return {
      id: result.insertId,
      ho_ten,
      email,
      gioi_tinh,
      ngay_sinh,
      so_dien_thoai,
    };
  };

  static login = async (email, mat_khau) => {
    const sql = "SELECT * FROM nguoidung WHERE email = ?";
    const [result] = await db.query(sql, [email]);
    if (result.length == 0) {
      throw new Error("EMAIL KHONG TON TAI");
    }
    const user = result[0];
    const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isMatch) {
      throw new Error("TAI KHOAN HOAC MAT KHAU KHONG DUNG");
    }

    return { id: user.id, hoTen: user.hoTen, email: user.email };
  };
}
module.exports = NguoiDung;
