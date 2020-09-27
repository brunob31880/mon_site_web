import * as d3 from 'd3';
import { config } from "../../datas/config";
import * as topojson from 'topojson';
import Hammer from "hammerjs"
import versor from 'versor';


class D3MapComponent {

  containerEl;
  props;
  svg;
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;

    this.v0 = 0; // Mouse position in Cartesian coordinates at start of drag gesture.
    this.r0 = 0; // Projection rotation as Euler angles at start.
    this.q0 = 0; // Projection rotation as versor at start.
    console.log("[D3MapComponent] Creation map avec props=" + JSON.stringify(props));
    const { geometry, position } = props;
    this.height = 300;
    this.width = 300;
    this.center=null;
    this.ddelta=1;
    this.actualScale = this.height / 2;

    this.projection = d3.geoOrthographic()
      .scale(this.actualScale)
      .translate([this.width / 2, this.height / 2]);

    this.svg = d3.select(containerEl)
      .append("svg")
      .attr("id", "radar")


    this.createMap();
    this.setMapAccordingPosition();
    const { svg, props: { displaytype } } = this;
    if (displaytype==="desktop") this.d3ZoomDragHandler();
    else if (displaytype==="mobile") this.hammerGestureManager();
  }
  // SOURCE:https://www.datavis.fr/index.php?page=map-world-temperature

  // fonctions permettant la conversion x,y => phi lambda
  lambda = d3.scaleLinear().domain([0, 300]).range([-180, 180]);
  phi = d3.scaleLinear().domain([0, 300]).range([90, -90]);
  // dispose un point la ou nous sommes sur la carte
  setMapAccordingPosition = () => {
    const { svg, props: { geometry, position } } = this;
    const coords = [position.lon, position.lat];

    var rotaCenter = [-coords[0], -coords[1]];

    this.projection.rotate(rotaCenter);
    const pcoords = this.projection(coords);

    console.log(JSON.stringify(coords));
    svg.append("circle")
      .attr("cx", pcoords[0])
      .attr("cy", pcoords[1])
      .attr("r", 5)
      .attr("class", "positionradar")
  }

  updateMap = () => {
    var path = d3.geoPath().projection(this.projection);
    const graticule = d3.geoGraticule();
    this.svg.selectAll(".graticule")
      .datum(graticule)
      .attr("d", path);

    this.svg.selectAll(".country")
      .attr("d", path);
    const { props: { position } } = this;
    const coords = [position.lon, position.lat];

    const pcoords = this.projection(coords);
    if (isNaN(pcoords[0])||isNaN(pcoords[1])) return;
    this.svg.selectAll(".positionradar")
      .attr("cx", pcoords[0])
      .attr("cy", pcoords[1])
  }

  dragstart = () => {
    var r = this.projection.rotate();
    return {
      x: this.lambda.invert(r[0]),
      y: this.phi.invert(r[1])
    };
  }
  dragging = () => {
    let rot;
    const { displaytype,setGesture} = this.props;
    if (displaytype==="desktop") rot = [this.lambda(d3.event.x), this.phi(d3.event.y)];
    else {
      const evt=this.adaptToSvg(this.center);
      console.log("Center="+JSON.stringify(this.center));
      setGesture("Dragging with "+JSON.stringify(evt));
      rot = [this.lambda(evt[0]), this.phi(evt[1])];
    }
    
    this.projection.rotate(rot);
    this.updateMap();
  }
  adaptToSvg=(point)=>{
    let rect = this.svg.node().getBoundingClientRect();
    console.log("Point="+JSON.stringify(point));
    return [point.x-rect.x,point.y-rect.y];
  }
  adaptTabToSvg=(point)=>{
    let rect = this.svg.node().getBoundingClientRect();
    console.log("Point="+JSON.stringify(point));
    return [point[0]-rect.x,point[1]-rect.y];
  }
  zoomstarted = () => {
    const { displaytype} = this.props;
    if (displaytype==="desktop") console.log("Mouse="+d3.mouse(this.svg.node()));
    this.v0 = versor.cartesian(this.projection.invert(displaytype === "mobile" ?this.adaptToSvg(this.center) :d3.mouse(this.svg.node())));
    this.r0 = this.projection.rotate();
    this.q0 = versor(this.r0);
  }
  zoomed = () => {
    const { displaytype,setGesture } = this.props;
    setGesture("Zooming");
    if (displaytype==="desktop") console.log("Mouse="+d3.mouse(this.svg.node())+" Transform="+d3.event.transform.k);
    else console.log("Mouse="+this.adaptToSvg(this.center)+" Transform="+this.ddelta);
    console.log("Zoom of "+this.ddelta);
    if (displaytype==="desktop") this.projection.scale(d3.event.transform.k * (this.height - 10) / 2);
    else this.projection.scale(this.ddelta * (this.height - 10) / 2);

    let v1 = versor.cartesian(this.projection.rotate(this.r0).invert(displaytype === "mobile" ?this.adaptToSvg(this.center):d3.mouse(this.svg.node())));
    let q1 = versor.multiply(this.q0, versor.delta(this.v0, v1));
    let r1 = versor.rotation(q1);
    this.projection.rotate(r1);
    setGesture("Zooming "+JSON.stringify(r1));
    this.updateMap();
  }
  isMultitouch=()=> d3.touches().length>1;
  // Gestion des evenements via d3
  d3ZoomDragHandler = () => {
    // Drag
    const drag = d3.drag().subject(this.dragstart).on("drag", this.dragging);
    this.svg.call(drag);
    //Zoom
    this.svg.call(d3.zoom().on("start", this.zoomstarted).on('zoom', this.zoomed));
  }

  
  // gestion des gestes via Hammer.js
  hammerGestureManager = () => {
    const { setGesture } = this.props;
    const mapElt = document.getElementById("radar");

    const hammertime = new Hammer(mapElt);
    var mc = new Hammer.Manager(mapElt);
    // Tap recognizer with minimal 2 taps
    mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
    // Single tap recognizer
    mc.add(new Hammer.Tap({ event: 'singletap' }));


    // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
    mc.get('doubletap').recognizeWith('singletap');
    // we only want to trigger a tap, when we don't have detected a doubletap
    mc.get('singletap').requireFailure('doubletap');


    mc.on("singletap", e => {
      console.log("HAMMERTIME: TAP")
      setGesture("Tap Center=" + JSON.stringify(this.adaptToSvg(e.center)));

    })
    mc.on("doubletap", e => {
      console.log("HAMMERTIME: DOUBLETAP")
      setGesture("DoubleTap Center=" + JSON.stringify(this.adaptToSvg(e.center)));

    })
    hammertime.get('pinch').set({ enable: true });
    hammertime.get('rotate').set({ enable: true });
    // pinch et spread
    hammertime.on("pinchmove", e => {
      console.log("HAMMERTIME: PinchMove");
      this.center=e.center;
      this.ddelta=e.scale;
      console.log("PinchMove "+this.ddelta +" \nCenter=" + JSON.stringify(this.adaptToSvg(e.center)));
      setGesture("PinchMove "+this.ddelta +" \nCenter=" + JSON.stringify(this.adaptToSvg(e.center)));
      this.zoomed();
    })
    hammertime.on("pinchend", e => {
      console.log("HAMMERTIME: PinchEnd");
      this.ddelta=e.scale;
      setGesture("PinchEnd "+this.ddelta +" \nCenter=" + JSON.stringify(this.adaptToSvg(e.center)));
    })
    hammertime.on("pinchstart", e => {
      console.log("HAMMERTIME: PinchStart");
      this.center=e.center;
      console.log("PinchStart "+this.ddelta +" \nCenter=" + JSON.stringify(this.adaptToSvg(e.center)));
      setGesture("PinchStart "+this.ddelta +" \nCenter=" + JSON.stringify(this.adaptToSvg(e.center)));
      this.zoomstarted();
    })
    hammertime.on("rotate", e => {
      console.log("HAMMERTIME: Rotate");
      this.center=e.center;
      setGesture("Rotate (" + e.deltaX + "," + e.deltaY + ")" + " \nCenter=" + JSON.stringify(this.adaptToSvg(e.center)));
    })
    hammertime.on("panstart", e => {
      console.log("HAMMERTIME: PanStart");
      this.center=e.center;
      setGesture("PanStart (" + e.deltaX + "," + e.deltaY + ")" + " \nCenter=" + JSON.stringify(this.adaptToSvg(e.center)));
      this.dragstart();
    })
    hammertime.on("panmove", e => {
      console.log("HAMMERTIME: PanMove");
      this.center=e.center;
      setGesture("PanMove (" + e.deltaX + "," + e.deltaY + ")" + " \nCenter=" + JSON.stringify(this.adaptToSvg(e.center)));
      this.dragging();
    })
    hammertime.on("panend", e => {
      console.log("HAMMERTIME: PanEnd");
      this.center=e.center;
      setGesture("PanEnd (" + e.deltaX + "," + e.deltaY + ")" + " \nCenter=" + JSON.stringify(this.adaptToSvg(e.center)));
    })
    hammertime.on("swipe", e => {
      console.log("HAMMERTIME: Swipe");
      setGesture("Swipe (" + e.deltaX + "," + e.deltaY + ")" + " \nCenter=" + JSON.stringify(this.adaptToSvg(e.center)));
    })
  }
  // Creation de la carte
  createMap = () => {
    const { svg, props: { geometry, position } } = this;
    const { JSON_FILE } = config;
    console.log("[D3MapComponent] Chargement du fichier " + JSON_FILE);
    var path = d3.geoPath().projection(this.projection);

    const gCountries = svg.append("g").attr("id", "gCountries");
    const gGraticules = svg.append("g").attr("id", "gGraticules");

    // ! si fichier statique il doit se trouver dans le repertoire public //
    d3.json(JSON_FILE).then(function (collection) {
      var countries = gCountries.selectAll("path")
        .data(collection.features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "country")
        .attr("id", d => d.id);
      const graticule = d3.geoGraticule();
      gGraticules.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path);
    });

  }

}

export default D3MapComponent;