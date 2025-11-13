

import React from 'react';
// FIX: Corrected import path for types to be explicitly relative.
import type { Debt } from '../types.ts';
// FIX: Add explicit .tsx extension to local module imports.
import DebtList from './DebtList.tsx';
// FIX: Import PlusIcon for the "Add Debt" button.
import { PlusIcon } from './icons/PlusIcon.tsx';

interface DebtsViewProps {
  debts: Debt[];
  onEditDebt: (debt: Debt) => void;
  // FIX: Add onAddDebt to props to handle adding a new debt.
  onAddDebt: () => void;
}

const DebtsView: React.FC<DebtsViewProps> = ({ debts, onEditDebt, onAddDebt }) => {
    const totalRemaining = debts.reduce((sum, d) => sum + Number(d.remainingBalance), 0);
    const totalMonthly = debts.reduce((sum, d) => sum + Number(d.monthlyPayment), 0);

  return (
    <div className="space-y-6">
      {/* FIX: Add a header with a button to add a new debt. */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">Gerenciar Dívidas</h2>
        <button onClick={onAddDebt} className="flex items-center text-sm bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <PlusIcon className="w-5 h-5 mr-2" />
            Nova Dívida
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl text-center">
          <h4 className="font-semibold text-sm text-slate-600 dark:text-slate-300">Total Restante</h4>
          <p className="text-xl font-bold text-warning">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRemaining)}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl text-center">
          <h4 className="font-semibold text-sm text-slate-600 dark:text-slate-300">Pagamento Mensal Total</h4>
          <p className="text-xl font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalMonthly)}</p>
        </div>
      </div>
      
      <DebtList debts={debts} onEdit={onEditDebt} />
    </div>
  );
};

export default DebtsView;