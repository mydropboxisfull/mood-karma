import React from 'react';

function ToggleableButton({ label, onClick, isSelected, isBeingEdited, deleteActivity }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-2 mx-2 my-1 ${isSelected || isBeingEdited ? 'bg-black rounded-sm text-white font-bold opacity-100' : 'bg-black rounded-sm text-white font-bold opacity-50'}`}
    >
      {label}
      {isBeingEdited && (
        <div>
          <span onClick={deleteActivity}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 ml-2 pt-2" // Add margin to separate the icon from the label
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      )}
    </button>
  );
}

export default ToggleableButton;
