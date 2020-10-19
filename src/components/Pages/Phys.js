/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";
/**
 * Stateless component Salle for Acds.
 *
 * @name Salle
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Phys = () => {
	const [{ page, user }] = useApp();
	const isPhys = () => page === "phys" || page === "/phys";
	const navToPages = () => (user.email !== undefined && !isPhys());


	return (
		navToPages()
			? <Redirect to={page} />
			: (
				<div id="salle" className="salle">
				</div>
			)

	);
};

export default Phys;
