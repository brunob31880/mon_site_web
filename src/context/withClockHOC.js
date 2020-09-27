/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
/* eslint-disable func-names */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { useApp } from "./AppContext";

/**
 * Stateless component for ACDS Clock.
 *
 * @name Date
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const ClockHOC = ({ children }) => {

    const [, dispatch] = useApp();
    useEffect(() => {
        const interval = setInterval(() => {
           //console.log('This will run every second!');
            dispatch({
                type: "setDate",
                payload: new Date()
            });        
        }, 1000);
        return () => clearInterval(interval);
    }, []);



    return (
        <>
            {children}
        </>
    )
};

export default ClockHOC;