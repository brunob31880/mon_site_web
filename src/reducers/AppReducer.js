/* eslint-disable no-duplicate-case */
/* eslint-disable no-console */
const AppReducer = (state, action) => {
	//console.log("Receive action "+action.type);
	switch (action.type) {
		case "setDisplayType":
			console.log("[Reducer] set displaytype to "+action.payload.displaytype);
			return {...state, displaytype:action.payload.displaytype}
		case "setPosition":
				return {...state, position:action.payload.position}
		case "setOrientation":
					return {...state, orientation:action.payload.orientation}
		case "setDate":
			//console.log(`[Reducer] set date ${action.payload}`);
			return { ...state, date: action.payload };
		case "setHistoDate":
			//console.log(`[Reducer] set date ${action.payload}`);
			return { ...state, histodate: action.payload };
		case "setInfoDate":
			//console.log(`[Reducer] set date ${action.payload}`);
			return { ...state, infodate: action.payload };
		case "setGeometry":
			console.log(`[Reducer] set Geometry ${action.payload.geometry}`);
			return { ...state, geometry: action.payload.geometry };
		case "setSocket":
			console.log("[Reducer] set Socket " + action.payload.socket);
			return { ...state, socket: action.payload.socket };
		case "logUser":
			console.log(`[Reducer] logging of ${action.payload.user.email}`);
			return { ...state, user: action.payload.user };
		case "navTo":
			console.log(`[Reducer] nav to ${action.payload.page}`);
			return { ...state, page: action.payload.page };
		case "changeSalle":
			console.log(`[Reducer] Changing salle to ${action.payload.salle}`);
			return { ...state, salle: action.payload.salle };
		case "setRegul":
			console.log(`[Reducer] set Reguls ${action.payload.reguls}`);
			return { ...state, reguls: action.payload.reguls };
		case "setAlert":
			console.log(`[Reducer] set Alerts ${action.payload.alertes}`);
			return { ...state, alertes: action.payload.alertes };

		default:
			return state;
	}
};

export default AppReducer;
