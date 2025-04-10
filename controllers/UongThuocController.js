const UongThuoc = require("../models/UongThuoc");
const db = require("../config/db");

// Lấy danh sách nhắc nhở thuốc theo người dùng
const GETUTBYUSER = async (req, res) => {
  const { maNguoiDung } = req.params;
  try {
    if (!maNguoiDung) {
      return res.status(400).json({ status: "error", message: "Thiếu mã người dùng" });
    }

    const [checkUser] = await db.query("SELECT * FROM nguoidung WHERE ma_nguoi_dung = ?", [maNguoiDung]);
    if (checkUser.length === 0) {
      return res.status(404).json({ status: "error", message: "Người dùng không tồn tại" });
    }

    const kq = await UongThuoc.getUT(maNguoiDung);
    return res.status(200).json({
      status: "success",
      message: "Danh sách nhắc nhở",
      data: kq,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

// Thêm nhắc nhở thuốc
const ADDUT = async (req, res) => {
  const {
    ma_nguoi_dung,
    ten_thuoc,
    lieu_luong,
    thoi_gian_nhac,
    ngay_bat_dau,
    ngay_ket_thuc,
  } = req.body;

  if (!ma_nguoi_dung || !ten_thuoc || !lieu_luong || !thoi_gian_nhac || !ngay_bat_dau || !ngay_ket_thuc) {
    return res.status(400).json({ status: "error", message: "Thiếu dữ liệu đầu vào" });
  }

  // Ràng buộc định dạng và logic
  if (new Date(ngay_bat_dau) > new Date(ngay_ket_thuc)) {
    return res.status(400).json({ status: "error", message: "Ngày bắt đầu phải nhỏ hơn ngày kết thúc" });
  }

  try {
    const [checkUser] = await db.query("SELECT * FROM nguoidung WHERE ma_nguoi_dung = ?", [ma_nguoi_dung]);
    if (checkUser.length === 0) {
      return res.status(404).json({ status: "error", message: "Người dùng không tồn tại" });
    }

    const kq = await UongThuoc.themUT(
      ma_nguoi_dung,
      ten_thuoc,
      lieu_luong,
      thoi_gian_nhac,
      ngay_bat_dau,
      ngay_ket_thuc
    );
    return res.status(201).json({
      status: "success",
      message: "Thêm nhắc nhở thành công",
      data: kq,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

// Cập nhật nhắc nhở thuốc
const UPDATEUT = async (req, res) => {
  const { ma_nhac_nho } = req.params;
  const {
    ma_nguoi_dung,
    ten_thuoc,
    lieu_luong,
    thoi_gian_nhac,
    ngay_bat_dau,
    ngay_ket_thuc,
  } = req.body;

  if (!ma_nguoi_dung || !ten_thuoc || !lieu_luong || !thoi_gian_nhac || !ngay_bat_dau || !ngay_ket_thuc) {
    return res.status(400).json({ status: "error", message: "Thiếu dữ liệu đầu vào" });
  }

  if (new Date(ngay_bat_dau) > new Date(ngay_ket_thuc)) {
    return res.status(400).json({ status: "error", message: "Ngày bắt đầu phải nhỏ hơn ngày kết thúc" });
  }

  try {
    const [checkReminder] = await db.query("SELECT * FROM nhacnho_uongthuoc WHERE ma_nhac_nho = ?", [ma_nhac_nho]);
    if (checkReminder.length === 0) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy nhắc nhở" });
    }

    const [checkUser] = await db.query("SELECT * FROM nguoidung WHERE ma_nguoi_dung = ?", [ma_nguoi_dung]);
    if (checkUser.length === 0) {
      return res.status(404).json({ status: "error", message: "Người dùng không tồn tại" });
    }

    const kq = await UongThuoc.suaUT(
      ma_nguoi_dung,
      ten_thuoc,
      lieu_luong,
      thoi_gian_nhac,
      ngay_bat_dau,
      ngay_ket_thuc,
      ma_nhac_nho
    );

    return res.status(200).json({
      status: "success",
      message: "Cập nhật thành công",
      data: kq,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

// Xóa nhắc nhở thuốc
const DELETEUT = async (req, res) => {
  const { maNhacNho } = req.params;

  if (!maNhacNho) {
    return res.status(400).json({ status: "error", message: "Thiếu mã nhắc nhở" });
  }

  try {
    const [checkReminder] = await db.query("SELECT * FROM nhacnho_uongthuoc WHERE ma_nhac_nho = ?", [maNhacNho]);
    if (checkReminder.length === 0) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy nhắc nhở" });
    }

    const kq = await UongThuoc.xoaUT(maNhacNho);
    return res.status(200).json({
      status: "success",
      message: "Xóa thành công",
      data: kq,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

module.exports = {
  GETUTBYUSER,
  ADDUT,
  UPDATEUT,
  DELETEUT,
};
