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
router.get("/uongthuoc/:maNguoiDung", UongThuocController.GETUTBYUSER);
router.post("/uongthuoc", UongThuocController.ADDUT);
router.put("/uongthuoc/:ma_nhac_nho", UongThuocController.UPDATEUT);
router.delete("/uongthuoc/:maNhacNho", UongThuocController.DELETEUT);

//Chi So
router.get("/chiso/:ma", ChiSoController.GETCHISOBYIDUSER);
router.get("/chiso/cannang/:ma", ChiSoController.GETCANNANG);
router.get("/chiso/chitiet/:ma", ChiSoController.GETCHITIETCS);
router.post("/chiso/:ma", ChiSoController.THEMCSBYND);
router.put("/chiso/:ma", ChiSoController.UPDATEBYUSER);
router.delete("/chiso/:ma", ChiSoController.DELETE);


//Nhat Ky
router.get("/nhatky/:ma", NhatKyController.HOATDONG);
router.post("/nhatky/:ma", NhatKyController.THEMHOATDONG);
router.put("/nhatky/:ma", NhatKyController.UPDATE);
router.delete("/nhatky/:ma", NhatKyController.DELETE);
router.get("/nhatky/chitiet/:ma", NhatKyController.DETAIL);

//Uong Nuoc
router.get("/uongnuoc/tong/:ma/:ngay", LuongNuocController.GETTOTAL);
router.get("/uongnuoc/:ma", LuongNuocController.GETALL);
router.post("/uongnuoc/them", LuongNuocController.ADD);
router.put("/uongnuoc/capnhat", LuongNuocController.UPDATE);
router.delete("/uongnuoc/xoa/:ma", LuongNuocController.DELETE);

//Ghi Chep
router.get("/ghichep/:ma", GhiChepController.GETGCBYIDUSER);
router.get("/ghichep/chitiet/:ma", GhiChepController.GETGCBYIDUSER);
router.delete("/ghichep/:ma", GhiChepController.DELETE);
router.post("/ghichep", GhiChepController.THEMGC);
module.exports = router;
