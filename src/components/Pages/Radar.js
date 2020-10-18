/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo,useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";




let map = null;

/**
 * Stateless component Radar for Acds.
 *
 * @name Radar
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Radar = (props) => {
    const [{ page, geometry, position, displaytype, user, socket }] = useApp();
    const isRadar = () => page.includes("radar");
    const [locate, setLocate] = useState("");
    const navToPages = () => (user.email !== undefined && !isRadar());


    const menu = [];
   

   
    return (
        navToPages()
            ? <Redirect to={page} />
            : (
                <>
                    <div id="map" className="map" />                  
                </>
            )

    );
};

export default Radar;