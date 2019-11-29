import axios from 'axios';

const api = axios.create({
    baseURL: 'https://skincare-deep-learning.herokuapp.com/'
})

export default api;