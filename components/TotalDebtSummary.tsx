
import React from 'react';
// FIX: Corrected import path for types to be explicitly relative.
import { Debt, CreditCard, Transaction, RecurringExpense } from '../types.ts';
// FIX: Corrected import path for calculations to be explicitly relative.
import { getCommittedLimit } from '../utils/calculations.ts';

interface TotalDebtSummaryProps {
  debts: Debt[];
  creditCards: CreditCard[];
  transactions: Transaction[];
  recurringExpenses: RecurringExpense[];
}

const TotalDebtSummary: React.FC<TotalDebtSummaryProps> = ({ debts, creditCards, transactions, recurringExpenses }) => {
  const totalRemainingDebt = debts.reduce((sum, d) => sum + Number(d.remainingBalance), 0);
  const totalCreditCardCommitment = creditCards.reduce((sum, card) => {
    // FIX: Pass all required arguments to getCommittedLimit and use its result directly.
    // The function already calculates the commitment from transactions and recurring expenses.
    const commitmentForCard = getCommittedLimit(card, transactions, recurringExpenses);
    return sum + commitmentForCard;
  }, 0);
  const grandTotalDebt = totalRemainingDebt + totalCreditCardCommitment;

  return (
    <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl text-center">
      <h4 className="font-semibold text-sm text-slate-600 dark:text-slate-300">Balanço Total de Dívidas</h4>
      <p className="text-2xl font-bold text-warning">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(grandTotalDebt)}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        (Empréstimos + Faturas Futuras)
      </p>
    </div>
  );
};

export default TotalDebtSummary;