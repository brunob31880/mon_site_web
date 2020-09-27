/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
/* eslint-disable func-names */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Redirect } from "react-router";
import {useApp} from "../../context/AppContext";



/**
 * Stateless component for ACDS Global Notification.
 *Composant Alerte (qui est dans components/Alerte/)
 * @name Alerte
 * @author Geraldine Beboux <geraldine.beboux@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Alerte = props => {
	const {backgroundColor,name, MV } = props;
	const [{ page, user},dispatch ] = useApp();
	
	
	const navToPages = () => (user.email !== undefined && !page.includes("alerte"));

	const navTo = page => {
		dispatch({
			type: "navTo",
			payload: {
				page
			}
		});
	};


const stylealerte = {
	position: "relative",
	padding: "10px",
	marginTop:"10px",
	backgroundColor,
	height: "50px",
	width: "250px",
	border: "2px solid white",
	display :"flex",
	flexDirection: "raw",
	justifyContent: "center",
	color: "white",
	
	
};

/*pour tester rajouter  border: "2px solid red" à styleright et styleleft*/
/* la div de gauche a une marge à droite, la div de droite a une marche à gauche*/
const styleright = {   marginLeft:"5px" };
const styleleft = { marginRight:"5px" };


	return (
		navToPages()
		? <Redirect to={page} />
		: 		(
			<>
				<div style ={stylealerte}className="alerte" id ="alerte" >
				<div style ={ styleleft }>  TV : {name}  </div>
			
				 <div style ={ styleright }>  MV : {MV} </div>
				 
				</div>
				
			</>
		)
);
};



export default Alerte;