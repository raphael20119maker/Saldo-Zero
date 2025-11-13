

import React from 'react';
// FIX: Corrected import paths for types to be explicitly relative.
import type { Transaction } from '../types.ts';
// FIX: Corrected import paths for types to be explicitly relative.
import { TransactionType } from '../types.ts';
// FIX: Add explicit .tsx extension to local module imports.
import { PlusIcon } from './icons/PlusIcon.tsx';
// FIX: Add explicit .tsx extension to local module imports.
import { MinusIcon } from './icons/MinusIcon.tsx';

interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, limit }) => {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const displayedTransactions = limit ? sortedTransactions.slice(0, limit) : sortedTransactions;

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 px-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
        <h3 className="text-lg font-semibold">Sem transações ainda</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Adicione um ganho ou gasto para começar.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-3 text-slate-700 dark:text-slate-200">Últimas Transações</h3>
      <ul className="space-y-3">
        {displayedTransactions.map((t) => {
          const isEarning = t.type === TransactionType.EARNING;
          const date = new Date(t.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
          const details = isEarning && t.paymentMethod 
            ? `${date} - ${t.category} (${t.paymentMethod})`
            : `${date} - ${t.category}`;

          return (
            <li key={t.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${isEarning ? 'bg-green-100 dark:bg-green-900/50 text-success' : 'bg-red-100 dark:bg-red-900/50 text-danger'}`}>
                  {isEarning ? <PlusIcon className="w-5 h-5" /> : <MinusIcon className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-semibold">{t.description}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{details}</p>
                </div>
              </div>
              <p className={`font-bold ${isEarning ? 'text-success' : 'text-danger'}`}>
                {isEarning ? '+' : '-'} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.amount)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionList;