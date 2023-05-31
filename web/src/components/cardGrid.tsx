import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddFeedback from '../components/addFeedback'

interface CardProps {
  post: string;
  date: string;
  comment: string;
  onClick?: () => void; // Propriedade onClick como opcional
}

const Card: React.FC<CardProps> = ({ post, date, comment, onClick }) => {
  return (
    <div className="bg-blue-100 rounded-lg shadow-md p-4" onClick={onClick}>
      <h2 className="text-xl font-bold">{post}</h2>
      <p className="text-gray-500">{date}</p>
      <p className="text-gray-500">{comment}</p>
    </div>
  );
};


const CardGrid: React.FC<{ cards: CardProps[], collaborator: string }> = ({ cards, collaborator }) => {
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
      <div className="bg-blue-100 rounded-lg shadow-md p-4">
        <div className="flex justify-center items-center h-full">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 mr-4 flex items-center justify-center"
            onClick={() => openModal({ post: '', date: '', comment: '' })}
          >
            <FaPlus className="text-lg" />
          </button>
          <p className='text-gray-800'>Adicionar Feedback</p>
        </div>
      </div>



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
            {selectedCard.post && selectedCard.date && selectedCard.comment && (
              <div className="ml-4 mr-4 mt-8">
                <p>Cargo: {selectedCard.post}</p>
                <p>Data: {selectedCard.date}</p>
                <p>Feedback: {selectedCard.comment}</p>
              </div>
            )}
            {!selectedCard.post && !selectedCard.date && !selectedCard.comment && (
              <div className="ml-4 mr-4 mt-8">
                <AddFeedback startUser={collaborator}/>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGrid;
