import { PortfolioData } from "../types/portfolio";

export const calculateMonthlyReturns = (data: PortfolioData[]) => {
    const grouped: Record<string, number[]> = {};

    data.forEach((d: PortfolioData) => {
        const key = `${d.date.getFullYear()}-${d.date.getMonth()}`;
        grouped[key] ??= [];
        grouped[key].push(d.nav);
    });

    return Object.entries(grouped).map(([month, values]) => ({
        month,
        return: (((values.at(-1)! - values[0]) / values[0]) * 100).toFixed(2)
    }));
};
