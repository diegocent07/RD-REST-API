import axios from 'axios';
import { returnErrors } from './messages';
import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_FAIL,
	REGISTER_SUCCESS
} from './types';

// check the token and load the user
export const loadUser = () => (dispatch, getState) => {
	// set the user loadig
	dispatch({ type: USER_LOADING });

	// get the token from the state
	const token = getState().auth.token;

	//set headers for request like postman
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	// if token, add to headers config
	if (token) {
		config.headers['Authorization'] = `Token ${token}`;
	}

	//request to get the user
	axios
		.get('/api/auth/user', config)
		.then((res) => {
			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR
			});
		});
};

// login user
export const login = (username, password) => (dispatch) => {
	//set headers for request like postman
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	// Request body
	const body = JSON.stringify({ username, password });

	//request to get the user
	axios
		.post('/api/auth/login', body, config)
		.then((res) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: LOGIN_FAIL
			});
		});
};

//REGISTER USER
export const register = ({ username, password, email }) => (dispatch) => {
	// en vez de pasar username y password pasaremos un objeto con mas datos
	//set headers for request like postman
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	// Request body
	const body = JSON.stringify({ username, email, password });

	//request to get the user
	axios
		.post('/api/auth/register', body, config)
		.then((res) => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: REGISTER_FAIL
			});
		});
};

//Logout USER
export const logout = () => (dispatch, getState) => {
	// get the token from the state
	const token = getState().auth.token;

	//set headers for request like postman
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	// if token, add to headers config
	if (token) {
		config.headers['Authorization'] = `Token ${token}`;
	}

	//request to get the user
	axios
		.post('/api/auth/logout', null, config) //pass null as the body
		.then((res) => {
			dispatch({
				type: LOGOUT_SUCCESS
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

// setup config with token - helper function (para mejorar el codigo se reemplaza tokenConfig en login y register)
export const tokenConfig = (getState) => {
	// get the token from the state
	const token = getState().auth.token;

	//set headers for request like postman
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	// if token, add to headers config
	if (token) {
		config.headers['Authorization'] = `Token ${token}`;
	}
	return config;
};
