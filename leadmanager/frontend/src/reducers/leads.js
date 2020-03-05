// a reducer is a function that takes in an action an evaluates it and states it or send a state depending what the action does (getlead, addlead, deletelead) is called types

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from '../actions/types.js';

const initialState = {
	leads: []
};
// se exporta una funcion con estado inicial y una acción que se dispara (addlead, deletelead, getlead), y enviar al reducer y para eso se evalua su tipo con switch
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_LEADS:
			return {
				...state, // los tres puntos indica que traiga todo lo que esta en initialState y no solo el leads en caso que exista otro elemento o cosa
				leads: action.payload // rellenar leads con los datos recibidos del server o bd, y se manda como payload a ese action
			};
		case DELETE_LEAD:
			return {
				...state,
				leads: state.leads.filter((lead) => lead.id !== action.payload)
			};
		case ADD_LEAD:
			return {
				...state,
				leads: [ ...state.leads, action.payload ]
			};
		default:
			return state;
	}
}
