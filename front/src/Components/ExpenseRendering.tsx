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
    console.log(dates);
    
    return dates;
}

const ExpenseRendering = () => {
    const [todayExpense, setTodayExpense] = useState<ExpenseProp[]>([]);

    useEffect(() => {
        const fetchingTodaysExpense = async () => {
            let todayDateInIso = new Date().toISOString().split("T")[0];
            todayDateInIso += "T00:00:00Z";
            console.log(todayDateInIso);
            
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwiaWF0IjoxNzU3MzY2NTQ1fQ.XBG6M9ge7k5Py87pJ3i7bEbkaNLI5N2-fBdGpXFubdo';
            const expenses_raw = await fetch(`http://localhost:3000/api/expense?start=${todayDateInIso}`, 
                {
                    method: "GET",
                    headers:{
                        "Authorization" : `Bearer ${token}`
                    }
                }
            )
            const expenses_data = await expenses_raw.json();
            setTodayExpense(expenses_data);
        }
        fetchingTodaysExpense()
        getExpensesDates()
        
    }, []);


    useEffect(() => {

    }, [])
    
    return (
        <>
            <h1>Today's expense</h1>
            {todayExpense.map((el) => (
                <Expense key={el.expense_id} expense={el} />
            ))}
        </>
    )
}

export default ExpenseRendering;