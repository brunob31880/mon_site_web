import React from "react";
import {useApp} from "../../context/AppContext";



const Menu = ({ onClick }) => {
    const [{ menu }] = useApp();

    const isSelectedMenu = (id) => {
        return (menu.indexOf(id) != -1) ? "menueltSelected" : "menuelt";
    }
    return (
        <div className="sidenav">
            <button onClick={(e) => onClick(e.target)} className={isSelectedMenu("menu_secteurs")} id="menu_secteurs">Secteurs</button>
            <button onClick={(e) => onClick(e.target)} className={isSelectedMenu("menu_aeroports")} id="menu_aeroports">Aéroports</button>
            <button onClick={(e) => onClick(e.target)} className={isSelectedMenu("menu_graticules")} id="menu_graticules">Graticules</button>
            <button onClick={(e) => onClick(e.target)} className={isSelectedMenu("menu_wpts")} id="menu_wpts">Balises</button>
            <button onClick={(e) => onClick(e.target)} className={isSelectedMenu("menu_routes")} id="menu_routes">Routes</button>
            <button onClick={(e) => onClick(e.target)} className={isSelectedMenu("menu_obstacles")} id="menu_obstacles">Obstacles</button>
        </div>);
};
export default Menu
