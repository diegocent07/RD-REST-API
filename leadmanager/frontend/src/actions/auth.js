import axios from 'axios';
import { returnErrors } from './messages';
import { USER_LOADED, USER_LOADING, AUTH_ERROR } from './types';

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
