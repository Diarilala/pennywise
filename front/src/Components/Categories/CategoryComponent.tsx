import { useState } from "react"

interface CategoryComponentProps {
    categoryId: string;
    userId: string;
    name: string;
    onDelete: () => void;
}

export const CategoryComponent = ({categoryId, userId, name, onDelete}: CategoryComponentProps) => {
    const [deleteMode, setDeleteMode] = useState(false);
    const [editMode, setEdit] = useState(false);

    const handleDelete = async () => {
        try{
            const deletedCategory = await fetch(`http://localhost:3000/api/category/${categoryId}`, {
                method: "DELETE", 
                credentials: 'include',
                headers: {'Content-Type' : 'application/json'}
            });
            console.log("k");
            
            await deletedCategory.json();
            setDeleteMode(false);
            onDelete();
            console.log("deleteed");
            
        } catch (err) {
            console.error(err);
        }
    }

    const handleEdit = async () => {
        
    }

    return(
        <div className="flex w-1/4 justify-between border-1 p-5">
            <div>{name}</div>
            {
                !deleteMode && 
                    <div className="flex gap-3">
                        <button 
                        className=""
                        onClick={handleEdit}
                        >
                            Edit
                            </button>
                        <button
                        className="text-red-500"
                        onClick={() => setDeleteMode(true)}
                        >
                            Delete
                            </button>
                    </div>
            } {
                deleteMode && 
                <div>
                    <p>Do you really want to delete this category</p>
                    <div className="flex gap-4">
                        <button
                        className="text-red-500"
                        onClick={() => handleDelete()}

                        >Yes, delete</button>
                        <button
                            onClick={() => setDeleteMode(false)}
                        >No, keep</button>
                    </div>
                </div>
            }
        </div>
    )
}