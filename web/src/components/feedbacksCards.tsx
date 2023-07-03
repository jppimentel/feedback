import React, { useState, ReactNode } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import CardGrid from './cardGrid';

interface Feedback {
  currentRole: string;
  date: string;
  comments: string;
  status: string;
  id:  string;
}

interface FeedbackCardProps {
  feedbacks: Feedback[];
  collaborator: string;
  collaboratorId: string;
  type: string;
  onFeedbackSent: any
}


const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedbacks, collaborator, collaboratorId, type, onFeedbackSent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="bg-gray-800 hover:bg-blue-600 text-white rounded-full w-8 h-8 mr-4 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <BiSearchAlt2 className="text-lg" />
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
            {type === "sent" && (
              <p className="ml-4 mr-4">Feedbacks enviados para {collaborator}</p>
            )}
            {type === "received" && (
              <p className="ml-4 mr-4">Feedbacks recebidos de {collaborator}</p>
            )}
            <div className="ml-4 mr-4 mt-8">
              <CardGrid cards={feedbacks} collaborator={collaborator} collaboratorId={collaboratorId} type={type} onFeedbackSent={onFeedbackSent}/>
            </div>
          </div>
        </div>
      
      )}
    </div>
  );
};

export default FeedbackCard;
