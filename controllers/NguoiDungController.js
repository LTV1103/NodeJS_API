const ND = require("../models/NguoiDung");

const GETALL = async (req, res) => {
  const getallND = await ND.getall();
  res.json(getallND);
};
const GETUSERBYID = async (req, res) => {
  const ma = req.params.ma;
  const kq = await ND.getuserbyid(ma);
  if (!kq) {
    return res.status(404).json({ message: "KHONG TIM THAY MA NGUOI DUNG " });
  }
  return res.status(200).json({ message: "THONG TIN NGUOI DUNG", kq });
};
const DELETE = async (req, res) => {
  try {
    const ma = req.params.ma;
    if (!ma) {
      return res.status(400).json({ message: "MA BI LOI" });
    }
    const kq = await ND.deleteuser(ma);
    if (kq) {
      return res.status(200).json({ message: "DA XOA NGUOI DUNG THANH CONG" });
    } else {
      return res.status(404).json({ message: "KHONG TIM THAY NGUOI DUNG" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Loi Sever" });
  }
};
const UPDATE = async (req, res) => {
  try {
    const { ho_ten, gioi_tinh, ngay_sinh, so_dien_thoai } = req.body;
    const { ma } = req.params;
    if (!ma) {
      return res.status(400).json({ message: "Thiếu mã người dùng" });
    }
    if (!ho_ten || !gioi_tinh || !ngay_sinh || !so_dien_thoai) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }
    const kq = await ND.updateuser(
      ho_ten,
      gioi_tinh,
      ngay_sinh,
      so_dien_thoai,
      ma
    );
    if (kq) {
      return res.status(200).json({ message: "Cập nhật thành công" });
    } else {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};

const REGEISTER = async (req, res) => {
  try {
    const { ho_ten, email, mat_khau, gioi_tinh } = req.body;
    if (!ho_ten || !email || !mat_khau || !gioi_tinh) {
      return res
        .status(400)
        .json({ message: "VUI LONG NHAP DAY DU THONG TIN" });
    }
    const user = await ND.regeister(ho_ten, email, mat_khau, gioi_tinh);
    res.status(201).json({ message: "DANG KY THANH CONG", user });
  } catch (error) {
    res.status(500).json({ message: "LOI", error: error.message });
  }
};

const LOGIN = async (req, res) => {
  try {
    const { email, mat_khau } = req.body;
    if (!email || !mat_khau) {
      return res.status(400).json({ message: "SAI TAI KHOAN HOAC MAT KHAU" });
    }
    const user = await ND.login(email, mat_khau);
    res.status(201).json({ message: "DANG NHAP THANH CONG", user });
  } catch (error) {
    res.status(500).json({ message: "LOI", error: error.message });
  }
};
module.exports = { GETALL, REGEISTER, LOGIN, DELETE, UPDATE, GETUSERBYID };
