
import React, { useState } from 'react';
// FIX: Corrected import path for types to be explicitly relative.
import { Debt } from '../types.ts';
import { XIcon } from './icons/XIcon.tsx';

interface AddDebtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDebt: (debt: Omit<Debt, 'id'>) => void;
}

const AddDebtModal: React.FC<AddDebtModalProps> = ({ isOpen, onClose, onAddDebt }) => {
  const [name, setName] = useState('');
  const [creditor, setCreditor] = useState('');
  const [remainingBalance, setRemainingBalance] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [paymentDay, setPaymentDay] = useState('');
  const [installmentsPaid, setInstallmentsPaid] = useState('0');
  const [installmentsTotal, setInstallmentsTotal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !remainingBalance || !monthlyPayment || !paymentDay || !installmentsTotal) return;

    onAddDebt({
      name,
      creditor,
      remainingBalance: parseFloat(remainingBalance),
      monthlyPayment: parseFloat(monthlyPayment),
      paymentDay: parseInt(paymentDay, 10),
      installmentsPaid: parseInt(installmentsPaid, 10),
      installmentsTotal: parseInt(installmentsTotal, 10),
    });

    // Reset form
    setName('');
    setCreditor('');
    setRemainingBalance('');
    setMonthlyPayment('');
    setPaymentDay('');
    setInstallmentsPaid('0');
    setInstallmentsTotal('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nova Dívida</h2>
          <button onClick={onClose}><XIcon className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Nome da Dívida</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
          </div>
          <div>
            <label>Credor (opcional)</label>
            <input type="text" value={creditor} onChange={e => setCreditor(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Saldo Devedor (R$)</label>
              <input type="number" step="0.01" value={remainingBalance} onChange={e => setRemainingBalance(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
            </div>
            <div>
              <label>Pagamento Mensal (R$)</label>
              <input type="number" step="0.01" value={monthlyPayment} onChange={e => setMonthlyPayment(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label>Dia Venc.</label>
              <input type="number" min="1" max="31" value={paymentDay} onChange={e => setPaymentDay(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
            </div>
            <div>
              <label>Parcelas Pagas</label>
              <input type="number" min="0" value={installmentsPaid} onChange={e => setInstallmentsPaid(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
            </div>
            <div>
              <label>Total Parcelas</label>
              <input type="number" min="1" value={installmentsTotal} onChange={e => setInstallmentsTotal(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-md text-white bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDebtModal;