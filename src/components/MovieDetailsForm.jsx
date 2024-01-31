// MovieDetailsForm.js

import React from 'react';

const MovieDetailsForm = ({ show, onSubmit }) => {
  return (
    <form className="bg-white p-4 rounded shadow" onSubmit={(e) => onSubmit(e, show)}>
      <h2 className="text-xl font-semibold">Book Movie Ticket</h2>
      <label htmlFor="movieName" className="block mt-2 text-gray-700">
        Movie Name:
      </label>
      <input
        type="text"
        id="movieName"
        value={show?.name}
        readOnly
        className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

export default MovieDetailsForm;
