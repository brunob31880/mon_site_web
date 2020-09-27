// Gestion des informations journalières
export const dayinfos = [{
    date: "mer. 05 août", value: {
        delayTot: 30,
        delayAv: 3,
        deviation: 7
    }
}, {
    date: "jeu. 06 août", value: {
        delayTot: 25,
        delayAv: 2,
        deviation: 5
    }
}, {
    date: "ven. 07 août", value: {
        delayTot: 22,
        delayAv: 5,
        deviation: 8
    }
}, {
    date: "sam. 08 août", value: {
        delayTot: 25,
        delayAv: 2,
        deviation: 5
    }
}, {
    date: "dim. 09 août", value: {
        delayTot: 22,
        delayAv: 5,
        deviation: 8
    }

}];

export const getDayInfoWithDateString = (day) => dayinfos.filter(d => d.date === day);

function isSameDay(dateobj, dString) {
    const wda = new Intl.DateTimeFormat('fr', { weekday: 'short' }).format(dateobj);
    const mo = new Intl.DateTimeFormat('fr', { month: 'short' }).format(dateobj);
    const da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(dateobj);
    const day = wda + " " + da + " " + mo;
    //console.log("[Delay] Recherche avec "+day+ "and "+dString);
    return dString === day
}
export const getDayInfoWithDate = (dateobj) => dayinfos.filter(d => isSameDay(dateobj, d.date));
