import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";

// API for adding document
/*
export const addDocumentAPI = async (data) => {
  console.log(data);
  try {
    let result = await axios(`${API_URL_BASE}/addDocument`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};*/

// API for getting document

export const getAllMoviesDataAPI = async () => {
  try {
    let result = await axios(
      `${API_URL_BASE}/search/shows?q=all`,
      {
        method: "GET"
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API for getting document

export const getMovieDataAPI = async (id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/shows/${id}`,
      {
        method: "GET",
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API for editting document
/*
export const editDocumentAPI = async (data) => {
  try {
    let result = await axios(`${API_URL_BASE}/editDocument`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};*/
