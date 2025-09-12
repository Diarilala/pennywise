import { useState } from "react"

interface CategoryComponentProps {
    categoryId: string;
    userId: string;
    name: string;
    onDelete: () => void;
}

export const CategoryComponent = ({ categoryId, name, onDelete }: CategoryComponentProps) => {
    const [deleteMode, setDeleteMode] = useState(false);
    const [editMode, setEdit] = useState(false);

    const handleDelete = async () => {
        try {
            const deletedCategory = await fetch(`http://localhost:3000/api/category/${categoryId}`, {
                method: "DELETE",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
            await deletedCategory.json();
            setDeleteMode(false);
            onDelete();
        } catch (err) {
            console.error(err);
        }
    };

    // Placeholder for edit functionality
    const handleEdit = async () => {
        setEdit(true);
    };

    return (
        <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 shadow-sm hover:shadow-md transition w-full">
            <div className="text-gray-800 font-medium">{name}</div>
            {!deleteMode ? (
                <div className="flex gap-3">
                    <button
                        className="text-amber-600 hover:underline text-sm"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="text-red-500 hover:underline text-sm"
                        onClick={() => setDeleteMode(true)}
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-end gap-2">
                    <p className="text-sm text-gray-700">Delete this category?</p>
                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                            onClick={handleDelete}
                        >
                            Yes, delete
                        </button>
                        <button
                            className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-xs hover:bg-gray-200"
                            onClick={() => setDeleteMode(false)}
                        >
                            No, keep
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}