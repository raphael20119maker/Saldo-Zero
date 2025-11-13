
// FIX: Implement calculation logic and export functions.
import { CreditCard, Transaction, RecurringExpense, TransactionType } from '../types.ts';

/**
 * Calculates the current invoice amount for a credit card for the current month.
 * It considers transactions made after the closing day of the previous month
 * until the closing day of the current month.
 */
export const calculateCurrentMonthInvoice = (
  card: CreditCard,
  transactions: Transaction[],
  recurringExpenses: RecurringExpense[]
): number => {
    const now = new Date();
    // Set time to 0 to avoid timezone issues with date comparisons
    now.setHours(0, 0, 0, 0); 
    
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    // Dates for invoice period
    const closingDateThisMonth = new Date(currentYear, currentMonth, card.closingDay);
    const closingDateLastMonth = new Date(currentYear, currentMonth - 1, card.closingDay);

    // If today is after this month's closing date, the "current" invoice is for the next period.
    if (now > closingDateThisMonth) {
        closingDateLastMonth.setMonth(closingDateLastMonth.getMonth() + 1);
        closingDateThisMonth.setMonth(closingDateThisMonth.getMonth() + 1);
    }
    
    const invoiceTransactions = transactions.filter(t => {
        if (t.creditCardId !== card.id || t.type !== TransactionType.EXPENSE) {
            return false;
        }
        const transactionDate = new Date(t.date);
        transactionDate.setHours(0,0,0,0); // Adjust for comparison
        // Include transactions from the day after last month's closing until this month's closing day
        return transactionDate > closingDateLastMonth && transactionDate <= closingDateThisMonth;
    });

    const invoiceRecurringExpenses = recurringExpenses.filter(e => e.creditCardId === card.id);

    const totalFromTransactions = invoiceTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalFromRecurring = invoiceRecurringExpenses.reduce((sum, e) => sum + e.amount, 0);
    
    // Use currentInvoiceAmount as a base for cards already in use when the app started.
    return (card.currentInvoiceAmount || 0) + totalFromTransactions + totalFromRecurring;
};

/**
 * Calculates the total committed limit for a credit card.
 * This includes all open purchases, both single and installments.
 */
export const getCommittedLimit = (
  card: CreditCard,
  transactions: Transaction[],
  recurringExpenses: RecurringExpense[]
): number => {
  const creditTransactionsTotal = transactions
    .filter(t => t.creditCardId === card.id && t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);

  const recurringExpensesTotal = recurringExpenses
    .filter(e => e.creditCardId === card.id)
    .reduce((sum, e) => sum + e.amount, 0);
  
  // initialCommittedLimit is for purchases made before tracking began.
  return (card.initialCommittedLimit || 0) + creditTransactionsTotal + recurringExpensesTotal;
};
