

import React from 'react';
// FIX: Corrected import path for types to be explicitly relative.
import type { Debt } from '../types.ts';
// FIX: Add explicit .tsx extension to local module imports.
import { PencilSquareIcon } from './icons/PencilSquareIcon.tsx';

interface DebtListProps {
  debts: Debt[];
  onEdit: (debt: Debt) => void;
}

const DebtList: React.FC<DebtListProps> = ({ debts, onEdit }) => {
  if (debts.length === 0) {
    return (
      <div className="text-center py-8 px-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
        <h3 className="text-lg font-semibold">Sem dívidas registradas</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Você está no controle! 🎉</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-3 text-slate-700 dark:text-slate-200">Suas Dívidas</h3>
      <ul className="space-y-3">
        {debts.map((debt) => {
          const progress = debt.installmentsTotal > 0 ? (debt.installmentsPaid / debt.installmentsTotal) * 100 : 0;
          return (
            <li key={debt.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{debt.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {debt.creditor} - Vence todo dia {debt.paymentDay}
                  </p>
                   <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(debt.remainingBalance)} restantes
                  </p>
                </div>
                <button onClick={() => onEdit(debt)} className="text-slate-400 hover:text-primary dark:hover:text-primary-dark flex-shrink-0 ml-2">
                    <PencilSquareIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-3">
                 <div className="flex justify-between text-xs mb-1 text-slate-500 dark:text-slate-400">
                  <span>{`Parcela ${debt.installmentsPaid} de ${debt.installmentsTotal}`}</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                  <div className="bg-primary dark:bg-primary-dark h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DebtList;