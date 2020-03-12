// todas las acciones que se disparan vendran aquí a este archivo mediante "axios" npm i axios
import axios from 'axios';
import { createMessage, returnErrors } from './messages'; // se crea un mensaje del action para no sobrecargar el component con todos los mensajes

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from './types';

import { tokenConfig } from './auth';

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
	axios
		.get('/api/leads/', tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_LEADS,
				payload: res.data
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE LEAD
export const deleteLead = (id) => (dispatch, getState) => {
	axios
		.delete(`/api/leads/${id}/`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: DELETE_LEAD,
				payload: id
			});
			dispatch(createMessage({ deleteLead: 'Eliminado' }));
		})
		.catch((err) => console.log(err));
};

//ADD LEAD
export const addLead = (lead) => (dispatch, getState) => {
	axios
		.post('/api/leads/', lead, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: ADD_LEAD,
				payload: res.data
			});
			dispatch(createMessage({ addLead: 'Agregado!' }));
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status))); // param msg es err.respose.data y el otro el sttus del servidor
};
