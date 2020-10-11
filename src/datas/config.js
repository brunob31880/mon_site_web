/* eslint-disable import/prefer-default-export */
/*
		icon : nom d'un icône référencé dans la page cible
		text: texte libre
		meta: valeur connu au niveau du contexte global 
*/
export const config = {
	version:"0.0.1",
	 //SERVER_ADRESS : "http://127.0.0.1:3030",
	// pour ceux qui n'ont pas de serveur installé ou fonctionnel 
	// Essai second commit sur seconde machine BRANCHE_GEGE
	// Serveur Raspberry PI maison (lancement par npm start et install mongodb)
	//SERVER_ADRESS: "https://boissiebruno-pageperso-pi.ovh:3030",
	// Serveur dockeurisé maison
	SERVER_ADRESS: "https://boissiebruno-pageperso-pi.ovh:3070",

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
			icon: "PEOPLE",
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
			text: "Physique"
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
			text: "Personnes"
		},
		rightComponent: {
			icon: "PEOPLE"
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home"
	},
	loggedHeaderAdmin: {
		backgroundColor: "rgb(174, 98, 175)",
		height: "50px",
		iconSize: "40px",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Administration"
		},
		rightComponent: {
			icon: "people"
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home"
	},
	loggedHeaderRegulations: {
		backgroundColor: "rgb(40, 45, 104)",
		height: "50px",
		iconSize: "40px",
		leftComponent: {
			text: ""
		},
		centerComponent: {
			text: "Aviation Civile"
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
			text: "Informatique"
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
			text: "Mathematiques"
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
			text: "Maison"
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
			text: "Astronomie"
		},
		rightComponent: {
			icon: "radar"
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home"
	}
};