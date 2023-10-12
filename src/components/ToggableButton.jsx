import React, { useState } from 'react';

function ToggleableButton({ label, onClick, isSelected }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-2 mx-2 my-1 ${isSelected ? 'bg-black rounded-sm text-white font-bold opacity-100' : 'bg-black rounded-sm text-white font-bold opacity-50'}`}
    >
      {label}
    </button>
  );
}

export default ToggleableButton;
