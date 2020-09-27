/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
/* eslint-disable func-names */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Redirect } from "react-router";
import {useApp} from "../../context/AppContext";
/**
 * Stateless component for ACDS Notification.
 *
 * @name Notification2
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Notification2 = props => {
    
	const [{salle, page, user}] = useApp();

	const navToPages = () => (user.email !== undefined && !page.includes("notification"));

	console.log(`[Notification2] navToPages=${navToPages()}`);

	const idNotif = page.includes("notification") && Number.parseInt(page.split("/")[2].replace(":", ""));

	console.log(`[Notification2] idNotif=${idNotif}`);

	function getPositionWithId(idN){	
		for (let i=0;i<salle.ilots.length;i++){
			let ilot=salle.ilots[i];
			for (let j=0;j<ilot.positions.length;j++){
				let position=ilot.positions[j];
				console.log("[Home] Position="+JSON.stringify(position));
				if (position.id===idN) return position;
			}
		}
		return null;
	};
	let position=getPositionWithId(idNotif);
	
	console.log(`Position=${position}`);

	return (
		navToPages()
			? <Redirect to={page} />
			: 		(
				<>
					<div className="notification2" id="notification2">
						Notification sur la position
						{" "}
						{position.level}
					</div>
				</>
			)
	);
};

export default Notification2;
