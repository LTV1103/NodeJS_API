const NK = require("../models/NhatKy");
const db = require("../config/db");
const CS = require("../models/ChiSo");

const HOATDONG = async (req, res) => {
  const ma = req.params.ma;
  try {
    const kq = await NK.hoatdong(ma);
    return res
      .status(200)
      .json({ status: "success", message: "Thông tin hoạt động", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const THEMHOATDONG = async (req, res) => {
  const ma = req.params.ma;
  const sql = "select can_nang_kg from chisosuckhoe where ma_nguoi_dung = ?";
  const [canNangResult] = await db.query(sql, ma);
  const canNang = canNangResult[0].can_nang_kg;
  const { loai_hoat_dong, ngay_hoat_dong, thoi_gian_phut } = req.body;

  if (!loai_hoat_dong || !ngay_hoat_dong || !thoi_gian_phut) {
    return res
      .status(400)
      .json({ status: "error", message: "Thiếu dữ liệu đầu vào" });
  }

  try {
    const check = "select ma_nguoi_dung from nguoidung where ma_nguoi_dung = ?";
    const [checkuser] = await db.query(check, ma);
    if (checkuser.length == 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy người dùng" });
    }

    const MET_VALUES = {
      "Chạy bộ": 9.8,
      "Đạp xe": 7.5,
      Gym: 6.0,
      "Nhảy Dây": 12.0,
      Bơi: 8.0,
    };

    if (!MET_VALUES[loai_hoat_dong]) {
      return res
        .status(400)
        .json({ status: "error", message: "Loại hoạt động không hợp lệ" });
    }

    const MET = MET_VALUES[loai_hoat_dong];
    const calo_tieu_hao = (MET * canNang * thoi_gian_phut) / 60;
    const kq = await NK.themhoatdong(
      ma,
      loai_hoat_dong,
      thoi_gian_phut,
      calo_tieu_hao,
      ngay_hoat_dong
    );

    return res
      .status(201)
      .json({ status: "success", message: "Thêm thành công", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const UPDATE = async (req, res) => {
  const ma = req.params.ma;
  const { loai_hoat_dong, ngay_hoat_dong, thoi_gian_phut, ma_nguoi_dung } =
    req.body;

  if (!loai_hoat_dong || !thoi_gian_phut || !ma_nguoi_dung) {
    return res
      .status(400)
      .json({ status: "error", message: "Thiếu dữ liệu đầu vào" });
  }

  try {
    const [canNangResult] = await CS.getcannang(ma_nguoi_dung);

    if (!canNangResult || !canNangResult.can_nang_kg) {
      return res.status(404).json({
        status: "error",
        message: "Không tìm thấy chỉ số cân nặng hợp lệ",
      });
    }

    const canNang = parseFloat(canNangResult.can_nang_kg);

    if (isNaN(canNang) || canNang <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Giá trị cân nặng không hợp lệ",
      });
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
      return res
        .status(400)
        .json({ status: "error", message: "Loại hoạt động không hợp lệ" });
    }

    const thoiGian = parseInt(thoi_gian_phut);
    if (isNaN(thoiGian) || thoiGian <= 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Thời gian không hợp lệ" });
    }

    const calo_tieu_hao = (MET * canNang * thoiGian) / 60;

    const kq = await NK.capnhathoatdong(
      loai_hoat_dong,
      ngay_hoat_dong,
      thoiGian,
      calo_tieu_hao,
      ma
    );

    return res.status(200).json({
      status: "success",
      message: "Cập nhật thành công",
      data: kq,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const DELETE = async (req, res) => {
  const ma = req.params.ma;

  try {
    if (!ma) {
      return res
        .status(400)
        .json({ status: "error", message: "Vui lòng nhập mã" });
    }
    const kq = await NK.xoahoatdong(ma);

    if (kq.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy mã" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Xóa thành công" });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const DETAIL = async (req, res) => {
  const ma = req.params.ma;
  try {
    const kq = await NK.chitiet(ma);
    if (kq.length == 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy thông tin" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Thông tin chi tiết", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

module.exports = { HOATDONG, THEMHOATDONG, DELETE, DETAIL, UPDATE };
