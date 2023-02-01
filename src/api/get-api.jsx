import axios from 'axios';

export async function getApi(route) {
    try {
    const url = `https://opentdb.com${route}`;
    const response = await axios.get(url);
    return response.data;
    } catch (error) {
    console.error(error);
    }
}