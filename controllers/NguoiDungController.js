const ND = require("../models/NguoiDung");

const GETALL = async (req, res) => {
  try {
    const getallND = await ND.getall();
    return res
      .status(200)
      .json({
        status: "success",
        message: "Danh sách người dùng",
        data: getallND,
      });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const GETUSERBYID = async (req, res) => {
  const ma = req.params.ma;
  try {
    const kq = await ND.getuserbyid(ma);
    if (!kq) {
      return res
        .status(404)
        .json({ status: "error", message: "KHÔNG TÌM THẤY MÃ NGƯỜI DÙNG" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "THÔNG TIN NGƯỜI DÙNG", data: kq });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const DELETE = async (req, res) => {
  try {
    const ma = req.params.ma;
    if (!ma) {
      return res.status(400).json({ status: "error", message: "MÃ BỊ LỖI" });
    }
    const kq = await ND.deleteuser(ma);
    if (kq) {
      return res
        .status(200)
        .json({ status: "success", message: "ĐÃ XÓA NGƯỜI DÙNG THÀNH CÔNG" });
    } else {
      return res
        .status(404)
        .json({ status: "error", message: "KHÔNG TÌM THẤY NGƯỜI DÙNG" });
    }
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi Server", error: error.message });
  }
};

const UPDATE = async (req, res) => {
  try {
    const { ho_ten, gioi_tinh, ngay_sinh, so_dien_thoai } = req.body;
    const { ma } = req.params;
    if (!ma) {
      return res
        .status(400)
        .json({ status: "error", message: "Thiếu mã người dùng" });
    }
    if (!ho_ten || !gioi_tinh || !ngay_sinh || !so_dien_thoai) {
      return res
        .status(400)
        .json({ status: "error", message: "Vui lòng nhập đầy đủ thông tin" });
    }
    const kq = await ND.updateuser(
      ho_ten,
      gioi_tinh,
      ngay_sinh,
      so_dien_thoai,
      ma
    );
    if (kq) {
      return res
        .status(200)
        .json({ status: "success", message: "Cập nhật thành công" });
    } else {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi server", error: error.message });
  }
};

const REGEISTER = async (req, res) => {
  try {
    const { ho_ten, email, mat_khau, gioi_tinh, ngay_sinh, so_dien_thoai } =
      req.body;
    if (
      !ho_ten ||
      !email ||
      !mat_khau ||
      !gioi_tinh ||
      !ngay_sinh ||
      !so_dien_thoai
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN" });
    }
    const user = await ND.regeister(
      ho_ten,
      email,
      mat_khau,
      gioi_tinh,
      ngay_sinh,
      so_dien_thoai
    );
    return res
      .status(201)
      .json({ status: "success", message: "ĐĂNG KÝ THÀNH CÔNG", data: user });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Lỗi", error: error.message });
  }
};

const LOGIN = async (req, res) => {
  try {
    const { email, mat_khau } = req.body;

    if (!email || !mat_khau) {
      return res
        .status(400)
        .json({ status: "error", message: "Email và mật khẩu là bắt buộc" });
    }

    const user = await ND.login(email, mat_khau);

    return res.status(200).json({
      status: "success",
      message: "Đăng nhập thành công",
      data: user,
    });
  } catch (error) {
    console.error("Lỗi Server:", error);
    return res.status(401).json({
      status: "error",
      message: "Đăng nhập thất bại",
      error: error.message,
    });
  }
};

module.exports = { GETALL, REGEISTER, LOGIN, DELETE, UPDATE, GETUSERBYID };
