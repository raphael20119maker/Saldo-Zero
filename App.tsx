
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// FIX: Correct import paths for root-level App.tsx
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import type { Transaction, Debt, CreditCard, RecurringExpense, RecurringEarning, InvestmentReserve, View } from './types.ts';
import { TransactionType } from './types.ts';

// Component Imports
import Header from './components/Header.tsx';
import Dashboard from './components/Dashboard.tsx';
import SummaryView from './components/SummaryView.tsx';
import DebtsView from './components/DebtsView.tsx';
import CreditCardsView from './components/CreditCardsView.tsx';
import BottomNav from './components/BottomNav.tsx';
import AddChoiceModal from './components/AddChoiceModal.tsx';
import AddTransactionModal from './components/AddTransactionModal.tsx';
import AddDebtModal from './components/AddDebtModal.tsx';
import EditDebtModal from './components/EditDebtModal.tsx';
import AddCreditCardModal from './components/AddCreditCardModal.tsx';
import EditCreditCardModal from './components/EditCreditCardModal.tsx';
import AddRecurringEarningModal from './components/AddRecurringEarningModal.tsx';
import AddRecurringExpenseModal from './components/AddRecurringExpenseModal.tsx';
import AddReserveModal from './components/AddReserveModal.tsx';
import CardDetailModal from './components/CardDetailModal.tsx';

const App: React.FC = () => {
    // State
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
    const [activeView, setActiveView] = useState<View>('dashboard');

    // Data using Local Storage
    const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
    const [debts, setDebts] = useLocalStorage<Debt[]>('debts', []);
    const [creditCards, setCreditCards] = useLocalStorage<CreditCard[]>('creditCards', []);
    const [recurringEarnings, setRecurringEarnings] = useLocalStorage<RecurringEarning[]>('recurringEarnings', []);
    const [recurringExpenses, setRecurringExpenses] = useLocalStorage<RecurringExpense[]>('recurringExpenses', []);
    const [reserves, setReserves] = useLocalStorage<InvestmentReserve[]>('reserves', []);
    const [notes, setNotes] = useLocalStorage<string>('notes', '');

    // Modal states
    const [isAddChoiceModalOpen, setAddChoiceModalOpen] = useState(false);
    const [isAddTransactionModalOpen, setAddTransactionModalOpen] = useState(false);
    const [isAddDebtModalOpen, setAddDebtModalOpen] = useState(false);
    const [isEditDebtModalOpen, setEditDebtModalOpen] = useState(false);
    const [isAddCreditCardModalOpen, setAddCreditCardModalOpen] = useState(false);
    const [isEditCreditCardModalOpen, setEditCreditCardModalOpen] = useState(false);
    const [isAddRecurringEarningModalOpen, setAddRecurringEarningModalOpen] = useState(false);
    const [isAddRecurringExpenseModalOpen, setAddRecurringExpenseModalOpen] = useState(false);
    const [isAddReserveModalOpen, setAddReserveModalOpen] = useState(false);
    const [isCardDetailModalOpen, setCardDetailModalOpen] = useState(false);
    
    // Data for editing/viewing
    const [debtToEdit, setDebtToEdit] = useState<Debt | null>(null);
    const [cardToEdit, setCardToEdit] = useState<CreditCard | null>(null);
    const [cardToView, setCardToView] = useState<CreditCard | null>(null);
    const [initialTransactionData, setInitialTransactionData] = useState<Partial<Omit<Transaction, 'id'>> | null>(null);

    // Theme toggle
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // Handlers
    const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
        setTransactions(prev => [...prev, { ...transaction, id: uuidv4() }]);
        // Update reserve balance if it's a contribution
        if (transaction.reserveId && transaction.type === TransactionType.EXPENSE) {
            setReserves(prev => prev.map(r => r.id === transaction.reserveId ? { ...r, balance: r.balance + transaction.amount } : r));
        }
    };
    
    const handleAddMultipleTransactions = (newTransactions: Omit<Transaction, 'id'>[]) => {
        const transactionsWithIds = newTransactions.map(t => ({...t, id: uuidv4()}));
        setTransactions(prev => [...prev, ...transactionsWithIds]);
    };

    const handleAddDebt = (debt: Omit<Debt, 'id'>) => {
        setDebts(prev => [...prev, { ...debt, id: uuidv4() }]);
    };

    const handleUpdateDebt = (updatedDebt: Debt) => {
        setDebts(prev => prev.map(d => d.id === updatedDebt.id ? updatedDebt : d));
        setDebtToEdit(null);
    };
    
    const handleAddCreditCard = (card: Omit<CreditCard, 'id'>) => {
        setCreditCards(prev => [...prev, { ...card, id: uuidv4() }]);
    };
    
    const handleUpdateCreditCard = (updatedCard: CreditCard) => {
        setCreditCards(prev => prev.map(c => c.id === updatedCard.id ? updatedCard : c));
        setCardToEdit(null);
    };
    
    const handleAddRecurringEarning = (earning: Omit<RecurringEarning, 'id'>) => {
        setRecurringEarnings(prev => [...prev, { ...earning, id: uuidv4() }]);
    };
    
    const handleAddRecurringExpense = (expense: Omit<RecurringExpense, 'id'>) => {
        setRecurringExpenses(prev => [...prev, { ...expense, id: uuidv4() }]);
    };
    
    const handleAddReserve = (reserve: Omit<InvestmentReserve, 'id'>) => {
        setReserves(prev => [...prev, { ...reserve, id: uuidv4() }]);
    };

    const handleContributeToReserve = (reserve: InvestmentReserve) => {
        setInitialTransactionData({
            type: TransactionType.EXPENSE,
            description: `Aporte para ${reserve.name}`,
            category: 'Transferência para Meta',
            reserveId: reserve.id,
            paymentMethod: 'pix'
        });
        setAddTransactionModalOpen(true);
    };

    const handlePayInvoice = (card: CreditCard, invoiceAmount: number) => {
        setInitialTransactionData({
            type: TransactionType.EXPENSE,
            amount: invoiceAmount,
            description: `Pagamento Fatura ${card.name}`,
            category: 'Pagamento de Fatura',
            paymentMethod: 'pix'
        });
        setAddTransactionModalOpen(true);
    }

    // Modal Open/Close logic
    const openAddChoiceModal = () => setAddChoiceModalOpen(true);
    
    const openTransactionModal = () => { setInitialTransactionData(null); setAddTransactionModalOpen(true); };
    const openDebtModal = () => setAddDebtModalOpen(true);
    const openCreditCardModal = () => setAddCreditCardModalOpen(true);
    
    const openEditDebtModal = (debt: Debt) => { setDebtToEdit(debt); setEditDebtModalOpen(true); };
    const openEditCreditCardModal = (card: CreditCard) => { setCardToEdit(card); setCardDetailModalOpen(false); setEditCreditCardModalOpen(true); };
    const openViewCardDetailsModal = (card: CreditCard) => { setCardToView(card); setCardDetailModalOpen(true); };


    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard 
                  transactions={transactions} 
                  debts={debts}
                  creditCards={creditCards}
                  recurringExpenses={recurringExpenses}
                  recurringEarnings={recurringEarnings}
                  reserves={reserves}
                  onEditDebt={openEditDebtModal}
                  onAddRecurringEarning={() => setAddRecurringEarningModalOpen(true)}
                  onAddRecurringExpense={() => setAddRecurringExpenseModalOpen(true)}
                  onContributeToReserve={handleContributeToReserve}
                />;
            case 'summary':
                return <SummaryView 
                  transactions={transactions} 
                  debts={debts} 
                  creditCards={creditCards} 
                  recurringExpenses={recurringExpenses}
                  recurringEarnings={recurringEarnings}
                  reserves={reserves}
                  notes={notes}
                  setNotes={setNotes}
                  onAddReserve={() => setAddReserveModalOpen(true)}
                  onContributeToReserve={handleContributeToReserve}
                />;
            case 'debts':
                return <DebtsView debts={debts} onEditDebt={openEditDebtModal} onAddDebt={openDebtModal} />;
            case 'cards':
                return <CreditCardsView creditCards={creditCards} transactions={transactions} recurringExpenses={recurringExpenses} onAddCreditCard={openCreditCardModal} onViewCardDetails={openViewCardDetailsModal} />;
            default:
                return <Dashboard transactions={transactions} debts={debts} creditCards={creditCards} recurringExpenses={recurringExpenses} recurringEarnings={recurringEarnings} reserves={reserves} onEditDebt={openEditDebtModal} onAddRecurringEarning={() => setAddRecurringEarningModalOpen(true)} onAddRecurringExpense={() => setAddRecurringExpenseModalOpen(true)} onContributeToReserve={handleContributeToReserve} />;
        }
    };

    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200 font-sans">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="max-w-4xl mx-auto p-4 pb-24">
                {renderView()}
            </main>
            <BottomNav activeView={activeView} setActiveView={setActiveView} onAddClick={openAddChoiceModal} />
            
            {/* Modals */}
            <AddChoiceModal 
                isOpen={isAddChoiceModalOpen}
                onClose={() => setAddChoiceModalOpen(false)}
                onAddTransaction={openTransactionModal}
                onAddDebt={openDebtModal}
                onAddCreditCard={openCreditCardModal}
            />
            <AddTransactionModal
                isOpen={isAddTransactionModalOpen}
                onClose={() => setAddTransactionModalOpen(false)}
                onAddTransaction={handleAddTransaction}
                onAddMultipleTransactions={handleAddMultipleTransactions}
                creditCards={creditCards}
                initialData={initialTransactionData}
            />
            <AddDebtModal 
                isOpen={isAddDebtModalOpen}
                onClose={() => setAddDebtModalOpen(false)}
                onAddDebt={handleAddDebt}
            />
            <EditDebtModal
                isOpen={isEditDebtModalOpen}
                onClose={() => setEditDebtModalOpen(false)}
                onUpdateDebt={handleUpdateDebt}
                debtToEdit={debtToEdit}
            />
            <AddCreditCardModal
                isOpen={isAddCreditCardModalOpen}
                onClose={() => setAddCreditCardModalOpen(false)}
                onAddCreditCard={handleAddCreditCard}
            />
             <EditCreditCardModal
                isOpen={isEditCreditCardModalOpen}
                onClose={() => setEditCreditCardModalOpen(false)}
                onUpdateCreditCard={handleUpdateCreditCard}
                cardToEdit={cardToEdit}
            />
             <CardDetailModal
                isOpen={isCardDetailModalOpen}
                onClose={() => setCardDetailModalOpen(false)}
                card={cardToView}
                transactions={transactions}
                recurringExpenses={recurringExpenses}
                onEdit={openEditCreditCardModal}
                onPayInvoice={handlePayInvoice}
            />
             <AddRecurringEarningModal
                isOpen={isAddRecurringEarningModalOpen}
                onClose={() => setAddRecurringEarningModalOpen(false)}
                onAddRecurringEarning={handleAddRecurringEarning}
            />
            <AddRecurringExpenseModal
                isOpen={isAddRecurringExpenseModalOpen}
                onClose={() => setAddRecurringExpenseModalOpen(false)}
                onAddRecurringExpense={handleAddRecurringExpense}
                creditCards={creditCards}
            />
            <AddReserveModal 
                isOpen={isAddReserveModalOpen}
                onClose={() => setAddReserveModalOpen(false)}
                onAddReserve={handleAddReserve}
            />
        </div>
    );
};

export default App;