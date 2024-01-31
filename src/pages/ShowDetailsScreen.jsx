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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    movieName: "",
  });

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getMovieDetailsFunc = (id) => {
      setLoader(true);
      try {
        getMovieDataAPI(id).then((res) => {
          if (res.status === 200) {
            setShow(res?.data);
            setArr1(res?.data?.genres);
            setFormData({ ...formData, movieName: res?.data?.name });
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

  const handleFormSubmit = () => {
    localStorage.setItem("User Name", formData.userName);
    localStorage.setItem("Movie Name", formData.movieName);
  };

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
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              onClick={() => {
                openModal();
              }}
            >
              Book Ticket
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => {
                window.history.back();
              }}
            >
              Back
            </button>
          </div>
          <main>
            <article>
              <header className="mx-auto max-w-screen-xl mt-5 text-center">
                <p className="text-gray-500">
                  Premiered-{" "}
                  <span className="text-blue-500">
                    {show?.premiered || "N/A"}{" "}
                  </span>
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
                  <a className="text-sm font-medium text-gray-900 hover:no-underline dark:text-white">
                    {show?.runtime} min
                  </a>
                  <span className="w-1 h-1 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <a className="text-sm font-medium text-gray-900 hover:no-underline dark:text-white">
                    {show?.language}
                  </a>
                  <span className="w-1 h-1 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <a className="text-sm font-medium text-gray-900 hover:no-underline dark:text-white">
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
        </>
      )}

      {isModalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9V7a2 2 0 012-2h14a2 2 0 012 2v2M3 15v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
                        <path d="M21 15a3 3 0 110-6" />
                        <path d="M3 15a3 3 0 100-6" />
                        <path d="M13 5v2" />
                        <path d="M13 17v2" />
                        <path d="M13 11v2" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h1
                        className="text-gray-900 text-xl"
                      >
                        Book Ticket
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="bg-white px-4">
                  <div className="mt-2 w-100">
                    <MovieDetailsForm
                      show={show}
                      onChangeHandler={onChangeHandler}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      handleFormSubmit();
                      closeModal();
                    }}
                  >
                    Book
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowDetailsScreen;
