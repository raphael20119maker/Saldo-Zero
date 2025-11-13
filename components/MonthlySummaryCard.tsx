
import React from 'react';
// FIX: Corrected import path for types to be explicitly relative.
import { Transaction, TransactionType } from '../types.ts';

interface MonthlySummaryCardProps {
    transactions: Transaction[];
}

const MonthlySummaryCard: React.FC<MonthlySummaryCardProps> = ({ transactions }) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });

    const earnings = monthlyTransactions.filter(t => t.type === TransactionType.EARNING).reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthlyTransactions.filter(t => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + t.amount, 0);
    const balance = earnings - expenses;

    return (
        <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
            <h3 className="text-lg font-bold mb-3 text-slate-700 dark:text-slate-200">Resumo do Mês</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">Ganhos:</span> 
                    <span className="font-semibold text-success">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(earnings)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">Gastos:</span> 
                    <span className="font-semibold text-danger">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(expenses)}</span>
                </div>
                <div className="border-t border-slate-300 dark:border-slate-600 my-1"></div>
                <div className="flex justify-between font-bold">
                    <span>Balanço:</span> 
                    <span className={balance >= 0 ? '' : 'text-danger'}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance)}</span>
                </div>
            </div>
        </div>
    );
};

export default MonthlySummaryCard;