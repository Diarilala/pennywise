import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <aside className="outline-gray-200 outline-1 bg-gray-100 shadow-xl shadow-gray-400 backdrop-blur-lg border border-white/40 flex flex-col justify-between rounded-xl">
            <div className="flex flex-col justify-start gap-10 p-5">
                <div className="flex items-center gap-4 justify-start w-full">
                <h1 className="text-ml font-extrabold text-purple-700 mr-5 tracking-wide mb-8 drop-shadow-lg flex items-center gap-2 px-5" style={{ fontFamily: "Italiana, serif" }}>
                    <img src="logoblack.png" alt="" className="h-6"/>
                    <p className="text-2xl">Pennywise</p>
                </h1>
                </div>
                
                <nav>
                    <ul className="flex flex-col gap-6">
                        <li className="text-">
                            <Link
                                to="/expense"
                                className="text-xl font-medium text-gray-900 py-3 rounded-xl hover:bg-purple-100/60 hover:backdrop-blur transition-all duration-200"
                            >
                                <div className="flex justify-start items-center gap-2">
                                <img src="expense.png" alt="" className="h-7"/>
                                Expenses
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/categories"
                                className="text-xl font-medium text-gray-900 py-3 rounded-xl hover:bg-purple-100/60 hover:backdrop-blur transition-all duration-200"
                            >
                                <div className="flex justify-start items-center gap-2">
                                <img src="category.png" alt="" className="h-7"/>
                                Categories
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/income"
                                className="text-xl font-medium text-gray-900 py-3 rounded-xl hover:bg-purple-100/60 hover:backdrop-blur transition-all duration-200"
                            >
                                <div className="flex justify-start items-center gap-2">
                                <img src="profit.png" alt="" className="h-7"/>
                                Income 
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex flex-col items-start px-4 pb-10">
                <Link
                    to="/"
                    className="text-xl font-semibold text-red-600 px-6 py-3 rounded-xl hover:bg-red-100/60 hover:backdrop-blur transition-all duration-200"
                >
                    Logout
                </Link>
            </div>
        </aside>
    );
};

export default SideBar;