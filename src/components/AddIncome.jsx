import React from "react";

const AddIncome = ({ onClose }) => {
    return (
        <div className="h-screen fixed inset-0 flex justify-center items-center bg-gray-300/75 backdrop-blur-sm">
            <div className="w-2xl flex flex-col  rounded-xl bg-gray-300 p-8 gap-4">
                <h4 className="text-left text-4xl text-black font-bold">
                    Add Balance
                </h4>
                <form className="grid grid-cols-4 gap-4 ">
                    <input
                        className="col-span-2 shadow-xl rounded-xl bg-gray-200 pl-4 text-gray-600"
                        type="text"
                        placeholder="Income Amount"
                    />
                    <button className="bg-orange-300 rounded-xl shadow-xl p-4 cursor-pointer font-bold">
                        Add Balance
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-400 rounded-xl shadow-xl p-4 cursor-pointer text-black"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddIncome;
