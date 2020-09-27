/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useApp } from "../../context/AppContext";

/**
 * Stateless component Virtual Info for Acds.
 *
 * @name Header
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const VirtualInfo = () => {
    const [{ displaytype, position, orientation }, ] = useApp();
    

    return (
            <div className="infovirtual">
                {displaytype}

                <div className="localisation">
                    Latitude={position.lat}
                    <br />
						Longitude={position.lon}
                    <br />
						Alpha={orientation.alpha}
                    <br />
						Beta={orientation.beta}
                    <br />
						Gamma={orientation.gamma}
                </div>
            </div>
    );
};

export default VirtualInfo;