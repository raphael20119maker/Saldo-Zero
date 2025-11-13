
import React from 'react';

const FinancialFreedomMap: React.FC = () => {
  // This is a placeholder for a more complex component.
  // It could show steps like "Emergency Fund", "Pay Off Debt", "Invest".
  const steps = [
    { name: 'Fundo de Emergência', completed: true },
    { name: 'Quitar Dívidas', completed: false },
    { name: 'Começar a Investir', completed: false },
  ];

  return (
    <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
      <h3 className="text-lg font-bold mb-3 text-slate-700 dark:text-slate-200">Mapa da Liberdade Financeira</h3>
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            <div className="flex flex-col items-center text-center w-1/3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-primary text-white' : 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300'}`}>
                <span>{index + 1}</span>
              </div>
              <p className="text-xs mt-1">{step.name}</p>
            </div>
            {index < steps.length - 1 && <div className="flex-1 h-1 bg-slate-300 dark:bg-slate-600 mx-2"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FinancialFreedomMap;
