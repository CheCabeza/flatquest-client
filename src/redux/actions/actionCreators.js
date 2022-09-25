import axios from 'axios';
import actionTypes from './actionTypes';

import {env} from '../../../.env.js';

const apiFlats = env.APIFLATS;
const apiAuth = env.APIAUTH;
const apiUser = env.APIUSER;

export function loadFlats(searchValue = '') {
  return async dispatch => {
    try {
      const {data} = await axios(`${apiFlats}/?flatSearchValue=${searchValue}`);
      dispatch({
        type: actionTypes.LOAD_FLATS,
        flats: data,
      });
    } catch (error) {
      dispatch({
        type: 'LOAD_FLATS_ERROR',
      });
    }
  };
}

export function filterFlats(formValues = '') {
  return async dispatch => {
    try {
      const {data} = await axios(
        `${apiFlats}/filter/?rooms=${formValues.rooms}&baths=${formValues.baths}&neighborhood=${formValues.neighborhood}&min=${formValues.min}&max=${formValues.max}`,
      );
      dispatch({
        type: actionTypes.FILTER_FLATS,
        filteredFlats: data,
      });
    } catch (error) {
      dispatch({
        type: 'FILTER_FLATS_ERROR',
      });
    }
  };
}

export function flatReview(formValues = '') {
  return async dispatch => {
    try {
      await axios.put(`${apiFlats}/${formValues.id}`, formValues);
    } catch (error) {
      dispatch({
        type: 'REVIEW_FLATS_ERROR',
      });
    }
  };
}

export function filterFlatsByFace(filteredByFace) {
  return dispatch => {
    dispatch({
      type: actionTypes.FILTER_FLATS_FACE,
      filteredFlats: filteredByFace,
    });
  };
}

export function addFavorite(user) {
  const tokenBearer = {headers: {Authorization: `Bearer ${user.bearerToken}`}};
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `${apiUser}/${user.id}`,
        user,
        tokenBearer,
      );
      dispatch({
        type: actionTypes.ADD_FAVORITE,
        user: data,
      });
    } catch (error) {
      dispatch({
        type: 'ADD_FAVORITE_ERROR',
      });
    }
  };
}

export function login(email, password) {
  return async dispatch => {
    try {
      const {data} = await axios.post(`${apiAuth}/login`, {email, password});

      dispatch({
        type: actionTypes.LOGIN_USER,
        user: data,
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_USER_ERROR',
      });
    }
  };
}

export function logout() {
  return dispatch => {
    dispatch({
      type: actionTypes.LOGOUT_USER,
      user: {},
    });
  };
}

export function registerUser(email, password) {
  return async dispatch => {
    try {
      await axios.post(`${apiAuth}/signup`, {email, password});
    } catch (error) {
      dispatch({
        type: 'REGISTER_USER_ERROR',
      });
    }
  };
}
