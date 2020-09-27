/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
/* eslint-disable func-names */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React,{useMemo} from "react";
import {useApp} from "../../context/AppContext";
import {getDayInfoWithDateString} from "../../datas/delay";
import {getRegulWithDateString} from "../../datas/reguls";
/**
 * Stateless component for ACDS Global Notification.
 *
 * @name Notification
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const GlobalNotification = props => {

	const [{salle, reguls,date},] = useApp();

	const delayday = getDayInfoWithDateString("mer. 05 août")[0];
	useMemo(() => {
		console.log("Delay="+JSON.stringify(delayday));
	}, [delayday]);
	
	const {value}=delayday;

	const {delayAv,delayTot,deviation} = value;
	const getNbRegul=()=>{
		const regulday = getRegulWithDateString("mer. 05 août")[0];
		return regulday.value.length;
	}
	useMemo(() => {
		console.log(`[GlobalNotification] Regul=${reguls}`);
		console.log(`[GlobalNotification] Salle=${salle}`);
	}, [reguls,salle]);

	const ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(date);
	const mo = new Intl.DateTimeFormat('fr', { month: 'short' }).format(date);
	const da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(date);
	const wda = new Intl.DateTimeFormat('fr', { weekday: 'short' }).format(date);
	const hour = new Intl.DateTimeFormat('fr', { hour: "2-digit" }).format(date).replace('h', '').replace(' ', '');
	const minute = new Intl.DateTimeFormat('fr', { minute: "2-digit" }).format(date);
	const secon = new Intl.DateTimeFormat('fr', { second: "2-digit" }).format(date);
	
	
	// 2-digit ne marche pas 
	const Digits=(s) =>{
		if (s.length===2) return s;
		else {
			return s>10 ? s : ("0"+s);
		}
	};
	//console.log(hour);
	return (
		<>
			<div className="globalnotification" id="globalnotification">
			
			<div className="djour">
              {wda} {Digits(da)} {mo}
            </div>
			<div className="hjour">
              {Digits(hour)} h:{Digits(minute)} min:{Digits(secon)} sec
            </div>
			</div>
		</>

	);
};

export default GlobalNotification;
