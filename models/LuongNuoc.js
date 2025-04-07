const db = require("../config/db");

class LuongNuoc {
  // 1️⃣ Lấy tổng lượng nước đã uống trong ngày
  static getTotalWaterByUser = async (maNguoiDung, ngay) => {
    const sql = `
      SELECT SUM(luong_ml) AS tong_luong_nuoc 
      FROM luongnuocuong 
      WHERE ma_nguoi_dung = ? AND DATE(thoi_gian_ghi) = ?
    `;
    const [result] = await db.query(sql, [maNguoiDung, ngay]);
    return result[0]?.tong_luong_nuoc || 0; // Nếu không có dữ liệu, trả về 0
  };

  // 2️⃣ Thêm lượng nước uống mới
  static addWaterRecord = async (maNguoiDung, luongML, thoiGianGhi) => {
    const sql = `
      INSERT INTO luongnuocuong (ma_nguoi_dung, luong_ml, thoi_gian_ghi)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.query(sql, [maNguoiDung, luongML, thoiGianGhi]);
    return result;
  };

  // 3️⃣ Cập nhật lượng nước uống
  static updateWaterRecord = async (maLuongNuoc, luongML, thoiGianGhi) => {
    const sql = `
      UPDATE luongnuocuong 
      SET luong_ml = ?, thoi_gian_ghi = ? 
      WHERE ma_luong_nuoc = ?
    `;
    const [result] = await db.query(sql, [luongML, thoiGianGhi, maLuongNuoc]);
    return result;
  };

  // 4️⃣ Xóa bản ghi lượng nước uống
  static deleteWaterRecord = async (maLuongNuoc) => {
    const sql = "DELETE FROM luongnuocuong WHERE ma_luong_nuoc = ?";
    const [result] = await db.query(sql, [maLuongNuoc]);
    return result;
  };

}


module.exports = LuongNuoc;
