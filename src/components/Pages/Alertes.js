
import React from "react";
import { Redirect } from "react-router";
import {useApp} from "../../context/AppContext";


/**
 * Stateless component for Acds .
 * Page Alerte
 *
 * @name Alertes
 * @author Geraldine Beboux  <geraldine.beboux@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */


const Alertes = () => {
	
	const [{page, user, alertes}] = useApp();
	// Les redirections vers la page regulations sont de la forme "regulations" ou "/regulations"
	const isAlertesPage = () => (page === "alertes" || page === "/alertes");
	const navToPages = () => (user.email !== undefined && !isAlertesPage() );
	console.log(`[Alertes] navToPages=${navToPages()}`);


	return (
		navToPages()
			?			<Redirect to={page} />
			:		(
				<>
				
					<div className="listealertes" >
					
					
					</div>
                    
				</>
			)

	);
};

export default Alertes;
