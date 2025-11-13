import React from 'react';
import { Transaction, Debt, CreditCard, RecurringExpense, RecurringEarning, InvestmentReserve } from '../types.ts';
import EventCalendar from './EventCalendar.tsx';
import InvestmentsView from './InvestmentsView.tsx';
import NotesView from './NotesView.tsx';
import TotalDebtSummary from './TotalDebtSummary.tsx';

interface SummaryViewProps {
  transactions: Transaction[];
  debts: Debt[];
  creditCards: CreditCard[];
  recurringExpenses: RecurringExpense[];
  recurringEarnings: RecurringEarning[];
  reserves: InvestmentReserve[];
  notes: string;
  setNotes: (notes: string) => void;
  onAddReserve: () => void;
  onContributeToReserve: (reserve: InvestmentReserve) => void;
}

const SummaryView: React.FC<SummaryViewProps> = ({ 
  transactions, 
  debts, 
  creditCards, 
  recurringExpenses, 
  recurringEarnings,
  reserves,
  notes,
  setNotes,
  onAddReserve,
  onContributeToReserve
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">Calendário Financeiro</h2>
        <EventCalendar 
          transactions={transactions}
          debts={debts} 
          creditCards={creditCards}
          recurringExpenses={recurringExpenses} 
          recurringEarnings={recurringEarnings}
        />
      </div>

       <TotalDebtSummary debts={debts} creditCards={creditCards} transactions={transactions} recurringExpenses={recurringExpenses} />

      <div>
        <InvestmentsView 
          reserves={reserves} 
          onAddReserve={onAddReserve} 
          onContribute={onContributeToReserve}
        />
      </div>

      <div>
        <NotesView notes={notes} setNotes={setNotes} />
      </div>
    </div>
  );
};

export default SummaryView;
