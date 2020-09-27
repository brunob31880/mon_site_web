/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect ,useMemo} from "react";
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";
import * as d3 from "d3";
import D3VirtualComponent from "../../components/Virtual/D3VirtualComponent";
import VirtualInfo from "../../components/Virtual/VirtualInfo";

let virtualsvg = null;
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
const Virtual = () => {
	const [{ page, user,position,orientation}, dispatch] = useApp();
	const isVR = () => page === "vr" || page === "/vr";
	const navToPages = () => (user.email !== undefined && !isVR());
	const layer1 = d3.select(".layer1");

	if (isVR()) {
		//console.log("[Virtual] Changing background of " + layer1);
		layer1.classed('salle', true);
	}
	else {
		layer1.classed('salle', false);
	}
	const refElement = useRef(null);
	useEffect(() => {
        //on associe le composant D3
        virtualsvg = new D3VirtualComponent(refElement.current, { position });      
    }, []);

	useMemo(() => {
		console.log("[Virtual] Orientation change");
		virtualsvg && virtualsvg.updateWith(orientation);
	}, [orientation]);


	return (
		navToPages()
			? <Redirect to={page} />
			: (
				<>
					<div ref={refElement} id="layvirtual" className="layvirtual">
						<VirtualInfo/>
					</div>
				</>
			)

	);
};

export default Virtual;