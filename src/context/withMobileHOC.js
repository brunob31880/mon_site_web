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
const test=false;
// Orientation
	//https://developer.mozilla.org/fr/docs/WebAPI/Detecting_device_orientation
    //https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API
    // https://www.sitepoint.com/using-device-orientation-html5/
/**
 * Stateless component for ACDS Mobile .
 *
 * @name Date
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const MobileHOC = ({ children }) => {

    const [{displaytype}, dispatch] = useApp();
    // 
    function isMobileDevice() {
        if (navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return test?false:true;
        }
        else {
            return test?true:false;
        }
    }

    // gestion de l'orientation
    function handleOrientation(event) {
        var absolute = event.absolute;
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;
        dispatch({
            type: "setOrientation",
            payload: {
                orientation: {
                    absolute,
                    alpha,
                    beta,
                    gamma
                }
            }
        });

    }
    // Definition mobile/desktop
    const setDisplayType = (displaytype) => {
        dispatch({
            type: "setDisplayType",
            payload: {
                displaytype
            }
        });
    }


    useEffect(() => {
        console.log("[MobileHOC] setDisplayType");
        setDisplayType((isMobileDevice() ? "mobile" : "desktop"));
        if (!window.DeviceOrientationEvent) return;
        window.addEventListener('deviceorientation', handleOrientation);
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
          };
    }, []);
   
    useEffect(() => {     
        console.log("[MobileHOC] " + JSON.stringify(displaytype));
        if (displaytype === "desktop") return;
        // suppression du long touch =context menu on chrome
        document.addEventListener("contextmenu", function(e) { 
            console.log("Prevention de l'apparition du menu contextuel");
            return false; 
        })
        if (!("geolocation" in navigator)) return;
        const geolocResult = () =>
            new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

        geolocResult().then((position) => {
            console.log("[MobileHOC] Find position " + JSON.stringify(position));
            dispatch({
                type: "setPosition",
                payload: {
                    position: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    }
                }
            });
        })
            .catch((err) => {
                console.error(err.message);
            });
        
       
    }, [displaytype]);



    return (
        <>
            {children}
        </>
    )
};

export default MobileHOC;