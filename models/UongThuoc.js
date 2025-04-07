const db = require("../config/db");
class UongThuoc {
  static async getUT(maNguoiDung) {
    const sql = "SELECT * FROM nhacnhouongthuoc WHERE ma_nguoi_dung = ?";
    const [result] = await db.query(sql, [maNguoiDung]);
    return result;
  }

  static async themUT(
    maNguoiDung,
    tenThuoc,
    lieuLuong,
    thoiGianNhac,
    ngayBatDau,
    ngayKetThuc
  ) {
    const sql = `
      INSERT INTO nhacnhouongthuoc (ma_nguoi_dung, ten_thuoc, lieu_luong, thoi_gian_nhac, ngay_bat_dau, ngay_ket_thuc)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      maNguoiDung,
      tenThuoc,
      lieuLuong,
      thoiGianNhac,
      ngayBatDau,
      ngayKetThuc,
    ]);
    return result;
  }

  static async suaUT(
    maNguoiDung,
    maNhacNho,
    tenThuoc,
    lieuLuong,
    thoiGianNhac, 
    ngayBatDau,
    ngayKetThuc
  ) {
    const sql = `
      UPDATE nhacnhouongthuoc
      SET ma_nguoi_dung = ?,ten_thuoc = ?, lieu_luong = ?, thoi_gian_nhac = ?, ngay_bat_dau = ?, ngay_ket_thuc = ?
      WHERE ma_nhac_nho = ?
    `;
    const [result] = await db.query(sql, [
      maNguoiDung,
      tenThuoc,
      lieuLuong,
      thoiGianNhac,
      ngayBatDau,
      ngayKetThuc,
      maNhacNho,
    ]);
    return result;
  }

  static async xoaUT(maNhacNho) {
    const sql = "DELETE FROM nhacnhouongthuoc WHERE ma_nhac_nho = ?";
    const [result] = await db.query(sql, [maNhacNho]);
    return result;
  }
}
module.exports = UongThuoc;
