import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 shadow-md">
      <h1 className="text-2xl font-bold text-primary dark:text-primary-dark">Saldo<span className="text-slate-700 dark:text-slate-200">Zero</span></h1>
      <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        {theme === 'light' ? <MoonIcon className="w-6 h-6 text-slate-600" /> : <SunIcon className="w-6 h-6 text-yellow-400" />}
      </button>
    </header>
  );
};

export default Header;