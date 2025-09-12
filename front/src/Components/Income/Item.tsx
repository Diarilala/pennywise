import { useState } from "react";

interface Income {
  income_id: string;
  amount: number;
  source: string;
  description: string;
  created_at: string;
}

interface IncomeItemProps {
  income: Income;
  onUpdate: () => void;
}

const IncomeItem = ({ income, onUpdate }: IncomeItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [amount, setAmount] = useState(income.amount.toString());
  const [source, setSource] = useState(income.source);
  const [description, setDescription] = useState(income.description);
  const [date, setDate] = useState(income.created_at);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this income record?")) return;

    setIsDeleting(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:3000/api/income/${income.income_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete income");
      }

      onUpdate();
    } catch (error: any) {
      console.error("Error deleting income:", error);
      alert(error.message || "Failed to delete income. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/income/${income.income_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount: parseFloat(amount),
          source,
          description,
          received_date: date,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update income");
      }

      onUpdate();
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error updating income:", error);
      alert(error.message || "Failed to update income. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="px-6 py-4 flex justify-between items-center hover:bg-[#9370DB] hover:bg-opacity-5 transition-colors">
      {isEditing ? (
        <div className="flex-1">
          <div className="flex items-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              placeholder="Source"
            />
          </div>
          <div className="mt-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              placeholder="Description"
            />
          </div>
          <div className="mt-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="mt-2 flex">
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-semibold text-[#B8DB70]">
              ${Number(income.amount).toFixed(2)}
            </span>
          </div>
          <div className="text-sm font-medium text-[#1E1E1E] mt-1">
            {income.source}
          </div>
          {income.description && (
            <div className="text-sm text-[#1E1E1E] text-opacity-70 mt-1">
              {income.description}
            </div>
          )}
          <div className="text-xs text-[#1E1E1E] text-opacity-50 mt-1">
            {formatDate(income.created_at)}
          </div>
        </div>
      )}

      <div className="flex items-center">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-[#9370DB] hover:text-[#8360CB] ml-4 transition-colors"
            title="Edit income"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-[#9370DB] hover:text-[#8360CB] disabled:opacity-50 ml-4 transition-colors"
          title="Delete income"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IncomeItem;