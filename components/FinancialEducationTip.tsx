
import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for geminiService to be explicitly relative.
import { getFinancialTip } from '../services/geminiService.ts';
import { StarIcon } from './icons/StarIcon.tsx';
import { RefreshIcon } from './icons/RefreshIcon.tsx';

const FinancialEducationTip: React.FC = () => {
  const [tip, setTip] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTip = async () => {
    setLoading(true);
    try {
      const newTip = await getFinancialTip();
      setTip(newTip);
    } catch (error) {
      console.error(error);
      setTip("Lembre-se de revisar seu orçamento regularmente para garantir que seus gastos estão alinhados com suas metas financeiras.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-center flex-1">
            <StarIcon className="w-6 h-6 mr-3 text-yellow-500 flex-shrink-0" />
            <div className="flex-1">
                <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">Dica Financeira</h3>
                {loading ? (
                    <div className="animate-pulse mt-1">
                        <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-1/2 mt-1"></div>
                    </div>
                ) : (
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{tip}</p>
                )}
            </div>
        </div>
        <button onClick={fetchTip} disabled={loading} className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ml-2">
            <RefreshIcon className={`w-5 h-5 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
            <span className="sr-only">Nova dica</span>
        </button>
      </div>
    </div>
  );
};

export default FinancialEducationTip;