const NK = require("../models/NhatKy");
const db = require("../config/db");
const CS = require("../models/ChiSo");

// Lấy danh sách hoạt động theo người dùng
const HOATDONG = async (req, res) => {
  const { ma } = req.params;
  try {
    if (!ma) {
      return res.status(400).json({ status: "error", message: "Thiếu mã người dùng" });
    }

    const kq = await NK.hoatdong(ma);
    return res.status(200).json({ status: "success", message: "Thông tin hoạt động", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

// Thêm hoạt động
const THEMHOATDONG = async (req, res) => {
  const { ma } = req.params;
  const { loai_hoat_dong, ngay_hoat_dong, thoi_gian_phut } = req.body;

  if (!loai_hoat_dong || !ngay_hoat_dong || !thoi_gian_phut || !ma) {
    return res.status(400).json({ status: "error", message: "Thiếu dữ liệu đầu vào" });
  }

  if (isNaN(thoi_gian_phut) || thoi_gian_phut <= 0) {
    return res.status(400).json({ status: "error", message: "Thời gian hoạt động không hợp lệ" });
  }

  try {
    const [userCheck] = await db.query("SELECT * FROM nguoidung WHERE ma_nguoi_dung = ?", [ma]);
    if (userCheck.length === 0) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy người dùng" });
    }

    const [cs] = await db.query("SELECT can_nang_kg FROM chisosuckhoe WHERE ma_nguoi_dung = ? ORDER BY ngay DESC LIMIT 1", [ma]);
    if (!cs || !cs[0] || cs[0].can_nang_kg <= 0) {
      return res.status(400).json({ status: "error", message: "Không tìm thấy chỉ số cân nặng hợp lệ" });
    }

    const MET_VALUES = {
      "Chạy bộ": 9.8,
      "Đạp xe": 7.5,
      Gym: 6.0,
      "Nhảy Dây": 12.0,
      Bơi: 8.0,
    };

    const MET = MET_VALUES[loai_hoat_dong];
    if (!MET) {
      return res.status(400).json({ status: "error", message: "Loại hoạt động không hợp lệ" });
    }

    const calo_tieu_hao = (MET * cs[0].can_nang_kg * thoi_gian_phut) / 60;

    const kq = await NK.themhoatdong(ma, loai_hoat_dong, thoi_gian_phut, calo_tieu_hao, ngay_hoat_dong);
    return res.status(201).json({ status: "success", message: "Thêm hoạt động thành công", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

// Cập nhật hoạt động
const UPDATE = async (req, res) => {
  const { ma } = req.params;
  const { loai_hoat_dong, ngay_hoat_dong, thoi_gian_phut, ma_nguoi_dung } = req.body;

  if (!ma || !loai_hoat_dong || !ngay_hoat_dong || !thoi_gian_phut || !ma_nguoi_dung) {
    return res.status(400).json({ status: "error", message: "Thiếu dữ liệu đầu vào" });
  }

  if (isNaN(thoi_gian_phut) || thoi_gian_phut <= 0) {
    return res.status(400).json({ status: "error", message: "Thời gian không hợp lệ" });
  }

  try {
    const [checkExist] = await NK.chitiet(ma);
    if (checkExist.length === 0) {
      return res.status(404).json({ status: "error", message: "Hoạt động không tồn tại" });
    }

    const [canNangResult] = await CS.getcannang(ma_nguoi_dung);
    const canNang = parseFloat(canNangResult?.can_nang_kg || 0);

    if (isNaN(canNang) || canNang <= 0) {
      return res.status(400).json({ status: "error", message: "Không có cân nặng hợp lệ" });
    }

    const MET_VALUES = {
      "Chạy bộ": 9.8,
      "Đạp xe": 7.5,
      Gym: 6.0,
      "Nhảy Dây": 12.0,
      Bơi: 8.0,
    };

    const MET = MET_VALUES[loai_hoat_dong];
    if (!MET) {
      return res.status(400).json({ status: "error", message: "Loại hoạt động không hợp lệ" });
    }

    const calo_tieu_hao = (MET * canNang * thoi_gian_phut) / 60;

    const kq = await NK.capnhathoatdong(loai_hoat_dong, ngay_hoat_dong, thoi_gian_phut, calo_tieu_hao, ma);
    return res.status(200).json({ status: "success", message: "Cập nhật thành công", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

// Xoá hoạt động
const DELETE = async (req, res) => {
  const { ma } = req.params;

  try {
    if (!ma) {
      return res.status(400).json({ status: "error", message: "Thiếu mã hoạt động" });
    }

    const [check] = await NK.chitiet(ma);
    if (check.length === 0) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy hoạt động" });
    }

    const result = await NK.xoahoatdong(ma);
    return res.status(200).json({ status: "success", message: "Xóa thành công", data: result });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

// Chi tiết hoạt động
const DETAIL = async (req, res) => {
  const { ma } = req.params;

  try {
    const kq = await NK.chitiet(ma);
    if (!kq || kq.length === 0) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy hoạt động" });
    }
    return res.status(200).json({ status: "success", message: "Thông tin chi tiết", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

module.exports = { HOATDONG, THEMHOATDONG, UPDATE, DELETE, DETAIL };
