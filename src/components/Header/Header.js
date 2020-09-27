/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
/* eslint-disable func-names */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */

import React from "react";
import * as d3 from "d3";
import CONTROL from "../../images/people.png";
import CONTROL2 from "../../images/people.png";
import HISTO2 from "../../images/math.png";
import MAP2 from "../../images/phys.png";
import BACK from "../../images/BACK.png";
import VR2 from "../../images/info.png";
import photo1 from "../../images/Sonic.png";
import photo2 from "../../images/Sonic2.jpg";
import { useApp } from "../../context/AppContext";
import {config} from "../../datas/config";

/**
 * Stateless component for ACDS header.
 *
 * @name Header
 * @author bruno boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Header = props => {
	const { backgroundColor, iconSize, width, height, centerComponent, leftComponent, rightComponent } = props;
	const {SERVER_ADRESS}=config;
	// React Inline CSS //
	const upperdiv = {
		padding: "10px",
		backgroundColor,
		height: 0,
		width: width || "100%",
		fontFamily: "Arial",
		transition: "0s",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	};

	const outerdiv = {
		display: "flex",
		alignItems: "center",
		color: "white",
		width: width || "100%",
		padding: "10px",
		backgroundColor,
		height,
		fontFamily: "Arial"
	};

	const centrageX = 105;
	const centrageY = 110;
	const svgW = 200;
	const svgH = 200;

	const [{ user, socket, geometry, displaytype }, dispatch] = useApp();
	React.useMemo(() => console.log(`User change:${user.email}`), [user]);

	React.useEffect(() => {
		console.log("[Header] Socket has changed");
		if (socket) {
			//	socket.emit("connectingOf", user);
			//	socket.emit("getPictureOf", user);
		}
	}, [socket]);

	React.useEffect(() => {
		if (centerComponent.text !== "") {
			return;
		}
		console.log("[Header] Hook effect: Picture");
		const svg = d3.select("#picture")
			.append("svg")
			.attr("width", svgW)
			.attr("height", svgH);
		const groupePicture = svg.append("g");
		const circle1 = groupePicture
			.append("ellipse")
			.attr("cx", centrageX)
			.attr("cy", centrageY)
			.attr("rx", 70)
			.attr("ry", 60)
			.style("fill", backgroundColor);
		const circle2 = groupePicture
			.append("ellipse")
			.attr("cx", centrageX)
			.attr("cy", centrageY)
			.attr("rx", 60)
			.attr("ry", 50)
			.style("fill", "gray");
		const defs = groupePicture
			.append("defs")
			.attr("id", "imgdefs");
		const catpattern = defs.append("pattern")
			.attr("id", "catpattern")
			.attr("height", 1)
			.attr("width", 1)
			.attr("x", "0")
			.attr("y", "0");
		const pic = catpattern.append("image")
			.attr("x", 0)
			.attr("y", 0)
			.attr("height", svgH / 2)
			.attr("width", svgW / 2)
			.attr("xlink:href", user.avatar ? SERVER_ADRESS+"/avatars/"+user.email+".png" : (user.email==="admin@gmail.com" ? photo2:photo1));
		const fill = groupePicture.append("ellipse")
			.attr("rx", 50)
			.attr("ry", 45)
			.attr("cy", centrageY)
			.attr("cx", centrageX)
			.attr("fill", "url(#catpattern)")
			.on(displaytype === "mobile" ? "touchstart" : "mousedown", function () {
				const div = d3.select(this)
					.classed("active", true);
				const upper = d3.select("#upper");
				const uppermiddle = d3.select("#uppermiddle");
				const layer3 = d3.select(".layer3");
				const layer2 = d3.select(".layer2");
				const right = d3.select("#right");

				const s = d3.mouse(upper.node());
				const w = d3.select(window)
					.on(displaytype === "mobile" ? "touchmove" : "mousemove", mousemove)
					.on(displaytype === "mobile" ? "touchend" : "mouseup", mouseup);
				function mousemove() {
					const mouse = displaytype === "mobile" ? d3.touches(upper.node())[0] : d3.mouse(upper.node());
					const newHeight = mouse[1];
					const opacity = (geometry.height - newHeight) / geometry.height;
					console.log(`[Header] Nouvelle hauteur ${newHeight}px`);
					upper.style("transition", "Os");
					upper.style("height", `${newHeight}px`);
					layer3.style("z-index", 5);
					layer2.style("opacity", opacity);
					right.style("opacity", 0);

					uppermiddle.select("svg").remove();
					const svgupper = uppermiddle.append("svg")
						.attr("width", geometry.width)
						.attr("height", newHeight);
					//	svgupper.append("text")
					//		.attr("x", geometry.width - (1 - opacity) * (geometry.width / 2))
					//		.attr("y", 20 + (1 - opacity) * (newHeight / 5))
					//		.attr("font-family", "sans-serif")
					//		.attr("font-size", `${40 * (1 - opacity)}px`)
					//		.attr("text-anchor", "middle")
					//		.attr("fill", "white")
					//		.text(user.email);
					if (opacity < 0.5) {
						
						const infotext = () => {
							for (let i=0;i<user.messages.length;i++) {
								svgupper.append("text")
								.attr("x", geometry.width / 2)
								.attr("y", 200+40*i)
								.attr("class", "infos")
								.attr("id","tmptext")
								.attr("font-family", "sans-serif")
								.attr("font-size", "40px")
								.attr("text-anchor", "middle")
								.attr("fill", "white")
								.text(user.messages[i]);
							}
							
							const deconnect = svgupper.append("text")
								.attr("x", geometry.width / 2)
								.attr("y", 350)
								.attr("class", "deconnecter")
								.attr("id","tmptext")
								.attr("font-family", "sans-serif")
								.attr("font-size", "40px")
								.attr("text-anchor", "middle")
								.attr("fill", "white")
								.text("Se Deconnecter");
						}
						infotext();
						
					}
					
				
			}
				function mouseup() {
					right.style("opacity", 1);
					div.classed("active", false);
					w.on(displaytype === "mobile" ? "touchmove" : "mousemove", null)
						.on(displaytype === "mobile" ? "touchend" : "mouseup", null);
					//	setStartDrag(0);
					//	upper.style("transition", "500ms");
					//	upper.style("height", "0px");
					//	layer3.style("z-index", 3);
					//	layer2.style("opacity", 1);
					//	uppermiddle.select("svg").remove();
				}

			});
}, []);
//  useMemo(()=> {
//const history = useHistory();
//console.log(`[Header] History Location PathName=${history.location.pathname}`);
// history.goBack()
// }, [page])


const navTo = page => {
	console.log("[Header] clic on image");
	dispatch({
		type: "navTo",
		payload: {
			page
		}
	});
};
const deconnect = () => {
	dispatch({
		type: "changeSalle",
		payload: {
			salle: {}
		}
	});
	dispatch({
		type: "setRegul",
		payload: {
			reguls: {}
		}
	});
	dispatch({
		type: "setSocket",
		payload: {
			socket: null
		}
	});
	dispatch({
		type: "logUser",
		payload: {
			user: {
			}
		}
	});
	navTo("/");
};
return (
	<>
		{centerComponent.text === "" && (
			<div style={upperdiv} onClick={() => deconnect()} id="upper">
				<div className="uppermiddle" id="uppermiddle" />
			</div>
		)}
		<div style={outerdiv} id="outer">
			<div className="leftdiv" id="left">
				{/*	{ leftComponent.icon === "back" && <img src={leftIcon} width="20px" height="20px" />} */}
				{/* leftComponent.icon === "back" && <Back fill="white" height="20px" width="20px" />} */}
				{leftComponent.icon === "back" && <img src={BACK} style={{ cursor: "pointer" }} onClick={() => navTo(leftComponent.nav)} width={iconSize} height={iconSize} />}
				{leftComponent.icon === "control" && <img src={CONTROL} style={{ cursor: "pointer" }} onClick={() => navTo(leftComponent.nav)} width={iconSize} height={iconSize} />}
			</div>
			<div className="centerdiv" id="center">
				{centerComponent.text}
				{centerComponent.text === "" && (
					<div id="picture">
						{/* <Image src="../images/image.jpg" height="70" width="70" roundedCircle /> */}
					</div>
				)}
			</div>
			<div className="rightdiv" id="right">
				{rightComponent.meta === "username" && user.email}
				{rightComponent.text}
				{rightComponent.icon === "map2" && <img src={MAP2} style={{ cursor: "pointer" }} width={iconSize} height={iconSize} />}
				{rightComponent.icon === "control2" && <img src={CONTROL2} style={{ cursor: "pointer" }} width={iconSize} height={iconSize} />}
				{rightComponent.icon === "vr2" && <img src={VR2} style={{ cursor: "pointer" }} width={iconSize} height={iconSize} />}
				{rightComponent.icon === "histo2" && <img src={HISTO2} style={{ cursor: "pointer" }} width={iconSize} height={iconSize} />}
			</div>
		</div>
		<div id="picture" />
	</>
);
};

export default Header;
