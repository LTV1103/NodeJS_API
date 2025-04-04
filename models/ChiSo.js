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
    const sql = "select * from chisosuckhoe where ma_nguoi_dung = ? ";
    const [result] = await db.query(sql, ma);
    return result;
  };
  static getchitiet = async (ma) => {
    const sql = "select * from chisosuckhoe where ma_chi_so = ? ";
    const [result] = await db.query(sql, ma);
    return result;
  };
}

module.exports = ChiSo;
