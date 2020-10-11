/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React, { useMemo } from "react";
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";
import GlobalNotification from "../Notifications/GlobalNotification";
import Article from "./Article";
import {config} from "../../datas/config";
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
	const [{ page, user,articles }] = useApp();
	
	const isHome = () => (page === "home" || page === "/home");


	const navToPages = () => (user.email !== undefined && !isHome());
	


	useMemo(() => {
		console.log(`[Home] la page est home ? :${isHome()}`);
		console.log(`[Home] NavToPage ? :${navToPages()} page=${page}`);
	}, [page]);

	;
	function notif() {
		let notif = [];
		for (let i = 0; i < articles.length; i++) {		
				//console.log(articles[i]);			
				if (articles[i].category!="undefined") notif.push({ id: i, category: articles[i].category, contenu: articles[i].contenu });			
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
						<div className="listearticle">
						{notif().map(e => 
							<Article key={e.id} category={e.category} contenu={e.contenu} />
						)}
						</div>
					</div>
				</>
			)
	);
};

export default Home;
