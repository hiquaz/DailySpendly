import { useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseTable from './components/ExpenseTable.jsx';
import Summary from './components/Summary.jsx';
import { db } from './firebase.js';

const EXPENSES_COLLECTION = 'expenses';

const expensesRef = collection(db, EXPENSES_COLLECTION);

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const expensesQuery = query(expensesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      expensesQuery,
      (snapshot) => {
        const nextExpenses = snapshot.docs.map((expenseDoc) => ({
          id: expenseDoc.id,
          ...expenseDoc.data(),
        }));

        setExpenses(nextExpenses);
        setIsLoading(false);
        setError('');
      },
      () => {
        setIsLoading(false);
        setError('Không thể tải dữ liệu chi tiêu. Vui lòng kiểm tra Firestore Rules.');
      },
    );

    return unsubscribe;
  }, []);

  const totalAmount = useMemo(
    () => expenses.reduce((total, expense) => total + expense.amount, 0),
    [expenses],
  );

  async function handleAddExpense(expenseData) {
    setIsSaving(true);
    setError('');

    try {
      await addDoc(expensesRef, {
        name: expenseData.name,
        amount: expenseData.amount,
        createdAt: new Date().toISOString(),
      });
    } catch {
      setError('Không thể thêm khoản chi. Vui lòng kiểm tra kết nối hoặc Firestore Rules.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteExpense(expenseId) {
    setError('');

    try {
      await deleteDoc(doc(db, EXPENSES_COLLECTION, expenseId));
    } catch {
      setError('Không thể xóa khoản chi. Vui lòng kiểm tra quyền ghi/xóa trên Firestore.');
    }
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

        <ExpenseForm onAddExpense={handleAddExpense} isSubmitting={isSaving} />

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <ExpenseTable
            expenses={expenses}
            isLoading={isLoading}
            onDeleteExpense={handleDeleteExpense}
          />
          <Summary totalAmount={totalAmount} />
        </section>
      </div>
    </main>
  );
}
