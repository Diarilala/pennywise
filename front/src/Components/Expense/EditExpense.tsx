import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditExpense = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [hours, setHours] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [amount, setAmount] = useState(0);
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        const getThisExpense = async () => {
            const thisExpense = await fetch(`http://localhost:3000/api/expense/${id}`, {
                method: "GET",
                credentials: 'include'
            });
            const data = await thisExpense.json();
            setDate(data.date.split("T")[0]);
            setHours(data.date.slice(11, 16));
            setAmount(data.amount);
            setCategoryId(data.category_id);
            setType(data.type);
            setDescription(data.description || "");
            setStartDate(data.start_date?.split("T")[0] || "");
            setEndDate(data.end_date?.split("T")[0] || "");
        };
        getThisExpense();
    }, [id]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const updatedExpense = {
            amount: amount,
            date: date + "T" + hours + ":00.000Z",
            categoryId: categoryId,
            description: description,
            type: type,
            startDate: startDate + "T" + hours + ":00.000Z",
            endDate: endDate + "T" + hours + ":00.000Z"
        };
        try {
            const response = await fetch(`http://localhost:3000/api/expense/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(updatedExpense)
            });
            await response.json();
            navigate("/expense");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="absolute inset-0 min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit Expense</h2>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium" htmlFor="description">
                        Description
                        <input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-medium" htmlFor="amount">
                        Amount
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </label>
                </div>
                {type === "one-time" && (
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">
                            Date
                            <div className="flex gap-2 mt-1">
                                <input
                                    value={date}
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                                />
                                <input
                                    type="time"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                                />
                            </div>
                        </label>
                    </div>
                )}
                {type === "recurring" && (
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">
                            Start Date
                            <input
                                value={startDate}
                                type="date"
                                onChange={(e) => setStartDate(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </label>
                        <label className="text-gray-700 font-medium">
                            End Date
                            <input
                                value={endDate}
                                type="date"
                                onChange={(e) => setEndDate(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </label>
                        <label className="text-gray-700 font-medium">
                            Time
                            <input
                                type="time"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </label>
                    </div>
                )}
                <div className="flex gap-3 mt-4">
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-amber-500 text-black rounded-md font-semibold hover:bg-amber-600 transition"
                    >
                        Confirm
                    </button>
                    <Link
                        to="/expense"
                        className="flex-1 px-4 py-2 border border-amber-500 text-amber-500 rounded-md font-semibold hover:bg-amber-50 transition text-center"
                    >
                        Go back
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditExpense;