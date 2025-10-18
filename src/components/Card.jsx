import React from "react";

const Card = ({
    cardName,
    cardValue,
    buttonText,
    toggleAddIncome,
    toggleAddExpense,
}) => {
    const handleClick = () => {
        if (buttonText.includes("Income") && toggleAddIncome) {
            toggleAddIncome();
        } else if (buttonText.includes("Expense") && toggleAddExpense) {
            toggleAddExpense();
        }
    };

    const handleColor = () => {
        return buttonText.includes("Income") ? "bg-green-500" : "bg-red-500";
    };

    return (
        <div className="h-72 flex flex-col justify-center gap-4 bg-gray-500 rounded-xl">
            <h4 className="text-4xl">
                {cardName} : {cardValue}
            </h4>
            <button
                onClick={handleClick}
                className={`px-2 py-2 ${handleColor()} text-white rounded-xl mx-52 cursor-pointer`}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default Card;
