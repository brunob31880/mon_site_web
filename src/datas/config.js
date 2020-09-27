/* eslint-disable import/prefer-default-export */
/*
		icon : nom d'un icône référencé dans la page cible
		text: texte libre
		meta: valeur connu au niveau du contexte global 
*/
export const config = {
	version:"0.0.2",
	 //SERVER_ADRESS : "http://127.0.0.1:3030",
	// pour ceux qui n'ont pas de serveur installé ou fonctionnel 
	// Essai second commit sur seconde machine BRANCHE_GEGE
	// Serveur Raspberry PI maison (lancement par npm start et install mongodb)
	//SERVER_ADRESS: "https://boissiebruno-pageperso-pi.ovh:3030",
	// Serveur dockeurisé maison
	SERVER_ADRESS: "https://boissiebruno-pageperso-pi.ovh:3060",
	//JSON_FILE:"https://github.com/d3/d3.github.com/blob/master/world-50m.v1.json",
	//JSON_FILE:"data_countries-50m.json",
	JSON_FILE: "world-countries.json",
	loginHeader: {
		backgroundColor: "rgb(25, 45, 179)",
		height: "50px",
		iconSize: "40px",
		leftComponent: {
			icon: "back",
			nav: "/"
		},
		centerComponent: {
			text: "Compte Utilisateur"
		},
		rightComponent: {
			text: ""
		}
	},
	loggedHeader: {
		backgroundColor: "rgb(45, 84, 164)",
		height: "50px",
		iconSize: "40px",
		leftComponent: {
			icon: "control",
			nav: "management"
		},
		centerComponent: {
			text: ""
		},
		rightComponent: {
			meta: "username"
		},
		rightFooterComponent: {
			icon: "vr",
			nav: "vr"
		},
		fullrightFooterComponent: {
			icon: "bell",
			nav: "alertes"
		},
		full2rightFooterComponent: {
			icon: "radar",
			nav: "radar"
		},
		centerFooterRightComponent: {
			icon: "map",
			nav: "salle"
		},
		centerFooterLeftComponent: {
			icon: "history",
			nav: "history"
		},
		leftFooterComponent: {
			icon: "planes",
			nav: "regulations"
		}
	},
	loggedHeaderSalle: {
		backgroundColor: "rgb(184, 97, 133)",
		height: "50px",
		iconSize: "40px",
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Plan Salle"
		},
		rightComponent: {
			icon: "map2"
		}
	},
	loggedHeaderIlot: {
		backgroundColor: "rgb(184, 97, 133)",
		height: "50px",
		iconSize: "40px",
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "/salle",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Ilot"
		},
		rightComponent: {
			icon: "map2"
		}
	},
	loggedHeaderCwp: {
		backgroundColor: "rgb(184, 97, 133)",
		height: "50px",
		iconSize: "40px",
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "/ilot",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Cwp"
		},
		rightComponent: {
			icon: "map2"
		}
	},
	loggedHeaderManagement: {
		backgroundColor: "rgb(174, 98, 175)",
		height: "50px",
		iconSize: "40px",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Personnes et Equipe"
		},
		rightComponent: {
			icon: "control2"
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home"
	},
	loggedHeaderAgent: {
		backgroundColor: "rgb(174, 98, 175)",
		height: "50px",
		iconSize: "40px",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Fiche Agent"
		},
		rightComponent: {
			icon: "control2"
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "management"
	},
	loggedHeaderEquipe: {
		backgroundColor: "rgb(174, 98, 175)",
		height: "50px",
		iconSize: "40px",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Fiche Equipe"
		},
		rightComponent: {
			icon: "control2"
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "management"
	},
	loggedHeaderRegulations: {
		backgroundColor: "rgb(40, 45, 104)",
		height: "50px",
		iconSize: "40px",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Regulations"
		},
		rightComponent: {
			text: ""
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home"
	},
	loggedHeaderRegulation: {
		backgroundColor: "rgb(40, 45, 104)",
		height: "50px",
		iconSize: "40px",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Regulations"
		},
		rightComponent: {
			text: ""
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "/regulations"
	},
	loggedHeaderVirtual: {
		backgroundColor: "rgb(105, 65, 199)",
		height: "50px",
		iconSize: "40px",
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Réalité Augmentée"
		},
		rightComponent: {
			icon: "vr2"
		}
	},
	loggedHeaderHistory: {
		backgroundColor: "rgb(156, 37, 103)",
		height: "50px",
		iconSize: "40px",
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Historique"
		},
		rightComponent: {
			icon: "histo2"
		}
	},
	loggedHeaderNotification: {
		backgroundColor: "rgb(55, 124, 159)",
		height: "50px",
		iconSize: "40px",
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "/home",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Notification"
		},
		rightComponent: {
			text: ""
		}
	},
	loggedHeaderAlertes: {
		backgroundColor: "rgb(40, 45, 104)",
		height: "50px",
		iconSize: "40px",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Alertes"
		},
		rightComponent: {
			icon: "bell"
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home"
	},
	loggedHeaderRadar: {
		backgroundColor: "rgb(51, 209, 255)",
		height: "50px",
		iconSize: "40px",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Radar"
		},
		rightComponent: {
			icon: "radar"
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home"
	}
};