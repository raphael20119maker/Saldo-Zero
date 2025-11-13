

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// FIX: Corrected import path for types to be explicitly relative.
import { Transaction, TransactionType } from '../types.ts';

interface OverviewChartProps {
    transactions: Transaction[];
}

const OverviewChart: React.FC<OverviewChartProps> = ({ transactions }) => {
    
    const today = new Date();
    const weeklyData = [];

    for (let i = 6; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        
        const formattedDate = day.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
        const filterDate = day.toISOString().split('T')[0]; // YYYY-MM-DD

        const dayTransactions = transactions.filter(t => t.date === filterDate);
        
        const earnings = dayTransactions
            .filter(t => t.type === TransactionType.EARNING)
            .reduce((sum, t) => sum + Number(t.amount), 0);
            
        const expenses = dayTransactions
            .filter(t => t.type === TransactionType.EXPENSE)
            .reduce((sum, t) => sum + Number(t.amount), 0);
        
        weeklyData.push({
            name: formattedDate,
            Ganhos: earnings,
            Gastos: expenses,
        });
    }

    return (
        <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
            <h3 className="text-lg font-bold mb-3 text-slate-700 dark:text-slate-200">Visão Geral da Semana</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `R$${value}`} />
                        <Tooltip formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} />
                        <Legend />
                        <Bar dataKey="Ganhos" fill="#22C55E" />
                        <Bar dataKey="Gastos" fill="#EF4444" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OverviewChart;