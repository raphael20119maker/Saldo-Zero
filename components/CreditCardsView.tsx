
import React from 'react';
import { CreditCard, Transaction, RecurringExpense } from '../types.ts';
import { PlusIcon } from './icons/PlusIcon.tsx';
// FIX: Corrected import path for calculations to be explicitly relative.
import { getCommittedLimit } from '../utils/calculations.ts';

interface CreditCardsViewProps {
  creditCards: CreditCard[];
  transactions: Transaction[];
  recurringExpenses: RecurringExpense[];
  onAddCreditCard: () => void;
  onViewCardDetails: (card: CreditCard) => void;
}

const CreditCardComponent: React.FC<{
  card: CreditCard;
  transactions: Transaction[];
  recurringExpenses: RecurringExpense[];
  onClick: () => void;
}> = ({ card, transactions, recurringExpenses, onClick }) => {
  const committedLimit = getCommittedLimit(card, transactions, recurringExpenses);
  const availableLimit = card.limit - committedLimit;
  const progress = (committedLimit / card.limit) * 100;

  return (
    <div
      onClick={onClick}
      className="p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 text-white"
      style={{ backgroundColor: card.color }}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg">{card.name}</span>
        <span className="text-sm capitalize">{card.flag}</span>
      </div>
      <div className="mt-4">
        <p className="text-sm opacity-80">Limite Disponível</p>
        <p className="text-2xl font-semibold">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(availableLimit)}
        </p>
      </div>
      <div className="mt-2">
        <div className="w-full bg-white/30 rounded-full h-2">
          <div className="bg-white h-2 rounded-full" style={{ width: `${100 - Math.min(progress, 100)}%` }}></div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(committedLimit)}</span>
          <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(card.limit)}</span>
        </div>
      </div>
    </div>
  );
};

const CreditCardsView: React.FC<CreditCardsViewProps> = ({ creditCards, transactions, recurringExpenses, onAddCreditCard, onViewCardDetails }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">Meus Cartões</h2>
        <button
          onClick={onAddCreditCard}
          className="flex items-center text-sm bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Novo Cartão
        </button>
      </div>

      {creditCards.length === 0 ? (
        <div className="text-center py-8 px-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
          <h3 className="text-lg font-semibold">Nenhum cartão cadastrado</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Adicione seu primeiro cartão de crédito para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creditCards.filter(c => c.status === 'active').map(card => (
            <CreditCardComponent
              key={card.id}
              card={card}
              transactions={transactions}
              recurringExpenses={recurringExpenses}
              onClick={() => onViewCardDetails(card)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreditCardsView;