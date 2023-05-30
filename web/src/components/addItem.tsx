import React, { useState, ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';

interface AddItemProps {
  children: ReactNode;
}

const AddItem: React.FC<AddItemProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 mr-4 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus className="text-lg" />
      </button>


      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white absolute w-full h-full">
          <div className="bg-gray-800">
            <button
              className="absolute top-2 right-2 text-white text-lg bg-red-500 hover:bg-red-600 rounded-full w-10 h-10 mt-4 mr-4"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
            <br />
            <h1 className="text-4xl text-blue-500 text-center font-bold tracking-wider">
              meufeedback.com
            </h1>
            <br />
          </div>
          <br />
          {children}
        </div>
      </div>
      
      )}
    </div>
  );
};

export default AddItem;
