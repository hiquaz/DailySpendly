export function formatMoney(value) {
  return `${new Intl.NumberFormat('vi-VN').format(value)} đ`;
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}
