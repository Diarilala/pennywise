import { useEffect, useState } from "react";

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
    const [expenseDate, setExpenseDate] = useState("");
    useEffect(() => {
        setExpenseDate(expense.date.split("T")[0]);
    }, [])
    return (
        <div className="border-1 p-2 w-1/3 flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <h1 className="font-medium">Categories ???</h1>
                {expense.type == 'recurring' && <p>Recurring expense</p>}
                <p className="font-light">{expenseDate} | {expense.description}</p>                
            </div> 
            <div>
                <p className="font-bold">-{expense.amount}</p>
            </div>
        </div>
    )
}

export default Expense;