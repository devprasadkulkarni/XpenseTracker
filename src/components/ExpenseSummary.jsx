import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = ["#805ad5", "#dd6b20", "#d69e2e"];

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
    );
};

const ExpenseSummary = ({ data = [] }) => {
    // ✅ Step 1: Group expenses by category
    const categoryTotals = data.reduce((acc, exp) => {
        const cat = exp.category?.value || exp.category || "Other"; // handle safe access
        acc[cat] = (acc[cat] || 0) + Number(exp.price || 0);
        return acc;
    }, {});

    // ✅ Step 2: Convert object into array for Recharts
    const chartData = Object.entries(categoryTotals).map(([key, value]) => ({
        name: key,
        value,
    }));

    // ✅ Step 3: Compute total to display percentages
    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${entry.name}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            <aside className="flex justify-center items-center gap-4 flex-wrap mt-4">
                {chartData.map((entry, index) => {
                    const percentage = ((entry.value / total) * 100).toFixed(1);
                    return (
                        <div
                            key={entry.name}
                            className="flex items-center gap-2"
                        >
                            <div
                                className="w-4 h-4 rounded-sm"
                                style={{
                                    backgroundColor:
                                        COLORS[index % COLORS.length],
                                }}
                            ></div>
                            <p className="capitalize">
                                {entry.name} - {percentage}%
                            </p>
                        </div>
                    );
                })}
            </aside>
        </div>
    );
};

export default ExpenseSummary;
