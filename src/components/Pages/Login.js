/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useMemo } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Redirect } from "react-router";
import socketIOClient from "socket.io-client";

import { useApp } from "../../context/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { getConnection} from "../../context/withBack4AppHoc";
import { config } from "../../datas/config";
/**
 * Stateless component for Login Page
 *
 * @name PageHome
 * @author Bruno Boissie <boissiebruno@gmail.com>
 * @copyright (c) 2019, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Login = () => {
	const [email, setEmail] = useState("sonic@gmail.com");
	const [password, setPassword] = useState("elpassword");
	const [{ user, page, articles }, dispatch] = useApp();
	
	const isOnError = (token) => (token.includes("error") || token.includes("Error"));
	const isEmpty = obj => JSON.stringify(obj).includes("{}");
	const hasConnecteduser = () => !(user.email === undefined);

	

	


	const adminConnection = () => email === "admin@gmail.com" && password === "admin";
    const onLog=() =>{
		let messages = [];
			messages.push("Informations utiles")
			messages.push("autres informations")
			
			dispatch({
				type: "logUser",
				payload: {
					user: {
						avatar: (email === "admin@gmail.com") || (email === "sonic@gmail.com") ? undefined : email + ".png",
						messages: messages,
						email,
						token :""
					}
				}
			});		
	};
	const sendCredential = () => {
		const user = getConnection(email, password,onLog);	
	};


	const validateForm = () => email.length > 0 && password.length > 0;


	useMemo(() => {
		if (hasConnecteduser()) {
			console.log("User Connect");
			setTimeout(dispatch({
				type: "navTo",
				payload: {
					page: "home"
				}
			}), 500);

		}
	}, [user]);

	const navToPages = () => (page !== "login");

	useMemo(() => {
		console.log(`[Login] Nav To ${page}`);
	}, [page]);


	return (
		navToPages()
			? <Redirect to={page} />
			: (
				<>
					<div className="layerlogin">
						<Container className="Container">
							<h2>Se connecter</h2>
							<Form className="formLogin">
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Login</Form.Label>
									<Form.Control type="email" value={email} placeholder="Entrez email" onChange={e => setEmail(e.target.value)} />
								</Form.Group>
								<Form.Group controlId="formBasicPassword">
									<Form.Label>Mot de passe</Form.Label>
									<Form.Control type="password" value={password} placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
								</Form.Group>
								<Button variant="primary" disabled={!validateForm} onClick={sendCredential}>
									Continuer
								</Button>
							</Form>
						</Container>
					</div>
				</>
			)

	);
};

export default Login;
