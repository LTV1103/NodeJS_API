const GC = require("../models/GhiChep");

const GETGCBYIDUSER = async (req, res) => {
  const ma = req.params.ma;
  try {
    const kq = await GC.gcbyuser(ma);
    if (!kq) {
      return res
        .status(404)
        .json({ status: "error", message: "Khong Tim Thay Ma" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Thong Tin", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Loi Sever", error: error.message });
  }
};

const THEMGC = async (req, res) => {
  const { ma_nguoi_dung, thoi_gian_bat_dau, thoi_gian_ket_thuc } = req.body;
  if (!ma_nguoi_dung || !thoi_gian_bat_dau || !thoi_gian_ket_thuc) {
    return res
      .status(400)
      .json({ status: "error", message: "Vui lòng nhập đầy đủ thông tin" });
  }
  try {
    const kq = await GC.themgc(
      ma_nguoi_dung,
      thoi_gian_bat_dau,
      thoi_gian_ket_thuc
    );
    return res
      .status(200)
      .json({ status: "success", message: "Thêm thành công", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const CHECKTIMESLEEP = async (req, res) => {
  const ma = req.params.ma;

  try {
    const [result] = await GC.checktime(ma);
    if (!result || result.tong_gio_ngu === null) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy dữ liệu giấc ngủ" });
    }
    const tong_gio_ngu = result.tong_gio_ngu;
    if (tong_gio_ngu < 6) {
      return res
        .status(200)
        .json({
          status: "success",
          message: "Bạn đã ngủ quá ít",
          tong_gio_ngu,
        });
    } else if (tong_gio_ngu > 9) {
      return res
        .status(200)
        .json({
          status: "success",
          message: "Bạn đã ngủ quá nhiều",
          tong_gio_ngu,
        });
    }
    return res
      .status(200)
      .json({
        status: "success",
        message: "Giấc ngủ của bạn rất tốt",
        tong_gio_ngu,
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

  if (!ma) {
    return res
      .status(400)
      .json({ status: "error", message: "Vui lòng nhập mã" });
  }

  try {
    const kq = await GC.delete(ma);

    if (kq.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy bản ghi để xoá" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Xoá thành công" });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

module.exports = { GETGCBYIDUSER, CHECKTIMESLEEP, DELETE, THEMGC };
