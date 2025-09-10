import { useEffect, useState } from "react";
import ExpenseRendering from "./ExpenseRendering";

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
const ExpenseSection = () => {


    return (
        <>
            <ExpenseRendering/>
        </>
    )

}
export default ExpenseSection;