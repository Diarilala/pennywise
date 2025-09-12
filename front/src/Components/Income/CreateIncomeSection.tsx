import { Link } from "react-router-dom";
import AddIncomeForm from "./AddIncomeForm";

const CreateIncomeSection = () => {
    return (
        <div className="bg-amber-100 w-screen gap-5 flex flex-col items-center justify-center">
            <AddIncomeForm/>
            <Link to="/Item">Come back to income source list</Link>
        </div>
    )
}

export default CreateIncomeSection;