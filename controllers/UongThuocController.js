const UongThuoc = require("../models/UongThuoc");

const GETUTBYUSER = async (req, res) => {
  const { maNguoiDung } = req.params;
  try {
    const kq = await UongThuoc.getUT(maNguoiDung);
    return res.status(200).json({
      status: "success",
      message: "Danh sách nhắc nhở",
      data: kq,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const ADDUT = async (req, res) => {
  const {
    maNguoiDung,
    tenThuoc,
    lieuLuong,
    thoiGianNhac,
    ngayBatDau,
    ngayKetThuc,
  } = req.body;
  if (
    !maNguoiDung ||
    !tenThuoc ||
    !thoiGianNhac ||
    !ngayBatDau ||
    !ngayKetThuc
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "Thiếu dữ liệu đầu vào" });
  }
  try {
    const kq = await UongThuoc.themUT(
      maNguoiDung,
      tenThuoc,
      lieuLuong,
      thoiGianNhac,
      ngayBatDau,
      ngayKetThuc
    );
    return res.status(201).json({
      status: "success",
      message: "Thêm nhắc nhở thành công",
      data: kq,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const UPDATEUT = async (req, res) => {
  const ma_nhac_nho = req.params.ma_nhac_nho;
  const {
    ma_nguoi_dung,
    ten_thuoc,
    lieu_luong,
    thoi_gian_nhac,
    ngay_bat_dau,
    ngay_ket_thuc,
  } = req.body;
  if (
    !ma_nguoi_dung ||
    !ten_thuoc ||
    !lieu_luong ||
    !thoi_gian_nhac ||
    !ngay_bat_dau ||
    !ngay_ket_thuc
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "Thiếu dữ liệu đầu vào" });
  }
  try {
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
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const DELETEUT = async (req, res) => {
  const { maNhacNho } = req.params;
  if (!maNhacNho) {
    return res
      .status(400)
      .json({ status: "error", message: "Thiếu mã nhắc nhở" });
  }
  try {
    const kq = await UongThuoc.xoaUT(maNhacNho);
    return res
      .status(200)
      .json({ status: "success", message: "Xóa thành công", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

module.exports = {
  GETUTBYUSER,
  ADDUT,
  UPDATEUT,
  DELETEUT,
};
