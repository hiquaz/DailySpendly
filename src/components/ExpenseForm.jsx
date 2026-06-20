import { useState } from 'react';

const initialForm = {
  name: '',
  amount: '',
};

export default function ExpenseForm({ onAddExpense }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const amount = Number(form.amount);

    if (!name) {
      setError('Vui lòng nhập tên khoản chi.');
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Vui lòng nhập số tiền lớn hơn 0.');
      return;
    }

    onAddExpense({ name, amount });
    setForm(initialForm);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_220px_auto] md:items-end">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Tên khoản</span>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Ví dụ: Thảm ngồi"
            className="h-11 rounded-md border border-slate-300 px-3 text-base outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Số tiền</span>
          <input
            name="amount"
            type="number"
            min="0"
            step="1000"
            value={form.amount}
            onChange={handleChange}
            placeholder="60000"
            className="h-11 rounded-md border border-slate-300 px-3 text-base outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <button
          type="submit"
          className="h-11 rounded-md bg-emerald-700 px-5 font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
        >
          Thêm
        </button>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
    </form>
  );
}
