const CS = require("../models/ChiSo");
const db = require("../config/db");

const THEMCSBYND = async (req, res) => {
  const ma = req.params.ma;
  const { chieu_cao, can_nang, huyet_ap, nhip_tim } = req.body;
  const checkusers =
    "select ma_nguoi_dung from nguoidung where ma_nguoi_dung = ?";
  const [check] = await db.query(checkusers, [ma]);
  if (check.length == 0) {
    return res
      .status(404)
      .json({ status: "error", message: "Khong Tim Thay Ma Nguoi Dung" });
  } else {
    try {
      if (!chieu_cao || !can_nang || !huyet_ap || !nhip_tim) {
        return res
          .status(400)
          .json({ status: "error", message: "Vui Long Nhap Du Thong Tin" });
      }
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
        .json({ status: "success", message: "Luu Thanh Cong", data: kq });
    } catch (error) {
      return res.status(500).json({ status: "error", message: "Loi Sever" });
    }
  }
};

const GETCHISOBYIDUSER = async (req, res) => {
  const ma = req.params.ma;
  try {
    if (!ma) {
      return res
        .status(400)
        .json({ status: "error", message: "Thiếu mã người dùng" });
    }
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
    return res.status(500).json({ status: "error", message: "Loi Sever" });
  }
};

const GETCHITIETCS = async (req, res) => {
  const ma = req.params.ma;
  try {
    if (!ma) {
      return res
        .status(400)
        .json({ status: "error", message: "Thiếu mã người dùng" });
    }

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

module.exports = { THEMCSBYND, GETCHISOBYIDUSER, GETCHITIETCS };
