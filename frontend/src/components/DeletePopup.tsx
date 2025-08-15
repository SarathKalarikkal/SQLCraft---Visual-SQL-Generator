// DeletePopup.tsx
import React from "react";

interface DeletePopupProps {
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  deleteItemId: string;
  deleteItemName?: string; // optional table name for display
  setDeleteItemId: React.Dispatch<React.SetStateAction<string>>;
  setDeleteItemName?: React.Dispatch<React.SetStateAction<string>>;
  onDelete?: (id: string) => void | Promise<void>; // optional delete handler
}

const DeletePopup: React.FC<DeletePopupProps> = ({
  setIsDelete,
  deleteItemId,
  deleteItemName,
  setDeleteItemId,
  setDeleteItemName,
  onDelete,
}) => {
  const handleCancel = () => {
    setIsDelete(false);
    setDeleteItemId("");
    setDeleteItemName && setDeleteItemName("");
  };

  const handleConfirm = async () => {
    if (onDelete) {
      await onDelete(deleteItemId);
    }
    setIsDelete(false);
    setDeleteItemId("");
    setDeleteItemName && setDeleteItemName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
      <div className="bg-slate-800 text-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-[fadeIn_0.2s_ease-out]">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-2">Delete Confirmation</h2>

        {/* Message */}
        <p className="text-center text-slate-300 mb-6">
          Are you sure you want to delete{" "}
          <span className="text-red-400 font-medium">{deleteItemName || deleteItemId}</span>?  
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleCancel}
            className="px-5 py-2 rounded-lg bg-slate-600 hover:bg-slate-500 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition font-medium shadow-lg shadow-red-500/30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
