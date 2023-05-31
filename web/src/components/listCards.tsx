import React, { useState, ReactNode } from 'react';

interface ListCardsProps {
  index: string;
  title: string,
  info1: string,
  info2: string,
  approvalSent: boolean | null,
  approvalWaiting: boolean | null,
  children: ReactNode | null,
  feedbackCards: boolean | null
}

const ListCards: React.FC<ListCardsProps> = ({ index, title, info1, info2, approvalSent = null, approvalWaiting = null, children = null, feedbackCards = null }) => {


  return (
    <div key={index} className="bg-blue-100 shadow-md rounded-lg p-4 mx-12 flex items-center hover:bg-blue-200 h">
      <div className="flex-grow">
        <div className="flex justify-between">
          <h2 className="text-xl text-gray-800 font-bold">{title}</h2>
          {approvalSent === true && (
            <div className="text-gray-800">Aguardando Aprovação</div>
          )}
          {(approvalWaiting === true) && (
            <>
              {children}
            </>
          )}
        </div>
        <p className="text-gray-800">{info1}</p>
        <p className="text-gray-800">{info2}</p>
        {(feedbackCards === true) && (
            <>
              {children}
            </>
          )}
      </div>
    </div>
  );
};

export default ListCards;
