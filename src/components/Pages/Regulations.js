/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect } from "react-router";
import {useApp} from "../../context/AppContext";


/**
 * Stateless component for Acds .
 *
 * @name Management
 * @author Bruno Boissie  <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Management = () => {
	const [{page, user, reguls}] = useApp();
	// Les redirections vers la page regulations sont de la forme "regulations" ou "/regulations"
	const isRegulationPage = () => (page === "regulations" || page === "/regulations");
	const navToPages = () => (user.email !== undefined && !isRegulationPage() );
	console.log(`[Regulations] navToPages=${navToPages()}`);

	return (
		navToPages()
			?			<Redirect to={page} />
			:		(
				<>
					<div className="listereguls">
						
					</div>
				</>
			)

	);
};

export default Management;
