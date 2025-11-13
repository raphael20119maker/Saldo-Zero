
import React from 'react';
import { Debt, CreditCard } from '../types.ts';
import { BellIcon } from './icons/BellIcon.tsx';

interface UpcomingPaymentsProps {
    debts: Debt[];
    creditCards: CreditCard[];
}

const UpcomingPayments: React.FC<UpcomingPaymentsProps> = ({ debts, creditCards }) => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    const upcoming = [];

    // Check for debts due soon
    debts.forEach(debt => {
        if (debt.paymentDay >= dayOfMonth && debt.paymentDay <= dayOfMonth + 7) {
            upcoming.push({ name: debt.name, day: debt.paymentDay, amount: debt.monthlyPayment, type: 'Dívida' });
        }
    });

    // Check for card invoices due soon
    creditCards.forEach(card => {
        if (card.paymentDay >= dayOfMonth && card.paymentDay <= dayOfMonth + 7) {
            // Invoice amount would ideally be calculated, but we'll use a placeholder/prop if not available
            upcoming.push({ name: `Fatura ${card.name}`, day: card.paymentDay, amount: card.currentInvoiceAmount || 0, type: 'Cartão' });
        }
    });

    const sortedUpcoming = upcoming.sort((a, b) => a.day - b.day);

    if (sortedUpcoming.length === 0) {
        return null; // Don't render if nothing is upcoming
    }

    return (
        <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
            <div className="flex items-center mb-3">
                <BellIcon className="w-6 h-6 mr-3 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Próximos Pagamentos</h3>
            </div>
            <ul className="space-y-3">
                {sortedUpcoming.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Vence dia {item.day} - {item.type}</p>
                        </div>
                        <p className="font-bold text-danger">
                           {item.amount > 0 ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.amount) : "N/A"}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpcomingPayments;
