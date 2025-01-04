import React from "react";
import Link from "next/link";

const Card = ({ id, title, content }) => {
  return (
    <Link href={`blogs/${id}`}>
      <div className="bg-white rounded-lg shadow-md p-6  mb-4 h-40 w-72 hover:shadow-lg transition-shadow max-w-sm  ">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 overflow-hidden line-clamp-1 text-ellipsis">
          {title}
        </h2>

        <p className="text-gray-600 overflow-hidden line-clamp-4 text-ellipsis">
          {content}
        </p>
      </div>
    </Link>
  );
};

export default Card;
