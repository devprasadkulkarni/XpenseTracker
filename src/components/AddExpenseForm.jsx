import React, { useEffect, useState } from "react";

export default function AddExpenseForm({
    onAddExpense,
    onUpdateExpense,
    onClose,
    initialData,
    editIndex,
}) {
    const [form, setForm] = useState({
        title: "",
        price: "",
        category: "Food",
        date: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editIndex !== null) {
            onUpdateExpense(form, editIndex);
        } else {
            onAddExpense(form);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">
                {editIndex !== null ? "Edit Expense" : "Add Expense"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="p-2 border rounded"
                    required
                />

                <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="p-2 border rounded"
                    required
                />

                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="p-2 border rounded"
                >
                    <option>Food</option>
                    <option>Entertainment</option>
                    <option>Travel</option>
                </select>

                <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />

                <button
                    type="submit"
                    className="col-span-1 px-4 py-2 bg-red-500 text-white rounded"
                >
                    {editIndex !== null ? "Save Changes" : "Add Expense"}
                </button>

                <button
                    type="button"
                    onClick={onClose}
                    className="col-span-1 px-4 py-2 bg-gray-300 rounded"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}
