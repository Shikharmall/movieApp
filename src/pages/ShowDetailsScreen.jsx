// ShowDetailsScreen.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetailsForm from "../components/MovieDetailsForm";
import { Audio } from "react-loader-spinner";
import MovieImg from "../image/movie.png";
import { getMovieDataAPI } from "../Api/DataAPI";

const ShowDetailsScreen = () => {
  const [show, setShow] = useState(null);
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [arr1, setArr1] = useState([]);

  useEffect(() => {
    const getMovieDetailsFunc = (id) => {
      setLoader(true);
      try {
        getMovieDataAPI(id).then((res) => {
          if (res.status === 200) {
            setShow(res?.data);
            setArr1(res?.data?.genres);
            setLoader(false);
          } else {
            console.log(res);
          }
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getMovieDetailsFunc(id);
  }, [id]);

  const handleFormSubmit = (event, selectedShow) => {
    event.preventDefault();
    console.log("Form submitted for:", selectedShow);
  };

  console.log(show);

  return (
    <>
      {loader ? (
        <div
          className="flex justify-center items-center p-30  pt-10 pb-10 bg-white w-full"
          style={{ height: "100vh" }}
        >
          <Audio
            height="80"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
        <>
          <main>
            <article>
              <header className="mx-auto max-w-screen-xl pt-24 text-center">
                <p className="text-gray-500">
                  Premiered-{" "}
                  <span className="text-blue-500">{show?.premiered || 'N/A'} </span>
                </p>
                <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
                  {show?.name}
                </h1>

                <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p className="text-sm font-bold">
                    <span className="text-gray-900">
                      {show?.rating?.average || "_"}
                    </span>{" "}
                    <span className="text-gray-600">/10</span>
                  </p>
                  <span className="w-1 h-1 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <a
                    //href="#"
                    className="text-sm font-medium text-gray-900 hover:no-underline dark:text-white"
                  >
                    {show?.runtime} min
                  </a>
                  <span className="w-1 h-1 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <a
                    //href="#"
                    className="text-sm font-medium text-gray-900 hover:no-underline dark:text-white"
                  >
                    {show?.language}
                  </a>
                  <span className="w-1 h-1 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <a
                    //href="#"
                    className="text-sm font-medium text-gray-900 hover:no-underline dark:text-white"
                  >
                    {show?.status}
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {arr1 && arr1?.length > 0 ? (
                    <>
                      {arr1?.map((item, index) => (
                        <button
                          className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200"
                          key={index}
                        >
                          {item}
                        </button>
                      ))}
                    </>
                  ) : null}
                </div>
                <img
                  className="sm:h-[34rem] mt-10 w-full object-contain"
                  src={show?.image?.original || MovieImg}
                  alt={show?.name}
                />
              </header>

              <div className="w-fit mx-auto mt-10 flex space-x-2">
                <div className="h-0.5 w-2 bg-gray-600"></div>
                <div className="h-0.5 w-32 bg-gray-600"></div>
                <div className="h-0.5 w-2 bg-gray-600"></div>
              </div>

              <div className="mx-auto mt-10 max-w-screen-md space-y-12 px-4 py-10 font-serif text-lg tracking-wide text-gray-700">
                <center>
                  <strong className="text-2xl font-medium">{show?.name}</strong>
                </center>
                <p className="text-justify">
                  {" "}
                  <span
                    dangerouslySetInnerHTML={{ __html: show?.summary }}
                  />{" "}
                </p>
              </div>
            </article>
          </main>

          <MovieDetailsForm show={show} onSubmit={handleFormSubmit} />
        </>
      )}
    </>
  );
};

export default ShowDetailsScreen;
