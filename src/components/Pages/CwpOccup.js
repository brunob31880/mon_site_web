/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React from "react";
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";
import * as d3 from "d3";
/**
 * Stateless component 
 *
 * @name CwpOccup
 * @author Bruno Boissie <boissiebruno@gmail.com>
 * @copyright (c) 2019, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const CwpOccup = (props) => {
    const [{ salle, page, user },dispatch] = useApp();
    const { centerComponent, returnNav} = props;

    const isCwp = () => (page.includes("cwp"));

    const navToPages = () => (user.email !== undefined && !isCwp());

    const navTo = page => {
		console.log("[Footer] clic on image");
		dispatch({
			type: "navTo",
			payload: {
				page
			}
		});
    };
    
    function getCwpByName(cwpN) {
        let cwp = null;
        for (let i = 0; i < salle.ilots.length; i++) {
            let ilot = salle.ilots[i];
            //	console.log("Ilot="+JSON.stringify(ilot));
            for (let j = 0; j < ilot.positions.length; j++) {
                let position = ilot.positions[j];
                if (position.cwpname === cwpN) cwp = ilot.positions[j];
            }
        }
        return cwp;
    }

    //console.log("Occupancy=" + JSON.stringify(occup));



    React.useEffect(() => {
        const idCwp = page.split("/")[2].replace(":", "");
        centerComponent.text = "Cwp " + idCwp;
        const cwp=getCwpByName(idCwp);
        const occup = cwp.occupancyvalues;
        // modif du footer 
        // on utilise d3 car cette fois contrairement au centerComponent on a affaire a un const (et non un objet)
        const rFooter = d3.select("#returnFooter");
        rFooter.on("click", () => navTo(returnNav+"/:"+cwp.ilot.toString()));
        
        //https://www.datavis.fr/index.php?page=linearchart-improve
        //https://www.datavis.fr/index.php?page=barchart
        const margin = { top: 20, right: 20, bottom: 90, left: 120 },
            width = 300 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .range([height, 0]);
        const svg = d3.select("#chart").append("svg")
            .attr("id", "svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        x.domain(occup.map(d => d.time));
        y.domain([0, d3.max(occup, d => d.value)]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        svg.append("g")
            .call(d3.axisLeft(y).ticks(6));
            svg.selectAll(".bar")
            .data(occup)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.time))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.value))
            .attr("height", d => height - y(d.value))
            .attr('fill', d => d.value >2/3 ? "red" :( d.value>1/3 ? "orange" : "green"))				
    }, []);


    return (
        navToPages()
            ? <Redirect to={page} />
            : (
                <>
                    <div id="chart">

                    </div>
                </>
            )
    );
};

export default CwpOccup;
