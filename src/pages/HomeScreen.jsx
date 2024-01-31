import React, { useState, useEffect } from "react";
import ShowCard from "../components/ShowCard";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { getAllMoviesDataAPI } from "../Api/DataAPI";

const HomeScreen = () => {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const [search, setSearch] = useState("");

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filterhoadata = (e) => {
    setSearch(e.target.value);
    paginate(1);
  };

  const rowperpage = (number) => setPostsPerPage(number);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [loader, setLoader] = useState(false);

  const handlePageChange = (newPage) => {
    paginate(newPage);
  };

  useEffect(() => {
    const getAllMoviesDataFunc = async () => {
      setLoader(true);
      try {
        getAllMoviesDataAPI().then((res) => {
          if (res.status === 200) {
            setShows(res?.data);
            setLoader(false);
          } else {
            console.log(res);
          }
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getAllMoviesDataFunc();
  }, []);

  const handleShowDetails = (show) => {
    navigate(`/show/${show.id}`);
  };

  const filteredShowsData = shows
    .filter((item) => {
      return (
        search.toLowerCase() === "" ||
        item.show.name.toLowerCase().includes(search.toLowerCase())
      );
    })
    .slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="bg-white pb-2 pt-5 dark:bg-dark lg:pb-5">
        <div className="mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Popular Movies
              </span>
              <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]">
                All Recent Movies
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                Dive into the latest and greatest with our All Recent Movies
                collection. Stay in the cinematic loop, experiencing the best of
                contemporary storytelling - a thrilling blend of excitement,
                emotion, and unique cinematic moments.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-4">
          {/*<div className="col-span-1 md:col-span-1">
            <div className="relative p-2">
              <div>
                <label className="sr-only">Select Category:</label>
                <select
                  //value={filterCategory}
                  //onChange={(e) => setFilterCategory(e.target.value)}
                  className="block p-3 pr-8  text-sm text-gray-500 border border-gray-300 placeholder-gray-400 rounded-lg w-full bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 box-border"
                >
                  <option value="">All Category</option>
                  {options.map((item, index) => (
                    <option value={item.label} key={index}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="relative p-2">
              <div>
                <label className="sr-only">Sort By Time:</label>
                <select
                  //value={sortOrder}
                  //onChange={(e) => setSortOrder(e.target.value)}
                  className="block p-3 pr-8  text-sm text-gray-500 border border-gray-300 placeholder-gray-400 rounded-lg w-full bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 box-border"
                >
                  <option value="" disabled>
                    Sort By Time
                  </option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>*/}
          <div className="col-span-4 md:col-span-4 ">
            <div className="relative p-2 box-border">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-3 pl-10 text-sm text-gray-500 border border-gray-300 placeholder-gray-400 rounded-lg w-full bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 box-border"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  //setPage(1);
                }}
              />
            </div>
          </div>
        </div>

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
            <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-6 sm:px-8 md:grid-cols-3">
              {shows && shows.length > 0 ? (
                <>
                  {filteredShowsData.map((show) => (
                    <article
                      className="mx-auto my-4 flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-900 transition hover:translate-y-2 hover:shadow-lg w-full"
                      key={show.show.id}
                    >
                      <ShowCard
                        show={show?.show}
                        onShowDetails={handleShowDetails}
                      />
                    </article>
                  ))}
                </>
              ) : null}
            </div>

            {filteredShowsData && filteredShowsData.length > 0 ? null : (
              <div className="bg-white flex justify-center w-full">
                <h1 className="p-3">No Result Found....</h1>
              </div>
            )}

            <div className="flex flex-row justify-center p-2 bg-white dark:bg-gray-800 rounded-bl-lg rounded-br-lg">
              {shows.length !== 0 ? (
                <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  {page} of {Math.ceil(shows.length / limit)}
                </a>
              ) : (
                <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  0 of 0
                </a>
              )}
              <button
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                Previous
              </button>
              {shows.length !== 0 ? (
                <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white">
                  {page}
                </a>
              ) : (
                <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white">
                  0
                </a>
              )}

              <button
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer"
                disabled={page >= Math.ceil(shows.length / limit)}
                onClick={() => handlePageChange(page + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
