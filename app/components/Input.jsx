import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  isTextArea = false,
}) => {
  return (
    <div>
      {isTextArea ? (
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[200px]"
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      ) : (
        <input
          type={type}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      )}
    </div>
  );
};

export default Input;
