import React from "react";

const Card = ({ title, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6  mb-4 hover:shadow-lg transition-shadow max-w-sm  overflow-hidden text-ellipsis line-clamp-4">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default Card;
