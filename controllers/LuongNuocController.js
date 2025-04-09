const LN = require("../models/LuongNuoc");
const GETTOTAL = async (req, res) => {
  const { ma, ngay } = req.params;
  try {
    const totalWater = await LN.getTotalWaterByUser(ma, ngay);
    return res.status(200).json({
      status: "success",
      message: "Tổng lượng nước đã uống",
      totalWater,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const ADD = async (req, res) => {
  const { ma_nguoi_dung, luong_ml, thoi_gian_ghi } = req.body;
  if (!ma_nguoi_dung || !luong_ml || !thoi_gian_ghi) {
    return res
      .status(400)
      .json({ status: "error", message: "Thiếu dữ liệu đầu vào" });
  }
  try {
    const result = await LN.addWaterRecord(ma_nguoi_dung, luong_ml, thoi_gian_ghi);
    return res.status(201).json({
      status: "success",
      message: "Thêm lượng nước thành công",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const UPDATE = async (req, res) => {
  const { maLuongNuoc, luongML, thoiGianGhi } = req.body;
  if (!maLuongNuoc || !luongML || !thoiGianGhi) {
    return res
      .status(400)
      .json({ status: "error", message: "Thiếu dữ liệu đầu vào" });
  }
  try {
    const result = await LN.updateWaterRecord(
      maLuongNuoc,
      luongML,
      thoiGianGhi
    );
    return res.status(200).json({
      status: "success",
      message: "Cập nhật thành công",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const DELETE = async (req, res) => {
  const { maLuongNuoc } = req.params;
  if (!maLuongNuoc) {
    return res
      .status(400)
      .json({ status: "error", message: "Thiếu mã lượng nước" });
  }
  try {
    const result = await LN.deleteWaterRecord(maLuongNuoc);
    return res
      .status(200)
      .json({ status: "success", message: "Xóa thành công", data: result });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};
const GETALL = async (req, res) => {
  const { ma } = req.params.ma;
  try {
    const result = await LN.getall(ma);
    return res.status(200).json({
      status: "success",
      message: "Danh sách lượng nước",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};
module.exports = {
  GETALL,
  GETTOTAL,
  ADD,
  UPDATE,
  DELETE,
};
