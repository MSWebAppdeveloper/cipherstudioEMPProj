import React, { useState } from 'react';

interface CommentPopupProps {
  isOpen: boolean;
  task: any;
  onClose: () => void;
  onSubmit: (comment: string, taskId: number) => void;
}

const CommentPopup: React.FC<CommentPopupProps> = ({ isOpen, task, onClose, onSubmit }) => {
  const [comment, setComment] = useState('');
  const handleSubmit = () => {
    onSubmit(comment, task);
    setComment('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{zIndex:"999"}}>
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-lg font-semibold mb-4">Add a Comment</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment here"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentPopup;
