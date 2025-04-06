const express = require("express");
const ChiSoController = require("../controllers/ChiSoController.js");
const GhiChepController = require("../controllers/GhiChepController.js");
const NguoiDungController = require("../controllers/NguoiDungController.js");
const NhatKyController = require("../controllers/NhatKyController.js");
const UongThuocController = require("../controllers/UongThuocController.js");
const LuongNuocController = require("../controllers/LuongNuocController.js");

const router = express.Router();
//nguoi dung
router.get("/nguoidung", NguoiDungController.GETALL);
router.get("/nguoidung/:ma", NguoiDungController.GETUSERBYID);
router.post("/nguoidung/regeister", NguoiDungController.REGEISTER);
router.post("/nguoidung/login", NguoiDungController.LOGIN);
router.delete("/nguoidung/:ma", NguoiDungController.DELETE);
router.put("/nguoidung/:ma", NguoiDungController.UPDATE);

//Uong Thuoc
router.get("/uongthuoc/:maNguoiDung", UongThuocController.getRemindersByUser);
router.post("/uongthuoc/them", UongThuocController.addReminder);
router.put("/uongthuoc/capnhat", UongThuocController.updateReminder);
router.delete("/uongthuoc/xoa/:maNhacNho", UongThuocController.deleteReminder);

//Chi So
router.get("/chiso/:ma", ChiSoController.GETCHISOBYIDUSER);
router.get("/chiso/chitiet/:ma", ChiSoController.GETCHITIETCS);
router.post("/chiso/:ma", ChiSoController.THEMCSBYND);

//Nhat Ky
router.get("/nhatky/:ma", NhatKyController.HOATDONG);
router.post("/nhatky/:ma", NhatKyController.THEMHOATDONG);
router.delete("/nhatky/:ma", NhatKyController.DELETE);
router.get("/nhatky/chitiet/:ma", NhatKyController.DETAIL);

//Uong Nuoc
router.get("/tong/:ma/:ngay", LuongNuocController.getTotalWater);
router.post("/them", LuongNuocController.addWater);
router.put("/capnhat", LuongNuocController.updateWater);
router.delete("/xoa/:maLuongNuoc", LuongNuocController.deleteWater);

//Ghi Chep
router.get("/ghichep/:ma", GhiChepController.GETGCBYIDUSER);
router.get("/ghichep/chitiet/:ma", GhiChepController.GETGCBYIDUSER);
router.delete("/ghichep/:ma", GhiChepController.DELETE);
router.post("/ghichep", GhiChepController.THEMGC);
module.exports = router;
