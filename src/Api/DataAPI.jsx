import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";

// API for getting all movies

export const getAllMoviesDataAPI = async () => {
  try {
    let result = await axios(`${API_URL_BASE}/search/shows?q=all`, {
      method: "GET",
    });
    return result;
  } catch (error) {
    return error;
  }
};

// API for getting movie details

export const getMovieDataAPI = async (id) => {
  try {
    let result = await axios(`${API_URL_BASE}/shows/${id}`, {
      method: "GET",
    });
    return result;
  } catch (error) {
    return error;
  }
};
