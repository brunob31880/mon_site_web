/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import {useApp} from "../context/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";

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
const Login = () => {
	const [email, setEmail] = useState("boissiebruno@gmail.com");
	const [password, setPassword] = useState("elpassword");
	const [, dispatch] = useApp();
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
	const logWith = token => {
		dispatch({
			type: "logUser",
			payload: {
				email,
				token
			}
		});
	};
	const sendCredential = () => {
		fetch("http://localhost:3000/auth", requestOptions)
			.then(response => response.text())
			.then(result => logWith(console.log(result)))
			.catch(error => console.log("error", error));
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

		fetch("http://localhost:3000/users/5ee8acc9645e660f51992b7c", requestOptions2)
			.then(response => logWith(response.text()))
			// .then(result => console.log(result))
			.catch(error => console.log("error", error));
	};
	const validateForm = () => email.length > 0 && password.length > 0;

	return (
		<>
			<div className="layerlogin">
				<Container className="Container">
					<h2>Sign In</h2>
					<Form className="formLogin">
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Adress Email</Form.Label>
							<Form.Control type="email" value={email} placeholder="Entrez email" onChange={e => setEmail(e.target.value)} />
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Mot de Passe</Form.Label>
							<Form.Control type="password" value={password} placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
						</Form.Group>
						<Button variant="primary" disabled={!validateForm} onClick={sendCredential}>
							Entrez
						</Button>
					</Form>
				</Container>
			</div>
		</>
	);
};

export default Login;
