/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";
import LOGO from "../../images/image.jpg";
import { useApp } from "../../context/AppContext";
import {config} from "../../datas/config";

/**
 * Stateless component for React Playground header.
 *
 * @name First
 * @author Bruno Boissie <luc@suhali.net>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const First = props => {
	const {version}=config;
	const [{ page }, dispatch] = useApp();

	const navTo = page => {
		dispatch({
			type: "navTo",
			payload: {
				page
			}
		});
	};



	useMemo(() => {
		console.log(`[FirstPage] page=${page}`);
	}, [page]);

	const navToPages = () => (page !== "/");

	return (
		navToPages()
			? <Redirect to={page} />
			: (
				<>
					<div className="logo">
						<img className="roundedImageBorder" src={LOGO} />
					</div>
					<div className="version">
					{version}
					</div>
					<div className="firstdiv">
						<Button variant="primary" onClick={() => navTo("login")}>
							Vous avez deja un compte? se connecter
					</Button>
						<p>&nbsp;</p>
						<Button variant="primary" onClick={() => navTo("creation")}>
							Créer un compte
					</Button>
					</div>
				</>
			)
	);
};

export default First;
