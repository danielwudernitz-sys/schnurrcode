// probleme.ts — Problemlöser-Bibliothek für Schnurrcode (ERWEITERT)
// =============================================================
// ⚠️ VOR LAUNCH tierärztlich gegenchecken. "tierarztWarnung" ist
// Pflicht und muss im roten Warnfeld (--alert) erscheinen.
// =============================================================

export type Schweregrad = "info" | "achtung" | "ernst";

export interface Problem {
  id: string;
  titel: string;
  kurz: string;
  ursachen: string[];
  wasTun: string[];
  tierarztWarnung: string;
  schweregrad: Schweregrad;
}

export const PROBLEME: Problem[] = [
  {
    id:"klo", titel:"Pinkelt neben das Klo", kurz:"Unsauberkeit hat fast immer einen Grund – Klo, Stress oder Gesundheit.",
    ursachen:["Klo zu selten gereinigt oder unbeliebte Streu","Zu wenige Klos (Regel: 1 pro Katze + 1)","Ungünstiger Standort (laut, einsehbar, neben Futter)","Kürzlich gewechselte Streu/neues Klo","Stress, Veränderung, Revierkonflikt"],
    wasTun:["Klos täglich säubern","Mehr Klos, ruhig und erreichbar platzieren","Zur bewährten Streu zurück","Stellen mit Enzymreiniger (nicht ammoniakhaltig) säubern","Stress reduzieren, Pheromon-Stecker testen"],
    tierarztWarnung:"ZUERST Tierarzt: häufiges Absetzen kleiner Mengen, Blut, Schmerzlaute oder Lecken am Genital können Blasenentzündung/Steine sein. Kater, der nicht absetzen kann, ist ein NOTFALL – sofort in die Klinik.",
    schweregrad:"ernst",
  },
  {
    id:"markieren", titel:"Markiert / sprüht an Wände", kurz:"Senkrechtes Sprühen ist Markieren, kein Unsauberkeitsproblem.",
    ursachen:["Revier markieren (oft unkastriert)","Stress, neue Tiere/Menschen, Umzug","Konflikt mit Nachbarskatzen (auch durchs Fenster)"],
    wasTun:["Kastration prüfen lassen","Stressquellen reduzieren, Sichtkontakt zu fremden Katzen unterbinden","Pheromone einsetzen","Markierstellen gründlich neutralisieren"],
    tierarztWarnung:"Plötzliches Markieren bei vorher sauberer Katze kann auch medizinisch sein – abklären lassen, v. a. bei weiteren Symptomen.",
    schweregrad:"achtung",
  },
  {
    id:"nachts", titel:"Schreit / maunzt nachts", kurz:"Meist Langeweile, Hunger oder Aufmerksamkeit – bei alten Katzen ein Warnzeichen.",
    ursachen:["Langeweile, überschüssige Energie","Hunger oder erlernte Erwartung","Aufmerksamkeit (hat früher funktioniert)","Unkastriert: hormonelles Rufen"],
    wasTun:["Abends ausgiebig spielen, danach füttern","Nächtliches Maunzen nicht belohnen","Späten Futterzeitpunkt/Automaten testen","Tagsüber für Beschäftigung sorgen"],
    tierarztWarnung:"Bei älteren Katzen mit neuem nächtlichem Rufen: Schilddrüsenüberfunktion, Bluthochdruck oder Demenz abklären lassen.",
    schweregrad:"achtung",
  },
  {
    id:"streichel-aggression", titel:"Beißt beim Streicheln", kurz:"Meist Reizüberflutung – die Katze warnt vorher.",
    ursachen:["Reizüberflutung („petting-induced aggression“)","Empfindliche Stellen berührt (Bauch, Schwanzbasis)","Frühe Stopp-Signale übersehen"],
    wasTun:["Vorsignale lesen: Schwanzzucken, angelegte Ohren, Hautzucken","Einheiten kurz halten, vor dem Kippen beenden","Wangen/Kinn statt Bauch","Bei Stopp-Signalen sofort aufhören, nie strafen"],
    tierarztWarnung:"Reagiert sie plötzlich schon bei sanfter Berührung empfindlich, kann Schmerz (Arthrose, Zähne, Haut) dahinterstecken – abklären.",
    schweregrad:"achtung",
  },
  {
    id:"hand-spiel", titel:"Kratzt/beißt Hände im Spiel", kurz:"Sie hat gelernt, dass Hände Beute sind.",
    ursachen:["Mit bloßen Händen gespielt","Zu wenig Jagd-Auslastung","Überschüssige Energie"],
    wasTun:["IMMER mit Spielzeug spielen, nie mit der Hand","Bei Biss Spiel sofort beenden (Konsequenz)","Mehrere kurze Jagdspiele pro Tag","Erwünschtes Spiel am Spielzeug belohnen"],
    tierarztWarnung:"Bei plötzlicher, unerklärlicher Aggression auch Schmerz/medizinische Ursachen bedenken.",
    schweregrad:"info",
  },
  {
    id:"kratzen", titel:"Kratzt an Möbeln", kurz:"Natürliches Bedürfnis – lenkbar, nicht abstellbar.",
    ursachen:["Krallenpflege","Duftmarkierung","Kratzmöbel fehlt/instabil/falscher Ort"],
    wasTun:["Stabile, hohe Kratzmöbel anbieten","An beliebten Stellen/nahe Schlafplätzen platzieren","Mit Catnip attraktiv machen, Kratzen loben","Möbel kurzfristig mit Folie schützen – nie strafen"],
    tierarztWarnung:"Plötzlich exzessives Kratzen/Knabbern kann Stress oder ein Hautproblem sein – bei Auffälligkeiten abklären.",
    schweregrad:"info",
  },
  {
    id:"tisch", titel:"Springt auf Tisch / Arbeitsfläche", kurz:"Höhe, Aussicht oder Essensgeruch ziehen sie an.",
    ursachen:["Katzen lieben erhöhte Aussichtsplätze","Essensreste/Gerüche","Aufmerksamkeit"],
    wasTun:["Attraktive erlaubte Höhen schaffen (Kratzbaum, Regal am Fenster)","Flächen sauber/essensfrei halten","Ruhig runterheben statt schimpfen, Alternative belohnen","Konsequent bleiben"],
    tierarztWarnung:"Kein medizinisches Problem – aber bei plötzlich verändertem Sprungverhalten oder Sprung-Unlust an Schmerzen denken.",
    schweregrad:"info",
  },
  {
    id:"rueckzug", titel:"Versteckt sich / zieht sich zurück", kurz:"Oft Stress – plötzlicher Rückzug kann Krankheit sein.",
    ursachen:["Veränderungen (Umzug, neue Möbel, neues Tier)","Lärm, Besuch, Stress","Fehlende sichere Rückzugsorte"],
    wasTun:["Ruhige, erhöhte Rückzugsorte schaffen","Nicht aus dem Versteck zerren","Routine und Ruhe geben, Veränderungen langsam","Pheromone testen"],
    tierarztWarnung:"Plötzlicher Rückzug mit Fressunlust, Apathie oder verändertem Gang ist oft ein Krankheits-/Schmerzzeichen – zeitnah zum Tierarzt.",
    schweregrad:"ernst",
  },
  {
    id:"angst-menschen", titel:"Hat Angst vor Besuch / Menschen", kurz:"Scheu lässt sich nur mit Geduld und Wahlfreiheit abbauen.",
    ursachen:["Wenig Sozialisierung als Kitten","Schlechte Erfahrungen","Zu aufdringliche Annäherung"],
    wasTun:["Besuch ignorieren lassen – Katze entscheidet über Annäherung","Rückzugsorte sichern","Positives verknüpfen (Leckerli aus der Distanz)","Nie zum Kontakt zwingen"],
    tierarztWarnung:"Bei plötzlich verstärkter Ängstlichkeit ohne Auslöser auch gesundheitliche Ursachen bedenken.",
    schweregrad:"info",
  },
  {
    id:"katzen-aggression", titel:"Aggression gegen andere Katze", kurz:"Meist Ressourcen- oder Revierkonflikt.",
    ursachen:["Zu wenige/verteilte Ressourcen","Zu schnelle Zusammenführung","Umgeleitete Aggression (z. B. Katze vorm Fenster)","Fehlender Rückzugsraum"],
    wasTun:["Ressourcen vervielfachen und trennen (Klos, Futter, Wasser, Plätze)","Vertikalen Raum schaffen","Bei Bedarf neu und langsam zusammenführen (Geruch → Sicht → gemeinsam)","Positive gemeinsame Erlebnisse schaffen"],
    tierarztWarnung:"Plötzliche Aggression einer vorher friedlichen Katze kann durch Schmerz ausgelöst sein – abklären.",
    schweregrad:"achtung",
  },
  {
    id:"buersten", titel:"Lässt sich nicht bürsten / Fell verfilzt", kurz:"Mit Geduld und kurzen Einheiten gewöhnbar.",
    ursachen:["Ungewohnt oder unangenehme Erfahrung","Empfindliche Stellen","Zu lange Sitzungen"],
    wasTun:["In kurzen Einheiten üben, mit Leckerli verknüpfen","Mit unempfindlichen Stellen beginnen","Weiche Bürste passend zum Fell wählen","Bei starkem Verfilzen Profi/Tierarzt statt gewaltsam"],
    tierarztWarnung:"Hört eine Katze auf, sich selbst zu putzen (struppiges, fettiges Fell), ist das oft ein Krankheitszeichen – abklären.",
    schweregrad:"info",
  },
  {
    id:"transport", titel:"Panik bei Transport / Autofahrt", kurz:"Mit Training und richtiger Box deutlich entspannter.",
    ursachen:["Box nur mit Tierarzt verknüpft","Ungewohnt, enge dunkle Bewegung","Stress des Halters überträgt sich"],
    wasTun:["Transportbox dauerhaft offen als Ruheplatz aufstellen","Mit Decke/Leckerli positiv besetzen","Box von oben öffnenbar wählen","Vorher kurze, harmlose Fahrten üben; Pheromone testen"],
    tierarztWarnung:"Bei extremer Panik, Hecheln oder Speicheln mit der Praxis über Beruhigungsmöglichkeiten sprechen.",
    schweregrad:"info",
  },
  {
    id:"betteln", titel:"Bettelt ständig / Übergewicht", kurz:"Oft Langeweile oder erlerntes Verhalten – Gewicht ist gesundheitsrelevant.",
    ursachen:["Langeweile statt echtem Hunger","Erlernt (Betteln wird belohnt)","Zu kalorienreiches Futter / freies Fressen"],
    wasTun:["Feste Portionen und Zeiten statt freiem Napf","Fummelbretter/Futterspiele gegen Langeweile","Mehr Spiel und Beschäftigung","Betteln konsequent nicht belohnen"],
    tierarztWarnung:"Übergewicht erhöht das Risiko für Diabetes und Gelenkprobleme. Plötzlicher Heißhunger trotz Fressen kann auf Schilddrüse/Diabetes hindeuten – Futterplan und Gesundheit tierärztlich klären.",
    schweregrad:"achtung",
  },
  {
    id:"gespraechig", titel:"Maunzt extrem viel", kurz:"Manche Katzen sind gesprächig – plötzliche Zunahme ist ein Signal.",
    ursachen:["Rassebedingt gesprächig (z. B. Orientalen)","Forderung nach Futter/Aufmerksamkeit/Tür","Langeweile"],
    wasTun:["Bedürfnisse prüfen (Futter, Klo, Beschäftigung)","Forderungs-Maunzen nicht jedes Mal belohnen","Für Auslastung sorgen","Ruhige Aufmerksamkeit zu ruhigen Zeiten geben"],
    tierarztWarnung:"Plötzlich stark zunehmendes Maunzen, besonders bei älteren Katzen, kann medizinisch sein (Schilddrüse, Schmerz, Demenz) – abklären.",
    schweregrad:"achtung",
  },
  {
    id:"putzen-uebermaessig", titel:"Putzt sich übermäßig / kahle Stellen", kurz:"Hat fast immer eine körperliche oder seelische Ursache.",
    ursachen:["Stress/Angst (Übersprungverhalten)","Allergie oder Hautreizung","Parasiten","Schmerz an einer Stelle"],
    wasTun:["Stressquellen reduzieren","Auf Flöhe/Hautveränderungen prüfen","Für Sicherheit und Beschäftigung sorgen"],
    tierarztWarnung:"Kahle Stellen, gereizte Haut oder ständiges Lecken einer Stelle gehören abgeklärt – oft Allergien, Parasiten oder Schmerzen.",
    schweregrad:"achtung",
  },
  {
    id:"pica", titel:"Frisst Pflanzen / Non-Food (Pica)", kurz:"Kann harmlos sein – aber Giftpflanzen sind lebensgefährlich.",
    ursachen:["Langeweile, fehlende Beschäftigung","Faserbedarf/Verdauung","Stress","Bei Wolle/Stoff: oft Stress oder genetische Veranlagung"],
    wasTun:["Giftpflanzen (z. B. Lilien!) komplett aus der Wohnung entfernen","Katzengras als sichere Alternative anbieten","Gefährliche Gegenstände/Fäden wegräumen","Mehr Beschäftigung und Spiel"],
    tierarztWarnung:"WICHTIG: Lilien und viele Zimmerpflanzen sind für Katzen hochgiftig (Nierenversagen). Bei Verdacht auf Aufnahme einer Giftpflanze oder eines Fremdkörpers (Faden!) SOFORT Tierarzt/Klinik.",
    schweregrad:"ernst",
  },
  {
    id:"trinken", titel:"Trinkt auffällig viel oder wenig", kurz:"Veränderte Trinkmenge ist ein wichtiges Gesundheitssignal.",
    ursachen:["Futterart (Trockenfutter → mehr Durst)","Hitze","Krankheit (Niere, Diabetes, Schilddrüse)"],
    wasTun:["Mehrere Wasserstellen anbieten, evtl. Trinkbrunnen","Nassfutteranteil erhöhen","Trinkmenge beobachten/dokumentieren"],
    tierarztWarnung:"Deutlich vermehrtes Trinken (und Urinieren) oder plötzlich kaum Trinken gehört tierärztlich abgeklärt – mögliche Hinweise auf Nieren, Diabetes oder Schilddrüse.",
    schweregrad:"achtung",
  },
  {
    id:"frisst-nicht", titel:"Frisst nicht", kurz:"Bei Katzen ein ernstes Zeichen – sie dürfen nicht lange hungern.",
    ursachen:["Krankheit, Schmerz, Übelkeit","Zahnprobleme","Stress, Futterumstellung"],
    wasTun:["Frische, evtl. angewärmte Lieblingsnahrung anbieten","Stressfreie, ruhige Futterstelle","Dokumentieren, seit wann nichts gefressen wird"],
    tierarztWarnung:"ERNST: Frisst eine Katze länger als ~24 Stunden kaum/nichts, droht gefährliche Leberverfettung. Zeitnah zum Tierarzt – bei zusätzlicher Apathie sofort.",
    schweregrad:"ernst",
  },
  {
    id:"erbrechen", titel:"Erbricht häufig", kurz:"Gelegentliche Haarballen normal – häufiges Erbrechen nicht.",
    ursachen:["Haarballen (gelegentlich normal)","Zu schnelles Fressen","Futterunverträglichkeit","Magen-Darm-, Nieren- u. a. Erkrankungen"],
    wasTun:["Regelmäßig bürsten","Anti-Schling-Napf/kleinere Portionen","Häufigkeit und Aussehen dokumentieren"],
    tierarztWarnung:"Häufiges Erbrechen, Erbrechen mit Apathie, Durchfall, Blut oder Gewichtsverlust gehört abgeklärt. Wiederholtes Erbrechen ist nicht „normal“.",
    schweregrad:"achtung",
  },
  {
    id:"durchfall", titel:"Durchfall oder Verstopfung", kurz:"Verdauungsprobleme genau beobachten.",
    ursachen:["Futterwechsel","Unverträglichkeit/Parasiten","Stress","Zu wenig Flüssigkeit (Verstopfung)"],
    wasTun:["Futter langsam umstellen","Frisches Wasser, ggf. mehr Nassfutter","Symptome und Dauer dokumentieren"],
    tierarztWarnung:"Anhaltender Durchfall (>1–2 Tage), Blut, Apathie oder Austrocknung gehört zum Tierarzt. Verstopfung über mehrere Tage ebenfalls abklären lassen.",
    schweregrad:"achtung",
  },
  {
    id:"zaehne", titel:"Mundgeruch / sabbert / frisst einseitig", kurz:"Oft ein Zahn- oder Maulproblem.",
    ursachen:["Zahnstein, Zahnfleischentzündung","Schmerzhafter Zahn","Fremdkörper im Maul"],
    wasTun:["Fressverhalten beobachten (kaut einseitig? lässt fallen?)","Maulgeruch ernst nehmen","Nicht selbst im Maul hantieren"],
    tierarztWarnung:"Starker Mundgeruch, Sabbern, einseitiges Kauen oder Futterfallenlassen sind Hinweise auf schmerzhafte Zahn-/Maulerkrankungen – tierärztlich untersuchen lassen.",
    schweregrad:"achtung",
  },
  {
    id:"lahmheit", titel:"Humpelt / bewegt sich ungern", kurz:"Katzen verbergen Schmerz – Bewegungsunlust ist ein deutliches Zeichen.",
    ursachen:["Verletzung","Arthrose (v. a. ältere Katzen)","Springt nicht mehr hoch/runter"],
    wasTun:["Sprungstellen mit Rampen/Stufen erleichtern","Weiche, warme Liegeplätze","Bewegung und Auffälligkeiten beobachten"],
    tierarztWarnung:"Humpeln, Sprung-Unlust, Steifheit oder plötzliche Bewegungsunlust gehören abgeklärt – oft Schmerz durch Verletzung oder Arthrose.",
    schweregrad:"achtung",
  },
];
