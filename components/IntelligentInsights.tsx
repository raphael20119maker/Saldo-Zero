
import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for geminiService to be explicitly relative.
import { getIntelligentInsight } from '../services/geminiService.ts';
import type { Transaction, Debt } from '../types.ts';
import { RefreshIcon } from './icons/RefreshIcon.tsx';

interface IntelligentInsightsProps {
  transactions: Transaction[];
  debts: Debt[];
}

const IntelligentInsights: React.FC<IntelligentInsightsProps> = ({ transactions, debts }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInsight = async () => {
    setLoading(true);
    try {
      const newInsight = await getIntelligentInsight(transactions, debts);
      setInsight(newInsight);
    } catch (error) {
      console.error(error);
      setInsight("Continue organizando suas finanças. A disciplina é a chave para alcançar seus objetivos!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transactions.length > 0 || debts.length > 0) {
      fetchInsight();
    } else {
      setInsight("Adicione suas transações para receber insights.");
      setLoading(false);
    }
  }, [transactions, debts]);

  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-base font-bold text-blue-800 dark:text-blue-200">💡 Insight Inteligente</h3>
          {loading ? (
             <div className="animate-pulse mt-2">
                <div className="h-4 bg-blue-200 dark:bg-blue-800 rounded w-5/6"></div>
                <div className="h-4 bg-blue-200 dark:bg-blue-800 rounded w-2/3 mt-1"></div>
            </div>
          ) : (
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">{insight}</p>
          )}
        </div>
         <button onClick={fetchInsight} disabled={loading} className="p-1.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ml-2">
            <RefreshIcon className={`w-5 h-5 text-blue-600 dark:text-blue-400 ${loading ? 'animate-spin' : ''}`} />
            <span className="sr-only">Novo insight</span>
        </button>
      </div>
    </div>
  );
};

export default IntelligentInsights;