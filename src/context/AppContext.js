/* eslint-disable react/prop-types */
import React, {createContext, useReducer} from "react";
import AppReducer from "../reducers/AppReducer";
/*
 Contexte général de l'application
*/
const initialState = {
	user: {},
	socket: null,
	geometry: {},
	date :new Date(),
	displaytype: "",
	position:{},
	orientation:{},
	menu:[],
	articles:[],
	page: "/"
};


export const AppContext = createContext();
export const useApp = () => React.useContext(AppContext);

/*
    AppProvider est un HOC : une fonction d'un composant (children)
    qui renvoi un autre composant (ici encapsulé dans un context.provider)
*/
export const AppProvider = ({children}) => (
	<AppContext.Provider value={useReducer(AppReducer, initialState)}>
		{children}
	</AppContext.Provider>
);
