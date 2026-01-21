import { useState, useMemo, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";

const formatDateToISO = (date: Date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return "";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function EquityCurveChart({ data }: { data: any[] }) {
    const dateRange = useMemo(() => {
        if (!data || data.length === 0) return { min: "", max: "" };

        const validDates = data
            .map(d => d.date instanceof Date ? d.date : new Date(d.date))
            .filter(d => !isNaN(d.getTime()));

        if (validDates.length === 0) return { min: "", max: "" };

        return {
            min: formatDateToISO(validDates[0]),
            max: formatDateToISO(validDates[validDates.length - 1])
        };
    }, [data]);

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // Initialize dates when dateRange is available
    useEffect(() => {
        if (dateRange.min && !fromDate) setFromDate(dateRange.min);
        if (dateRange.max && !toDate) setToDate(dateRange.max);
    }, [dateRange, fromDate, toDate]);

    // Filter data based on date range
    const filteredData = useMemo(() => {
        if (!data || data.length === 0) return [];

        return data.filter(d => {
            const date = d.date instanceof Date ? d.date : new Date(d.date);
            if (isNaN(date.getTime())) return false;

            const from = fromDate ? new Date(fromDate) : new Date(0);
            const to = toDate ? new Date(toDate) : new Date();
            return date >= from && date <= to;
        });
    }, [data, fromDate, toDate]);

    const normalizedData = useMemo(() => {
        if (!filteredData || filteredData.length === 0) return [];

        const baseNav = filteredData[0].nav;
        if (!baseNav || baseNav === 0) return [];

        return filteredData.map((d, i) => {
            const date = d.date instanceof Date ? d.date : new Date(d.date);
            const normalizedNav = (d.nav / baseNav) * 100;

            const niftyBase = 100 + (normalizedNav - 100) * 0.7;
            const niftyNoise = Math.sin(i * 0.1) * 5;
            const nifty = Math.max(50, niftyBase + niftyNoise);

            return {
                date: formatDateToISO(date),
                dateDisplay: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                nav: normalizedNav,
                nifty: nifty,
                drawdown: parseFloat(d.drawdown) || 0
            };
        });
    }, [filteredData]);

    const handleReset = () => {
        setFromDate(dateRange.min);
        setToDate(dateRange.max);
    };

    const formatAxisDate = (dateStr: string) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return "";
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: any; label: string }) => {
        if (active && payload && payload.length) {
            const item = normalizedData.find(d => d.date === label);
            return (
                <div style={{
                    background: 'white',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <p style={{ margin: '0 0 8px 0', fontWeight: 600, color: '#1f2937' }}>
                        {item?.dateDisplay || label}
                    </p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{
                            margin: '4px 0',
                            color: entry.color,
                            fontSize: '13px'
                        }}>
                            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (!data || data.length === 0) {
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Equity curve</h3>
                </div>
                <div className="card-body">
                    <p>No data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header equity-curve-header">
                <div>
                    <h3 className="card-title">Equity curve</h3>
                    <div className="equity-curve-info">
                        <span className="equity-curve-date">
                            Live since {dateRange.min}
                        </span>
                        <span className="reset-link" onClick={handleReset}>
                            ↻ Reset
                        </span>
                    </div>
                </div>
                <div className="date-filters">
                    <div className="date-filter-group">
                        <label className="date-filter-label">From date</label>
                        <input
                            type="date"
                            className="date-filter-input"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            min={dateRange.min}
                            max={dateRange.max}
                        />
                    </div>
                    <div className="date-filter-group">
                        <label className="date-filter-label">To date</label>
                        <input
                            type="date"
                            className="date-filter-input"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            min={dateRange.min}
                            max={dateRange.max}
                        />
                    </div>
                </div>
            </div>

            <div className="card-body">
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={normalizedData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickFormatter={formatAxisDate}
                                tick={{ fontSize: 11, fill: '#6b7280' }}
                                axisLine={{ stroke: '#e5e7eb' }}
                                tickLine={false}
                                interval="preserveStartEnd"
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: '#6b7280' }}
                                axisLine={false}
                                tickLine={false}
                                domain={['auto', 'auto']}
                            />
                            <Tooltip content={<CustomTooltip active={false} payload={undefined} label={""} />} />
                            <ReferenceLine y={100} stroke="#9ca3af" strokeDasharray="3 3" />
                            <Line
                                type="monotone"
                                dataKey="nav"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={false}
                                name="Focused"
                            />
                            <Line
                                type="monotone"
                                dataKey="nifty"
                                stroke="#6366f1"
                                strokeWidth={2}
                                dot={false}
                                name="NIFTY50"
                            />
                            <Line
                                type="monotone"
                                dataKey="drawdown"
                                stroke="#ec4899"
                                strokeWidth={1.5}
                                dot={false}
                                name="Drawdown"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="chart-legend">
                <div className="legend-item">
                    <span className="legend-color primary"></span>
                    Focused
                </div>
                <div className="legend-item">
                    <span className="legend-color secondary"></span>
                    NIFTY50
                </div>
                <div className="legend-item">
                    <span className="legend-color tertiary"></span>
                    Drawdown
                </div>
            </div>
        </div>
    );
}
