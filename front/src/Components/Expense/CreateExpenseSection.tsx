import { Link } from "react-router-dom";
import NewExpenseForm from "./NewExpenseForm";

const CreateExpenseSection = () => {
    return (
        <div className="bg-amber-100 w-screen gap-5 flex flex-col items-center justify-center">

            <NewExpenseForm />
            <Link to="/expense">Come back to expenses list</Link>

        </div>
        
    )
}

export default CreateExpenseSection;