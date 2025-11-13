
import React from 'react';
import { CreditCard, Transaction, RecurringExpense } from '../types.ts';
import { calculateCurrentMonthInvoice } from '../utils/calculations.ts';
import { CreditCardIcon } from './icons/CreditCardIcon.tsx';

interface OpenInvoicesSummaryProps {
    creditCards: CreditCard[];
    transactions: Transaction[];
    recurringExpenses: RecurringExpense[];
}

const OpenInvoicesSummary: React.FC<OpenInvoicesSummaryProps> = ({ creditCards, transactions, recurringExpenses }) => {
    const activeCards = creditCards.filter(c => c.status === 'active');
    
    if (activeCards.length === 0) {
        return null;
    }

    return (
        <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
            <div className="flex items-center mb-3">
                <CreditCardIcon className="w-6 h-6 mr-3 text-blue-500" />
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Faturas em Aberto</h3>
            </div>
            <ul className="space-y-3">
                {activeCards.map(card => {
                    const invoiceAmount = calculateCurrentMonthInvoice(card, transactions, recurringExpenses);
                    const progress = card.limit > 0 ? (invoiceAmount / card.limit) * 100 : 0;

                    return (
                        <li key={card.id}>
                            <div className="flex justify-between items-center text-sm mb-1">
                                <span className="font-semibold">{card.name}</span>
                                <span className="font-bold text-danger">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(invoiceAmount)}
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                                <div className="h-2 rounded-full" style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: card.color }}></div>
                            </div>
                            <div className="flex justify-between text-xs mt-1 text-slate-500 dark:text-slate-400">
                                <span>Fecha dia {card.closingDay}</span>
                                <span>Limite: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(card.limit)}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default OpenInvoicesSummary;
