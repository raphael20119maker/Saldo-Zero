
import React from 'react';
// FIX: Corrected import paths for types to be explicitly relative.
import { Transaction, Debt, TransactionType, CreditCard, RecurringExpense } from '../types.ts';
// FIX: Corrected import paths for calculations to be explicitly relative.
import { calculateCurrentMonthInvoice } from '../utils/calculations.ts';

interface BalanceCardProps {
  transactions: Transaction[];
  debts: Debt[];
  creditCards: CreditCard[];
  recurringExpenses: RecurringExpense[];
}

const BalanceCard: React.FC<BalanceCardProps> = ({ transactions, debts, recurringExpenses, creditCards }) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthFilter = (item: { date: string } | { day: number }) => {
        if ('date' in item) {
            const itemDate = new Date(item.date);
            return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
        }
        // For recurring items, we assume they apply every month
        return true; 
    };

    const monthlyTransactions = transactions.filter(currentMonthFilter);
    const monthlyEarnings = monthlyTransactions
        .filter(t => t.type === TransactionType.EARNING)
        .reduce((sum, t) => sum + t.amount, 0);

    const monthlyDirectExpenses = monthlyTransactions
        .filter(t => t.type === TransactionType.EXPENSE && t.paymentMethod !== 'credit')
        .reduce((sum, t) => sum + t.amount, 0);

    const monthlyDebtsCommitment = debts.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
    
    const monthlyRecurringExpensesCommitment = recurringExpenses
        .filter(e => e.paymentMethod !== 'credit')
        .reduce((sum, expense) => sum + expense.amount, 0);

    const monthlyCreditCardInvoices = creditCards.reduce((sum, card) => {
        const cardRecurringExpenses = recurringExpenses.filter(e => e.creditCardId === card.id);
        return sum + calculateCurrentMonthInvoice(card, monthlyTransactions, cardRecurringExpenses);
    }, 0);

    const totalCommitments = monthlyDebtsCommitment + monthlyRecurringExpensesCommitment + monthlyCreditCardInvoices;
    const currentBalance = monthlyEarnings - monthlyDirectExpenses - totalCommitments;

  return (
    <div className="p-5 bg-gradient-to-br from-primary to-blue-600 dark:from-primary-dark dark:to-blue-800 rounded-2xl shadow-lg text-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-80">Balanço do Mês</p>
          <p className={`text-3xl font-bold tracking-tight ${currentBalance < 0 ? 'text-red-300' : ''}`}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentBalance)}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 text-center bg-white/10 p-3 rounded-lg">
        <div>
          <p className="text-xs opacity-80">Ganhos</p>
          <p className="font-semibold text-green-300">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyEarnings)}</p>
        </div>
        <div>
          <p className="text-xs opacity-80">Gastos</p>
          <p className="font-semibold text-red-300">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyDirectExpenses)}</p>
        </div>
        <div>
          <p className="text-xs opacity-80">Compromissos</p>
          <p className="font-semibold text-amber-300">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCommitments)}</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;