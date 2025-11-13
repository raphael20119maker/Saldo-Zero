import React, { useState } from 'react';
import { CreditCard, CreditCardFlag } from '../types.ts';
import { XIcon } from './icons/XIcon.tsx';

interface AddCreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCreditCard: (card: Omit<CreditCard, 'id'>) => void;
}

const cardFlags: CreditCardFlag[] = ['visa', 'mastercard', 'amex', 'elo', 'other'];
const colors = ['#3B82F6', '#EF4444', '#22C55E', '#F59E0B', '#6366F1', '#8B5CF6'];

const AddCreditCardModal: React.FC<AddCreditCardModalProps> = ({ isOpen, onClose, onAddCreditCard }) => {
  const [name, setName] = useState('');
  const [issuer, setIssuer] = useState('');
  const [limit, setLimit] = useState('');
  const [closingDay, setClosingDay] = useState('');
  const [paymentDay, setPaymentDay] = useState('');
  const [flag, setFlag] = useState<CreditCardFlag>('visa');
  const [type, setType] = useState<'credit' | 'debit'>('credit');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [color, setColor] = useState(colors[0]);
  const [initialCommittedLimit, setInitialCommittedLimit] = useState('');
  const [currentInvoiceAmount, setCurrentInvoiceAmount] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !limit || !closingDay || !paymentDay) return;

    onAddCreditCard({
      name,
      limit: parseFloat(limit),
      closingDay: parseInt(closingDay, 10),
      paymentDay: parseInt(paymentDay, 10),
      flag,
      issuer,
      type,
      status,
      color,
      initialCommittedLimit: parseFloat(initialCommittedLimit) || 0,
      currentInvoiceAmount: parseFloat(currentInvoiceAmount) || 0,
    });

    // Reset form
    setName(''); setIssuer(''); setLimit(''); setClosingDay(''); setPaymentDay('');
    setFlag('visa'); setType('credit'); setStatus('active'); setColor(colors[0]);
    setInitialCommittedLimit(''); setCurrentInvoiceAmount('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md m-4 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Novo Cartão</h2>
          <button onClick={onClose}><XIcon className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Apelido do Cartão</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Cartão Roxo" required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
          </div>
          <div>
            <label>Banco Emissor</label>
            <input type="text" value={issuer} onChange={e => setIssuer(e.target.value)} placeholder="Ex: Nubank" className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Limite Total (R$)</label>
              <input type="number" step="0.01" value={limit} onChange={e => setLimit(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
            </div>
             <div>
              <label>Bandeira</label>
              <select value={flag} onChange={e => setFlag(e.target.value as CreditCardFlag)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm">
                {cardFlags.map(f => <option key={f} value={f} className="capitalize">{f}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Dia do Fechamento</label>
              <input type="number" min="1" max="31" value={closingDay} onChange={e => setClosingDay(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
            </div>
            <div>
              <label>Dia do Vencimento</label>
              <input type="number" min="1" max="31" value={paymentDay} onChange={e => setPaymentDay(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
            </div>
          </div>
          <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Para cartões já em uso:</h3>
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-xs">Limite Comprometido (R$)</label>
                  <input type="number" step="0.01" value={initialCommittedLimit} onChange={e => setInitialCommittedLimit(e.target.value)} placeholder="Total gasto" className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
               </div>
                <div>
                  <label className="text-xs">Fatura em Aberto (R$)</label>
                  <input type="number" step="0.01" value={currentInvoiceAmount} onChange={e => setCurrentInvoiceAmount(e.target.value)} placeholder="Fatura deste mês" className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
               </div>
             </div>
          </div>
          <div>
            <label>Cor de Identificação</label>
            <div className="flex gap-2 mt-1">
              {colors.map(c => (
                <button type="button" key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full transition-transform transform hover:scale-110 ${color === c ? 'ring-2 ring-offset-2 dark:ring-offset-slate-800 ring-primary' : ''}`} style={{ backgroundColor: c }}></button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-md text-white bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90">Adicionar Cartão</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCreditCardModal;