/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import decroissance from "../images/fond.png";
import image from "../images/image.jpg";
/**
 * Stateless component for React Playground header.
 *
 * @name Header
 * @author Luc Thibault <luc@suhali.net>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Header = () => (
	<>
		<div className="layer1">
			<img src={decroissance} className="fond" />
		</div>
		<div className="layer2">
			<img src={image} className="roundedImageBorder" />
		</div>
	</>
);

export default Header;
