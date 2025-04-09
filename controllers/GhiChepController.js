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
    // Thêm bản ghi giấc ngủ
    const kq = await GC.themgc(ma_nguoi_dung, thoi_gian_bat_dau, thoi_gian_ket_thuc);

    // Lấy mã ghi chép vừa thêm
    const ma_ghi_chep = kq.insertId;

    // Kiểm tra thời lượng giấc ngủ từ bản ghi mới
    const [result] = await GC.checktime(ma_ghi_chep);
    const tong_gio_ngu = result?.tong_gio_ngu || 0;

    let danh_gia = "Kém";
    if (tong_gio_ngu < 6) {
      danh_gia = "Kém";
    } else if (tong_gio_ngu > 9) {
      danh_gia = "Trung bình";
    } else {
      danh_gia = "Tốt";
    }

    return res.status(200).json({
      status: "success",
      message: "Thêm thành công",
      tong_gio_ngu,
      chat_luong: danh_gia,
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
    if (!result || result.tong_gio_ngu === null) {
      return res.status(404).json({ status: "error", message: "Không tìm thấy dữ liệu giấc ngủ" });
    }
    const tong_gio_ngu = result.tong_gio_ngu;
    let message = "Tốt";
    if (tong_gio_ngu < 6) message = "Kém";
    else if (tong_gio_ngu > 9) message = "Trung bình";

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
