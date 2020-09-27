/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect } from "react-router";
import Agent from "../Management/Agent";
import Equipe from "../Management/Equipe";
import {useApp} from "../../context/AppContext";
/**
 * Stateless component for React Playground management.
 *
 * @name Management
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 * On transfert les props au sous composant pour qu'ils ai acces à la valeur de l'entête 
 * et puisse décider de leur representation dans ce cas
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Management = props => {
	const [{page, user}] = useApp();
	const navToPages = () => (user.email !== undefined && page !== "management");
	return (
		navToPages()
			?			<Redirect to={page} />
			:		(
				<>
					<div className="listemanagement">
						<Agent {...props} />
						<Equipe {...props} />
					</div>
				</>
			)

	);
};

export default Management;
