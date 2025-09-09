const Expense = ({expense}) => {
    return(
        <div className="p-4 border-1 border-amber-600 w-1/8">
            <h1>{expense.description}</h1>
            <h2>{expense.amount}</h2>
            <h3>{expense.date}</h3>
        </div>
    )
}
export default Expense