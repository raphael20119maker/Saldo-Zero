
import React from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon.tsx';
import { ChevronRightIcon } from './icons/ChevronRightIcon.tsx';
// FIX: Import CreditCard type.
import { Debt, RecurringExpense, RecurringEarning, Transaction, CreditCard } from '../types.ts';

interface EventCalendarProps {
    debts: Debt[];
    // FIX: Add creditCards to props to display payment days on the calendar.
    creditCards: CreditCard[];
    recurringExpenses: RecurringExpense[];
    recurringEarnings: RecurringEarning[];
    transactions: Transaction[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({ debts, creditCards, recurringExpenses, recurringEarnings, transactions }) => {
    const [currentDate, setCurrentDate] = React.useState(new Date());

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay(); // 0 = Sunday, 1 = Monday...

    const daysInMonth = [];
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
        daysInMonth.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    const blanks = Array(startDay).fill(null);
    const cells = [...blanks, ...daysInMonth];

    const getEventsForDay = (day: Date) => {
        const dayOfMonth = day.getDate();
        const events: { type: string }[] = [];
        if (debts.some(d => d.paymentDay === dayOfMonth)) events.push({ type: 'debt' });
        if (recurringExpenses.some(e => e.day === dayOfMonth)) events.push({ type: 'expense' });
        if (recurringEarnings.some(e => e.day === dayOfMonth)) events.push({ type: 'earning' });
        // FIX: Check for credit card payment days to show them as events.
        if (creditCards.some(c => c.paymentDay === dayOfMonth)) events.push({ type: 'card' });
        const dayStr = day.toISOString().split('T')[0];
        if (transactions.some(t => t.date === dayStr)) events.push({ type: 'transaction' });
        // Return unique event types for the day
        return [...new Map(events.map(item => [item['type'], item])).values()];
    };

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    return (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <button onClick={prevMonth}><ChevronLeftIcon className="w-6 h-6" /></button>
                <h3 className="text-lg font-bold">{currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
                <button onClick={nextMonth}><ChevronRightIcon className="w-6 h-6" /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
            </div>
            <div className="grid grid-cols-7 gap-1 mt-2">
                {cells.map((day, index) => (
                    <div key={index} className={`h-16 border border-slate-200 dark:border-slate-700 rounded p-1 ${!day ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}>
                        {day && (
                            <>
                                <span className="font-semibold">{day.getDate()}</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {getEventsForDay(day).map((event, i) => (
                                        // FIX: Add color for credit card events and handle multiple event types.
                                        <div key={i} className={`w-2 h-2 rounded-full ${event.type === 'debt' ? 'bg-red-500' : event.type === 'expense' ? 'bg-amber-500' : event.type === 'card' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventCalendar;