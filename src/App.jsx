import { useEffect, useMemo, useState } from 'react';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseTable from './components/ExpenseTable.jsx';
import Summary from './components/Summary.jsx';

const STORAGE_KEY = 'personal-expenses';

function createExpense(name, amount) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    name,
    amount,
    createdAt: new Date().toISOString(),
  };
}

function loadExpenses() {
  try {
    const savedExpenses = localStorage.getItem(STORAGE_KEY);
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [expenses, setExpenses] = useState(loadExpenses);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const totalAmount = useMemo(
    () => expenses.reduce((total, expense) => total + expense.amount, 0),
    [expenses],
  );

  function handleAddExpense(expenseData) {
    setExpenses((currentExpenses) => [
      createExpense(expenseData.name, expenseData.amount),
      ...currentExpenses,
    ]);
  }

  function handleDeleteExpense(expenseId) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId),
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Sổ chi tiêu cá nhân
          </p>
          <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            Ghi nhanh chi tiêu hằng ngày
          </h1>
        </header>

        <ExpenseForm onAddExpense={handleAddExpense} />

        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <ExpenseTable expenses={expenses} onDeleteExpense={handleDeleteExpense} />
          <Summary totalAmount={totalAmount} />
        </section>
      </div>
    </main>
  );
}
