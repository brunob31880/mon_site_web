/* eslint-disable radix */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// A voir https://blogreact.com/how-to-use-error-boundary-using-hooks-in-react/
// eslint-disable-next-line no-restricted-globals

import React, { useState, useEffect, useMemo } from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import { useApp } from "../context/AppContext";

/**
 * HOC Stateless component
 *
 * @name withHeaderFooter
 * @author Bruno Boissie <boissiebruno@gmail.com>
 * @copyright (c) 2019, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */

const withHeaderFooter = props => WrappedComponent => {
	// Gestion du Footer
	const hasFooter = () => {
		const { footerType, centerLeftFooterComponent, centerRightFooterComponent, leftFooterComponent, rightFooterComponent } = props;
		return !(footerType === undefined && centerLeftFooterComponent === undefined && centerRightFooterComponent === undefined && leftFooterComponent === undefined && rightFooterComponent === undefined);
	};

	const [{ user, socket }, dispatch] = useApp();
	const [server, setServer] = useState("");
	const hasConnecteduser = () => !(user.email === undefined);
	const { height } = props ? props : "50px";

	useEffect(() => {
		if (height === undefined) return;
		console.log("[Page] Screen change setting geometry");
		const geometry = {
			width: window.screen.availWidth,
			height: window.screen.availHeight
		};
		dispatch({
			type: "setGeometry",
			payload: {
				geometry
			}
		});
	}, [height]);
	useMemo(() => {
		socket && socket.on("fromServer", data => {
			setServer(data);
		});
	}, [socket]);
	useMemo(() => {
		if (hasConnecteduser()) console.log("Utilisateur connecté:" + JSON.stringify(user));
	}, [user]);
	return (
		<>
			<div className="layer1" />
			<div className="layer2">
				<WrappedComponent {...props} />
			</div>
			{(props) && (
				<div className="layer3">
					<Header {...props} />
					<div className="center" />
					{hasFooter()
						&& <Footer {...props} />}
				</div>
			)}
		</>
	);
};
export default withHeaderFooter;
