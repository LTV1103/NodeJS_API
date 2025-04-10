const LN = require("../models/LuongNuoc");

// Lấy tổng lượng nước trong ngày theo mã người dùng
const GETTOTAL = async (req, res) => {
  const { ma_nguoi_dung, ngay } = req.params;

  if (!ma_nguoi_dung || !ngay) {
    return res.status(400).json({
      status: "error",
      message: "Thiếu mã người dùng hoặc ngày",
    });
  }

  try {
    const totalWater = await LN.getTotalWaterByUser(ma_nguoi_dung, ngay);
    return res.status(200).json({
      status: "success",
      message: "Tổng lượng nước đã uống",
      totalWater,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({
      status: "error",
      message: "Lỗi Server",
      error: error.message,
    });
  }
};

// Thêm lượng nước
const ADD = async (req, res) => {
  const { ma_nguoi_dung, luong_ml, thoi_gian_ghi } = req.body;

  if (!ma_nguoi_dung || !luong_ml || !thoi_gian_ghi) {
    return res.status(400).json({
      status: "error",
      message: "Thiếu dữ liệu đầu vào",
    });
  }

  if (isNaN(luong_ml) || Number(luong_ml) <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Lượng nước phải là số lớn hơn 0",
    });
  }

  const time = new Date(thoi_gian_ghi);
  if (isNaN(time.getTime())) {
    return res.status(400).json({
      status: "error",
      message: "Thời gian ghi không hợp lệ",
    });
  }

  try {
    const result = await LN.addWaterRecord(
      ma_nguoi_dung,
      luong_ml,
      thoi_gian_ghi
    );
    return res.status(201).json({
      status: "success",
      message: "Thêm lượng nước thành công",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({
      status: "error",
      message: "Lỗi Server",
      error: error.message,
    });
  }
};

// Cập nhật lượng nước
const UPDATE = async (req, res) => {
  const { ma_luong_nuoc, luong_ml, thoi_gian_ghi } = req.body;

  if (!ma_luong_nuoc || !luong_ml || !thoi_gian_ghi) {
    return res.status(400).json({
      status: "error",
      message: "Thiếu dữ liệu đầu vào",
    });
  }

  if (isNaN(luong_ml) || Number(luong_ml) <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Lượng nước phải là số lớn hơn 0",
    });
  }

  const time = new Date(thoi_gian_ghi);
  if (isNaN(time.getTime())) {
    return res.status(400).json({
      status: "error",
      message: "Thời gian ghi không hợp lệ",
    });
  }

  try {
    const result = await LN.updateWaterRecord(
      ma_luong_nuoc,
      luong_ml,
      thoi_gian_ghi
    );
    return res.status(200).json({
      status: "success",
      message: "Cập nhật thành công",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({
      status: "error",
      message: "Lỗi Server",
      error: error.message,
    });
  }
};

// Xoá lượng nước
const DELETE = async (req, res) => {
  const ma = req.params.ma;

  if (!ma) {
    return res.status(400).json({
      status: "error",
      message: "Thiếu mã lượng nước",
    });
  }

  try {
    const result = await LN.deleteWaterRecord(ma);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Không tìm thấy bản ghi để xoá",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Xóa thành công",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({
      status: "error",
      message: "Lỗi Server",
      error: error.message,
    });
  }
};

// Lấy tất cả lượng nước theo người dùng
const GETALL = async (req, res) => {
  const ma = req.params.ma;

  if (!ma) {
    return res.status(400).json({
      status: "error",
      message: "Thiếu mã người dùng",
    });
  }

  try {
    const result = await LN.getall(ma);
    return res.status(200).json({
      status: "success",
      message: "Danh sách lượng nước",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({
      status: "error",
      message: "Lỗi Server",
      error: error.message,
    });
  }
};

module.exports = {
  GETALL,
  GETTOTAL,
  ADD,
  UPDATE,
  DELETE,
};
