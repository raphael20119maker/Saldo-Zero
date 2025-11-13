

// FIX: Remove self-import causing declaration conflict.
export enum TransactionType {
  EARNING = 'earning',
  EXPENSE = 'expense',
}

// FIX: Define and export the View type for app navigation state.
export type View = 'dashboard' | 'summary' | 'debts' | 'cards' | 'investments' | 'notes';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string; // YYYY-MM-DD
  category: string;
  paymentMethod: 'debit' | 'credit' | 'pix' | 'other';
  creditCardId?: string;
  isInstallment?: boolean;
  installmentsCurrent?: number;
  installmentsTotal?: number;
  totalPurchaseAmount?: number;
  purchaseId?: string;
  reserveId?: string;
}

export interface Debt {
  id: string;
  name: string;
  creditor: string;
  remainingBalance: number;
  monthlyPayment: number;
  paymentDay: number;
  installmentsPaid: number;
  installmentsTotal: number;
  interest?: number;
  category?: string;
}

export type CreditCardFlag = 'visa' | 'mastercard' | 'amex' | 'elo' | 'other';

export interface CreditCard {
  id: string;
  name: string;
  limit: number;
  closingDay: number;
  paymentDay: number;
  flag: CreditCardFlag;
  issuer?: string;
  type: 'credit' | 'debit';
  status: 'active' | 'inactive';
  color: string;
  initialCommittedLimit?: number;
  currentInvoiceAmount?: number;
}

export interface RecurringEarning {
  id: string;
  description: string;
  amount: number;
  day: number;
}

export interface RecurringExpense {
  id: string;
  description: string;
  amount: number;
  day: number;
  category: string;
  paymentMethod: 'debit' | 'credit' | 'pix' | 'other';
  creditCardId?: string;
}

export interface InvestmentReserve {
    id: string;
    name: string;
    type: 'emergency' | 'goal';
    balance: number;
    goal?: number;
}