import { formatMoney } from '../utils/formatters.js';

export default function Summary({ totalAmount }) {
  return (
    <div className="flex flex-col gap-2 border-t border-slate-200 bg-amber-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <span className="text-sm font-medium text-slate-600">Tổng kết</span>
      <p className="text-xl font-bold text-slate-950">
        Tổng chi: <span className="text-emerald-800">{formatMoney(totalAmount)}</span>
      </p>
    </div>
  );
}
