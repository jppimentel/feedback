import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaInbox, FaInfoCircle, FaUserFriends } from 'react-icons/fa';
import Link from 'next/link';

interface NavbarProps {
  activeButton: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeButton }) => {
  const [currentActiveButton, setCurrentActiveButton] = useState('');

  useEffect(() => {
    setCurrentActiveButton(activeButton);
  }, [activeButton]);

  const handleButtonClick = (buttonName: string) => {
    setCurrentActiveButton(buttonName);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link href={'/home'}>
          <span className="text-xl font-bold text-white">meufeedback.com</span>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href={'/feedbackSent'}>
          <button
            className={`flex flex-col items-center mx-2 ${
              currentActiveButton === 'sent' ? 'text-blue-500' : ''
            }`}
          >
            <FaEnvelope className="text-xl" />
            <span className="text-sm">Enviados</span>
          </button>
        </Link>    
        <Link href={'/feedbackReceived'}>
          <button
            className={`flex flex-col items-center mx-2 ${
              currentActiveButton === 'received' ? 'text-blue-500' : ''
            }`}
          >
            <FaInbox className="text-xl" />
            <span className="text-sm">Recebidos</span>
          </button>
        </Link>
        <Link href={'/myInformations'}>
          <button
            className={`flex flex-col items-center mx-2 ${
              currentActiveButton === 'myInformation' ? 'text-blue-500' : ''
            }`}
          >
            <FaInfoCircle className="text-xl" />
            <span className="text-sm">Informações</span>
          </button>
        </Link>
        <Link href={'/myFriends'}>
          <button
            className={`flex flex-col items-center mx-2 ${
              currentActiveButton === 'myFriends' ? 'text-blue-500' : ''
            }`}
          >
            <FaUserFriends className="text-xl" />
            <span className="text-sm">Amigos</span>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
