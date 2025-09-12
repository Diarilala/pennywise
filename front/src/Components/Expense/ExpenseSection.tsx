import ExpenseRendering from "./ExpenseRendering";
import { Link } from "react-router-dom";

const ExpenseSection = () => {


    return (
        <div >
            <p className="text-5xl">Expenses</p>
            <button className="bg-amber-500 p-2 rounded-2xl">
                <Link to="create">
                New expense
                </Link>
                
                </button>
            <ExpenseRendering/>
        </div>
    )

}
export default ExpenseSection;