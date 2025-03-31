const db = require("../config/db");
class GhiChep {
  static gcbyuser = async (ma) => {
    const sql = "select * from ghichepgiacngu where ma_nguoi_dung =  ? ";
    const [result] = await db.query(sql, ma);
    return result;
  };
  static checktime = async (ma) => {
    const sql =
      "select timediff(thoi_gian_ket_thuc,thoi_gian_bat_dau) from ghichepgiacngu where ma_ghi_chep =  ?  ";
    const [result] = await db.query(sql, ma);
    return result;
  };
  static delete = async (ma) => {
    const sql = "delete from ghichepgiacngu where ma_ghi_chep = ? ";
    const [result] = await db.query(sql, ma);
    return result;
  };
}
module.exports = GhiChep;
