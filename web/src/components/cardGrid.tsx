import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddFeedback from '../components/addFeedback';

interface CardProps {
  currentRole: string;
  date: string;
  comments: string;
  status: string;
  onClick?: () => void; 
}

const Card: React.FC<CardProps> = ({ currentRole, date, comments, status, onClick }) => {
  return (
    <div className="bg-blue-100 rounded-lg shadow-md p-4" onClick={onClick}>
      <h2 className="text-xl font-bold">{currentRole}</h2>
      <p className="">{formatDate(date)}</p>
      <p className="">{comments}</p>
      {status === "WAITING" && (
        <p className="text-blue-600">Aguardando Aprovação</p>
      )}
    </div>
  );
};


const CardGrid: React.FC<{ cards: CardProps[], collaborator: string, collaboratorId: string, type: string }> = ({ cards, collaborator, collaboratorId, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);

  const openModal = (card: CardProps) => {
    setIsModalOpen(true);
    setSelectedCard(card);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Card key={index} {...card} onClick={() => openModal(card)} />
      ))}
      {type === "sent" && (
        <div className="bg-blue-100 rounded-lg shadow-md p-4">
          <div className="flex justify-center items-center h-full">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 mr-4 flex items-center justify-center"
              onClick={() => openModal({ currentRole: '', date: '', comments: '', status: '' })}
            >
              <FaPlus className="text-lg" />
            </button>
            <p className='text-gray-800'>Adicionar Feedback</p>
          </div>
        </div>
      )}



      {isModalOpen && selectedCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white absolute w-full h-full">
            <div className="bg-gray-800">
              <button
                className="absolute top-2 right-2 text-white text-lg bg-red-500 hover:bg-red-600 rounded-full w-10 h-10 mt-4 mr-4"
                onClick={() => closeModal()}
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
            {selectedCard.currentRole && selectedCard.date && selectedCard.comments && (
              <div className="ml-4 mr-4 mt-8">
                <p>Cargo: {selectedCard.currentRole}</p>
                <p>Data: {formatDate(selectedCard.date)}</p>
                <p>Feedback: {selectedCard.comments}</p>
                {selectedCard.status === "WAITING" && type === "received" && (
                  <button
                    className="text-white text-lg bg-gray-800 hover:bg-blue-500 rounded-full mt-4 mx-auto"
                  >
                    <p className="mx-4">Aprovar</p>
                  </button>
                )}
                {selectedCard.status === "WAITING" && type === "sent" && (
                  <p className="text-blue-600">Aguardando Aprovação</p>
                )}
              </div>
            )}
            {!selectedCard.currentRole && !selectedCard.date && !selectedCard.comments && (
              <div className="ml-4 mr-4 mt-8">
                <AddFeedback startUser={collaborator} startUserId={collaboratorId}/>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGrid;


function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

  const formattedDate = date.toLocaleDateString(undefined, optionsDate);
  const formattedTime = date.toLocaleTimeString(undefined, optionsTime);

  return `${formattedDate} ${formattedTime}`;
}
