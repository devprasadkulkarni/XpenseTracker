import React, { useState } from "react";
import Card from "./Card";
import AddExpense from "../components/AddExpense";
import ExpenseSummary from "./ExpenseSummary";

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [showAddExpense, setShowAddExpense] = useState(false);

    const toggleAddExpense = () => {
        setShowAddExpense((prev) => !prev);
    };

    const addExpense = (expense) => {
        setExpenses((prev) => [...prev, expense]);
    };

    const totalExpense = expenses.reduce((sum, exp) => sum + exp.price, 0);

    return (
        <div>
            <Card
                cardName="Expenses"
                cardValue={`₹ ${totalExpense}`}
                buttonText="+ Add Expense"
                toggleAddExpense={toggleAddExpense}
            />
            {showAddExpense && (
                <AddExpense
                    onClose={toggleAddExpense}
                    onAddExpense={addExpense}
                />
            )}

            {expenses.length > 0 && <ExpenseSummary data={expenses} />}
        </div>
    );
};

export default Expenses;
