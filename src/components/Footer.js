/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useMemo } from "react";
/* import leftIcon from "../images/left-arrow.png"; */
/* import Svg from "../images/back.svg"; */
/* import Image from 'react-bootstrap/Image' */
import Tooltip from '@material-ui/core/Tooltip';
import INFO from "../images/info.png";
import PHYS from "../images/phys.png";
import MATH from "../images/math.png";
import PLANES from "../images/plane.png";
import ASTRO from "../images/astro.png";
import { useApp } from "../context/AppContext";
//https://material-ui.com/fr/components/tooltips/
import MAISON from "../images/camera.png";

/**
 * Stateless component for Acds Footer.
 *
 * @name Footer
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Footer = props => {
	const { backgroundColor, iconSize, width, height, footerType, returnNav, returnWidth, returnHeight, fullrightFooterComponent,full2rightFooterComponent, centerFooterLeftComponent, centerFooterRightComponent, leftFooterComponent, rightFooterComponent } = props;
	const [{ page}, dispatch] = useApp();


	// React Inline CSS //
	const outerdiv = {
		display: "flex",
		alignItems: "center",
		textAlign: "center",
		color: "white",
		padding: "10px",
		backgroundColor,
		fontFamily: "Arial",
		height,
		width: width || "100%"
	};

	const returndiv = {
		alignItems: "center",
		textAlign: "center",
		marginBottom: "10px",
		color: "white",
		padding: "10px",
		backgroundColor,
		fontFamily: "Arial",
		height: returnHeight,
		width: returnWidth || "90%",
		cursor: "pointer"
	};

	const navTo = page => {
		console.log("[Footer] clic on image");
		dispatch({
			type: "navTo",
			payload: {
				page
			}
		});
	};
	useMemo(() => {
		console.log(`[Footer] FooterType=${footerType}`);
		console.log(`[Footer] returnNav=${returnNav}`);
	}, [page]);
	

	return (
		<>
			{footerType === "Return"
				? (
					<div style={returndiv} id="returnFooter" onClick={() => navTo(returnNav)}>
						RETOUR
					</div>
				)
				: (
					<div style={outerdiv}>
						<div className="footerleftdiv">
							<Tooltip title="Aviation Civile">
								{leftFooterComponent.icon === "planes" && <img src={PLANES} style={{ cursor: "pointer" }} width={iconSize} height={iconSize} onClick={() => navTo(leftFooterComponent.nav)} />}
							</Tooltip>
						</div>
						<div className="footercenterleftdiv">
							<Tooltip title="Mathematiques	">
								{centerFooterLeftComponent.icon === "math" && <img src={MATH} style={{ cursor: "pointer" }} width={iconSize} height={iconSize} onClick={() => navTo(centerFooterLeftComponent.nav)} />}
							</Tooltip>
						</div>
						<div className="footercenterrightdiv">
							<Tooltip title="Physique">
								{centerFooterRightComponent.icon === "phys" && <img src={PHYS} style={{ cursor: "pointer" }} width={iconSize} height={iconSize} onClick={() => navTo(centerFooterRightComponent.nav)} />}
							</Tooltip>
						</div>

						<div className="footerrightdiv">
							<Tooltip title="Informatique">
								{rightFooterComponent.icon === "info" && <img src={INFO} style={{ cursor: "pointer" }} width={iconSize} height={iconSize} onClick={() => navTo(rightFooterComponent.nav)} />}
							</Tooltip>
						</div>
						<div className="footerfullrightdiv">
							<Tooltip title="Maison">
							{ fullrightFooterComponent.icon === "maison" && <img src={MAISON} style={{ cursor: "pointer" }} width="35px" height="35px" onClick={() => navTo(fullrightFooterComponent.nav)} />}							
							</Tooltip>
						</div>
						<div className="footerfullrightdiv2">
						<Tooltip title="Astronomie">
						{full2rightFooterComponent.icon === "astro" && <img src={ASTRO} style={{ cursor: "pointer" }} width="35px" height="35px"  onClick={() => navTo(full2rightFooterComponent.nav)} />}
						</Tooltip>
						</div>
					</div>
				)}
		</>
	);
};

export default Footer;
