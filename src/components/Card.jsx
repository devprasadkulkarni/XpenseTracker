import React from "react";

export default function Card({
    cardName,
    cardValue,
    buttonText,
    toggleAddIncome,
    toggleAddExpense,
}) {
    const onClick = () => {
        if (buttonText.includes("Income") && toggleAddIncome) toggleAddIncome();
        if (buttonText.includes("Expense") && toggleAddExpense)
            toggleAddExpense();
    };

    const color = buttonText.includes("Income") ? "bg-green-500" : "bg-red-500";

    return (
        <div className="h-72 flex flex-col justify-center gap-4 bg-white rounded-xl p-6 shadow">
            <h4 className="text-3xl">
                {cardName} : {cardValue}
            </h4>
            <button
                onClick={onClick}
                className={`px-3 py-2 ${color} text-white rounded self-start`}
            >
                {buttonText}
            </button>
        </div>
    );
}
