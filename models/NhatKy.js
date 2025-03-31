const db = require("../config/db");
class NhatKy {
  static hoatdong = async (ma) => {
    const sql = "select * from nhatkyhoatdong where ma_nguoi_dung = ?";
    const [result] = await db.query(sql, ma);
    return result;
  };
  static themhoatdong = async (
    ma,
    loaihoatdong,
    thoigian,
    calotieuhao,
    ngayhoatdong
  ) => {
    const sql =
      "insert into nhatkyhoatdong(ma_nguoi_dung,loai_hoat_dong,thoi_gian_phut,calo_tieu_hao,ngay_hoat_dong) values (?,?,?,?,?) ";
    const [result] = await db.query(sql, [
      ma,
      loaihoatdong,
      thoigian,
      calotieuhao,
      ngayhoatdong,
    ]);
    return result;
  };
  static delete = async(ma)=>
  {
    const sql = 'delete from nhatkyhoatdong where ma_hoat_dong = ?';
    const  [result] = await db.query(sql,ma);
    return result;

  }
  static chitiet = async(ma)=>{
    const sql = "select * from nhatkyhoatdong where ma_hoat_dong = ?";
    const[result] = await db.query(sql,ma);
    return result
  }
}


module.exports = NhatKy;
