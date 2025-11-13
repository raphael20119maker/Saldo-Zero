
import React from 'react';
import { CreditCard, Transaction, RecurringExpense, TransactionType } from '../types.ts';
import { XIcon } from './icons/XIcon.tsx';
import { PencilSquareIcon } from './icons/PencilSquareIcon.tsx';
import { calculateCurrentMonthInvoice, getCommittedLimit } from '../utils/calculations.ts';

interface CardDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    card: CreditCard | null;
    transactions: Transaction[];
    recurringExpenses: RecurringExpense[];
    onEdit: (card: CreditCard) => void;
    onPayInvoice: (card: CreditCard, invoiceAmount: number) => void;
}

const CardDetailModal: React.FC<CardDetailModalProps> = ({ isOpen, onClose, card, transactions, recurringExpenses, onEdit, onPayInvoice }) => {
    if (!isOpen || !card) return null;

    const invoiceAmount = calculateCurrentMonthInvoice(card, transactions, recurringExpenses);
    const committedLimit = getCommittedLimit(card, transactions, recurringExpenses);
    const availableLimit = card.limit - committedLimit;
    const limitProgress = (committedLimit / card.limit) * 100;

    const cardTransactions = transactions
        .filter(t => t.creditCardId === card.id && t.type === TransactionType.EXPENSE)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md m-4 my-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{card.name}</h2>
                    <div className="flex items-center gap-2">
                         <button onClick={() => onEdit(card)}><PencilSquareIcon className="w-6 h-6 text-slate-500 hover:text-primary" /></button>
                         <button onClick={onClose}><XIcon className="w-6 h-6" /></button>
                    </div>
                </div>

                <div className="p-4 rounded-lg text-white mb-4" style={{ backgroundColor: card.color }}>
                    <p className="text-sm opacity-80">Limite Disponível</p>
                    <p className="text-3xl font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(availableLimit)}</p>
                    <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                        <div className="bg-white h-2 rounded-full" style={{ width: `${100 - limitProgress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                        <span>Usado: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(committedLimit)}</span>
                        <span>Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(card.limit)}</span>
                    </div>
                </div>

                <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">Fatura Atual</p>
                            <p className="text-2xl font-bold text-danger">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(invoiceAmount)}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Fecha em {card.closingDay} / Vence em {card.paymentDay}</p>
                        </div>
                        <button 
                            onClick={() => onPayInvoice(card, invoiceAmount)}
                            className="px-4 py-2 text-sm rounded-md text-white bg-primary hover:bg-primary/90 disabled:bg-slate-400 dark:disabled:bg-slate-600"
                            disabled={invoiceAmount <= 0}
                        >
                            Pagar Fatura
                        </button>
                    </div>
                </div>
                
                <div>
                    <h3 className="font-bold mb-2">Últimos Gastos</h3>
                    {cardTransactions.length > 0 ? (
                        <ul className="space-y-2 max-h-48 overflow-y-auto">
                            {cardTransactions.map(t => (
                                <li key={t.id} className="flex justify-between items-center text-sm">
                                    <div>
                                        <p>{t.description}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(t.date).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                    <p className="font-semibold text-danger">-{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.amount)}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">Nenhum gasto neste cartão ainda.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CardDetailModal;
