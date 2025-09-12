import { useEffect, useState } from "react";
import Expense from "./Expense";
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

async function getExpensesDates(){
    
    const expenses_raw = await fetch(`http://localhost:3000/api/expense`, 
        {
            method: "GET",
            credentials:'include'
        }
        )
    const expenses_data = await expenses_raw.json() as ExpenseProp[];
    let dates = new Set<string>();
    for(const expense of expenses_data){
            if (expense.date) {
            const newDateFormat = expense.date.split('T')[0];
            dates.add(newDateFormat);
        }
    };
    return dates;
}

const ExpenseRendering = ({targetCategory}: { targetCategory?: string }) => {
    const [expenses, setExpenses] = useState<ExpenseProp[]>([]);
    const [expensesDates, setExpensesDates] = useState<Set<string>>(new Set())
    useEffect(() => {

        const fetchExpenses = async() => {
            
            const expenses_raw = await fetch(`http://localhost:3000/api/expense`, 
                {
                    method: "GET",
                    credentials: 'include'
                }
            )
            const expenses_data = await expenses_raw.json();
            setExpenses(expenses_data);
        }
        fetchExpenses();

        (async () => {
            const dates = await getExpensesDates();
            setExpensesDates(new Set(dates))
        })();
       
    }, [expenses.length])
    return (
        <>
            {[...expensesDates].map(date => (
                <div>
                <p className="underline p-0.5">{date}</p>
                <div key={date} className="w-full grid grid-cols-4  gap-2">
                {expenses
                    .filter(expense => expense.date && expense.date.includes(date) && (!targetCategory || expense.category_id == targetCategory ))
                    .map(expense => (
                    <Expense key={expense.expense_id} expense={expense} />
                    ))}
                </div>
                </div>
            ))}
        </>
    )
}

export default ExpenseRendering;