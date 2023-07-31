import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3333"
});

/* Use "http://localhost:3333" para acessar o db local */
/* Use "https://codewlad-food-explorer.onrender.com" para acessar o db online */