
import React from 'react';
import { XIcon } from './icons/XIcon.tsx';
import { PlusIcon } from './icons/PlusIcon.tsx';
import { CreditCardIcon } from './icons/CreditCardIcon.tsx';

interface AddChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: () => void;
  onAddDebt: () => void;
  onAddCreditCard: () => void;
}

const AddChoiceModal: React.FC<AddChoiceModalProps> = ({ isOpen, onClose, onAddTransaction, onAddDebt, onAddCreditCard }) => {
  if (!isOpen) return null;
  
  const handleChoice = (action: () => void) => {
    onClose();
    action();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-sm m-4 text-center">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">O que deseja adicionar?</h2>
          <button onClick={onClose}><XIcon className="w-6 h-6" /></button>
        </div>
        <div className="space-y-4">
          <button onClick={() => handleChoice(onAddTransaction)} className="w-full flex items-center justify-center gap-3 p-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
            <PlusIcon className="w-6 h-6 text-primary dark:text-primary-dark" />
            <span className="font-semibold">Nova Transação (Gasto/Ganho)</span>
          </button>
          <button onClick={() => handleChoice(onAddDebt)} className="w-full flex items-center justify-center gap-3 p-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary dark:text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 4h.01M4 16V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2v-2m14-2h-2m-2 0h-2m-2 0H8m2 4h2" /></svg>
            <span className="font-semibold">Nova Dívida</span>
          </button>
           <button onClick={() => handleChoice(onAddCreditCard)} className="w-full flex items-center justify-center gap-3 p-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
            <CreditCardIcon className="w-6 h-6 text-primary dark:text-primary-dark" />
            <span className="font-semibold">Novo Cartão de Crédito</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChoiceModal;
