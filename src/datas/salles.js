

export const salles = {
	bordeaux: {
		number :{
			numbername:"numberbordeaux"
		},
		ilots:[
			{
				id:0,
				ilotname:"Ilot0",
				positions: [
					{	
						id: 0,
						cwpname :"P0",
						ilot:0,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.2},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1},{time:"10:55:00",value:0.15},{time:"10:50:00",value:0.25},{time:"10:45:00",value:0.35},{time:"10:40:00",value:0.15},{time:"10:35:00",value:0.45},{time:"10:30:00",value:0.75}],
						notification:"shown"
					},
					{	
						id: 1,
						cwpname :"P1",
						ilot:0,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.4},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1},{time:"10:55:00",value:0.15},{time:"10:50:00",value:0.25},{time:"10:45:00",value:0.35},{time:"10:40:00",value:0.15},{time:"10:35:00",value:0.45},{time:"10:30:00",value:0.75}],
						notification:"shown"
					},
					{	
						id: 2,
						cwpname :"P2",
						ilot:0,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.2},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 3,
						cwpname :"P3",
						ilot:0,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.3},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 4,
						cwpname :"P4",
						ilot:0,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.2},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 5,
						cwpname :"P5",
						ilot:0,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.3},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					}]
			},
			{
				id:1,
				ilotname:"Ilot1",
				positions: [
					{	
						id: 6,
						cwpname :"P6",
						ilot:1,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.1},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 7,
						cwpname :"P7",
						ilot:1,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.2},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 8,
						cwpname :"P8",
						ilot:1,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.5},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 9,
						cwpname :"P9",
						ilot:1,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.3},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 10,
						cwpname :"P10",
						ilot:1,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.2},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 11,
						cwpname :"P11",
						ilot:1,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.2},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					}]
			},
			{
				id:2,
				ilotname:"Ilot2",
				positions: [
					{	
						id: 12,
						cwpname :"P12",
						ilot:2,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.1},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 13,
						cwpname :"P13",
						ilot:2,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.5},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 14,
						cwpname :"P14",
						ilot:2,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.5},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 15,
						cwpname :"P15",
						ilot:2,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.2},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 16,
						cwpname :"P16",
						ilot:2,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.4},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					},
					{	
						id: 17,
						cwpname :"P17",
						ilot:2,
						disabled: false,
						occupancyvalues: [{time:"11:10:00",value:0.3},{time:"11:05:00",value:0.2},{time:"11:00:00",value:0.1}]
					}]
			}
		]
	}
		
};
// retourne un ilot donne par un id dans une salle donnée
export const getIlotWithIdinSalle=(idIl, salle) => {
	let ilot = null;
	ilot = salle.ilots.filter(data => data.id === idIl)[0];
	return ilot;
}
export const setNotificationOfPosition=(idpos,salle)=> {
	let position;
	//console.log(salle.ilots.length);
	for (let i=0;i<salle.ilots.length;i++){
		//console.log("Ilot "+JSON.stringify(salle.ilots[i]));
		position = salle.ilots[i].positions.filter(data => data.id === idpos);
		if (position.length>0) {
			position[0].notification="hidden";
			return;
		}
		
	}

}