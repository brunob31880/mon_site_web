/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
/* eslint-disable func-names */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable  no-mixed-operators */

import React from "react";
import { Redirect } from "react-router";
import PLUSPLUS from "../../images/PLUSPLUS.png";
import PLUS from "../../images/PLUS.png";
import {useApp} from "../../context/AppContext";

/**
 * Stateless component for ACDS Agent.
 *
 * @name Agent
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Agent = props => {
	// la connaissance du header indique l'etat de l'objet
	const {centerComponent} = props;
	console.log(`[Agent] Current Header is =${centerComponent.text}`);
	const clicked = () => centerComponent.text === "Fiche Agent";

	console.log(`[Agent] Click=${clicked()}`);

	const [{page, user}, dispatch] = useApp();
	const navTo = page => {
		dispatch({
			type: "navTo",
			payload: {
				page
			}
		});
	};
	// Si l'agent est déjà cliqué il n'y a pas d'actoion a effectuer
	const onClickAgent = () => {
		if (clicked()) return;
		navTo("agent");
	};

	const isAgent = () => (clicked() && page === "agent" || !clicked() && page === "management" );

	const navToPages = () => (user.email !== undefined && !isAgent());

	return (
		navToPages()
			? <Redirect to={page} />
			: 		(
				<>
					{!clicked()
						? (
							<div className="agent" id="agent" onClick={() => onClickAgent()}>
								<img src={PLUSPLUS} width="35px" height="35px" />
								Créer Fiche Agent
							</div>
						)
						:					(
							<div className="agentClicked" id="agent">
								<div className="plushaut">
									<img src={PLUS} width="35px" height="35px" />
								</div>
								Ca reste à faire
								<div className="plusbas">
									<img src={PLUS} width="20px" height="20px" />
								</div>
							</div>
						)}
				</>
			)
	);
};

export default Agent;
