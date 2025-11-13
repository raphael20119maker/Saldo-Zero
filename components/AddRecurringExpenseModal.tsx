
import React, { useState } from 'react';
// FIX: Corrected import path for types to be explicitly relative.
import { RecurringExpense, CreditCard } from '../types.ts';
// FIX: Add explicit .tsx extension to local module imports.
import { XIcon } from './icons/XIcon.tsx';

interface AddRecurringExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecurringExpense: (expense: Omit<RecurringExpense, 'id'>) => void;
  creditCards: CreditCard[];
}

const expenseCategories = ['Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Assinaturas', 'Compras', 'Outros'];

const AddRecurringExpenseModal: React.FC<AddRecurringExpenseModalProps> = ({ isOpen, onClose, onAddRecurringExpense, creditCards }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [day, setDay] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'pix' | 'other'>('debit');
  const [creditCardId, setCreditCardId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !day || !category) return;
    if (paymentMethod === 'credit' && !creditCardId) return;

    onAddRecurringExpense({
      description,
      amount: parseFloat(amount),
      day: parseInt(day, 10),
      category,
      paymentMethod,
      creditCardId: paymentMethod === 'credit' ? creditCardId : undefined,
    });

    // Reset form and close
    setDescription('');
    setAmount('');
    setDay('');
    setCategory('');
    setPaymentMethod('debit');
    setCreditCardId('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200">Novo Gasto Mensal Recorrente</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="rec-expense-desc" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Descrição</label>
            <input type="text" id="rec-expense-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ex: Assinatura de Streaming" className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" required />
          </div>
          
          <div>
            <label htmlFor="rec-expense-category" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Categoria</label>
            <select id="rec-expense-category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" required>
              <option value="" disabled>Selecione...</option>
              {expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="rec-expense-amount" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Valor (R$)</label>
              <input type="number" step="0.01" id="rec-expense-amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" required />
            </div>
            <div>
              <label htmlFor="rec-expense-day" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Dia do Pagamento</label>
              <input type="number" id="rec-expense-day" min="1" max="31" value={day} onChange={(e) => setDay(e.target.value)} placeholder="Ex: 10" className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" required />
            </div>
          </div>
          
           <div>
              <label htmlFor="rec-paymentMethod" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Método de Pagamento</label>
              <select id="rec-paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as any)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm">
                <option value="debit">Débito</option>
                <option value="credit">Crédito</option>
                <option value="pix">PIX</option>
                <option value="other">Outro</option>
              </select>
            </div>

          {paymentMethod === 'credit' && (
             <div>
              <label htmlFor="rec-creditCard" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Cartão de Crédito</label>
              <select id="rec-creditCard" value={creditCardId} onChange={(e) => setCreditCardId(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" required>
                <option value="" disabled>Selecione o cartão...</option>
                {creditCards.map(card => <option key={card.id} value={card.id}>{card.name}</option>)}
              </select>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-md text-white bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90">Salvar Gasto</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecurringExpenseModal;