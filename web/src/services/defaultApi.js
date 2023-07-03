import axios from 'axios';

export const defaultApi = axios.create({
    baseURL: process.env.URL_SERVER
});
