const mysql = require("mysql2/promise");

// Cấu hình kết nối
// const connection = mysql.createConnection({
//     host: "localhost", // Địa chỉ MySQL server
//     user: "root",      // Tên đăng nhập MySQL
//     password: "",      // Mật khẩu (để trống nếu dùng XAMPP)
//     database: "ql_SucKhoe" // Tên database
// });

// // Kết nối tới MySQL
// connection.connect((err) => {
//     if (err) {
//         console.error("Kết nối thất bại:", err);
//         return;
//     }
//     console.log("Kết nối thành công đến MySQL!");
// });

// module.exports = connection;
const MYSQL_URL =
  "mysql -h turntable.proxy.rlwy.net -u root -p ntMHpXvdvBbzLLyPxptihIArpcCHIPaw --port 42986 --protocol=TCP railway";
const pool = mysql.createPool({
  uri: process.env.MYSQL_URL, // Biến môi trường MYSQL_URL từ Railway
  host: "localhost",
  user: "root",
  password: "",
  database: "ql_suckhoe",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = pool; // Xuất pool hỗ trợ Promise
