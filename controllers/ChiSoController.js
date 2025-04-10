const CS = require("../models/ChiSo");
const db = require("../config/db");

const THEMCSBYND = async (req, res) => {
  const ma = req.params.ma;
  const { chieu_cao, can_nang, huyet_ap, nhip_tim } = req.body;

  // Ràng buộc toàn vẹn
  if (!Number.isInteger(Number(ma)) || Number(ma) <= 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Mã người dùng không hợp lệ" });
  }

  if (!chieu_cao || !can_nang || !huyet_ap || !nhip_tim) {
    return res
      .status(400)
      .json({ status: "error", message: "Vui lòng nhập đủ thông tin" });
  }

  if (chieu_cao <= 0 || can_nang <= 0 || nhip_tim <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Chiều cao, cân nặng, nhịp tim phải lớn hơn 0",
    });
  }

  if (!/^\d{2,3}\/\d{2,3}$/.test(huyet_ap)) {
    return res.status(400).json({
      status: "error",
      message: "Huyết áp phải đúng định dạng (VD: 120/80)",
    });
  }

  const checkusers =
    "select ma_nguoi_dung from nguoidung where ma_nguoi_dung = ?";
  const [check] = await db.query(checkusers, [ma]);
  if (check.length == 0) {
    return res
      .status(404)
      .json({ status: "error", message: "Không tìm thấy mã người dùng" });
  }

  try {
    const bmi = can_nang / ((chieu_cao / 100) * (chieu_cao / 100));
    const kq = await CS.savechisobynguoidung(
      ma,
      chieu_cao,
      can_nang,
      huyet_ap,
      nhip_tim,
      bmi
    );
    return res
      .status(201)
      .json({ status: "success", message: "Lưu thành công", data: kq });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Lỗi Server" });
  }
};

const GETCHISOBYIDUSER = async (req, res) => {
  const ma = req.params.ma;

  if (!ma || !Number.isInteger(Number(ma)) || Number(ma) <= 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Mã người dùng không hợp lệ" });
  }

  try {
    const kq = await CS.getchiso(ma);
    if (!kq || kq.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy chỉ số sức khỏe" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Thông tin chỉ số", data: kq });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Lỗi Server" });
  }
};

const GETCHITIETCS = async (req, res) => {
  const ma = req.params.ma;

  if (!ma || !Number.isInteger(Number(ma)) || Number(ma) <= 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Mã người dùng không hợp lệ" });
  }

  try {
    const kq = await CS.getchitiet(ma);
    if (!kq || kq.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy dữ liệu sức khỏe" });
    }

    const { BMI } = kq[0];
    let trang_thai_bmi = "";

    if (BMI < 18) {
      trang_thai_bmi = "Gầy";
    } else if (BMI >= 18 && BMI < 25) {
      trang_thai_bmi = "Bình thường";
    } else if (BMI >= 25 && BMI < 30) {
      trang_thai_bmi = "Thừa cân";
    } else {
      trang_thai_bmi = "Béo phì";
    }

    return res.status(200).json({
      status: "success",
      message: "Chi tiết chỉ số sức khỏe",
      data: {
        ...kq[0],
        trang_thai_bmi,
      },
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server" });
  }
};

const UPDATEBYUSER = async (req, res) => {
  const ma = req.params.ma;
  const { chieu_cao, can_nang, huyet_ap, nhip_tim } = req.body;

  if (!ma || !Number.isInteger(Number(ma)) || Number(ma) <= 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Mã người dùng không hợp lệ" });
  }

  if (!chieu_cao || !can_nang || !huyet_ap || !nhip_tim) {
    return res
      .status(400)
      .json({ status: "error", message: "Vui lòng nhập đủ thông tin" });
  }

  if (chieu_cao <= 0 || can_nang <= 0 || nhip_tim <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Chiều cao, cân nặng, nhịp tim phải lớn hơn 0",
    });
  }

  if (!/^\d{2,3}\/\d{2,3}$/.test(huyet_ap)) {
    return res.status(400).json({
      status: "error",
      message: "Huyết áp phải đúng định dạng (VD: 120/80)",
    });
  }

  try {
    const bmi = can_nang / ((chieu_cao / 100) * (chieu_cao / 100));
    const kq = await CS.updatechisobyid(
      chieu_cao,
      can_nang,
      huyet_ap,
      nhip_tim,
      bmi,
      ma
    );
    return res.status(200).json({
      status: "success",
      message: "Cập nhật thành công",
      data: kq,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server" });
  }
};

const DELETE = async (req, res) => {
  const ma = req.params.ma;

  if (!ma || !Number.isInteger(Number(ma)) || Number(ma) <= 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Mã người dùng không hợp lệ" });
  }

  try {
    const kq = await CS.deletechisobyid(ma);
    if (kq.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy chỉ số sức khỏe" });
    }
    return res.status(200).json({
      status: "success",
      message: "Xóa chỉ số sức khỏe thành công",
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server" });
  }
};

const GETCANNANG = async (req, res) => {
  const ma = req.params.ma;

  if (!ma || !Number.isInteger(Number(ma)) || Number(ma) <= 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Mã người dùng không hợp lệ" });
  }

  try {
    const kq = await CS.getcannang(ma);
    if (kq.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy chỉ số sức khỏe" });
    }
    return res.status(200).json({
      status: "success",
      message: "Thông tin chỉ số",
      data: kq,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(500).json({ status: "error", message: "Lỗi Server" });
  }
};

module.exports = {
  THEMCSBYND,
  GETCHISOBYIDUSER,
  GETCHITIETCS,
  UPDATEBYUSER,
  DELETE,
  GETCANNANG,
};
