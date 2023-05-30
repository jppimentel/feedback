import React, { useState, ChangeEvent, FormEvent } from 'react';

const AddFriend = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailSent, setEmailSent] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);

    if (isValid) {
      setIsEmailSent(true);
      setEmailSent(email);
      setEmail('');
    } else{
      setIsEmailSent(false);
    }
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
        {!isValidEmail && <p className="text-red-500 mb-4">Email inválido.</p>}
        {isEmailSent && (
          <p className="text-green-500 mb-4">
            Solicitação enviada para {emailSent}! Deseja realizar nova solicitação de amizade?
          </p>
        )}
      </form>

    </>
  );
};

export default AddFriend;
