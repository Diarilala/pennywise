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
    const [deleteMode, setDeleteMode] = useState(false)
    useEffect(() => {
        setExpenseDate(expense.date.split("T")[0]);
    }, [])
    return (
        <div className="border-1 p-2 w-1/4 flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <h1 className="font-medium">Categories ???</h1>
                {expense.type == 'recurring' && <p>Recurring expense</p>}
                <p className="font-light">{expenseDate} | {expense.description}</p>                
            </div> 
            <div>
                <p className="font-bold">-{expense.amount}</p>
                <Link to={`${expense.expense_id}/edit`}>Edit</Link>
                <button onClick={() => setDeleteMode(true)}>Delete</button>
                {
                    deleteMode && (
                        <div className="absolute left-5/12">
                            <p>{expense.description}</p>
                            <p>Do you really wanna delete that task</p>
                            <div>
                                <button onClick={ handleDeletion }>
                                    Yes, delete this task
                                </button>
                                <button onClick={() => setDeleteMode(false)}>
                                    No, keep this task
                                </button >
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Expense;