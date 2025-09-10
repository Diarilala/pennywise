import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditExpense = () => {
    const {id} = useParams<{id : string}>();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("")
    const [amount, setAmount] = useState(0);
    const [categories, setCategories] = useState<Category[]>([])
    const [categoryId, setCategoryId] = useState("")
    useEffect(() => {

    }, [])
    return (
        try{
            
        } catch (err) {

        }
    )

}
export default EditExpense;