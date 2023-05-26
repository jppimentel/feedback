import React from 'react';

interface ListCardsProps {
  index: string;
  title: string,
  approved: boolean,
  info1: string,
  info2: string
}

const ListCards: React.FC<ListCardsProps> = ({ index, title, approved, info1, info2 }) => {


  return (
    <div key={index} className="bg-blue-100 shadow-md rounded-lg p-4 mx-12 flex items-center hover:bg-blue-200 h">
      <div className="flex-grow">
        <div className="flex justify-between">
          <h2 className="text-xl text-gray-800 font-bold">{title}</h2>
          {approved === false && (
            <div className="text-blue-800">Aguardando Aprovação</div>
          )}
        </div>
        <p className="text-gray-800">{info1}</p>
        <p className="text-gray-800">{info2}</p>
      </div>
    </div>
  );
};

export default ListCards;
