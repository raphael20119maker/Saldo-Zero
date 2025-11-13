

import React from 'react';
// FIX: Corrected import path for types to be explicitly relative.
import { RecurringEarning, Debt, RecurringExpense } from '../types.ts';
// FIX: Add explicit .tsx extension to local module imports.
import { PlusIcon } from './icons/PlusIcon.tsx';

interface MonthlyForecastCardProps {
  recurringEarnings: RecurringEarning[];
  recurringExpenses: RecurringExpense[];
  debts: Debt[];
  onAddRecurringEarning: () => void;
  onAddRecurringExpense: () => void;
}

const MonthlyForecastCard: React.FC<MonthlyForecastCardProps> = ({ 
  recurringEarnings, 
  recurringExpenses, 
  debts, 
  onAddRecurringEarning,
  onAddRecurringExpense
}) => {
  const totalRecurringEarnings = recurringEarnings.reduce((sum, earning) => sum + Number(earning.amount), 0);
  const totalMonthlyDebts = debts.reduce((sum, debt) => sum + Number(debt.monthlyPayment), 0);
  const totalRecurringExpenses = recurringExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const totalFixedExpenses = totalMonthlyDebts + totalRecurringExpenses;
  const availableForSpending = totalRecurringEarnings - totalFixedExpenses;

  return (
    <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg relative">
      <div className="flex flex-wrap gap-2 justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Planejamento Mensal</h3>
        <div className="flex gap-2">
          <button 
            onClick={onAddRecurringEarning}
            className="flex items-center text-sm bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark font-semibold px-3 py-1 rounded-full hover:bg-primary/20 dark:hover:bg-primary-dark/30 transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Renda Recorrente
          </button>
           <button 
            onClick={onAddRecurringExpense}
            className="flex items-center text-sm bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 font-semibold px-3 py-1 rounded-full hover:bg-amber-500/20 dark:hover:bg-amber-500/30 transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Gasto Recorrente
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Ganhos Previstos</p>
          <p className="text-xl font-bold text-success">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRecurringEarnings)}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Gastos Fixos</p>
          <p className="text-xl font-bold text-danger">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalFixedExpenses)}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Disponível para Gastos</p>
          <p className={`text-xl font-bold ${availableForSpending >= 0 ? 'text-slate-800 dark:text-slate-100' : 'text-danger'}`}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(availableForSpending)}</p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyForecastCard;