import React, { useState, ReactNode } from 'react';
import {defaultApi} from "../services/defaultApi";

interface AcceptFriendProps {
  friendName: string,
  userId: string,
  friendshipId: string,
  onFriendAccepted: any

}

const AcceptFriend: React.FC<AcceptFriendProps> = ({ friendName, userId, friendshipId, onFriendAccepted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAcceptingFriendship, setIsAcceptingFriendship] = useState(false);

  const acceptFriend = async () => {
    setIsAcceptingFriendship(true);
    await defaultApi
    .post("/friend/accept",{
      id: friendshipId,
      acceptingUserId: userId
    })
    .then((data) => {
      setIsAcceptingFriendship(false);
      onFriendAccepted(friendshipId + new Date());
      setIsOpen(false);
    }).catch(err => {
      setIsAcceptingFriendship(false);
      setIsOpen(false);
      console.log("error: "+err);
    });
  }

  return (
    <div>
      <div className="text-white bg-gray-800 rounded-full pr-4 pl-4 mr-2 hover:bg-blue-500" onClick={() => setIsOpen(true)}>Aprovar</div>


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
          <div className="w-80 mx-auto mt-8 text-center">
            <p>O usuário {friendName} te enviou uma solicitação de amizade! Tem certeza que deseja aprovar?</p>
            <button
              className="text-white text-lg bg-gray-800 hover:bg-blue-500 rounded-full mt-4 mx-auto"
              onClick={() => acceptFriend()}
            >
              <p className="mx-4">Aprovar</p>
            </button>
            {isAcceptingFriendship && (
              <p className='ml-4'>Aceitando Solicitação ...</p>
            )}
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default AcceptFriend;
