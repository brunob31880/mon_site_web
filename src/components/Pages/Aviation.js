/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";


/**
 * Stateless component for Acds .
 *
 * @name Aviation
 * @author Bruno Boissie  <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Aviation = () => {
	const [{ page, user }] = useApp();
	const isAviationPage = () => (page === "aviation" || page === "/aviation");
	const navToPages = () => (user.email !== undefined && !isAviationPage());
	console.log(`[Aviation] navToPages=${navToPages()}`);

	return (
		navToPages()
			? <Redirect to={page} />
			: (
				<>
					<div className="listereguls">

					</div>
				</>
			)

	);
};

export default Aviation;
