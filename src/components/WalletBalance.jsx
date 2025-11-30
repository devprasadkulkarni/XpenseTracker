// WalletBalance.jsx
import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function WalletBalance() {
    // baseIncome is the amount stored (initially 5000)
    const [baseIncome, setBaseIncome] = useState(() => {
        const raw = localStorage.getItem("income");
        return raw ? Number(raw) : 5000;
    });

    // displayed balance = baseIncome - totalExpenses
    const [balance, setBalance] = useState(() => {
        const expensesRaw = localStorage.getItem("expenses");
        const totalExp = expensesRaw
            ? JSON.parse(expensesRaw).reduce(
                  (s, e) => s + Number(e.price || 0),
                  0
              )
            : 0;
        const raw = localStorage.getItem("income");
        const base = raw ? Number(raw) : 5000;
        return base - totalExp;
    });

    const [showAddIncome, setShowAddIncome] = useState(false);

    // Recompute balance from storage (called after expenses change or income change)
    const recomputeBalance = useCallback(() => {
        const expensesRaw = localStorage.getItem("expenses");
        const totalExp = expensesRaw
            ? JSON.parse(expensesRaw).reduce(
                  (s, e) => s + Number(e.price || 0),
                  0
              )
            : 0;
        const raw = localStorage.getItem("income");
        const base = raw ? Number(raw) : 5000;
        setBaseIncome(base);
        setBalance(base - totalExp);
    }, []);

    // Listen to a custom event dispatched by Expenses whenever it updates localStorage
    useEffect(() => {
        window.addEventListener("expensesUpdated", recomputeBalance);
        return () =>
            window.removeEventListener("expensesUpdated", recomputeBalance);
    }, [recomputeBalance]);

    // Keep localStorage in sync when baseIncome changes (and recalc)
    useEffect(() => {
        localStorage.setItem("income", String(baseIncome));
        recomputeBalance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseIncome]);

    const toggleAddIncome = () => setShowAddIncome((prev) => !prev);

    const handleAddIncome = (value) => {
        const num = Number(value);
        if (isNaN(num) || num <= 0) return;
        setBaseIncome((prev) => prev + num);
        setShowAddIncome(false);
        // recomputeBalance() will run from the baseIncome effect
    };

    return (
        <div>
            <Card
                cardName="Wallet Balance"
                cardValue={`₹ ${balance}`}
                buttonText="+ Add Income"
                toggleAddIncome={toggleAddIncome}
            />

            <Modal
                isOpen={showAddIncome}
                onRequestClose={toggleAddIncome}
                contentLabel="Add Income"
                className="max-w-xl mx-auto mt-40 bg-white rounded-lg p-6 shadow-lg"
                overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center"
            >
                <h2 className="text-2xl font-bold mb-4">Add Balance</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const val = e.target.elements.incomeAmount.value;
                        handleAddIncome(val);
                        e.target.reset();
                    }}
                    className="grid grid-cols-1 gap-4"
                >
                    <input
                        name="incomeAmount"
                        type="number"
                        placeholder="Income Amount"
                        className="p-3 rounded border"
                        required
                    />

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Add Balance
                        </button>
                        <button
                            type="button"
                            onClick={toggleAddIncome}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
