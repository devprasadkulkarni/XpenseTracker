import React, { useState, useEffect } from "react";
import Card from "./Card";
import Modal from "react-modal";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseSummary from "./ExpenseSummary";
import Transactions from "./Transactions";

Modal.setAppElement("#root");

export default function Expenses() {
    const [expenses, setExpenses] = useState(() => {
        const raw = localStorage.getItem("expenses");
        return raw ? JSON.parse(raw) : [];
    });

    const [showAddExpense, setShowAddExpense] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    const toggleAddExpense = () => {
        setEditingIndex(null); // Close edit mode
        setShowAddExpense((prev) => !prev);
    };

    const addExpense = (expense) => {
        setExpenses((prev) => [...prev, expense]);
        setShowAddExpense(false);
    };

    const updateExpense = (updated, index) => {
        const updatedList = [...expenses];
        updatedList[index] = updated;
        setExpenses(updatedList);
        setShowAddExpense(false);
        setEditingIndex(null);
    };

    const deleteExpense = (index) => {
        const filtered = expenses.filter((_, i) => i !== index);
        setExpenses(filtered);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setShowAddExpense(true);
    };

    const totalExpense = expenses.reduce(
        (sum, exp) => sum + Number(exp.price || 0),
        0
    );

    return (
        <div>
            <Card
                cardName="Expenses"
                cardValue={`₹ ${totalExpense}`}
                buttonText="+ Add Expense"
                toggleAddExpense={toggleAddExpense}
            />

            {/* Add / Edit Modal */}
            <Modal
                isOpen={showAddExpense}
                onRequestClose={toggleAddExpense}
                contentLabel="Add Expense"
                className="max-w-2xl mx-auto mt-20 bg-white rounded-lg p-6 shadow-lg"
                overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center"
            >
                <AddExpenseForm
                    onAddExpense={addExpense}
                    onUpdateExpense={updateExpense}
                    onClose={toggleAddExpense}
                    initialData={
                        editingIndex !== null ? expenses[editingIndex] : null
                    }
                    editIndex={editingIndex}
                />
            </Modal>

            {expenses.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Transactions</h3>

                    <Transactions
                        items={expenses}
                        onDelete={deleteExpense}
                        onEdit={handleEdit}
                    />

                    <div className="mt-6">
                        <ExpenseSummary data={expenses} />
                    </div>
                </div>
            )}
        </div>
    );
}
