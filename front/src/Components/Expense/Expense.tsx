import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ExpenseProp {
    expense_id : string,
    user_id : string,
    category_id: string,
    amount : number,
    type : string,
    date : string,
    start_date : string,
    end_date : string,
    description : string
}

const Expense = ({expense} : {expense : ExpenseProp}) => {

    const handleDeletion = async () => {
        const deletedExepense = await fetch(`http://localhost:3000/api/expense/${expense.expense_id}`, {
            method: "DELETE",
            credentials: 'include'
        })
        const data = await deletedExepense.json();
        setDeleteMode(false);
        window.location.reload();
        console.log(data);
    }

    const [expenseDate, setExpenseDate] = useState("");
    const [deleteMode, setDeleteMode] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        setExpenseDate(expense.date.split("T")[0]);
        const getCategoryName = async () => {
            const res = await fetch(`http://localhost:3000/api/category/${expense.category_id}`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await res.json();
            setCategoryName(data.name)
        }
        getCategoryName()
    }, [])

    return (
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-5 w-full flex justify-between items-center shadow-lg mb-4 transition hover:shadow-2xl">
            <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-gray-700">{categoryName}</h1>
                {expense.type === 'recurring' && <p className="text-xs text-gray-400">Recurring expense</p>}
                <p className="text-sm text-gray-500">{expenseDate} &middot; {expense.description}</p>                
            </div> 
            <div className="flex flex-col items-end gap-2">
                <p className="font-bold text-red-500">-{expense.amount}</p>
                <div className="flex gap-2">
                    <Link 
                        to={`/expense/${expense.expense_id}`} 
                        className="text-xs text-amber-600 hover:underline"
                    >
                        Edit
                    </Link>
                    <button 
                        onClick={() => setDeleteMode(true)} 
                        className="text-xs text-red-400 hover:underline"
                    >
                        Delete
                    </button>
                </div>
                {deleteMode && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                        <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center gap-4 min-w-[280px]">
                            <p className="text-gray-700 font-medium">{expense.description}</p>
                            <p className="text-gray-500 text-sm">Do you really want to delete this expense?</p>
                            <div className="flex gap-4 mt-2">
                                <button 
                                    onClick={handleDeletion}
                                    className="px-3 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                                >
                                    Yes, delete
                                </button>
                                <button 
                                    onClick={() => setDeleteMode(false)}
                                    className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-xs hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Expense;