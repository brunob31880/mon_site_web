/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
/* eslint-disable func-names */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useMemo } from "react";
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";
import * as d3 from "d3";
import {setNotificationOfPosition} from "../../datas/salles";
/**
 * Stateless component for ACDS Notification.
 *
 * @name Notification
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Notification = props => {
	const { name, level } = props;

	const [clicked, setClicked] = useState(false);
	const [show, setShow] = useState(false);
	const [del, setDelete] = useState(false);
	

	const [{ page, user,salle }, dispatch] = useApp();

	const navTo = page => {
		dispatch({
			type: "navTo",
			payload: {
				page
			}
		});
	};

	useMemo(() => {
		console.log(`[Notification] show=${show}`);
		if (show) navTo(`/notification/:${name}`);
	}, [show]);

	useMemo(() => {
		console.log(`[Notification] delete=${del} ${name}`);
		if (del) setNotificationOfPosition(name,salle);
	}, [del]);
	useMemo(() => {
		console.log(`[Notification] Click=${clicked}`);
	}, [clicked]);
	const isHome = () => (page === "home" || page === "/home");

	const navToPages = () => (user.email !== undefined && !isHome());
	useMemo(() => {
		console.log(`[Notification] navToPages=${navToPages()}`);
	}, [page]);
	

	function getIndicateurColorWithOccu(lev) {
		if (lev > 2 / 3) return "red"
		else if (lev > 1 / 3) return "orange"
		else return "green";
	}

	useEffect(() => {
		if (clicked) return;
		const svg = d3.select("#indicateur" + name)
			.append("svg")
			.attr("class","roundindic")
		let circle = svg.append("circle")
			.attr("cx", 17.5)
			.attr("cy", 17.5)
			.attr("r", 10)
			.attr("stroke", "white")
			.attr("stroke-width", 2)
			.attr("fill", getIndicateurColorWithOccu(level));
	}, [show, clicked]);

	return (
		navToPages()
			? <Redirect to={page} />
			: (
				<>

					{(!clicked)
						? (
							<div className="notificationmain" id="notificationmain" onClick={() => setClicked(true)}>
								<div className="notification" id="notification">
									Notification sur la position
									{" "}
									{name}
								</div>
								<div className="indicateur" id={"indicateur" + name}>
								</div>
							</div>
						)
						: (
							<>
								<div className="notificationclickedmain" id="notificationclickedmain">
									<div className="notificationclicked" id="notificationclicked">
										<div>
											Notification sur la position
											{" "}
											{name}
										</div>
									</div>
									<div className="boutons">
										<div className="bouton" id="Afficher" onClick={() => setShow(true)}>
											<div>
												Afficher
										</div>
										</div>
										<div className="bouton" id="Effacer" onClick={() => setDelete(true)}>
											<div>
												Effacer
										</div>
										</div>
									</div>
								</div>

							</>
						)}

				</>
			)
	);
};

export default Notification;
