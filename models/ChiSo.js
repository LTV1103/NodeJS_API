const db = require("../config/db");
class ChiSo {
  static savechisobynguoidung = async (
    ma,
    chieucao,
    cannang,
    huyetap,
    nhiptim,
    bmi
  ) => {
    const sql =
      "insert into chisosuckhoe (ma_nguoi_dung,chieu_cao_cm,can_nang_kg,huyet_ap,nhip_tim,BMI) values (?,?,?,?,?,?)";
    const [result] = await db.query(sql, [
      ma,
      chieucao,
      cannang,
      huyetap,
      nhiptim,
      bmi,
    ]);
    return {
      id: result.insertId,
      ma,
      chieucao,
      cannang,
      huyetap,
      nhiptim,
      bmi,
    };
  };
  static getchiso = async (ma) => {
    const sql =
      "select ma_chi_so,ho_ten,gioi_tinh,chieu_cao_cm,can_nang_kg,huyet_ap,nhip_tim,BMI,ngay_do from chisosuckhoe join nguoidung on chisosuckhoe.ma_nguoi_dung = nguoidung.ma_nguoi_dung where chisosuckhoe.ma_nguoi_dung = ? ";
    const [result] = await db.query(sql, [ma]);
    return result;
  };
  static getchitiet = async (ma) => {
    const sql = "select * from chisosuckhoe where ma_chi_so = ? ";
    const [result] = await db.query(sql, ma);
    return result;
  };
  static updatechisobyid = async (
    chieucao,
    cannang,
    huyetap,
    nhiptim,
    bmi,
    ma
  ) => {
    const sql =
      "update chisosuckhoe set chieu_cao_cm = ? , can_nang_kg = ? , huyet_ap = ? , nhip_tim = ? , BMI = ? where ma_chi_so = ? ";
    const [result] = await db.query(sql, [
      chieucao,
      cannang,
      huyetap,
      nhiptim,
      bmi,
      ma,
    ]);
    return result;
  };
  static deletechisobyid = async (ma) => {
    const sql = "delete from chisosuckhoe where ma_chi_so = ?";
    const [result] = await db.query(sql, ma);
    return result;
  };
}

module.exports = ChiSo;
