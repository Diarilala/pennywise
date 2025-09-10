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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwiaWF0IjoxNzU3MzY2NTQ1fQ.XBG6M9ge7k5Py87pJ3i7bEbkaNLI5N2-fBdGpXFubdo';
    const expenses_raw = await fetch(`http://localhost:3000/api/expense`, 
        {
            method: "GET",
            headers:{
                "Authorization" : `Bearer ${token}`
            }
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

const ExpenseRendering = () => {
    const [expenses, setExpenses] = useState<ExpenseProp[]>([]);
    const [expensesDates, setExpensesDates] = useState<Set<string>>(new Set())
    useEffect(() => {

        const fetchExpenses = async() => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwiaWF0IjoxNzU3MzY2NTQ1fQ.XBG6M9ge7k5Py87pJ3i7bEbkaNLI5N2-fBdGpXFubdo';
            const expenses_raw = await fetch(`http://localhost:3000/api/expense`, 
                {
                    method: "GET",
                    headers:{
                        "Authorization" : `Bearer ${token}`
                    }
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
       
    }, [])
    return (
        <>
            {[...expensesDates].map(date => (
                <div key={date}>
                <p>{date}</p>
                {expenses
                    .filter(expense => expense.date && expense.date.includes(date))
                    .map(expense => (
                    <Expense key={expense.expense_id} expense={expense} />
                    ))}
                </div>
            ))}
        </>
    )
}

export default ExpenseRendering;