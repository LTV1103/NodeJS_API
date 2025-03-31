const db = require("../config/db");
class UongThuoc {
  // 🟢 Lấy tất cả nhắc nhở theo mã người dùng
  static async getRemindersByUser(maNguoiDung) {
    const sql = "SELECT * FROM nhacnho WHERE ma_nguoi_dung = ?";
    const [result] = await db.query(sql, [maNguoiDung]);
    return result;
  }

  // 🟢 Thêm nhắc nhở mới
  static async addReminder(
    maNguoiDung,
    tenThuoc,
    lieuLuong,
    thoiGianNhac,
    ngayBatDau,
    ngayKetThuc
  ) {
    const sql = `
      INSERT INTO nhacnho (ma_nguoi_dung, ten_thuoc, lieu_luong, thoi_gian_nhac, ngay_bat_dau, ngay_ket_thuc)
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

  // 🟢 Cập nhật nhắc nhở
  static async updateReminder(
    maNhacNho,
    tenThuoc,
    lieuLuong,
    thoiGianNhac,
    ngayBatDau,
    ngayKetThuc
  ) {
    const sql = `
      UPDATE nhacnho 
      SET ten_thuoc = ?, lieu_luong = ?, thoi_gian_nhac = ?, ngay_bat_dau = ?, ngay_ket_thuc = ?
      WHERE ma_nhac_nho = ?
    `;
    const [result] = await db.query(sql, [
      tenThuoc,
      lieuLuong,
      thoiGianNhac,
      ngayBatDau,
      ngayKetThuc,
      maNhacNho,
    ]);
    return result;
  }

  // 🟢 Xóa nhắc nhở
  static async deleteReminder(maNhacNho) {
    const sql = "DELETE FROM nhacnho WHERE ma_nhac_nho = ?";
    const [result] = await db.query(sql, [maNhacNho]);
    return result;
  }
}
module.exports = UongThuoc;
