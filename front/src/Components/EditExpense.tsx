import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const EditExpense = () => {
    const {id} = useParams<{id : string}>();
    const navigate = useNavigate()
    const [date, setDate] = useState("");
    const [hours, setHours]  = useState("")
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("")
    const [amount, setAmount] = useState(0);
    const [categoryId, setCategoryId] = useState("");

    useEffect( () => {
        const getThisExpense = async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwiaWF0IjoxNzU3MzY2NTQ1fQ.XBG6M9ge7k5Py87pJ3i7bEbkaNLI5N2-fBdGpXFubdo";
            const thisExpense = await fetch(`http://localhost:3000/api/expense/${id}`, {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            })
            const data = await thisExpense.json();
            console.log(data);
            
                setDate(data.date.split("T")[0]);
                setHours(data.date.slice(11,16));
                setAmount(data.amount);
                setCategoryId(data.category_id );
                setType(data.type );
                setDescription(data.description || "");
                setStartDate(data.start_date.split("T")[0] || "");
                setEndDate(data.end_date.split("T")[0] || "");
            }
            getThisExpense()
    }, [])

    const handleSubmit = async () => {
        const updatedExpense = {
            amount: amount,
            date: date + "T" + hours + ":00.000Z",
            categoryId: categoryId,
            description: description,
            type: type,
            startDate:  startDate + "T" + hours + ":00.000Z",
            endDate :  endDate + "T" + hours + ":00.000Z"
        }
        try{
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwiaWF0IjoxNzU3MzY2NTQ1fQ.XBG6M9ge7k5Py87pJ3i7bEbkaNLI5N2-fBdGpXFubdo"
            const response = await fetch(`http://localhost:3000/api/expense/${id}`, {
                method: "PUT",
                headers :{
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(updatedExpense)
            }) 
            const data = await response.json();
            console.log(data);
            } catch(err){
            console.error(err);
            
        }

    }
    return (
        <div className="flex flex-col gap-4">
            <p>Edit expense</p>
            <label htmlFor=""> Description : 
                <input value={description} onChange={(e)=>{setDescription(e.target.value)}} type="text" name="" id="" />
            </label>

            <label htmlFor="amount"> Amout: 
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
            </label>
            {
                type == "one-time" && (
            <label htmlFor="">Date:
                <input value={date} type="date" onChange={(e) => setDate(e.target.value)} name="" id="" />
                <input type="time" value={hours} onChange={(e) => setHours(e.target.value)} name="" id="" />
            </label>
                )
            }
            {
                type == "recurring" && (
            <label htmlFor="">Date:
                <input value={startDate} type="date" onChange={(e) => setStartDate(e.target.value)} name="" id="" />
                <input value={endDate} type="date" onChange={(e) => setEndDate(e.target.value)} name="" id="" />
                <input type="time" value={hours} onChange={(e) => setHours(e.target.value)} name="" id="" />
            </label>
                )
            }
            
            <button onClick={handleSubmit}>Confirm</button>
            <Link to="/">Go back nigga</Link>
        </div>
    )

}
export default EditExpense;