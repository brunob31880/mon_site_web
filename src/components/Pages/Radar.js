/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo,useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";
import D3MapComponent from "../Radar/D3MapComponent";
import Menu from "../../components/Menu/Menu";



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
    const [Gesture, setGesture] = useState("Rien");
    const [Radar, setRadar] = useState("Server Info Radar");
    const refElement = useRef(null);
    const menu = [];
    //https://github.com/lessmess-dev/react-media-hook
    useEffect(() => {
        //on associe le composant D3
        map = new D3MapComponent(refElement.current, { geometry, position, menu, displaytype, setGesture });

    }, []);

    useEffect(() => {
        fetch("https://ipapi.co/json/").then(response => response.json())
            .then(data =>
                setLocate(data)
            )
    }, []);

    const launchsimu = () => {
        console.log("Lauching Demo Radar on "+locate);
        socket.emit("launchdemo", locate);
    };

    useMemo(() => {
		socket && socket.on("moveFlight", data => {
            console.log("Moving flight "+JSON.stringify(data));
            setRadar(JSON.stringify(data));
		});
    }, [socket]);
    
    return (
        navToPages()
            ? <Redirect to={page} />
            : (
                <>
                    <div ref={refElement} id="map" className="map" />
                    {/*  <Menu/> */}
                    <button onClick={launchsimu}>DEMO</button>
                    <div className="gestureres">
                        {Gesture}
                    </div>
                    <div className="inforadar">
                        {Radar}
                    </div>
                </>
            )

    );
};

export default Radar;