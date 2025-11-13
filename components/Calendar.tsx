
import React from 'react';

// A simple placeholder calendar component
const Calendar: React.FC = () => {
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  return (
    <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
      <h3 className="text-lg font-bold mb-3 text-slate-700 dark:text-slate-200">Calendário</h3>
      <div className="text-center">
        <p className="text-xl font-semibold">{month} {year}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Feature de calendário em desenvolvimento.
        </p>
      </div>
    </div>
  );
};

export default Calendar;
