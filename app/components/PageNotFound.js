import React from "react";

/**
 * Stateless component for CCD default 404 page.
 * Defined following the preferred Pure Stateless Function pattern with hooks.
 *
 * @name PageNotFound
 * @author Luc Thibault <luc@suhali.net>
 * @copyright (c) 2019, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const PageNotFound = () => (
	<div className="knit-centered">Sorry, page was not found</div>
);

export default PageNotFound;
