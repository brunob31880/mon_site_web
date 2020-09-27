/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useMemo } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Redirect } from "react-router";
import socketIOClient from "socket.io-client";

import {useApp} from "../../context/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";

import {salles} from "../../datas/salles";
import {reguls} from "../../datas/reguls";
import alertes from "../../datas/alertes";
import {config} from "../../datas/config";
import {dayinfos} from "../../datas/delay";
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
	const [{user, page}, dispatch] = useApp();
	const {SERVER_ADRESS}=config;
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

	const urlencoded = new URLSearchParams();
	urlencoded.append("email", email);
	urlencoded.append("password", password);

	const requestOptions = {
	//	mode: "no-cors",
		method: "POST",
		headers: myHeaders,
		body: urlencoded,
		redirect: "follow"
	};
	
	const isOnError = (token) =>  (token.includes("error") || token.includes("Error"));
	const isEmpty = obj => JSON.stringify(obj).includes("{}");
	const hasConnecteduser = () => !(user.email === undefined);


	const logWith = token => {
		// Si deja connecté on sors
		if (hasConnecteduser()) return;
		
		console.log("Token is "+ JSON.stringify(token));
		// si le token est vide on sort
		if (isEmpty(token)) {
			console.log(`token is empty : ${token} no connection`);
			return;
		} // On sort aussi si c'est une erreur en retour
		else if (isOnError(token) ) {
			console.log("Error with server ");
			window.alert(JSON.parse(token).errors);
			return;
		}
		const {bordeaux} = salles;
		const {fake} = reguls;
		const {fakebis} = alertes;

		dispatch({
			type: "changeSalle",
			payload: {
				salle: bordeaux
			}
		});
	
		dispatch({
			type: "setAlert",
			payload: {
				alertes: fakebis
			}
		});
		dispatch({
			type: "setRegul",
			payload: {
				reguls: reguls
			}
		});

		dispatch({
			type: "setInfoDate",
			payload: {
				infodate: dayinfos
			}
		});
		dispatch({
			type: "setSocket",
			payload: {
				socket: socketIOClient(SERVER_ADRESS)
			}
		});
		let messages=[];
		messages.push("Informations utiles")
		messages.push("autres informations")
		dispatch({
			type: "logUser",
			payload: {
				user: {
					avatar: (email==="admin@gmail.com") || (email==="sonic@gmail.com") ? undefined: email+".png",
					messages: messages,
					email,
					token: (token.includes("errors") ? undefined : token)
				}
			}
		});	
	};

	const adminConnection=() => email==="admin@gmail.com" && password === "admin";

	const sendCredential = () => {

		if (adminConnection()) logWith("adminconnection")
		else {
			console.log("Contacting SERVER ADRESS="+SERVER_ADRESS);
		fetch(SERVER_ADRESS+"/auth", requestOptions)
			.then(response => response.text())
			.then(result => logWith(result))
			.catch(error => console.log("error", error));
		}
	};

	const getUser = () => {
		const myHeaders2 = new Headers();
		myHeaders.append("token", "eyJ1c2VySWQiOiI1ZWU4YWNjOTY0NWU2NjBmNTE5OTJiN2MiLCJlbWFpbCI6ImJvaXNzaWVicnVub0BnbWFpbC5jb20iLCJwcm92aWRlciI6ImVtYWlsIiwibmFtZSI6ImJydW5vIGJvaXNzaWUifQ==");

		const requestOptions2 = {
			mode: "no-cors",
			method: "GET",
			headers: myHeaders2,
			redirect: "follow"
		};

		fetch(SERVER_ADRESS+"/users/5ee8acc9645e660f51992b7c", requestOptions2)
			.then(response => logWith(response.text()))
			// .then(result => console.log(result))
			.catch(error => console.log("error", error));
	};
	const validateForm = () => email.length > 0 && password.length > 0;

	
	useMemo( () => {
		if (hasConnecteduser()) {
			console.log("User Connect");
			setTimeout( dispatch({
				type: "navTo",
				payload: {
					page: "home"
				}
			}), 500);
			
		}
	}, [hasConnecteduser]);

	const navToPages = () => (page !== "login");
	
	useMemo( () => {
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
