import React from "react";
import { Redirect } from "react-router";
import {useApp} from "../../context/AppContext";
/**
 * Stateless component for Bruno's book main homepage.
 *
 * @name Page History
 * @author Bruno Boissie <boissiebruno@gmail.com>
 * @copyright (c) 2019, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Math = () => {
	const [{page, user}] = useApp();
	const navToPages = () => (user.email !== undefined && page !== "math");

	return (
		navToPages()
			?			<Redirect to={page} />
			:		(
				<>
					<div className="history">
						
					</div>
				</>
			)
	);
};

export default Math;