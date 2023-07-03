import React, { useState, ReactNode } from 'react';
import {defaultApi} from "../services/defaultApi";

interface AcceptFeedbackProps {
  id: string;
  onFeedbackAccept: any
}

const AcceptFeedback: React.FC<AcceptFeedbackProps> = ({ id, onFeedbackAccept }) => {
  const [isAcceptingFeedback, setIsAcceptingFeedback] = useState("start");

  const acceptFriend = async () => {
    setIsAcceptingFeedback("accepting");
    await defaultApi
    .post("/feedback/accept",{
      id: id,
      acceptingUserId: localStorage.getItem('userId'),
      "status": "ACCEPT"
    })
    .then((data) => {
      onFeedbackAccept(id + new Date());
      setIsAcceptingFeedback("accepted")
    }).catch(err => {
      setIsAcceptingFeedback("start");
      console.log("error: "+err);
    });
  }

  return (
    <div>
      {isAcceptingFeedback === "start" && (
        <button
          className="text-white text-lg bg-gray-800 hover:bg-blue-500 rounded-full mt-4 mx-auto"
          onClick={() => acceptFriend()}
        >
          <p className="mx-4">Aprovar</p>
        </button>
      )}
      {isAcceptingFeedback === "accepting" && (
        <p className='ml-4'>Aceitando Solicitação ...</p>
      )}
    </div>
  );
};

export default AcceptFeedback;
