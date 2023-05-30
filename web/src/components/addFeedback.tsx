import React, { useState } from 'react';

const FormComponent: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [position, setPosition] = useState('');
  const [comment, setComment] = useState('');
  const [isError, setIsError] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [userSubmitted, setUserSubmitted] = useState('');

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedUser === '' || position === '' || comment === '') {
      setIsError(true);
      return;
    }

    // Lógica de envio do formulário

    setUserSubmitted(selectedUser);
    setSelectedUser('');
    setCurrentDate(new Date().toLocaleDateString());
    setPosition('');
    setComment('');
    setIsError(false);
    setIsFormSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="w-80 mx-auto mt-8">
      {isError && <p className="text-red-500 mb-4">Preencha todos os campos.</p>}

      {!isFormSubmitted && (
        <>
          <div className="mb-4 flex flex-col">
            <label htmlFor="user" className="block font-semibold mb-2">
              Usuário:
            </label>
            <select
              id="user"
              value={selectedUser}
              onChange={handleUserChange}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Selecione um usuário</option>
              <option value="user1">Usuário 1</option>
              <option value="user2">Usuário 2</option>
              <option value="user3">Usuário 3</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block font-semibold">
              Data:
            </label>
            <input
              id="date"
              type="text"
              value={currentDate}
              readOnly
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="position" className="block font-semibold">
              Cargo:
            </label>
            <input
              id="position"
              type="text"
              value={position}
              onChange={handlePositionChange}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block font-semibold">
              Comentário:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              className="border border-gray-300 rounded px-2 py-1 w-full h-32 resize-none"
            ></textarea>
          </div>
        </>
      )}

      {isFormSubmitted ? (
        <p className="text-blue-500 mb-4">Formulário enviado para {userSubmitted}!</p>
      ) : (
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">
          Enviar
        </button>
      )}
    </form>
  );
};

export default FormComponent;
