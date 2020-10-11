/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useMemo } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Redirect } from "react-router";
import socketIOClient from "socket.io-client";
import {config} from "../../datas/config";
import { useApp } from "../../context/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
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
const Admin = () => {
	const [category, setCategory] = useState();
	const [contenu, setContenu] = useState();
	const [filecontenu, setFileContenu] = useState();
	const [{user, page}, dispatch] = useApp();
	const {SERVER_ADRESS}=config;
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
	
	var urlencoded = new URLSearchParams();
	urlencoded.append("category", category);
	urlencoded.append("contenu", contenu);
	urlencoded.append("filecontenu", filecontenu);
	
	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: urlencoded,
	  redirect: 'follow'
	};

	const navToPages = () => (page !== "admin");
	const validateForm = () => category.length > 0 && contenu.length > 0;
	const sendArticle =() => {
		fetch(SERVER_ADRESS+"/articles", requestOptions)
		.then(response => response.text())
		.then(result => {
			dispatch({
				type: "addArticle",
				payload: {
					article: {category,contenu,filecontenu}
				}
			});
			console.log("Creation category"+result);
			setTimeout( dispatch({
				type: "navTo",
				payload: {
					page: "home"
				}
			}), 500);
		})
		.catch(error => console.log("error", error));
	}
	
	
	return (
		navToPages()
			? <Redirect to={page} />
			: (
				<>
				<div className="layerlogin">
					<Container className="Container">
						<h2>Article</h2>
						<Form className="formLogin">
							<Form.Group controlId="formBasicarticle">
								<Form.Label>Sujet</Form.Label>
								<Form.Control as="select" custom onChange={e => setCategory(e.target.value)}>
									<option>Mathématique</option>
									<option>Informatique</option>
									<option>Physique</option>
									<option>Note</option>
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="formBasiccontenu">
								<Form.Label>Contenu</Form.Label>
								<Form.Control as="textarea" rows={3} onChange={e => setContenu(e.target.value)} />
							</Form.Group>
							<Form.Group>
								<Form.File id="formControlFile1" label="fichier"  onChange={e => setFileContenu(e.target.value)} />
							</Form.Group>
							<Button variant="primary" disabled={!validateForm} onClick={sendArticle}>
								Continuer
							</Button>
						</Form>
					</Container>
				</div>
			</>
			)
	);
};

export default Admin;
