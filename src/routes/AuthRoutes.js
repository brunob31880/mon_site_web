/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { Redirect, Route } from "react-router";
import {useApp} from "../context/AppContext";

const AuthRoute = props => {
	const [{user}] = useApp();

	const isAuthUser = () => (user.token !== undefined);
	const {path} = props;
	const { type } = props;

	if (type === "private" && !isAuthUser()) 
	{
		console.log("[AuthRoutes] Redirection vers /");
		return <Redirect to="/" />;
	}
	return (
		<Route {...props} />
	);
};
export default AuthRoute;
