import * as d3 from 'd3';
const posX=135;
class D3VirtualComponent {

  containerEl;
  props;
  svg;
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    console.log("[D3VirtualComponent] Creation virtual component avec props=" + JSON.stringify(props));
    this.circle=null;
    this.svg = d3.select(containerEl)
      .append("svg")
      .attr("id", "virtualsvg"); 
    this.addBall();
  }
  addBall=() =>{
     this.circle = this.svg.append("circle")
        .attr("id", "cible")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 10);
  }

  updateWith=(orientation)=>{
    
    var maxX = 295;
    var maxY = 295;
    let x = orientation.gamma;
    let y = orientation.beta;
    // un clamp d
    if (y > 90) { y = 90 };
    if (y < -90) { y = -90 };


    x += 90;
    y += 90;
    console.log("X=" + x + " Y=" + y);

    let uy = (maxY * y / 180 - 10);
    let ux = (maxX * x / 180 - 10);
    this.circle.attr("transform", "translate(" + ux + "," + uy + ")")
    //const bbox=this.circle.node().getBBox();
    //console.log(JSON.stringify(bbox.width));
  }

}

export default D3VirtualComponent;