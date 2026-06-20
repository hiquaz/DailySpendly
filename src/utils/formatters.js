export function formatMoney(value) {
  return `${new Intl.NumberFormat('vi-VN').format(value || 0)} đ`;
}

export function formatDate(value) {
  if (!value) {
    return '';
  }

  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
