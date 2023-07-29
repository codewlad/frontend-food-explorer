import axios from 'axios';

export const api = axios.create({
    baseURL: "https://codewlad-food-explorer.onrender.com" /* Use "http://localhost:3333" para acessar o db local */
});