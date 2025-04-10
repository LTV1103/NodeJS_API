const GC = require("../models/GhiChep");

// Lấy ghi chép theo mã người dùng
const GETGCBYIDUSER = async (req, res) => {
  const ma = req.params.ma;
  if (!ma) {
    return res.status(400).json({ status: "error", message: "Thiếu mã người dùng" });
  }

  try {
    const kq = await GC.gcbyuser(ma);
    if (!kq || kq.length === 0) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy mã người dùng" });
    }
    return res.status(200).json({ status: "success", message: "Thông tin ghi chép", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

// Thêm ghi chép giấc ngủ
const THEMGC = async (req, res) => {
  const { ma_nguoi_dung, thoi_gian_bat_dau, thoi_gian_ket_thuc } = req.body;

  if (!ma_nguoi_dung || !thoi_gian_bat_dau || !thoi_gian_ket_thuc) {
    return res.status(400).json({ status: "error", message: "Vui lòng nhập đầy đủ thông tin" });
  }

  const batDau = new Date(thoi_gian_bat_dau);
  const ketThuc = new Date(thoi_gian_ket_thuc);

  if (isNaN(batDau.getTime()) || isNaN(ketThuc.getTime())) {
    return res.status(400).json({ status: "error", message: "Thời gian không hợp lệ" });
  }

  if (ketThuc <= batDau) {
    return res.status(400).json({ status: "error", message: "Thời gian kết thúc phải sau thời gian bắt đầu" });
  }

  try {
    const tongGioNgu = (ketThuc - batDau) / (1000 * 60 * 60); // Đổi ms -> giờ

    let chat_luong_giac_ngu = "Trung bình";
    if (tongGioNgu < 6 || tongGioNgu > 9) {
      chat_luong_giac_ngu = "Kém";
    } else {
      chat_luong_giac_ngu = "Tốt";
    }

    const kq = await GC.themgc(ma_nguoi_dung, thoi_gian_bat_dau, thoi_gian_ket_thuc, chat_luong_giac_ngu);

    return res.status(200).json({
      status: "success",
      message: "Thêm thành công",
      chat_luong_giac_ngu,
      tong_gio_ngu: parseFloat(tongGioNgu.toFixed(2)),
      data: kq
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

// Kiểm tra tổng thời gian ngủ
const CHECKTIMESLEEP = async (req, res) => {
  const ma = req.params.ma;

  if (!ma) {
    return res.status(400).json({ status: "error", message: "Thiếu mã người dùng" });
  }

  try {
    const [result] = await GC.checktime(ma);
    const timeStr = result?.["timediff(thoi_gian_ket_thuc,thoi_gian_bat_dau)"];

    if (!timeStr) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy dữ liệu giấc ngủ" });
    }

    const [hours, minutes] = timeStr.split(":").map(Number);
    const tong_gio_ngu = parseFloat((hours + minutes / 60).toFixed(2));

    let message = "Giấc ngủ của bạn rất tốt";
    if (tong_gio_ngu < 6) message = "Bạn đã ngủ quá ít";
    else if (tong_gio_ngu > 9) message = "Bạn đã ngủ quá nhiều";

    return res.status(200).json({ status: "success", message, tong_gio_ngu });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

// Xoá ghi chép
const DELETE = async (req, res) => {
  const ma = req.params.ma;

  if (!ma) {
    return res.status(400).json({ status: "error", message: "Vui lòng nhập mã" });
  }

  try {
    const kq = await GC.delete(ma);
    if (!kq || kq.affectedRows === 0) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy bản ghi để xoá" });
    }
    return res.status(200).json({ status: "success", message: "Xoá thành công" });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

module.exports = {
  GETGCBYIDUSER,
  CHECKTIMESLEEP,
  DELETE,
  THEMGC
};
