import React, { useState, useEffect } from 'react';
import {defaultApi} from "../services/defaultApi";

interface AddFeedbackProps {
  startUser: string | null;
  startUserId: string | null
}

// const AddFeedback: React.FC = () => {
const AddFeedback: React.FC<AddFeedbackProps> = ({ startUser = null, startUserId = null }) => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [position, setPosition] = useState('');
  const [comment, setComment] = useState('');
  const [isError, setIsError] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [userSubmitted, setUserSubmitted] = useState('');
  const [isAPIError, setIsAPIError] = useState(false);

  const [noFriends, setNoFriends] = useState(false);
  const [loadedFriends, setLoadedFriends] = useState(false);
  const [lastFriendAccepted, setLastFriendAccepted] = useState("");
  const [friends, setFriends] = useState<any[]>([]);
  

  useEffect(() => {
    const getFriends = async () => {
      await defaultApi
      .get("/friend/"+localStorage.getItem('userId'),{})
      .then((data) => {
        setFriends(data.data);
        setLoadedFriends(true);
        if(data && data.data && data.data.length === 0){
          setNoFriends(true);
        }
        console.log("friends received now: "+ JSON.stringify(friends))
      }).catch(err => {
        console.log("error: "+err);
      });

    }
    if (localStorage.getItem('isTokenValid') && localStorage.getItem('userId')) {
      getFriends();
    }
  }, [lastFriendAccepted]);
  
  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;

    setSelectedUserId(selectedId);
    setSelectedUserName(selectedName);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedUserId === '' || position === '' || comment === '') {
      setIsError(true);
      setIsAPIError(false);
      return;
    }

    // Lógica de envio do formulário
    callAddFeedbackAPI();
    // setUserSubmitted(selectedUser);
    // setSelectedUser('');
    // setCurrentDate(new Date().toLocaleDateString());
    // setPosition('');
    // setComment('');
    // setIsError(false);
    // setIsFormSubmitted(true);
  };

  const callAddFeedbackAPI = async () => {
    setIsError(false);
    await defaultApi
    .post("/feedback",{
      fromUserId: localStorage.getItem('userId'),
      toUserId: selectedUserId,
      date: new Date(),
      currentRole: position,
      comments: comment
    })
    .then((data) => {
      console.log("feedback enviada: "+ JSON.stringify(data.data.id))
      setUserSubmitted(selectedUserName);
      setSelectedUserId('');
      setSelectedUserName('');
      setCurrentDate(new Date().toLocaleDateString());
      setPosition('');
      setComment('');
      setIsError(false);
      setIsFormSubmitted(true);
    }).catch(err => {
      setIsAPIError(true);
      console.log("error: "+err);
      return;
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-80 mx-auto mt-8">
      {isError && <p className="text-red-500 mb-4">Preencha todos os campos.</p>}
      {isAPIError && <p className="text-red-500 mb-4">Não foi possível enviar o feedback, tente novamente.</p>}

      {!isFormSubmitted && (
        <>
          <div className="mb-4 flex flex-col">
            <label htmlFor="user" className="block font-semibold mb-2">
              Usuário:
            </label>
            
            {noFriends === false && loadedFriends === false && (
              <p className='ml-4'>Carregando...</p>
            )}
            
            {noFriends === true && loadedFriends === true && (
              <p className='ml-4'>Você ainda não tem amigos.</p>
            )}
            
            {noFriends === false && loadedFriends === true && friends && (
              <select
                id="user"
                value={selectedUserId}
                onChange={handleUserChange}
                className="border border-gray-300 rounded px-2 py-1"
              >
                {startUser && (
                  <option value={startUserId || ""}>{startUser}</option>
                )}

                {!startUser && (
                  <>
                    <option value="">Selecione o Usuário</option>
                    {friends.map((friend, index) => (
                      <option value={friend.friendUserId}>{friend.friendUser.name}</option>
                    ))}
                    {/* <option value="">Selecione o Usuário</option>
                    <option value="user1">Usuário 1</option>
                    <option value="user2">Usuário 2</option>
                    <option value="user3">Usuário 3</option> */}
                  </>
                )}
              </select>
            )}
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

export default AddFeedback;
