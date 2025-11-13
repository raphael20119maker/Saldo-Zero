
import React from 'react';
// FIX: Add explicit .tsx extension to local module imports and correct paths.
import { Transaction, Debt, CreditCard, RecurringExpense, RecurringEarning, InvestmentReserve } from '../types.ts';
import BalanceCard from './BalanceCard.tsx';
import TransactionList from './TransactionList.tsx';
import FinancialEducationTip from './FinancialEducationTip.tsx';
import IntelligentInsights from './IntelligentInsights.tsx';
import MonthlyForecastCard from './MonthlyForecastCard.tsx';
import OpenInvoicesSummary from './OpenInvoicesSummary.tsx';
import DebtList from './DebtList.tsx';
import InvestmentsView from './InvestmentsView.tsx';
import UpcomingPayments from './UpcomingPayments.tsx';


interface DashboardProps {
  transactions: Transaction[];
  debts: Debt[];
  creditCards: CreditCard[];
  recurringExpenses: RecurringExpense[];
  recurringEarnings: RecurringEarning[];
  reserves: InvestmentReserve[];
  onEditDebt: (debt: Debt) => void;
  onAddRecurringEarning: () => void;
  onAddRecurringExpense: () => void;
  onContributeToReserve: (reserve: InvestmentReserve) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  debts,
  creditCards,
  recurringExpenses,
  recurringEarnings,
  reserves,
  onEditDebt,
  onAddRecurringEarning,
  onAddRecurringExpense,
  onContributeToReserve
}) => {
  return (
    <div className="space-y-6">
      <BalanceCard 
        transactions={transactions} 
        debts={debts}
        creditCards={creditCards}
        recurringExpenses={recurringExpenses}
      />
      <IntelligentInsights transactions={transactions} debts={debts} />
      <UpcomingPayments debts={debts} creditCards={creditCards} />
      <OpenInvoicesSummary creditCards={creditCards} transactions={transactions} recurringExpenses={recurringExpenses} />
      <MonthlyForecastCard
        recurringEarnings={recurringEarnings}
        recurringExpenses={recurringExpenses}
        debts={debts}
        onAddRecurringEarning={onAddRecurringEarning}
        onAddRecurringExpense={onAddRecurringExpense}
      />
      <TransactionList transactions={transactions} limit={5} />
      {debts.length > 0 && <DebtList debts={debts.slice(0, 2)} onEdit={onEditDebt} />}
      {reserves.length > 0 && <InvestmentsView reserves={reserves.slice(0, 2)} onAddReserve={() => {}} onContribute={onContributeToReserve} />}
      <FinancialEducationTip />
    </div>
  );
};

export default Dashboard;
