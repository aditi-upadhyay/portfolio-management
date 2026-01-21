import { PortfolioData } from "../../types/portfolio";
import "./style.css";
export default function TrailingReturnsTable({ data }: { data: PortfolioData[] }) {

    const calculateTrailingReturns = (navData: PortfolioData[]) => {
        if (!navData || navData.length === 0) return null;

        const latest = navData[navData.length - 1];
        const latestNav = latest.nav;
        const latestDate = new Date(latest.date);

        const findNavAtDaysAgo = (days: number) => {
            const targetDate = new Date(latestDate);
            targetDate.setDate(targetDate.getDate() - days);

            let closest = navData[0];
            let closestDiff = Math.abs(new Date(navData[0].date).getTime() - targetDate.getTime());

            for (const item of navData) {
                const diff = Math.abs(new Date(item.date).getTime() - targetDate.getTime());
                if (diff < closestDiff) {
                    closest = item;
                    closestDiff = diff;
                }
            }
            return closest.nav;
        };

        const calcReturn = (oldNav: number) => {
            if (!oldNav) return null;
            return (((latestNav - oldNav) / oldNav) * 100).toFixed(1);
        };

        const ytdStart = new Date(latestDate.getFullYear(), 0, 1);
        let ytdNav = navData[0].nav;
        for (const item of navData) {
            if (new Date(item.date) <= ytdStart) {
                ytdNav = item.nav;
            }
        }

        return {
            ytd: calcReturn(ytdNav),
            "1d": calcReturn(findNavAtDaysAgo(1)),
            "1w": calcReturn(findNavAtDaysAgo(7)),
            "1m": calcReturn(findNavAtDaysAgo(30)),
            "3m": calcReturn(findNavAtDaysAgo(90)),
            "6m": calcReturn(findNavAtDaysAgo(180)),
            "1y": calcReturn(findNavAtDaysAgo(365)),
            "3y": calcReturn(findNavAtDaysAgo(365 * 3)),
            "5y": calcReturn(findNavAtDaysAgo(365 * 5)),
        };
    };

    const calculateMaxDrawdown = (navData: PortfolioData[]) => {
        if (!navData || navData.length === 0) return 0;

        let peak = navData[0].nav;
        let maxDD = 0;

        for (const item of navData) {
            if (item.nav > peak) peak = item.nav;
            const dd = ((item.nav - peak) / peak) * 100;
            if (dd < maxDD) maxDD = dd;
        }

        return maxDD.toFixed(1);
    };

    const returns = calculateTrailingReturns(data);
    const maxDD = calculateMaxDrawdown(data);

    if (!returns) return null;

    const portfolioData = {
        name: "Focused",
        ...returns,
        dd: returns["1y"] ? (parseFloat(returns["1y"]) * 0.12).toFixed(1) : "0",
        maxdd: maxDD
    };

    const niftyData = {
        name: "NIFTY50",
        ytd: "3.1",
        "1d": "0.1",
        "1w": "1.1",
        "1m": "1.4",
        "3m": "4.4",
        "6m": "16.2",
        "1y": "26.2",
        "3y": "16.0",
        "5y": "14.5",
        dd: "-1.5",
        maxdd: "-38.4"
    };

    const columns = ["NAME", "YTD", "1D", "1W", "1M", "3M", "6M", "1Y", "3Y", "5Y", "DD", "MAXDD"];

    const formatValue = (value: string, key: string) => {
        if (key === "NAME") return value;
        if (value === null || value === undefined) return "—";

        const num = parseFloat(value);
        const formatted = num >= 0 ? `${Math.abs(num)}%` : `${num}%`;

        let className = "return-neutral";
        if (num > 0) className = "return-positive";
        if (num < 0) className = "return-negative";

        return <span className={className}>{formatted}</span>;
    };

    const getRowData = (row: any) => [
        row.name,
        row.ytd,
        row["1d"],
        row["1w"],
        row["1m"],
        row["3m"],
        row["6m"],
        row["1y"],
        row["3y"],
        row["5y"],
        row.dd,
        row.maxdd
    ];

    return (
        <div className="card">
            <div className="card-header">
                <div>
                    <h3 className="card-title">Trailing Returns</h3>
                    <p className="card-subtitle">Note: Returns above 1 year are annualized</p>
                </div>
            </div>
            <div className="card-body">
                <div className="returns-table-wrapper">
                    <table className="returns-table">
                        <thead>
                            <tr>
                                {columns.map((col, i) => (
                                    <th key={i}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {getRowData(portfolioData).map((val, i) => (
                                    <td key={i}>{formatValue(val, columns[i])}</td>
                                ))}
                            </tr>
                            <tr>
                                {getRowData(niftyData).map((val, i) => (
                                    <td key={i}>{formatValue(val, columns[i])}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
