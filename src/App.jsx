import WalletBalance from "./components/WalletBalance";
import Expenses from "./components/Expenses";
import ExpenseSummary from "./components/ExpenseSummary";

const App = () => {
    return (
        <div className="px-10 bg-gray-800 text-white h-screen">
            <h1 className="text-4xl font-bold py-4">Expense Tracker</h1>
            <header className="rounded-xl p-10 bg-gray-700">
                <section className="grid grid-cols-3 gap-4 justify-center text-center ">
                    <WalletBalance />
                    <Expenses />
                    <ExpenseSummary />
                </section>
            </header>
            <main>
                <h2 className="text-4xl font-bold py-4">Recent Transactions</h2>
            </main>
        </div>
    );
};

export default App;
