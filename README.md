# App quản lý chi tiêu cá nhân

Ứng dụng React + Vite + Tailwind CSS để ghi nhanh các khoản chi tiêu hằng ngày. Dữ liệu được lưu online bằng Firebase Firestore để nhiều người có thể dùng chung trên GitHub Pages.

## Chức năng

- Thêm khoản chi mới với tên khoản và số tiền.
- Xóa khoản chi.
- STT tự động theo thứ tự hiển thị.
- Tổng chi tự động cập nhật.
- Dữ liệu dùng chung giữa nhiều thiết bị qua Firebase Firestore.
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
    ├── firebase.js
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

Project đang đặt base path cho repo `DailySpendly`:

```js
base: '/DailySpendly/',
```

Deploy bằng:

```bash
npm run deploy
```

Sau đó vào GitHub repository:

```text
Settings -> Pages
```

Chọn source là branch `gh-pages`.

Link sẽ có dạng:

```text
https://<username>.github.io/DailySpendly/
```

## Firebase Firestore

App đang dùng Firebase project `dailyspendly` và collection:

```text
expenses
```

Để mọi người mở link đều có thể xem, thêm và xóa khoản chi, vào Firebase Console:

```text
Firestore Database -> Rules
```

Trong giai đoạn dùng nội bộ, có thể đặt rules như sau:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /expenses/{expenseId} {
      allow read, create, delete: if true;
      allow update: if false;
    }
  }
}
```

Lưu ý: rules này nghĩa là ai có link web cũng có thể thêm và xóa dữ liệu. Khi cần an toàn hơn, hãy thêm đăng nhập hoặc mã PIN trước khi cho ghi/xóa.
