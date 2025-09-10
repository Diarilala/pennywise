import { Link } from "react-router-dom";
import NewExpenseForm from "./NewExpenseForm";

const CreateExpenseSection = () => {
    return (
        <>
        <p>You lwk create expenses here</p>
        <NewExpenseForm />
        <Link to="/">Come back nigga</Link>
        </>
    )
}

export default CreateExpenseSection;