import React, { useEffect, useState } from "react";
import MovieImg from "../image/movie.png";

const ShowCard = ({ show, onShowDetails }) => {
  const [arr1, setArr1] = useState([]);

  useEffect(() => {
    setArr1(show?.genres);
  }, [show]);

  return (
    <>
      <a onClick={() => onShowDetails(show)} className="w-full">
        <img
          src={show?.image?.medium || MovieImg}
          alt={show?.name}
          className="h-56 w-full object-cover"
        />
        <div className="flex-auto px-6 py-5">
          <div
            className="flex flex-wrap justify-center gap-2"
            aria-label="Tags"
          >
            {arr1 && arr1?.length > 0 ? (
              <>
                {arr1?.map((item, index) => (
                  <p
                    className="rounded-lg bg-gray-100 px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200"
                    key={index}
                  >
                    {item}
                  </p>
                ))}
              </>
            ) : null}
          </div>

          <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
            {show?.name}
          </h3>

          <span className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">
            View More
          </span>
        </div>
      </a>
    </>
  );
};

export default ShowCard;
