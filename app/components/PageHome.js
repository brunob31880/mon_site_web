import React from "react";
import Header from "./Header";


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
const PageHome = () => {

	return (
	<>
		<Header />
		<div className="layer3">
			Home
		</div>
	</>
	)
};

export default PageHome;
