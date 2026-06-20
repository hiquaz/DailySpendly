# App quản lý chi tiêu cá nhân

Ứng dụng React + Vite + Tailwind CSS để ghi nhanh các khoản chi tiêu hằng ngày. Dữ liệu được lưu trong `localStorage`, không cần backend.

## Chức năng

- Thêm khoản chi mới với tên khoản và số tiền.
- Xóa khoản chi.
- STT tự động theo thứ tự hiển thị.
- Tổng chi tự động cập nhật.
- Dữ liệu vẫn còn sau khi reload trang.
- Tiền được hiển thị theo định dạng Việt Nam, ví dụ `60.000 đ`, `1.500.000 đ`.

## Cấu trúc thư mục

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── components
    │   ├── ExpenseForm.jsx
    │   ├── ExpenseTable.jsx
    │   └── Summary.jsx
    └── utils
        └── formatters.js
```

## Cài đặt và chạy local

```bash
npm install
npm run dev
```

Sau đó mở địa chỉ Vite hiển thị trên terminal, thường là:

```text
http://localhost:5173
```

## Build production

```bash
npm run build
```

Thư mục build sẽ nằm ở:

```text
dist
```

Có thể kiểm tra bản build bằng:

```bash
npm run preview
```

## Deploy lên GitHub Pages

### Cách 1: Dùng package `gh-pages`

1. Tạo repository trên GitHub.
2. Push source code lên repository đó.
3. Chạy:

```bash
npm run deploy
```

4. Vào GitHub repository:

```text
Settings -> Pages
```

Chọn source là branch `gh-pages`.

### Cách 2: Deploy bằng GitHub Actions

Có thể build project bằng lệnh:

```bash
npm ci
npm run build
```

Sau đó publish thư mục `dist` lên GitHub Pages. File `vite.config.js` đã đặt `base: './'` để app chạy ổn khi được phục vụ từ GitHub Pages.
