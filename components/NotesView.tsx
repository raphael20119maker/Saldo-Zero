
import React from 'react';

interface NotesViewProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const NotesView: React.FC<NotesViewProps> = ({ notes, setNotes }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-slate-700 dark:text-slate-200">Anotações Rápidas</h2>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Use este espaço para anotar lembretes, metas ou ideias financeiras.
      </p>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={15}
        className="w-full p-4 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary dark:focus:ring-primary-dark dark:focus:border-primary-dark transition"
        placeholder="Ex: Economizar R$200 para o presente de aniversário..."
      />
    </div>
  );
};

export default NotesView;
