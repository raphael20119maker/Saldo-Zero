import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType, CreditCard } from '../types.ts';
import { v4 as uuidv4 } from 'uuid';
import { XIcon } from './icons/XIcon.tsx';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onAddMultipleTransactions: (transactions: Omit<Transaction, 'id'>[]) => void;
  creditCards: CreditCard[];
  initialData?: Partial<Omit<Transaction, 'id'>> | null;
}

const expenseCategories = ['Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Assinaturas', 'Compras', 'Pagamento de Fatura', 'Transferência para Meta', 'Outros'];
const earningCategories = ['Salário', 'Freelance', 'Investimentos', 'Presente', 'Outros'];

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onAddTransaction, onAddMultipleTransactions, creditCards, initialData }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'debit' | 'credit' | 'pix' | 'other'>('debit');
  const [creditCardId, setCreditCardId] = useState<string>('');
  const [isInstallment, setIsInstallment] = useState(false);
  const [installments, setInstallments] = useState('2');
  const [installmentPreview, setInstallmentPreview] = useState<{ number: number; total: number; amount: number; date: Date }[]>([]);

  const resetForm = () => {
    setType(TransactionType.EXPENSE);
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setCategory('');
    setPaymentMethod('debit');
    setCreditCardId('');
    setIsInstallment(false);
    setInstallments('2');
    setInstallmentPreview([]);
  };

  useEffect(() => {
    if (initialData) {
      setType(initialData.type || TransactionType.EXPENSE);
      setDescription(initialData.description || '');
      setAmount(initialData.amount ? String(initialData.amount) : '');
      setCategory(initialData.category || '');
      setPaymentMethod(initialData.paymentMethod || 'debit');
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    if (isInstallment && amount && installments) {
      const totalAmount = parseFloat(amount);
      const numInstallments = parseInt(installments, 10);
      if (totalAmount > 0 && numInstallments >= 2) {
        const installmentAmount = totalAmount / numInstallments;
        const purchaseDate = new Date(date);
        const preview = [];
        for (let i = 0; i < numInstallments; i++) {
          const installmentDate = new Date(purchaseDate);
          installmentDate.setMonth(purchaseDate.getMonth() + i);
          preview.push({
            number: i + 1,
            total: numInstallments,
            amount: installmentAmount,
            date: installmentDate
          });
        }
        setInstallmentPreview(preview);
      } else {
        setInstallmentPreview([]);
      }
    } else {
      setInstallmentPreview([]);
    }
  }, [isInstallment, amount, installments, date]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date || !category) return;
    if (paymentMethod === 'credit' && !creditCardId) return;

    if (paymentMethod === 'credit' && isInstallment && installmentPreview.length > 0) {
      const totalAmount = parseFloat(amount);
      const purchaseId = uuidv4();
      const transactionsToCreate: Omit<Transaction, 'id'>[] = installmentPreview.map(p => ({
          type,
          description: `${description} (${p.number}/${p.total})`,
          amount: p.amount,
          date: p.date.toISOString().split('T')[0],
          category,
          paymentMethod,
          creditCardId,
          isInstallment: true,
          installmentsCurrent: p.number,
          installmentsTotal: p.total,
          totalPurchaseAmount: totalAmount,
          purchaseId
      }));
      onAddMultipleTransactions(transactionsToCreate);
    } else {
      onAddTransaction({
        type,
        description,
        amount: parseFloat(amount),
        date,
        category,
        paymentMethod,
        creditCardId: paymentMethod === 'credit' ? creditCardId : undefined,
        reserveId: initialData?.reserveId
      });
    }

    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const categories = type === TransactionType.EXPENSE ? expenseCategories : earningCategories;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md m-4 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nova Transação</h2>
          <button onClick={onClose}><XIcon className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setType(TransactionType.EXPENSE)} className={`w-full py-2 rounded-md ${type === TransactionType.EXPENSE ? 'bg-danger text-white' : 'bg-slate-200 dark:bg-slate-700'}`} disabled={!!initialData}>Gasto</button>
              <button type="button" onClick={() => setType(TransactionType.EARNING)} className={`w-full py-2 rounded-md ${type === TransactionType.EARNING ? 'bg-success text-white' : 'bg-slate-200 dark:bg-slate-700'}`} disabled={!!initialData}>Ganho</button>
            </div>
          </div>
          <div>
            <label>Descrição</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Valor (R$)</label>
              <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
            </div>
            <div>
              <label>Data</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
            </div>
          </div>
          <div>
            <label>Categoria</label>
            <select value={category} onChange={e => setCategory(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" disabled={!!initialData?.category}>
              <option value="" disabled>Selecione...</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label>Método de Pagamento</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as any)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" disabled={!!initialData?.paymentMethod}>
              <option value="debit">Débito</option>
              <option value="credit">Crédito</option>
              <option value="pix">PIX</option>
              <option value="other">Outro</option>
            </select>
          </div>
          {paymentMethod === 'credit' && (
             <>
              <div>
                <label>Cartão de Crédito</label>
                <select value={creditCardId} onChange={(e) => setCreditCardId(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" required>
                  <option value="" disabled>Selecione o cartão...</option>
                  {creditCards.map(card => <option key={card.id} value={card.id}>{card.name}</option>)}
                </select>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Este gasto será adicionado à fatura correspondente e comprometerá seu limite.</p>
              </div>
              <div className="flex items-center gap-4">
                <input type="checkbox" id="isInstallment" checked={isInstallment} onChange={e => setIsInstallment(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <label htmlFor="isInstallment">Parcelar compra?</label>
                {isInstallment && (
                   <input type="number" min="2" value={installments} onChange={e => setInstallments(e.target.value)} className="block w-24 rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm" />
                )}
              </div>
              {isInstallment && installmentPreview.length > 0 && (
                <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg max-h-32 overflow-y-auto">
                  <h4 className="font-semibold text-sm mb-2">Previsão das Parcelas:</h4>
                  <ul className="space-y-1 text-xs">
                    {installmentPreview.map(p => (
                      <li key={p.number} className="flex justify-between items-center">
                        <span>{`Parcela ${p.number}/${p.total}`}</span>
                        <span className="text-slate-500 dark:text-slate-400">{p.date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })}</span>
                        <span className="font-semibold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.amount)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-md text-white bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
