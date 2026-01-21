import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DrawdownChart({ data }: { data: any }) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
                <XAxis dataKey="date" hide />
                <YAxis />
                <Tooltip />
                <Area dataKey="drawdown" stroke="#d32f2f" fill="#ffcdd2" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
