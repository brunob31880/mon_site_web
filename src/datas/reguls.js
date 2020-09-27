export const reguls = [{
	date: "mer. 05 août", value: 
		 [
			{
				id: 0,
				hdep: "12:20",
				harr: "13:40",
				regul_id: "LPWEST18",
				tv_id: "LPWEST",
				rate : 40,
				state: "ACCEPTED",
				delay : 100,
				rate : 41,
				avdelay :12,
				reason: "ATC_CAPACITY",
				description :"WEST SECTOR"
			},
			{
				id: 1,
				hdep: "12:25",
				harr: "13:45",
				regul_id: "LPWEST19",
				tv_id: "LPSOUTH",
				rate : 41,
				state: "ACCEPTED",
				delay : 120,
				rate : 60,
				avdelay :12,
				reason: "ATC_CAPACITY",
				description :"WEST SECTOR"
			}
		]
}];


export const getRegulWithDateString = (day) => reguls.filter(d => d.date === day);

function isSameDay(dateobj,dString){
	//console.log("[Regul] Recherche avec "+dateobj);
    const wda = new Intl.DateTimeFormat('fr', { weekday: 'short' }).format(dateobj);
    const mo = new Intl.DateTimeFormat('fr', { month: 'short' }).format(dateobj);
    const da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(dateobj);
    const day=wda+" "+da+" "+mo;
    //console.log("[Regul] Recherche avec "+day+ "and "+dString);
    return dString === day
}
export const getRegulWithDate = (dateobj) => reguls.filter(d => isSameDay(dateobj,d.date));