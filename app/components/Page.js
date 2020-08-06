/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from "react";
import Header from "./Header";

/**
 * Stateless component for Bruno's book main homepage.
 *
 * @name PageMath
 * @author Bruno Boissie <boissiebruno@gmail.com>
 * @copyright (c) 2019, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */

const withHeader = props => WrappedComponent => {	
	return (
			<div className="layer">
				<Header />
				<div className="layer3">
					<WrappedComponent {...props} />
				</div>
			</div>
	);
};
export default withHeader;
