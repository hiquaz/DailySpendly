import { formatDate, formatMoney } from '../utils/formatters.js';

export default function ExpenseTable({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="px-4 py-10 text-center sm:px-6">
        <p className="text-base font-semibold text-slate-800">Chưa có khoản chi nào</p>
        <p className="mt-1 text-sm text-slate-500">
          Thêm khoản đầu tiên để bắt đầu theo dõi chi tiêu.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead className="bg-slate-100 text-sm text-slate-600">
          <tr>
            <th className="w-16 px-4 py-3 font-semibold">STT</th>
            <th className="px-4 py-3 font-semibold">Tên khoản</th>
            <th className="w-44 px-4 py-3 font-semibold">Số tiền</th>
            <th className="w-40 px-4 py-3 font-semibold">Ngày tạo</th>
            <th className="w-28 px-4 py-3 text-right font-semibold">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {expenses.map((expense, index) => (
            <tr key={expense.id} className="transition hover:bg-emerald-50/60">
              <td className="px-4 py-4 text-sm text-slate-500">{index + 1}</td>
              <td className="px-4 py-4 font-medium text-slate-900">{expense.name}</td>
              <td className="px-4 py-4 font-semibold text-emerald-800">
                {formatMoney(expense.amount)}
              </td>
              <td className="px-4 py-4 text-slate-600">{formatDate(expense.createdAt)}</td>
              <td className="px-4 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onDeleteExpense(expense.id)}
                  className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
