const GC = require("../models/GhiChep");

const GETGCBYIDUSER = async (req, res) => {
  const ma = req.params.ma;
  try {
    const kq = await GC.gcbyuser(ma);
    if (!kq) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy mã người dùng" });
    }
    return res.status(200).json({ status: "success", message: "Thông tin ghi chép", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const THEMGC = async (req, res) => {
  const { ma_nguoi_dung, thoi_gian_bat_dau, thoi_gian_ket_thuc } = req.body;

  if (!ma_nguoi_dung || !thoi_gian_bat_dau || !thoi_gian_ket_thuc) {
    return res.status(400).json({ status: "error", message: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    // Tính tổng giờ ngủ
    const batDau = new Date(thoi_gian_bat_dau);
    const ketThuc = new Date(thoi_gian_ket_thuc);
    const tongGioNgu = (ketThuc - batDau) / (1000 * 60 * 60); // tính giờ

    let chat_luong_giac_ngu = "Trung bình";
    if (tongGioNgu < 6) {
      chat_luong_giac_ngu = "Kém";
    } else if (tongGioNgu > 9) {
      chat_luong_giac_ngu = "Kém";
    } else {
      chat_luong_giac_ngu = "Tốt";
    }

    // Thêm bản ghi giấc ngủ
    const kq = await GC.themgc(ma_nguoi_dung, thoi_gian_bat_dau, thoi_gian_ket_thuc, chat_luong_giac_ngu);

    return res.status(200).json({
      status: "success",
      message: "Thêm thành công",
      chat_luong_giac_ngu,
      tong_gio_ngu: tongGioNgu,
      data: kq
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const CHECKTIMESLEEP = async (req, res) => {
  const ma = req.params.ma;

  try {
    const [result] = await GC.checktime(ma);
    if (!result || !result["timediff(thoi_gian_ket_thuc,thoi_gian_bat_dau)"]) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy dữ liệu giấc ngủ" });
    }

    const timeStr = result["timediff(thoi_gian_ket_thuc,thoi_gian_bat_dau)"];
    const [hours, minutes, seconds] = timeStr.split(":".map(Number));
    const tong_gio_ngu = parseFloat((parseInt(hours) + parseInt(minutes) / 60).toFixed(2));

    let message = "Giấc ngủ của bạn rất tốt";
    if (tong_gio_ngu < 6) message = "Bạn đã ngủ quá ít";
    else if (tong_gio_ngu > 9) message = "Bạn đã ngủ quá nhiều";

    return res.status(200).json({ status: "success", message, tong_gio_ngu });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const DELETE = async (req, res) => {
  const ma = req.params.ma;

  if (!ma) {
    return res.status(400).json({ status: "error", message: "Vui lòng nhập mã" });
  }

  try {
    const kq = await GC.delete(ma);
    if (kq.affectedRows === 0) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy bản ghi để xoá" });
    }
    return res.status(200).json({ status: "success", message: "Xoá thành công" });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

module.exports = { GETGCBYIDUSER, CHECKTIMESLEEP, DELETE, THEMGC };
