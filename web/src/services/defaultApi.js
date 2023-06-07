import axios from 'axios';
// import { URL_SERVER } from '../configurations/env.js';

export const defaultApi = axios.create({
    baseURL: process.env.URL_SERVER
});
