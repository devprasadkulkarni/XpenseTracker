import React, { useState } from "react";
import Select from "react-select";

const options = [
    { value: "food", label: "Food" },
    { value: "entertainment", label: "Entertainment" },
    { value: "travel", label: "Travel" },
];

const AddExpense = ({ onClose, onAddExpense }) => {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: null,
        date: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (selectedOption) => {
        setFormData((prev) => ({ ...prev, category: selectedOption }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.price ||
            !formData.category ||
            !formData.date
        ) {
            alert("Please fill out all fields");
            return;
        }

        onAddExpense({ ...formData, price: parseFloat(formData.price) });
        onclose();
    };

    return (
        <div className="h-screen fixed inset-0 flex justify-center items-center bg-gray-300/75 backdrop-blur-sm">
            <div className="w-2xl flex flex-col  rounded-xl bg-gray-300 p-8 gap-4">
                <h4 className="text-left text-4xl text-black font-bold">
                    Add Expense
                </h4>
                <form
                    className="grid grid-cols-2 gap-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="shadow-xl rounded-xl bg-gray-200 pl-4 text-gray-600 p-4"
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <input
                        className="shadow-xl rounded-xl bg-gray-200 pl-4 text-gray-600 p-4"
                        type="number"
                        placeholder="Price"
                        name="price"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <Select
                        className="shadow-xl rounded-xl bg-gray-200 pl-4 text-gray-600 p-4 text-left"
                        placeholder="Select Category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        options={options}
                    />
                    <input
                        className="shadow-xl rounded-xl bg-gray-200 pl-4 text-gray-600 p-4"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        name="date"
                        value={formData.value}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="bg-orange-300 rounded-xl shadow-xl p-4 cursor-pointer font-bold"
                    >
                        Add Expense
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-400 rounded-xl shadow-xl p-4 cursor-pointer text-black mr-40"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;
