import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <aside className="w-1/6 bg-white/30 backdrop-blur-lg border border-white/40 flex flex-col justify-between rounded-2xl shadow-2xl">
            <div className="flex flex-col justify-start gap-10 p-5">
                <div className="flex items-center gap-4 justify-start w-full">
                <h1 className="text-ml font-extrabold text-purple-700 tracking-wide mb-8 drop-shadow-lg flex items-center gap-5" style={{ fontFamily: "Italiana, serif" }}>
                    <img src="logoblack.png" alt="" className="h-6"/>
                    <p className="text-2xl">Pennywise</p>
                </h1>
                </div>
                
                <nav>
                    <ul className="flex flex-col gap-6">
                        <li className="text-">
                            <Link
                                to="/expense"
                                className="text-xl font-medium text-amber-900 px-6 py-3 rounded-xl hover:bg-amber-100/60 hover:backdrop-blur transition-all duration-200 shadow-sm"
                            >
                                Expenses
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/categories"
                                className="text-2xl font-medium text-amber-900 px-6 py-3 rounded-xl hover:bg-amber-100/60 hover:backdrop-blur transition-all duration-200 shadow-sm"
                            >
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/income"
                                className="text-2xl font-medium text-amber-900 px-6 py-3 rounded-xl hover:bg-amber-100/60 hover:backdrop-blur transition-all duration-200 shadow-sm"
                            >
                                Income
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex flex-col items-center pb-10">
                <Link
                    to="/"
                    className="text-xl font-semibold text-red-600 px-6 py-3 rounded-xl hover:bg-red-100/60 hover:backdrop-blur transition-all duration-200 shadow-sm"
                >
                    Logout
                </Link>
            </div>
        </aside>
    );
};

export default SideBar;