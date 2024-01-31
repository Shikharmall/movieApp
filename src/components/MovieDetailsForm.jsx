// MovieDetailsForm.js

import React from "react";

const MovieDetailsForm = ({ show, onChangeHandler ,formData}) => {
  return (
    <form
      className="bg-white p-4 rounded shadow"
    >
      <label htmlFor="movieName" className="block mt-2 text-gray-700">
        Movie Name:
      </label>
      <input
        type="text"
        id="movieName"
        name="movieName"
        value={show?.name}
        readOnly
        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />

      <label htmlFor="movieName" className="block mt-2 text-gray-700">
        Your Name:
      </label>
      <input
        type="text"
        id="userName"
        name="userName"
        value={formData?.userName}
        onChange={onChangeHandler}
        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />
    </form>
  );
};

export default MovieDetailsForm;
