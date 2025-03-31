const GC = require("../models/GhiChep");
const GETGCBYIDUSER = async (req, res) => {
  const ma = req.params.ma;
  try {
    const kq = await GC.gcbyuser(ma);
    if (!kq) {
      return res.status(404).json({ message: "Khong Tim Thay Ma" });
    }
    return res.status(200).json({ message: "Thong Tin", kq });
  } catch (error) {
    return res.status(500).json({ messaga: "Loi Sever" });
  }
};
const CHECKTIMESLEEP = async (req, res) => {
  const ma = req.params.ma;

  try {
    const [result] = await GC.checktime(ma);
    if (!result || result.tong_gio_ngu === null) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy dữ liệu giấc ngủ" });
    }
    const tong_gio_ngu = result.tong_gio_ngu;
    if (tong_gio_ngu < 6) {
      return res
        .status(200)
        .json({ message: "Bạn đã ngủ quá ít", tong_gio_ngu });
    } else if (tong_gio_ngu > 9) {
      return res
        .status(200)
        .json({ message: "Bạn đã ngủ quá nhiều", tong_gio_ngu });
    }
    return res
      .status(200)
      .json({ message: "Giấc ngủ của bạn rất tốt", tong_gio_ngu });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ message: "Lỗi Server", error: error.message });
  }
};
const DELETE = async (req, res) => {
  const ma = req.params.ma;

  if (!ma) {
    return res.status(400).json({ message: "Vui lòng nhập mã" });
  }

  try {
    const kq = await GC.delete(ma);

    if (kq.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy bản ghi để xoá" });
    }

    return res.status(200).json({ message: "Xoá thành công" });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ message: "Lỗi Server", error: error.message });
  }
};

module.exports = { GETGCBYIDUSER, CHECKTIMESLEEP, DELETE };
