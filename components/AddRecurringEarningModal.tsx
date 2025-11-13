

import React, { useState } from 'react';
// FIX: Corrected import path for types to be explicitly relative.
import { RecurringEarning } from '../types.ts';
// FIX: Add explicit .tsx extension to local module imports.
import { XIcon } from './icons/XIcon.tsx';

interface AddRecurringEarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecurringEarning: (earning: Omit<RecurringEarning, 'id'>) => void;
}

const AddRecurringEarningModal: React.FC<AddRecurringEarningModalProps> = ({ isOpen, onClose, onAddRecurringEarning }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [day, setDay] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !day) return;

    onAddRecurringEarning({
      description,
      amount: parseFloat(amount),
      day: parseInt(day, 10),
    });

    // Reset form and close
    setDescription('');
    setAmount('');
    setDay('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200">Nova Renda Mensal Recorrente</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="rec-earning-desc" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Descrição</label>
            <input type="text" id="rec-earning-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ex: Salário" className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="rec-earning-amount" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Valor (R$)</label>
              <input type="number" step="0.01" id="rec-earning-amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" required />
            </div>
            <div>
              <label htmlFor="rec-earning-day" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Dia do Recebimento</label>
              <input type="number" id="rec-earning-day" min="1" max="31" value={day} onChange={(e) => setDay(e.target.value)} placeholder="Ex: 5" className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" required />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-md text-white bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90">Salvar Renda</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecurringEarningModal;