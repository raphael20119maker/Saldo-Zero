
import { GoogleGenAI } from "@google/genai";
import type { Transaction, Debt } from '../types.ts';

// FIX: Initialize Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Implement function to get a financial tip using Gemini API
export const getFinancialTip = async (): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Me dê uma dica de educação financeira curta e prática para um usuário de um app de finanças pessoais. A dica deve ter no máximo 2 frases e ser em português brasileiro.',
             config: {
                temperature: 0.7,
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error fetching financial tip:", error);
        // Provide a fallback tip in case of API error
        return "Lembre-se de revisar seu orçamento regularmente para garantir que seus gastos estão alinhados com suas metas financeiras.";
    }
};

// FIX: Implement function to get an intelligent insight based on user data using Gemini API
export const getIntelligentInsight = async (transactions: Transaction[], debts: Debt[]): Promise<string> => {
    // Only use recent or significant data to keep the prompt concise
    const recentTransactions = transactions.slice(-15);

    if (recentTransactions.length === 0 && debts.length === 0) {
        return "Adicione suas transações e dívidas para receber insights personalizados.";
    }

    const prompt = `
        Analise os seguintes dados financeiros de um usuário no Brasil e forneça um insight inteligente e acionável em português brasileiro. O insight deve ser curto (2-3 frases no máximo), amigável e focado em uma única observação relevante.

        **Transações Recentes (últimas 15):**
        ${recentTransactions.length > 0 ? recentTransactions.map(t => `- ${t.description}: ${t.type === 'expense' ? '-' : '+'}R$${t.amount.toFixed(2)} em ${new Date(t.date).toLocaleDateString('pt-BR')} (Categoria: ${t.category})`).join('\n') : "Nenhuma transação recente."}

        **Dívidas Atuais:**
        ${debts.length > 0 ? debts.map(d => `- ${d.name}: Saldo devedor de R$${d.remainingBalance.toFixed(2)} com pagamento mensal de R$${d.monthlyPayment.toFixed(2)}`).join('\n') : "Nenhuma dívida registrada."}

        Com base nesses dados, qual é a sua principal observação ou recomendação para o usuário? Seja direto e útil. Exemplo: "Notei que seus gastos com 'Lazer' aumentaram este mês. Que tal definir um limite para essa categoria?" ou "Você está progredindo bem na sua dívida! Continue assim para quitá-la mais rápido."
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                temperature: 0.5,
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error fetching intelligent insight:", error);
        // Provide a fallback insight
        return "Continue organizando suas finanças. A disciplina é a chave para alcançar seus objetivos!";
    }
};
