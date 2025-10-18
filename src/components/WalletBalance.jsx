import React, { useState } from "react";
import Card from "./Card";
import AddIncome from "./AddIncome";

const WalletBalance = () => {
    const [income, setIncome] = useState(5000);
    const [showAddIncome, setShowAddIncome] = useState(false);

    const toggleAddIncome = () => {
        setShowAddIncome((prev) => !prev);
    };

    return (
        <div>
            <Card
                cardName="Wallet Balance"
                cardValue={`₹ ${income}`}
                buttonText="+ Add Income"
                toggleAddIncome={toggleAddIncome}
            />
            {showAddIncome && <AddIncome onClose={toggleAddIncome}></AddIncome>}
        </div>
    );
};

export default WalletBalance;
