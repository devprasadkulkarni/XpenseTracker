import { useState, useEffect } from "react";
import Card from "./Card";
import Modal from "react-modal"; // ✅ FIXED: import Modal

Modal.setAppElement("#root"); // ✅ must come after import

export default function WalletBalance() {
    const [income, setIncome] = useState(() => {
        const raw = localStorage.getItem("income");
        return raw ? Number(raw) : 5000;
    });

    const [showAddIncome, setShowAddIncome] = useState(false);

    useEffect(() => {
        localStorage.setItem("income", String(income));
    }, [income]);

    const toggleAddIncome = () => setShowAddIncome((prev) => !prev);

    const handleAddIncome = (value) => {
        const num = Number(value);
        if (isNaN(num) || num <= 0) return;
        setIncome((prev) => prev + num);
        setShowAddIncome(false);
    };

    return (
        <div>
            <Card
                cardName="Wallet Balance"
                cardValue={`₹ ${income}`}
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
