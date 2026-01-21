import { PortfolioData } from "../types/portfolio";

export const calculateDrawdown = (data: PortfolioData[]): PortfolioData[] => {
    if (!data.length) return [];

    let peak = data[0].nav;

    return data.map((d: PortfolioData) => {
        peak = Math.max(peak, d.nav);
        return {
            ...d,
            drawdown: (((d.nav - peak) / peak) * 100).toFixed(2)
        };
    });
};
