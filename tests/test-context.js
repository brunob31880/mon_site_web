

import React from "react";

import DataProvider from "./DataProvider";
import DataReducer from "./DataReducer";
import TestList from "./TestList";

const values = {
    items: [
        {
            id:     1,
            value:  "Value 1"
        },
        {
            id:     2,
            value:  "Value 2"
        },
        {
            id:     3,
            value:  "Value 3"
        },
        {
            id:     4,
            value:  "Value 4"
        },
        {
            id:     5,
            value:  "Value 5"
        }
    ]
};

const App = () => {
    return(
        <DataProvider initial={values} reducer={DataReducer}>
            <TestList />
        </DataProvider>
    );
};

////////////////
// DataReducer

const handleDataUpdate = (current, data) => {

	const state = current;
	// Check wether or not it already exists
	let index = -1;
	if (state.items.length > 0) {
		index = state.items.findIndex( d => d.id === data.id );
	}
	if (index > -1) {
		// Replace existing item
		state.items[index] = data;
	} else {
		// Add new item
		state.items.push(data);
	}
	return {...state};
};

const handleDataRemove = (current, data) => {

	const state = current;
	// Check wether or not it already exists (only key is provided for removal)
	const rem = state.items.find( d => d.id === data );
	if (rem) {
		state.items = state.items.filter( d => d.id !== data );
	} else	console.log(`!! Attempting to remove data ${data} that is not in store`);
	return {...state};
};

export const DataReducer = (state, action) => {

	switch (action.type) {

		case "DATA_RECEIVE":
			if (action.payload !== null) {
				return handleDataUpdate(state, action.payload);
			}
			// No need for re-rendering of consuming components
			return state;

		case "DATA_REMOVE":
			if (action.payload !== null) {
				return handleDataRemove(state, action.payload);
			}
			// No need for re-rendering of consuming components
			return state;

		default:
			return state;
	}
};



////////////////
// DataProvider

import React from "react";

const DataContext = React.createContext([]);
const useDataContext = () => React.useContext(DataContext);

const DataProvider = ({initial, reducer, children}) => {

	const state = {
		...INIT_CTX,
		...initial
	};
	return (
		<DataContext.Provider value={React.useReducer(reducer, state)}>
			{children}
		</DataContext.Provider>
	);
};
export {DataProvider, useDataContext};

//////////////////////
// testList component

import React from "react";

import {useDataContext} from "./DataProvider";

export const TestList = () => {

    const [{items}] = useDataContext();

    return (
        <ul>
            {items.forEach( i => <li key={i.id}>{i.value}</li> )}
        </ul>
    );
}
