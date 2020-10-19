/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo,useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";




let map = null;

/**
 * Stateless component Radar for Acds.
 *
 * @name Astro
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Astro = (props) => {
    const [{ page, user }] = useApp();
    const isAstro= () => page.includes("astro");
    const [locate, setLocate] = useState("");
    const navToPages = () => (user.email !== undefined && !isAstro());


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

export default Astro;