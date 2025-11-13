import React from 'react';

const PremiumBanner: React.FC = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white mt-6 text-center">
      <h4 className="font-bold text-lg">Desbloqueie o Modo Premium!</h4>
      <p className="text-sm mt-1 mb-3 text-blue-100">Exporte relatórios em PDF, tenha histórico ilimitado e backup na nuvem.</p>
      <button className="px-5 py-2 bg-white text-primary font-bold rounded-full shadow-lg hover:bg-slate-100 transition-colors transform hover:scale-105">
        Fazer Upgrade
      </button>
    </div>
  );
};

export default PremiumBanner;