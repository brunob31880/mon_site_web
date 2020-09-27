/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
/* eslint-disable func-names */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {useApp} from "../../context/AppContext";
import { Redirect } from "react-router";

/**
 * Stateless component for React Playground header.
 *
 * @name Cwp
 * @author Boissie Bruno <bruno.boissie@aviaiton-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Cwp = props => {
	const {cwpname,ilot,occupancyvalues, notification} = props;
	const [{user,page}, dispatch] = useApp();
	// Savoir si les positions sont représentées dans la page salle 
	const isSalle=() => page==="salle" || page === "/salle";
	// Si oui => affichage Sinon => redirection
	// On vérifie aussi qu'on a toujours un user identifié par securité
	const navToPages = () => (user.email !== undefined && !isSalle());
	// Les positions auront un aspect dépendant de la page sur laquelle on se trouve
	const isIlot=() => page.includes("ilot");


	const navTo = page => {
		console.log("[Position] clic on position");
		dispatch({
			type: "navTo",
			payload: {
				page
			}
		});
	};
	const showGraphOccupancy=() => {};
	
	const clickPosition =() => {
		if (!isIlot()) navTo("ilot/:"+ilot)
		else showGraphOccupancy();
	}
	const getSubClassNameWith =(occupancy) =>{
		if (occupancy>2/3) return "high"
		else if (occupancy>1/3) return "medium"
		else return "low"
	};

	const getSubClassNotifWith=(notif) => (notif===undefined || notif==="shown") ? "shown" :"hidden";
	
	const getClassName =() => "position "+ getSubClassNotifWith(notification) +" "+ getSubClassNameWith(occupancyvalues[0].value);


	return (
		navToPages()
			? <Redirect to={page} />
			: 		(
		<>
			<div className={getClassName()} id={cwpname} onClick={() => clickPosition()}>
				{cwpname}
			</div>
		</>)
	);
};

export default Cwp;
