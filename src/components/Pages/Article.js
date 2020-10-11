import React, { useState, useEffect, useMemo } from "react";
import INFO from "../../images/info.png";
import PHYS from "../../images/phys.png";
import MATH from "../../images/math.png";
import RADAR from "../../images/astro.png";
import PLANES from "../../images/plane.png";
/**
 * Stateless component for 
 *
 * @category Article
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Article = props => {
    const { category, contenu } = props;
    //console.log("[Article] category="+category);
    const getIcon = (category) => {
        console.log("Category=" + category);
        switch (category) {
            case 'Mathematiques':
                return MATH;
                break;
            case 'Informatique':
                return INFO;
                break;
            case 'Physique':
                return PHYS;
                break;
            default:
                return PLANES;
                break;
        }
    }
    return (
        <div className="article" id={category} >
            <div className="iconecategory">
                <img src={getIcon(category)} width="35px" height="35px" />
            </div>
            <div className="articlecontenu">
                {contenu}
            </div>

        </div>
    );
};

export default Article;
