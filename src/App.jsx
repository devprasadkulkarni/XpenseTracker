import React from "react";
import WalletBalance from "./components/WalletBalance";
import Expenses from "./components/Expenses";
import { SnackbarProvider } from "notistack";

export default function App() {
    return (
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={2500}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <div className="min-h-screen p-6 bg-gray-100">
                <h1 className="text-5xl font-bold text-center mb-8">
                    Expense Tracker
                </h1>
                <div className="grid md:grid-cols-2 gap-6">
                    <WalletBalance />
                    <Expenses />
                </div>
            </div>
        </SnackbarProvider>
    );
}
