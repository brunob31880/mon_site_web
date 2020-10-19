/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect ,useMemo} from "react";
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";

/**
 * Stateless component Virtual for Acds.
 *
 * @name Virtual
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Info = () => {
	const [{ page, user,position,orientation}, dispatch] = useApp();
	const isInfo = () => page === "info" || page === "/info";
	const navToPages = () => (user.email !== undefined && !isInfo());

	return (
		navToPages()
			? <Redirect to={page} />
			: (
				<>
					<div id="layvirtual" className="layvirtual">
						
					</div>
				</>
			)

	);
};

export default Info;