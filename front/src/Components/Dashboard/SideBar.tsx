import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div
            className="w-1/6  bg-amber-50 border-1 flex flex-col items-center gap-3 rounded-2xl justify-between"
        >
            <div className="flex flex-col gap-5 items-center p-5">
            <p className="text-5xl" >Pennywise</p>
            <ul className="text-4xl flex flex-col gap-2">
                <li>
                    <Link to='/expense'>Expenses</Link>
                </li>
                <li>
                    <Link to='/categories'>Categories</Link>
                </li>
                <li>
                    <Link to='/income'>Income</Link>
                </li>
            </ul>
            </div>
            <div className="text-4xl p-5">
                <ul className="flex flex-col items-center">
                    <li>
                        <Link to='/profile'>User</Link>
                    </li>
                    <li>
                        <Link to='/'>Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;