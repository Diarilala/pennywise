import { useState } from "react"

const CategoryComponent = ({categoryId, userId, name}) => {
    const [deleteMode, setDeleteMode] = useState(false);

    const handleDelete = async () => {
        
    }

    return(
        <div className="flex w-1/4 justify-between border-1 p-5">
            <div>{name}</div>
            {
                !deleteMode && 
                    <div className="flex gap-3">
                        <button 
                        className=""
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

export default CategoryComponent