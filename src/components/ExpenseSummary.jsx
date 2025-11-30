import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#805ad5", "#dd6b20", "#d69e2e"];

export default function ExpenseSummary({ data = [] }) {
    const categoryTotals = data.reduce((acc, exp) => {
        const cat = exp.category || "Other";
        acc[cat] = (acc[cat] || 0) + Number(exp.price || 0);
        return acc;
    }, {});

    const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
        name,
        value,
    }));
    const total = chartData.reduce((s, i) => s + i.value, 0) || 1;

    return (
        <div className="flex flex-col md:flex-row items-center gap-4">
            <div style={{ width: 300, height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            outerRadius={80}
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-2">
                {chartData.map((c, i) => (
                    <div key={c.name} className="flex items-center gap-2">
                        <div
                            style={{
                                width: 12,
                                height: 12,
                                backgroundColor: COLORS[i % COLORS.length],
                            }}
                        />
                        <div>
                            {c.name} - {((c.value / total) * 100).toFixed(1)}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
