const NK = require("../models/NhatKy");
const db = require("../config/db");
const HOATDONG = async (req, res) => {
  const ma = req.params.ma;
  try {
    const kq = await NK.hoatdong(ma);
    return res.status(200).json({ message: "Thong Tin Hoat Dong", kq });
  } catch (error) {
    return res.status(500).json({ message: "Loi Server" });
  }
};
const THEMHOATDONG = async (req, res) => {
  const ma = req.params.ma;
  const sql = "select can_nang_kg from chisosuckhoe where ma_nguoi_dung = ?";
  const [canNangResult] = await db.query(sql, ma);
  const canNang = canNangResult[0].can_nang_kg;
  const { loai_hoat_dong, ngay_hoat_dong, thoi_gian_phut } = req.body;
  if (!loai_hoat_dong || !ngay_hoat_dong || !thoi_gian_phut) {
    return res.status(400).json({ message: "Thieu du lieu dau vao" });
  }
  try {
    const check = "select ma_nguoi_dung from nguoidung where ma_nguoi_dung = ?";
    const [checkuser] = await db.query(check, ma);
    if (checkuser.length == 0) {
      return res.status(404).json({ message: "Khong Tim Thay Nguoi Dung" });
    }
    const MET_VALUES = {
      "Chạy bộ": 9.8,
      "Đạp xe": 7.5,
      Gym: 6.0,
      "Nhảy Dây": 12.0,
      Bơi: 8.0,
    };
    if (!MET_VALUES[loai_hoat_dong]) {
      return res.status(400).json({ message: "Loại hoạt động không hợp lệ" });
    }
    const MET = MET_VALUES[loai_hoat_dong];
    const calo_tieu_hao = (MET * canNang * thoi_gian_phut) / 60;
    const kq = await NK.themhoatdong(
      ma,
      loai_hoat_dong,
      thoi_gian_phut,
      calo_tieu_hao,
      ngay_hoat_dong
    );
    return res.status(201).json({ message: "Them Thanh Cong", kq });
  } catch (error) {
    return res.status(500).json({ message: "Loi Server" });
  }
};
const DELETE = async (req, res) => {
  const ma = req.params.ma;

  try {
    if (!ma) {
      return res.status(400).json({ message: "Vui lòng nhập mã" });
    }
    const kq = await NK.delete(ma);

    if (kq.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy mã" });
    }
    return res.status(204).json({ message: "Xoa Thanh Cong" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi Server", error: error.message });
  }
};

const DETAIL = async (req, res) => {
  const ma = req.params.ma;
  try {
    const kq = await NK.chitiet(ma);
    if (kq.length == 0) {
      return res.json(404).json({ message: "khong tim thay" });
    }
    return res.status(200).json({ message: "Thong Tin Chi Tiet", kq });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi Server", error: error.message });
  }
};
module.exports = { HOATDONG, THEMHOATDONG, DELETE, DETAIL };
