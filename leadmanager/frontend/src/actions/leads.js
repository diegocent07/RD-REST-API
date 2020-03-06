// todas las acciones que se disparan vendran aquí a este archivo mediante "axios" npm i axios
import axios from 'axios';
import { createMessage } from './messages'; // se crea un mensaje del action para no sobrecargar el component con todos los mensajes

import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from './types';

// GET LEADS
export const getLeads = () => (dispatch) => {
	axios
		.get('/api/leads/')
		.then((res) => {
			dispatch({
				type: GET_LEADS,
				payload: res.data
			});
		})
		.catch((err) => console.log(err));
};

// DELETE LEAD
export const deleteLead = (id) => (dispatch) => {
	axios
		.delete(`/api/leads/${id}/`)
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
export const addLead = (lead) => (dispatch) => {
	axios
		.post('/api/leads/', lead)
		.then((res) => {
			dispatch({
				type: ADD_LEAD,
				payload: res.data
			});
			dispatch(createMessage({ addLead: 'Agregado!' }));
		})
		.catch((err) => {
			const errors = {
				msg: err.response.data,
				status: err.response.status
			};
			dispatch({
				type: GET_ERRORS,
				payload: errors
			});
		});
};
