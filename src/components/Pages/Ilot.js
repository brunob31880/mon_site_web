/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from "react";
import { Redirect } from "react-router";
import Cwp2 from "../Cwps/Cwp2";
import { useApp } from "../../context/AppContext";
/**
 * Stateless component Ilot for Acds.
 *
 * @name Ilot
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Ilot = (props) => {
    const [{ page, salle, user }] = useApp();
    const isIlot = () => page.includes("ilot");
    const navToPages = () => (user.email !== undefined && !isIlot());
    const { centerComponent } = props;
    console.log("CenterComponent is " + centerComponent.text);
    let idIlot = -1;

    function getIlotWithId(idIl) {
        let ilot = null;
        if (isIlot()) {
            //console.log(page.split("/")[1]);
            ilot = salle.ilots.filter(data => data.id === idIl)[0];
            //console.log("Ilot="+JSON.stringify(ilot));
        }
        return ilot;
    }
    //http://localhost:3000/ilot/:0
    //http://localhost:3000/ilot/:0
    // A verifier erreur etrange pourtant même adresse 
    
    idIlot = page.split("/")[1]=="ilot"?Number.parseInt(page.split("/")[2].replace(":", "")) :Number.parseInt(page.split("/")[1].replace(":", ""));
    console.log(page.split("/")[1].replace(":", ""));
    centerComponent.text = "Ilot " + idIlot;
    
   // console.log("[Ilot] " +  JSON.stringify(getIlotWithId(idIlot)));

    const idIlotString = "ilot" + idIlot.toString();

    return (
        navToPages()
            ? <Redirect to={page} />
            : (
                <div className="ilot" id={idIlotString}>
                    {
                      getIlotWithId(idIlot) ?  getIlotWithId(idIlot).positions.map(cwp => (
                            <Cwp2 key={cwp.id} {...cwp} />)) : "Not found"
                    }
                </div>
            )

    );
};

export default Ilot;
