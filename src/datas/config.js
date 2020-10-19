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
	//SERVER_ADRESS: "https://boissiebruno-pageperso-pi.ovh:3070",
	BACK4APP: {
		Application_ID:'qnmLxhzH9hXlqUdMplVRZNkfF9hzeHLBwXp4RR3d',
		Client_key:'z7MUBWu6OTknsqrLM9CXHFtGXzXarIoiadcVsRVb',
		JavaScript_key:'BOe86xTg0x3CHV9eQBgjDHwkfgxgxAw8UWXzOPiP'
	},
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
			icon: "info",
			nav: "info"
		},
		fullrightFooterComponent: {
			icon: "maison",
			nav: "maison"
		},
		full2rightFooterComponent: {
			icon: "astro",
			nav: "astro"
		},
		centerFooterRightComponent: {
			icon: "phys",
			nav: "phys"
		},
		centerFooterLeftComponent: {
			icon: "math",
			nav: "math"
		},
		leftFooterComponent: {
			icon: "planes",
			nav: "aviation"
		}
	},
	loggedHeaderPhys: {
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
			icon: "phys"
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
	loggedHeaderAviation: {
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
			icon: "planes"
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home"
	},
	loggedHeaderInfo: {
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
			icon: "info"
		}
	},
	loggedHeaderMath: {
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
			icon: "math"
		}
	},
	loggedHeaderMaison: {
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
			icon: "maison"
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home"
	},
	loggedHeaderAstro: {
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
			icon: "astro"
		},
		footerType: "Return",
		returnHeight: "40px",
		returnNav: "home"
	}
};