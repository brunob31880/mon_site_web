/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Redirect } from "react-router";
import {useApp} from "../../context/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
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
const Creation = () => {
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [avatar, setAvatar] = useState("");
	const {SERVER_ADRESS}=config;
	const [{ page}, dispatch] = useApp();

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

	const urlencoded = new URLSearchParams();
	urlencoded.append("firstName", firstname);
	urlencoded.append("lastName", lastname);
	urlencoded.append("email", email);
	urlencoded.append("password", password2);

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: urlencoded,
		redirect: "follow"
	};

	const navTo = page => {
		dispatch({
			type: "navTo",
			payload: {
				page
			}
		});
	};
	const creationWith = id => {
		navTo("/");
	};
	const sendCreation = () => {
		fetch(SERVER_ADRESS+"/users", requestOptions)
			.then(response => creationWith(response.text()))
			.catch(error => {
				console.log("error", error);
				window.alert(error);
			});
	};

	const validateForm = () => (password.length>=6) && password === password2 && lastname.length > 0 && firstname.length > 0 && email.length > 0;

	const navToPages = () => (page !== "creation");

	return (
		 navToPages()
			? <Redirect to={page} />
			: (
				<>
					<div className="layercreation">
						<Container className="Container">
							<h2>Creer un compte</h2>
							<Form className="formCreation">
								<Form.Group controlId="formBasicFirstName">
									<Form.Control type="text" value={firstname} placeholder="Nom complet" onChange={e => setFirstName(e.target.value)} />
								</Form.Group>
								<Form.Group controlId="formBasicLastName">
									<Form.Control type="text" value={lastname} placeholder="Prenom" onChange={e => setLastName(e.target.value)} />
								</Form.Group>
								<Form.Group controlId="formBasicEmail">
									<Form.Control type="email" value={email} placeholder="Entrez email" onChange={e => setEmail(e.target.value)} />
								</Form.Group>
								<Form.Group controlId="formBasicPassword">
									<Form.Control type="password" value={password} placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
								</Form.Group>
								<Form.Group controlId="formConfirmBasicPassword">
									<Form.Control type="password" value={password2} placeholder="confirmez mot de passe" onChange={e => setPassword2(e.target.value)} />
								</Form.Group>
								<Form.Group>
									<Form.File id="formcheck-api-regular">
										<Form.File.Input id={avatar} />
									</Form.File>
								</Form.Group>
								<Button variant="primary" disabled={!validateForm} onClick={sendCreation}>
									Continuer
								</Button>
							</Form>
						</Container>
					</div>
				</>
			)
	);
};

export default Creation;
