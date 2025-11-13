import React from 'react';
import { ChartPieIcon } from './icons/ChartPieIcon.tsx';
import { ClipboardListIcon } from './icons/ClipboardListIcon.tsx';
import { CreditCardIcon } from './icons/CreditCardIcon.tsx';
import { PlusIcon } from './icons/PlusIcon.tsx';
import type { View } from '../types.ts';
import { PiggyBankIcon } from './icons/PiggyBankIcon.tsx';

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
  onAddClick: () => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => {
  const activeClasses = 'text-primary dark:text-primary-dark';
  const inactiveClasses = 'text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-dark';
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center space-y-1 transition-colors w-full ${isActive ? activeClasses : inactiveClasses}`}>
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView, onAddClick }) => {
  const navItems = [
    { id: 'dashboard', label: 'Início', icon: <ChartPieIcon className="w-6 h-6" /> },
    { id: 'debts', label: 'Dívidas', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 4h.01M4 16V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2v-2m14-2h-2m-2 0h-2m-2 0H8m2 4h2" /></svg> },
    { id: 'cards', label: 'Cartões', icon: <CreditCardIcon className="w-6 h-6" /> },
    { id: 'summary', label: 'Resumo', icon: <ClipboardListIcon className="w-6 h-6" /> },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-[0_-2px_5px_rgba(0,0,0,0.1)] dark:shadow-[0_-2px_5px_rgba(0,0,0,0.2)]">
      <div className="max-w-4xl mx-auto flex justify-around items-center h-16 px-2">
        {navItems.slice(0, 2).map(item => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeView === item.id}
            onClick={() => setActiveView(item.id as View)}
          />
        ))}
        <div className="flex justify-center items-center w-1/5">
            <button onClick={onAddClick} className="w-16 h-16 bg-primary dark:bg-primary-dark text-white rounded-full flex items-center justify-center shadow-lg -mt-8 transform hover:scale-105 transition-transform border-4 border-white dark:border-slate-800">
                <PlusIcon className="w-8 h-8" />
            </button>
        </div>
        {navItems.slice(2).map(item => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeView === item.id}
            onClick={() => setActiveView(item.id as View)}
          />
        ))}
      </div>
    </footer>
  );
};

export default BottomNav;
