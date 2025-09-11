import { useEffect, useState } from "react"

const DashboardHeader = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString());
    const [userId, setUserId] = useState("")
    useEffect(() => {
        const getStats = async () => {
            try{
                const user_raw = await fetch('http://localhost:3000/api/user/profile' ,{
                    method: "GET",
                    credentials: 'include',
                });
                const user = await user_raw.json();

                const startDate = currentDate.substring(0,8) + "01T00:00:00.000Z"
                setUserId(user.user_id);               
                const stats = await fetch(`http://localhost:3000/api/summary/?userId=${user.user.user_id}&startDate=${startDate}&endDate=${currentDate}`, {
                    method: "GET",
                    credentials: 'include',
                })
                const stats_data = await stats.json();
                console.log(stats_data.totals);
                setTotalExpense(stats_data.totals.expenses);
                setTotalIncome(stats_data.totals.income);
                setRemaining(stats_data.totals.netBalance)
            } catch(err) {
                console.error(err);
                
            }
        }
        getStats()
    }, [])

    return <div className="w-[98%] flex justify-evenly">
        <div className="w-1/4 border-1 p-3 rounded-2xl text-center">
            <p className="text-2xl">Total income: </p>
            <p className="text-3xl font-bold">
                {totalIncome}
            </p>
        </div>
        <div className="w-1/4 border-1 p-3 rounded-2xl text-center">
            <p className="text-2xl"> Total expense: </p>
            <p className="text-3xl font-bold">
            {totalExpense}
            </p>
        </div>
        <div className="w-1/4 border-1 p-3 rounded-2xl text-center">
            <p className="text-2xl">Remaining:</p>
            <p className="text-3xl font-bold">
                {remaining}
            </p>
        </div>
    </div>
}

export default DashboardHeader