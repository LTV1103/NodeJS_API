const UongThuoc = require("../models/UongThuoc");

// 📌 1️⃣ Lấy danh sách nhắc nhở theo người dùng
const getRemindersByUser = async (req, res) => {
  const { maNguoiDung } = req.params;
  try {
    const reminders = await UongThuoc.getRemindersByUser(maNguoiDung);
    return res.status(200).json({ message: "Danh sách nhắc nhở", reminders });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi Server", error: error.message });
  }
};

// 📌 2️⃣ Thêm nhắc nhở mới
const addReminder = async (req, res) => {
  const {
    maNguoiDung,
    tenThuoc,
    lieuLuong,
    thoiGianNhac,
    ngayBatDau,
    ngayKetThuc,
  } = req.body;
  if (!maNguoiDung || !tenThuoc || !thoiGianNhac || !ngayBatDau) {
    return res.status(400).json({ message: "Thiếu dữ liệu đầu vào" });
  }
  try {
    const result = await UongThuoc.addReminder(
      maNguoiDung,
      tenThuoc,
      lieuLuong,
      thoiGianNhac,
      ngayBatDau,
      ngayKetThuc
    );
    return res
      .status(201)
      .json({ message: "Thêm nhắc nhở thành công", result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi Server", error: error.message });
  }
};

// 📌 3️⃣ Cập nhật nhắc nhở
const updateReminder = async (req, res) => {
  const {
    maNhacNho,
    tenThuoc,
    lieuLuong,
    thoiGianNhac,
    ngayBatDau,
    ngayKetThuc,
  } = req.body;
  if (!maNhacNho || !tenThuoc || !thoiGianNhac || !ngayBatDau) {
    return res.status(400).json({ message: "Thiếu dữ liệu đầu vào" });
  }
  try {
    const result = await UongThuoc.updateReminder(
      maNhacNho,
      tenThuoc,
      lieuLuong,
      thoiGianNhac,
      ngayBatDau,
      ngayKetThuc
    );
    return res.status(200).json({ message: "Cập nhật thành công", result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi Server", error: error.message });
  }
};

// 📌 4️⃣ Xóa nhắc nhở
const deleteReminder = async (req, res) => {
  const { maNhacNho } = req.params;
  if (!maNhacNho) {
    return res.status(400).json({ message: "Thiếu mã nhắc nhở" });
  }
  try {
    const result = await UongThuoc.deleteReminder(maNhacNho);
    return res.status(200).json({ message: "Xóa thành công", result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi Server", error: error.message });
  }
};

module.exports = {
  getRemindersByUser,
  addReminder,
  updateReminder,
  deleteReminder,
};
