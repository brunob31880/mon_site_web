/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React, { useMemo } from "react";
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";
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

	
	return (
		navToPages()
			? <Redirect to={page} />
			: (
				<>
					<div className="listenotification">
						<GlobalNotification />
					</div>
				</>
			)
	);
};

export default Home;
