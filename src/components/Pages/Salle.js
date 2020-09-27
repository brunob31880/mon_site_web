/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect } from "react-router";
import Cwp from "../Cwps/Cwp";
import { occupancy } from "../../datas/occupancy";
import { useApp } from "../../context/AppContext";
import "../../styles/bordeaux.css";
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
const Salle = () => {
	const [{ page, salle, user }] = useApp();
	const isSalle = () => page === "salle" || page === "/salle";
	const navToPages = () => (user.email !== undefined && !isSalle());

    function numberOcc(){
		let numberocc=0;
		//console.log("Ilots="+JSON.stringify(salle.ilots));		
		for (let i=0;i<salle.ilots.length;i++){
			//console.log("Ilot="+JSON.stringify(salle.ilots[i]));
			numberocc+=salle.ilots[i].positions.filter(position => position.occupancyvalues[0].value >1/3).length;
		}
		return numberocc;
	};

	return (
		navToPages()
			? <Redirect to={page} />
			: (
				<div id="salle" className="salle">

					{
						salle.ilots.map(data => (
							<div className="ilot" key={data.id} id={data.ilotname}>
								{
									data.positions.map(cwp =>
										<Cwp key={cwp.id} {...cwp} />)
								}
							</div>
						))
					}
					<div className="number" id={salle.number.numbername}>
						{numberOcc()}
					</div>
				</div>
			)

	);
};

export default Salle;
