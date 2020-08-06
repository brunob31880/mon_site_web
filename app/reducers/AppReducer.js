const AppReducer = (state, action) => {
	switch (action.type) {
		case "logUser":
            console.log("loging of "+action.payload);
			return {...state, user: action.payload};
		default:
			return state;
	}
};

export default AppReducer;
