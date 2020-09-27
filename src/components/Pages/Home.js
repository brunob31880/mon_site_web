/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React, { useMemo } from "react";
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";
import { occupancy } from "../../datas/occupancy";
import Notification from "../Notifications/Notification.js";
import GlobalNotification from "../Notifications/GlobalNotification";
/**
 * Stateless component for Bruno's book main homepage.
 *
 * @name PageHome
 * @author Bruno Boissie <boissiebruno@gmail.com>
 * @copyright (c) 2019, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Home = () => {
	const [{ salle, page, user }] = useApp();
	useMemo(() => {
		console.log(`[Home] La salle est :${salle}`);
		console.log(`[Home] Les positions de la salle sont ${salle.positions}`);
	}, [salle]);


	const isHome = () => (page === "home" || page === "/home");


	const navToPages = () => (user.email !== undefined && !isHome());
	useMemo(() => {
		console.log(`[Home] la page est home ? :${isHome()}`);
		console.log(`[Home] NavToPage ? :${navToPages()} page=${page}`);
	}, [page]);

	// A refaire eventuellement en ecriture fonctionnelle, a eventuellement transferer dans une lib utilitaire
	function notif() {
		let notif = [];
		for (let i = 0; i < salle.ilots.length; i++) {
			let ilot = salle.ilots[i];
			//	console.log("Ilot="+JSON.stringify(ilot));
			for (let j = 0; j < ilot.positions.length; j++) {
				let position = ilot.positions[j];
				//console.log("[Home] Position="+JSON.stringify(position));
				if ((position.occupancyvalues[0].value > 1 / 3) &&  (position.notification===undefined || position.notification==="shown")) notif.push({ id: position.id, name: position.name, level: position.occupancyvalues[0].value });
			}
		}
		return notif;
	};
	return (
		navToPages()
			? <Redirect to={page} />
			: (
				<>
					<div className="listenotification">
						<GlobalNotification />
						{notif().map(notif =>
							<Notification key={notif.id} name={notif.id} level={notif.level} />
						)}


					</div>
				</>
			)
	);
};

export default Home;
