
import React, { useState } from 'react';
// FIX: Corrected import path for types to be explicitly relative.
import { InvestmentReserve } from '../types.ts';
import { XIcon } from './icons/XIcon.tsx';

interface AddReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReserve: (reserve: Omit<InvestmentReserve, 'id'>) => void;
}

const AddReserveModal: React.FC<AddReserveModalProps> = ({ isOpen, onClose, onAddReserve }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'emergency' | 'goal'>('emergency');
  const [balance, setBalance] = useState('0');
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onAddReserve({
      name,
      type,
      balance: parseFloat(balance) || 0,
      goal: type === 'goal' ? parseFloat(goal) : undefined,
    });
    setName('');
    setType('emergency');
    setBalance('0');
    setGoal('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200">Nova Reserva / Meta</h2>
          <button onClick={onClose}><XIcon className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reserve-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nome</label>
            <input id="reserve-name" type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" placeholder="Ex: Viagem para o Japão"/>
          </div>
          <div>
            <label htmlFor="reserve-type" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tipo</label>
            <select id="reserve-type" value={type} onChange={e => setType(e.target.value as any)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm">
              <option value="emergency">Reserva de Emergência</option>
              <option value="goal">Meta de Objetivo</option>
            </select>
          </div>
          <div>
            <label htmlFor="reserve-balance" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Saldo Inicial (R$)</label>
            <input id="reserve-balance" type="number" step="0.01" value={balance} onChange={e => setBalance(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
          </div>
          {type === 'goal' && (
            <div>
              <label htmlFor="reserve-goal" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Meta (R$)</label>
              <input id="reserve-goal" type="number" step="0.01" value={goal} onChange={e => setGoal(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
            </div>
          )}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-md text-white bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90">Criar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReserveModal;