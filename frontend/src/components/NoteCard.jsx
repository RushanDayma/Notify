import { Link } from "react-router-dom";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { Trash2Icon, ArrowRightIcon } from "lucide-react";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async () => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await api.delete(`/notes/${note._id}`);
      toast.success("Note deleted");
      setNotes((prev) => prev.filter((item) => item._id !== note._id));
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Could not delete note");
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between mt-4">
          <Link to={`/notes/${note._id}`} className="btn btn-outline btn-sm">
            View
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
          <button onClick={handleDelete} className="btn btn-error btn-sm">
            <Trash2Icon className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

