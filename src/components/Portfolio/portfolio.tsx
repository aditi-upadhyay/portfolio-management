
import { useEffect, useState } from "react";
import { Suspense } from "react";
import "./portfolio.css";
import { readExcelFile } from "../../utils/readExcel.ts";
import { calculateDrawdown } from "../../utils/calculateDrawdown.ts";
import TrailingReturnsTable from "../PortfolioStatistics/trailingReturnsTable.tsx";
import EquityCurveChart from "../PortfolioStatistics/equityCurveChart.tsx";

export default function Portfolio() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/React Assignment Historical NAV Report.xlsx")
            .then(res => {
                if (!res.ok) throw new Error("Failed to load Excel file");
                return res.blob();
            })
            .then(readExcelFile)
            .then(calculateDrawdown)
            .then((data: any) => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div className="page-header">
                <h1>Focused Portfolio</h1>
                <p>Track performance, returns, and drawdowns of your portfolio</p>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <div className="portfolio-content">
                    <TrailingReturnsTable data={data} />
                    <EquityCurveChart data={data} />
                </div>
            </Suspense>
        </>
    );
}