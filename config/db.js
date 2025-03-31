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

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "ql_suckhoe",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});
module.exports = pool; // Xuất pool hỗ trợ Promise

