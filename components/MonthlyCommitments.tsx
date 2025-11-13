

import React from 'react';
// FIX: Corrected import path for types to be explicitly relative.
import { Debt, Transaction, TransactionType } from '../types.ts';

interface MonthlyCommitmentsProps {
  debts: Debt[];
  transactions: Transaction[];
}

const MonthlyCommitments: React.FC<MonthlyCommitmentsProps> = ({ debts, transactions }) => {
  const totalDebtPayment = debts.reduce((sum, debt) => sum + Number(debt.monthlyPayment), 0);

  // A simple heuristic for recurring expenses (e.g. subscriptions)
  const recurringExpenses = transactions
    .filter(t => t.type === TransactionType.EXPENSE && (t.category === "Moradia" || t.category === "Assinaturas"))
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalCommitments = totalDebtPayment + recurringExpenses;

  return (
    <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
      <h3 className="text-lg font-bold mb-3 text-slate-700 dark:text-slate-200">Compromissos Mensais</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Pagamento de Dívidas</span>
          <span className="font-semibold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDebtPayment)}</span>
        </div>
        <div className="flex justify-between">
          <span>Despesas Recorrentes</span>
          <span className="font-semibold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(recurringExpenses)}</span>
        </div>
        <div className="border-t border-slate-300 dark:border-slate-600 my-2"></div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCommitments)}</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyCommitments;