import { useEffect, useState } from "react";
import Expense from "./Expense";

interface Expense {
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
const ExpenseSection = () => {

    const [ expenses, setExpenses ] = useState<Expense[]>([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            let token ='550e8400-e29b-41d4-a716-446655440000';
            token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwiaWF0IjoxNzU3MzY2NTQ1fQ.XBG6M9ge7k5Py87pJ3i7bEbkaNLI5N2-fBdGpXFubdo'

            // localStorage.getItem('jwt');
            const thisUserExpenses = await fetch('http://localhost:3000/api/expense', {
                method: 'GET',
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            } )
            const data = await thisUserExpenses.json();
            setExpenses(data);
            console.log(data);
            
        }
        fetchExpenses();
    }, [expenses]);

    return (
        <>
            {expenses.map((el, index) => (
                <li key={index}>{el}</li>
            ))}
        </>
    )

}
export default ExpenseSection;