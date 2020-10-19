
import React from "react";
import { Redirect } from "react-router";
import {useApp} from "../../context/AppContext";


/**
 * Stateless component for Acds .
 * Page Alerte
 *
 * @name Maison
 * @author 
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */


const Maison = () => {
	
	const [{page, user}] = useApp();
	// Les redirections vers la page regulations sont de la forme "regulations" ou "/regulations"
	const isAlertesMaison = () => (page === "maison" || page === "/maison");
	const navToPages = () => (user.email !== undefined && !isAlertesMaison() );
	console.log(`[Maison] navToPages=${navToPages()}`);


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

export default Maison;
