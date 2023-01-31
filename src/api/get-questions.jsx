import axios from 'axios';

export async function getQuestions() {
    try {
    const url = "https://opentdb.com/api.php?amount=2";
    const response = await axios.get(url);
    return response.data.results;
    } catch (error) {
    console.error(error);
    }
}