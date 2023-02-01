import axios from "axios";

export async function getOpendtdbApiData(route) {
  try {
    const BASE_URL = "https://opentdb.com";
    const url = `${BASE_URL}${route}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
