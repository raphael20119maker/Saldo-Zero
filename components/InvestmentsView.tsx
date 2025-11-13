

import React from 'react';
// FIX: Corrected import path for types to be explicitly relative.
import { InvestmentReserve } from '../types.ts';
// FIX: Add explicit .tsx extension to local module imports.
import { PlusIcon } from './icons/PlusIcon.tsx';
// FIX: Add explicit .tsx extension to local module imports.
import { PiggyBankIcon } from './icons/PiggyBankIcon.tsx';
// FIX: Add explicit .tsx extension to local module imports.
import { StarIcon } from './icons/StarIcon.tsx';

interface InvestmentsViewProps {
  reserves: InvestmentReserve[];
  onAddReserve: () => void;
  // FIX: Add onContribute prop to handle contributions.
  onContribute: (reserve: InvestmentReserve) => void;
}

const InvestmentsView: React.FC<InvestmentsViewProps> = ({ reserves, onAddReserve, onContribute }) => {
  const totalBalance = reserves.reduce((sum, r) => sum + r.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">Metas e Reservas</h2>
        <button onClick={onAddReserve} className="flex items-center text-sm bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <PlusIcon className="w-5 h-5 mr-2" />
            Nova Meta/Reserva
        </button>
      </div>

      <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl text-center">
          <h4 className="font-semibold text-sm text-slate-600 dark:text-slate-300">Valor Total Guardado</h4>
          <p className="text-2xl font-bold text-success">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalBalance)}</p>
      </div>

       {reserves.length === 0 ? (
        <div className="text-center py-8 px-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
            <h3 className="text-lg font-semibold">Sem metas ou reservas</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Crie sua reserva de emergência ou uma meta para começar a poupar.</p>
        </div>
      ) : (
        <ul className="space-y-4">
            {reserves.map((reserve) => {
              const Icon = reserve.type === 'emergency' ? StarIcon : PiggyBankIcon;
              const progress = reserve.type === 'goal' && reserve.goal && reserve.goal > 0 ? (reserve.balance / reserve.goal) * 100 : 100;

              return (
                 <li key={reserve.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    {/* FIX: Add a button to contribute to the reserve. */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center">
                            <Icon className={`w-8 h-8 mr-4 ${reserve.type === 'emergency' ? 'text-yellow-500' : 'text-primary'}`} />
                            <div>
                                <p className="font-semibold">{reserve.name}</p>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(reserve.balance)}
                                </p>
                            </div>
                        </div>
                        <button onClick={() => onContribute(reserve)} className="text-sm bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-800/50 transition-colors flex-shrink-0">
                            Aportar
                        </button>
                    </div>
                     {reserve.type === 'goal' && reserve.goal && (
                        <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1 text-slate-500 dark:text-slate-400">
                                <span>Meta: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(reserve.goal)}</span>
                                <span>{progress.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2.5">
                                <div className="bg-primary dark:bg-primary-dark h-2.5 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                            </div>
                        </div>
                    )}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default InvestmentsView;