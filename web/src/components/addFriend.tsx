import React, { useState, ChangeEvent, FormEvent } from 'react';
import {defaultApi} from "../services/defaultApi";

interface AddFriendProps {
  onFriendSent: any

}

const AddFriend: React.FC<AddFriendProps> = ({ onFriendSent }) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSendingFriendship, setIsSendingFriendship] = useState(false);
  const [emailSent, setEmailSent] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const addFriends = async () => {
    setIsEmailSent(true);
    setEmailSent(email);
    await defaultApi
    .post("/friend",{
      fromUserId: localStorage.getItem('userId'),
      toUserEmail: email
    })
    .then((data) => {
      console.log("amizade enviada: "+ JSON.stringify(data.data.id))
      onFriendSent(data.data.id);
      setIsSendingFriendship(false);
    }).catch(err => {
      setIsValidEmail(false);
      setIsEmailSent(false);
      setIsSendingFriendship(false);
      console.log("error: "+err);
    });

  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);

    if (isValid) {
      setIsSendingFriendship(true); 
      addFriends();
    } else{
      setIsEmailSent(false);
    }
    setEmail('');
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col items-center mx-auto max-w-2xl">
        <p>Digite o email do seu amigo</p>
        <br />
        <div className="flex w-full max-w-xs">
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            className={`border ${!isValidEmail ? 'border-red-500' : ''} flex-grow-0 flex-shrink-0 p-2`}
            placeholder="Email"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2 flex-grow"
          >
            Enviar
          </button>
        </div>
        {!isValidEmail && !isSendingFriendship && <p className="text-red-500 mb-4">Email inválido.</p>}
        {isEmailSent && !isSendingFriendship && (
          <p className="text-green-500 mb-4">
            Solicitação enviada para {emailSent}! Deseja realizar nova solicitação de amizade?
          </p>
        )}
        {isSendingFriendship && (
          <p className="mb-4">
          Enviando Solicitação ...
          </p>
        )}
      </form>

    </>
  );
};

export default AddFriend;
