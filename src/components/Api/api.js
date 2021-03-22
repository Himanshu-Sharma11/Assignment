import axios from 'axios';

const URL = 'https://reqres.in/api';

export const LOGIN = (data) => axios.post(`${URL}/login`, data);

export const CREATE = (data) => axios.post(`${URL}/users`, data);

export const GET_USERS = () => axios.get(`${URL}/users`);

export const DELETE_USER = () => axios.delete(`${URL}/:id`);

export const UPDATE_USER = (data) => axios.put(`${URL}/:id`, data);
