/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { Redirect, Route } from "react-router";
import { useApp} from "../context/AppContext";

const AuthRoute = props => {
	const [{user}] = useApp();
	
    const isAuthUser = () => (user.email !== undefined);
 
    const { type } = props;
    console.log("Type="+type);
    console.log("Email="+user.email);
    console.log("Authentifié="+isAuthUser());

	if (type === "guest" && isAuthUser()) return <Redirect to="/home" />;
	if (type === "private" && !isAuthUser()) return <Redirect to="/login" />;

	return <Route {...props} />;
};
export default AuthRoute;
