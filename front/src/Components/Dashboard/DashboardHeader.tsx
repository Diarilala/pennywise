import { useEffect, useState } from "react"

interface DashboardHeaderProps {
    startDate: string;
    endDate: string;
}

const DashboardHeader = ({ startDate, endDate }: DashboardHeaderProps) => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [userId, setUserId] = useState("");

    const getStats = async () => {
        try {
            const user_raw = await fetch('http://localhost:3000/api/user/profile', {
                method: "GET",
                credentials: 'include',
            });
            const user = await user_raw.json();

            const startingDate = startDate + "T00:00:00.000Z";
            const endingDate = endDate + "T00:00:00.000Z";
            setUserId(user.user_id);
            const stats = await fetch(`http://localhost:3000/api/summary/?userId=${user.user.user_id}&startDate=${startingDate}&endDate=${endingDate}`, {
                method: "GET",
                credentials: 'include',
            })
            const stats_data = await stats.json();
            setTotalExpense(stats_data.totals.expenses);
            setTotalIncome(stats_data.totals.income);
            setRemaining(stats_data.totals.netBalance)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getStats()
    }, [])

    useEffect(() => {
        getStats()
    }, [startDate, endDate])

    return (
        <div className="w-[98%] flex justify-evenly gap-8 my-6">
            <div className="w-1/4 bg-white/30 backdrop-blur-md border border-white/40 shadow-xl p-6 rounded-3xl text-center transition-transform hover:scale-105">
                <p className="text-2xl font-semibold text-amber-800 drop-shadow">Total income</p>
                <p className="text-4xl font-extrabold text-green-700 drop-shadow mt-2">
                    {totalIncome}
                </p>
            </div>
            <div className="w-1/4 bg-white/30 backdrop-blur-md border border-white/40 shadow-xl p-6 rounded-3xl text-center transition-transform hover:scale-105">
                <p className="text-2xl font-semibold text-amber-800 drop-shadow">Total expense</p>
                <p className="text-4xl font-extrabold text-red-600 drop-shadow mt-2">
                    {totalExpense}
                </p>
            </div>
            <div className="w-1/4 bg-white/30 backdrop-blur-md border border-white/40 shadow-xl p-6 rounded-3xl text-center transition-transform hover:scale-105">
                <p className="text-2xl font-semibold text-amber-800 drop-shadow">Remaining</p>
                <p className="text-4xl font-extrabold text-amber-700 drop-shadow mt-2">
                    {remaining}
                </p>
            </div>
        </div>
    )
}

export default DashboardHeader