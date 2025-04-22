# 🧰 Trang Tổng Hợp Dự Án & Admin Dashboard

Một dự án cá nhân dạng dashboard, tổng hợp các công cụ tiện ích do chính tôi phát triển và tối ưu UI/UX để dễ sử dụng, phù hợp cho cả demo nội bộ lẫn mục đích cá nhân.

## 🔍 Tính năng nổi bật

- **Mã hóa / Giải mã**: Hỗ trợ JSON, XML, BEPOS, sử dụng AES, Base64, Zip, Escape...
- **Thống kê công việc**: Nhập số liệu, phân tích, tìm kiếm, lọc dữ liệu hiệu quả.
- **Quản lý ghi chú**: Ghi chú nhanh, hoàn thành, xóa, hỗ trợ import/export dạng JSON.
- **Chuyển đổi DateTime - Ticks**: Công cụ nhỏ gọn cho lập trình viên .NET.
- **Gộp file XML**: Gộp nhiều file XML thành 1 file duy nhất, tiện cho xử lý dữ liệu.
- **Tạo hóa đơn XML**: Nhập dữ liệu xuất hóa đơn chuẩn định dạng XML.

## 🔐 Chế độ đăng nhập

- Nút "Đăng nhập" ở góc phải → nhập tên và mật khẩu.
- Nếu đúng thông tin: giao diện Dashboard admin được hiển thị.
- Có thể quay lại trang chính hoặc đăng xuất bất kỳ lúc nào.

> Mặc định tài khoản: `admin` / `admin` (có thể chỉnh sửa trong file HTML).

## 📈 Thống kê lượt truy cập

- Tích hợp **[CountAPI](https://countapi.xyz)** để đếm lượt xem theo từng công cụ.
- Hiển thị tổng lượt truy cập, biểu đồ theo từng module.

## 🧪 Công nghệ sử dụng

- HTML + CSS (thuần) với Grid layout
- JavaScript thuần (Vanilla JS)
- [Chart.js](https://www.chartjs.org/) để vẽ biểu đồ
- [CountAPI](https://countapi.xyz) – API miễn phí dùng cho demo

## 📂 Cấu trúc thư mục


## 🖼 Demo giao diện

![Trang chính](images/demo-home.png)
![Dashboard Admin](images/demo-dashboard.png)

---

## 🛠 Gợi ý nâng cấp

- Thêm lưu trạng thái đăng nhập bằng `localStorage`.
- Kết hợp Firebase Auth hoặc Auth0 để xác thực an toàn.
- Tối ưu Responsive cho thiết bị di động.
- Chuyển sang sử dụng framework như Vue hoặc React (nếu muốn mở rộng).

## 📄 License

MIT © 2025 ThangHDb
