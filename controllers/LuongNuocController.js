const LN = require("../models/LuongNuoc");

// 📌 1️⃣ Lấy tổng lượng nước đã uống trong ngày
const getTotalWater = async (req, res) => {
  const { ma, ngay } = req.params;
  try {
    const totalWater = await LN.getTotalWaterByUser(ma, ngay);
    return res
      .status(200)
      .json({ message: "Tổng lượng nước đã uống", totalWater });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi Server", error: error.message });
  }
};

// 📌 2️⃣ Thêm lượng nước uống mới
const addWater = async (req, res) => {
  const { maNguoiDung, luongML, thoiGianGhi } = req.body;
  if (!maNguoiDung || !luongML || !thoiGianGhi) {
    return res.status(400).json({ message: "Thiếu dữ liệu đầu vào" });
  }
  try {
    const result = await LN.addWaterRecord(maNguoiDung, luongML, thoiGianGhi);
    return res
      .status(201)
      .json({ message: "Thêm lượng nước thành công", result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi Server", error: error.message });
  }
};

// 📌 3️⃣ Cập nhật lượng nước uống
const updateWater = async (req, res) => {
  const { maLuongNuoc, luongML, thoiGianGhi } = req.body;
  if (!maLuongNuoc || !luongML || !thoiGianGhi) {
    return res.status(400).json({ message: "Thiếu dữ liệu đầu vào" });
  }
  try {
    const result = await LN.updateWaterRecord(
      maLuongNuoc,
      luongML,
      thoiGianGhi
    );
    return res.status(200).json({ message: "Cập nhật thành công", result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi Server", error: error.message });
  }
};

// 📌 4️⃣ Xóa bản ghi lượng nước uống
const deleteWater = async (req, res) => {
  const { maLuongNuoc } = req.params;
  if (!maLuongNuoc) {
    return res.status(400).json({ message: "Thiếu mã lượng nước" });
  }
  try {
    const result = await LN.deleteWaterRecord(maLuongNuoc);
    return res.status(200).json({ message: "Xóa thành công", result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi Server", error: error.message });
  }
};

module.exports = {
  getTotalWater,
  addWater,
  updateWater,
  deleteWater,
};
