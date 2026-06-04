// signals.ts — Decoder-Inhalt für Schnurrcode (ERWEITERT)
// =============================================================
// Das WISSEN der App: alle Katzensignale + Kombi-Regeln.
// ⚠️ VOR LAUNCH tierärztlich/verhaltensfachlich gegenchecken.
// Basis: gängige Katzen-Ethologie (Purina, Whiskas, ISFM/Cat
// Friendly, Wikipedia).
// =============================================================

export type Emotion = "positiv" | "neutral" | "anspannung";
export type Kategorie =
  | "schwanz" | "ohren" | "augen" | "koerper" | "laute" | "kontext";

export interface Signal {
  id: string;
  kategorie: Kategorie;
  label: string;
  kurz: string;
  bedeutung: string;
  emotion: Emotion;
  wasTun?: string;
  tierarztFlag?: boolean;
}

export interface KategorieInfo { id: Kategorie; label: string; frage: string; }

export const KATEGORIEN: KategorieInfo[] = [
  { id: "schwanz", label: "Schwanz", frage: "Was macht der Schwanz?" },
  { id: "ohren",   label: "Ohren",   frage: "Wie stehen die Ohren?" },
  { id: "augen",   label: "Augen",   frage: "Wie schauen die Augen?" },
  { id: "koerper", label: "Körper",  frage: "Was macht der Körper?" },
  { id: "laute",   label: "Laute",   frage: "Welchen Laut macht sie?" },
  { id: "kontext", label: "Situation", frage: "In welcher Situation?" },
];

export const SIGNALE: Signal[] = [
  // ───────────── SCHWANZ ─────────────
  { id:"schwanz-aufrecht", kategorie:"schwanz", label:"Aufrecht, Spitze leicht gebogen", kurz:"Begrüßung & Freude.", bedeutung:"Senkrechter Schwanz mit leicht gebogener Spitze ist eines der freundlichsten Signale: Begrüßung, Sicherheit, Freude.", emotion:"positiv", wasTun:"Ruhig zurückbegrüßen, Kontakt anbieten." },
  { id:"schwanz-zittern", kategorie:"schwanz", label:"Aufrecht & zitternd", kurz:"Große Vorfreude.", bedeutung:"Aufrechter, leicht vibrierender Schwanz zeigt starke freudige Erregung, oft bei der Begrüßung. (Unkastriert auch Markieren.)", emotion:"positiv" },
  { id:"schwanz-umwickelt", kategorie:"schwanz", label:"Um den Körper gewickelt", kurz:"Entspannt, in sich ruhend.", bedeutung:"Ordentlich um den Körper gelegter Schwanz im Sitzen: entspannt, aber eher zurückhaltend als kontaktsuchend.", emotion:"neutral" },
  { id:"schwanz-waagrecht", kategorie:"schwanz", label:"Waagrecht / locker getragen", kurz:"Neutral & gelassen.", bedeutung:"Locker waagrecht getragener Schwanz zeigt eine neutrale, gelassene Grundstimmung.", emotion:"neutral" },
  { id:"schwanz-tief", kategorie:"schwanz", label:"Tief / eingezogen", kurz:"Unsicherheit oder Angst.", bedeutung:"Tief gehaltener oder eingezogener Schwanz signalisiert Unsicherheit, Angst oder Unterwerfung.", emotion:"anspannung", wasTun:"Raum und Rückzug geben, nicht aufdrängen." },
  { id:"schwanz-aufgeplustert", kategorie:"schwanz", label:"Aufgeplustert (Flaschenbürste)", kurz:"Schreck oder Angst.", bedeutung:"Aufgeplusterter Schwanz lässt die Katze größer wirken – eine Schreck- oder Angstreaktion.", emotion:"anspannung", wasTun:"Auslöser entfernen, ruhig bleiben." },
  { id:"schwanz-peitschen", kategorie:"schwanz", label:"Peitschen / heftiges Schlagen", kurz:"Gereizt – „lass mich“.", bedeutung:"Schnelles Hin- und Herschlagen zeigt Gereiztheit oder Frust. Deutliches Stopp-Signal.", emotion:"anspannung", wasTun:"Streicheln/Spiel beenden, Abstand geben." },
  { id:"schwanz-zucken", kategorie:"schwanz", label:"Spitze zuckt leicht", kurz:"Konzentration / milde Anspannung.", bedeutung:"Leichtes Zucken der Spitze zeigt Konzentration oder beginnende milde Anspannung – Kontext beachten.", emotion:"neutral" },
  { id:"schwanz-steif", kategorie:"schwanz", label:"Steif aufrecht, ohne Biegung", kurz:"Anspannung oder Drohung.", bedeutung:"Ein steif aufrechter Schwanz ohne die freundliche Biegung kann Anspannung oder eine Drohgebärde sein – im Gegensatz zum begrüßenden Fragezeichen-Schwanz.", emotion:"anspannung" },
  { id:"schwanz-um-mensch", kategorie:"schwanz", label:"Um deinen Arm/Bein gelegt", kurz:"Zuneigung, „du gehörst zu mir“.", bedeutung:"Legt sie den Schwanz um dich, ist das wie ein Arm um die Schulter: Zuneigung und Verbundenheit.", emotion:"positiv" },

  // ───────────── OHREN ─────────────
  { id:"ohren-vorn", kategorie:"ohren", label:"Aufrecht, nach vorn", kurz:"Aufmerksam & entspannt.", bedeutung:"Nach vorn gerichtete Ohren: wach, interessiert, entspannt.", emotion:"positiv" },
  { id:"ohren-seitlich", kategorie:"ohren", label:"Seitlich („Flugzeugohren“)", kurz:"Unsicher oder gereizt.", bedeutung:"Seitlich abgespreizte Ohren zeigen Unsicherheit, Gereiztheit oder inneren Konflikt.", emotion:"anspannung" },
  { id:"ohren-angelegt", kategorie:"ohren", label:"Flach angelegt", kurz:"Angst oder Aggression.", bedeutung:"Flach an den Kopf gelegte Ohren signalisieren starke Angst oder Verteidigungsbereitschaft – andere Signale dazulesen.", emotion:"anspannung", wasTun:"Nicht annähern, Fluchtweg lassen." },
  { id:"ohren-leicht-zurueck", kategorie:"ohren", label:"Leicht nach hinten gedreht", kurz:"Beginnende Gereiztheit.", bedeutung:"Leicht zurückgedrehte Ohren sind ein frühes Warnzeichen: die Stimmung kippt gerade.", emotion:"anspannung", wasTun:"Tempo rausnehmen, beobachten." },
  { id:"ohren-drehen", kategorie:"ohren", label:"Drehen / zucken", kurz:"Wachsam, ortet Geräusche.", bedeutung:"Ständig drehende Ohren bedeuten aufmerksames Abhören der Umgebung.", emotion:"neutral" },
  { id:"ohren-asymmetrisch", kategorie:"ohren", label:"Eins vor, eins zur Seite", kurz:"Multitasking-Aufmerksamkeit.", bedeutung:"Unterschiedlich gerichtete Ohren: die Katze verfolgt zwei Dinge gleichzeitig – wach und neugierig.", emotion:"neutral" },

  // ───────────── AUGEN ─────────────
  { id:"augen-blinzeln", kategorie:"augen", label:"Langsames Blinzeln", kurz:"Zuneigung („Katzenkuss“).", bedeutung:"Langsames Blinzeln ist ein Vertrauens- und Zuneigungsbeweis.", emotion:"positiv", wasTun:"Langsam zurückblinzeln – so sagst du „hab dich auch lieb“." },
  { id:"augen-halbgeschlossen", kategorie:"augen", label:"Halb geschlossen, ruhig", kurz:"Entspannt & zufrieden.", bedeutung:"Halb geschlossene, ruhige Augen: tiefenentspannt und zufrieden.", emotion:"positiv" },
  { id:"augen-pupillen-schmal", kategorie:"augen", label:"Pupillen schmal (Schlitze)", kurz:"Helles Licht ODER Anspannung.", bedeutung:"Schmale Pupillen können helles Licht oder Anspannung/Erregung bedeuten – nur mit Kontext deutbar.", emotion:"neutral" },
  { id:"augen-pupillen-weit", kategorie:"augen", label:"Pupillen weit", kurz:"Aufregung, Spiel oder Angst.", bedeutung:"Weite Pupillen bei Aufregung, Spiel, Angst oder wenig Licht – Kontext entscheidet.", emotion:"neutral" },
  { id:"augen-pupillen-ploetzlich-weit", kategorie:"augen", label:"Plötzlich geweitet", kurz:"Erregungs- oder Angstspitze.", bedeutung:"Schlagartig geweitete Pupillen zeigen einen plötzlichen Reiz: Aufregung, Schreck oder Spielfieber.", emotion:"anspannung" },
  { id:"augen-starren", kategorie:"augen", label:"Starren ohne Blinzeln", kurz:"Herausforderung / Anspannung.", bedeutung:"Starrer Blick ohne Blinzeln wirkt unter Katzen als Herausforderung und zeigt Anspannung.", emotion:"anspannung" },
  { id:"augen-nickhaut", kategorie:"augen", label:"Drittes Augenlid sichtbar", kurz:"Kann Krankheitszeichen sein.", bedeutung:"Ist die weißliche Nickhaut (drittes Augenlid) dauerhaft sichtbar, ist das oft ein Zeichen für Krankheit, Schmerz oder starken Stress.", emotion:"anspannung", tierarztFlag:true, wasTun:"Bei dauerhaft sichtbarer Nickhaut tierärztlich abklären lassen." },

  // ───────────── KÖRPER ─────────────
  { id:"koerper-koepfchen", kategorie:"koerper", label:"Köpfchengeben (Bunting)", kurz:"Markiert dich – Vertrauen.", bedeutung:"Kopf-Anstupsen markiert dich mit ihrem Duft als „ihren Menschen“ – starkes Vertrauenszeichen.", emotion:"positiv" },
  { id:"koerper-kneten", kategorie:"koerper", label:"Kneten („Milchtritt“)", kurz:"Wohlgefühl & Bindung.", bedeutung:"Rhythmisches Pfotentreten stammt aus der Kittenzeit und zeigt tiefes Wohlbefinden.", emotion:"positiv" },
  { id:"koerper-bauch", kategorie:"koerper", label:"Bauch zeigen", kurz:"Vertrauen – meist KEINE Krauleinladung.", bedeutung:"Bauch zeigen ist großer Vertrauensbeweis, aber meist keine Einladung zum Bauchkraulen.", emotion:"positiv", wasTun:"Vertrauen genießen, Bauch lieber nicht anfassen." },
  { id:"koerper-reiben", kategorie:"koerper", label:"An Beinen reiben", kurz:"Begrüßung & Markierung.", bedeutung:"Reiben an deinen Beinen ist Begrüßung und Duftmarkierung – sie bezieht dich in ihre Gruppe ein.", emotion:"positiv" },
  { id:"koerper-po", kategorie:"koerper", label:"Po / Schwanzbasis hinstrecken", kurz:"„Kraul mich.“", bedeutung:"Entgegengestreckte Schwanzbasis ist Aufforderung zum Kraulen und Zuneigung.", emotion:"positiv" },
  { id:"koerper-anschleichen", kategorie:"koerper", label:"Anschleichen, Hinterteil wackelt", kurz:"Spiel-/Jagdmodus.", bedeutung:"Geducktes Anschleichen mit wackelndem Hinterteil ist Vorbereitung auf den Spiel-/Jagdsprung.", emotion:"neutral", wasTun:"Spielzeug anbieten – jetzt will sie jagen." },
  { id:"koerper-buckel", kategorie:"koerper", label:"Katzenbuckel, seitlich gedreht", kurz:"Spiel oder Drohung – Kontext!", bedeutung:"Aufgewölbter Rücken seitlich: Spielaufforderung ODER Drohung. Ohren/Laute entscheiden.", emotion:"anspannung" },
  { id:"koerper-putzen-bei-dir", kategorie:"koerper", label:"Putzt sich neben dir", kurz:"Fühlt sich sicher.", bedeutung:"Sich in deiner Nähe ausgiebig zu putzen heißt: sie fühlt sich entspannt und sicher bei dir.", emotion:"positiv" },
  { id:"koerper-gaehnen", kategorie:"koerper", label:"Gähnen & Strecken", kurz:"Entspannt & wohlig.", bedeutung:"Genüssliches Gähnen und Strecken zeigt eine entspannte, sich wohlfühlende Katze.", emotion:"positiv" },
  { id:"koerper-loaf", kategorie:"koerper", label:"Brotlaib-Position (Pfoten eingeklappt)", kurz:"Entspannt, aber wachsam.", bedeutung:"Die „Brotlaib“-Haltung mit eingeklappten Pfoten zeigt eine ruhige Katze, die dennoch jederzeit aufstehen könnte.", emotion:"neutral" },
  { id:"koerper-seitlich-liegen", kategorie:"koerper", label:"Seitlich gestreckt liegen", kurz:"Tiefe Entspannung.", bedeutung:"Seitlich ausgestreckt mit lockeren Beinen: tiefe Entspannung und Geborgenheit.", emotion:"positiv" },
  { id:"koerper-rollen", kategorie:"koerper", label:"Rollt sich vor dir am Boden", kurz:"Begrüßung & Vertrauen.", bedeutung:"Sich vor dir auf den Rücken zu rollen ist eine vertrauensvolle Begrüßung – kein Befehl zum Bauchkraulen.", emotion:"positiv" },
  { id:"koerper-ruecken-zudrehen", kategorie:"koerper", label:"Dreht dir den Rücken zu", kurz:"Vertrauen, nicht Ablehnung!", bedeutung:"Dir den Rücken zuzuwenden ist meist KEIN Beleidigtsein, sondern Vertrauen: sie fühlt sich sicher genug, dich nicht im Blick zu behalten.", emotion:"positiv" },
  { id:"koerper-schoss", kategorie:"koerper", label:"Springt auf den Schoß", kurz:"Sucht Nähe & Wärme.", bedeutung:"Auf den Schoß zu kommen ist aktives Nähesuchen und ein Zeichen von Bindung.", emotion:"positiv" },
  { id:"koerper-geschenk", kategorie:"koerper", label:"Bringt Beute / Spielzeug", kurz:"Geschenk oder „Lektion“.", bedeutung:"Beute oder Spielzeug zu bringen kann ein Geschenk, Teilen oder „Jagdunterricht“ sein – ein soziales, zugewandtes Verhalten.", emotion:"positiv", wasTun:"Ruhig annehmen/loben, nicht schimpfen." },

  // ───────────── LAUTE ─────────────
  { id:"laute-miauen", kategorie:"laute", label:"Miauen", kurz:"An dich gerichtet.", bedeutung:"Erwachsene Katzen miauen fast nur mit Menschen: Forderung, Begrüßung, Wunsch nach Aufmerksamkeit.", emotion:"neutral" },
  { id:"laute-kurzes-miau", kategorie:"laute", label:"Kurzes, hohes „Miau“", kurz:"Freundliche Begrüßung.", bedeutung:"Ein kurzes, hell klingendes Miau ist meist ein freundliches „Hallo“.", emotion:"positiv" },
  { id:"laute-langes-miau", kategorie:"laute", label:"Langgezogenes, drängendes Miau", kurz:"Nachdrückliche Forderung.", bedeutung:"Je länger und drängender, desto nachdrücklicher die Forderung – Futter, Tür, Aufmerksamkeit.", emotion:"neutral" },
  { id:"laute-schnurren", kategorie:"laute", label:"Schnurren", kurz:"Meist Wohlbefinden – nicht immer!", bedeutung:"Schnurren steht meist für Zufriedenheit, dient aber auch der Selbstberuhigung bei Stress oder Schmerz. Kontext und übrige Signale beachten.", emotion:"neutral" },
  { id:"laute-solicitation", kategorie:"laute", label:"Schnurren mit eingestreutem Maunzen", kurz:"Drängendes „gib mir was“.", bedeutung:"Schnurren, in das ein hohes Maunzen eingewoben ist, ist ein gezieltes Forderungssignal (oft morgens, ums Futter).", emotion:"neutral" },
  { id:"laute-gurren", kategorie:"laute", label:"Gurren / Trillern („Brrt?“)", kurz:"Freundliche Begrüßung.", bedeutung:"Gurrendes Trillern ist freundliche Begrüßung oder Einladung zu folgen – durchweg positiv.", emotion:"positiv" },
  { id:"laute-schnattern", kategorie:"laute", label:"Zwitschern / Schnattern (am Fenster)", kurz:"Jagderregung / Frust.", bedeutung:"Schnatterndes „Ekekek“ zeigt Jagderregung, oft Frust über unerreichbare Beute.", emotion:"neutral" },
  { id:"laute-fauchen", kategorie:"laute", label:"Fauchen", kurz:"Warnung: „Geh weg.“", bedeutung:"Fauchen ist klare Warnung aus Angst oder Bedrängnis: „Halt Abstand.“", emotion:"anspannung", wasTun:"Sofort Abstand, nicht festhalten oder strafen." },
  { id:"laute-knurren", kategorie:"laute", label:"Knurren", kurz:"Ernste Warnung.", bedeutung:"Knurren ist eine ernste Warnung – die Katze fühlt sich bedroht und ist verteidigungsbereit.", emotion:"anspannung", wasTun:"Situation entschärfen, Abstand, Ruhe." },
  { id:"laute-heulen", kategorie:"laute", label:"Langgezogenes Heulen / Jaulen", kurz:"Stress, Revier – oder medizinisch.", bedeutung:"Langes Heulen kann Stress, Revier oder (unkastriert) Paarung sein. Bei älteren Katzen, v. a. nachts, mögliche medizinische Ursache.", emotion:"anspannung", tierarztFlag:true, wasTun:"Bei häufigem/nächtlichem Heulen ohne Grund: Tierarzt." },
  { id:"laute-schmerzschrei", kategorie:"laute", label:"Plötzlicher, lauter Schmerzschrei", kurz:"Akuter Schmerz/Schreck.", bedeutung:"Ein plötzlicher, scharfer Schrei signalisiert akuten Schmerz oder großen Schreck.", emotion:"anspannung", tierarztFlag:true, wasTun:"Auf Verletzung/Schmerz prüfen, im Zweifel Tierarzt." },
  { id:"laute-zaehneklappern", kategorie:"laute", label:"Zähneklappern / Schmatzen", kurz:"Jagdfrust oder Vorfreude.", bedeutung:"Schnelles Kieferklappern tritt oft bei Beute-Sichtung auf: eine Mischung aus Erregung und Frust.", emotion:"neutral" },

  // ───────────── KONTEXT ─────────────
  { id:"kontext-napf", kategorie:"kontext", label:"Am Futternapf", kurz:"Dreht sich ums Fressen.", bedeutung:"Hier geht es meist um Futter, Hunger oder Routine.", emotion:"neutral" },
  { id:"kontext-fenster", kategorie:"kontext", label:"Am Fenster", kurz:"Beobachten & Jagen.", bedeutung:"Am Fenster dreht sich vieles um Beobachten, Jagdtrieb und manchmal Frust.", emotion:"neutral" },
  { id:"kontext-tuer", kategorie:"kontext", label:"An der Tür / wenn du heimkommst", kurz:"Begrüßung & Wiedersehen.", bedeutung:"Verhalten an der Tür ist meist Begrüßung – Freude über deine Rückkehr.", emotion:"positiv" },
  { id:"kontext-streicheln", kategorie:"kontext", label:"Beim Streicheln", kurz:"Achte auf Reizgrenzen.", bedeutung:"Beim Streicheln zählt das Erkennen früher Stopp-Signale, bevor es zu viel wird.", emotion:"neutral" },
  { id:"kontext-spiel", kategorie:"kontext", label:"Beim Spielen", kurz:"Energie & Jagdtrieb.", bedeutung:"Im Spiel zeigt sie Jagdverhalten – weite Pupillen und Anschleichen sind normal und positiv.", emotion:"positiv" },
  { id:"kontext-tierarzt", kategorie:"kontext", label:"Beim Tierarzt / im Transport", kurz:"Stress ist normal.", bedeutung:"Anspannung, Verstecken und Stress-Schnurren sind hier normal – nicht mit Wohlbefinden verwechseln.", emotion:"anspannung" },
  { id:"kontext-nachts", kategorie:"kontext", label:"Nachts", kurz:"Aktivität, Hunger, Langeweile.", bedeutung:"Nächtliche Aktivität ist oft natürlich, kann aber auf Langeweile, Hunger oder bei alten Katzen auf Gesundheit hinweisen.", emotion:"neutral" },
  { id:"kontext-besuch", kategorie:"kontext", label:"Wenn Besuch da ist", kurz:"Unsicherheit oder Neugier.", bedeutung:"Fremde Menschen lösen je nach Katze Rückzug oder Neugier aus – beides ist normal.", emotion:"neutral" },
  { id:"kontext-laerm", kategorie:"kontext", label:"Bei Lärm (Gewitter, Feuerwerk)", kurz:"Angst-Situation.", bedeutung:"Laute, unvorhersehbare Geräusche sind eine typische Angst-Situation.", emotion:"anspannung", wasTun:"Sicheres Versteck anbieten, ruhig bleiben." },
  { id:"kontext-neue-katze", kategorie:"kontext", label:"Neues Tier im Haushalt", kurz:"Revier & Konkurrenz.", bedeutung:"Ein neues Tier bedeutet Stress um Revier und Ressourcen – Spannungen sind anfangs normal.", emotion:"anspannung" },
  { id:"kontext-tragen", kategorie:"kontext", label:"Beim Hochheben / Tragen", kurz:"Kontrolle ist wichtig.", bedeutung:"Viele Katzen mögen Hochheben nur, wenn der ganze Körper gestützt ist und sie Kontrolle behalten.", emotion:"neutral" },
];

// ─────────────── KOMBI-REGELN ───────────────
export interface KombiRegel {
  id: string;
  wenn: string[];
  emotion: Emotion;
  deutung: string;
  wasTun: string;
  tierarztFlag?: boolean;
}

export const KOMBINATIONEN: KombiRegel[] = [
  { id:"kombi-gereizt", wenn:["schwanz-peitschen","ohren-angelegt"], emotion:"anspannung", deutung:"Stark gereizt und kurz davor, sich zu wehren – ein deutliches „Schluss jetzt“.", wasTun:"Sofort aufhören, Abstand geben." },
  { id:"kombi-bindung", wenn:["augen-blinzeln","laute-schnurren","koerper-kneten"], emotion:"positiv", deutung:"Tiefes Wohlbefinden und Bindung – sie fühlt sich komplett sicher und geliebt.", wasTun:"Moment genießen, langsam zurückblinzeln." },
  { id:"kombi-spiel", wenn:["augen-pupillen-weit","koerper-anschleichen"], emotion:"neutral", deutung:"Voller Spielmodus – im Jagdfieber.", wasTun:"Spielzeug holen, jagen lassen." },
  { id:"kombi-angst", wenn:["schwanz-aufgeplustert","laute-fauchen"], emotion:"anspannung", deutung:"Akute Angst – fühlt sich bedroht und will sich verteidigen.", wasTun:"Nicht bedrängen, Fluchtweg lassen, Auslöser entfernen." },
  { id:"kombi-jagdfrust", wenn:["laute-schnattern","kontext-fenster"], emotion:"neutral", deutung:"Jagderregung mit Frust: sieht Beute, kommt nicht ran.", wasTun:"Jagdspiel anbieten, Trieb ausleben lassen." },
  { id:"kombi-futter", wenn:["laute-miauen","kontext-napf"], emotion:"neutral", deutung:"Klare Futterforderung.", wasTun:"Fütterungszeiten prüfen; nicht jedes Maunzen belohnen." },
  { id:"kombi-vertrauen", wenn:["koerper-bauch","augen-blinzeln"], emotion:"positiv", deutung:"Tiefes Vertrauen – fühlt sich absolut sicher.", wasTun:"Vertrauen würdigen, Bauch nicht anfassen." },
  { id:"kombi-stressschnurren", wenn:["laute-schnurren","kontext-tierarzt"], emotion:"anspannung", deutung:"Das Schnurren ist hier Selbstberuhigung, kein Wohlbefinden.", wasTun:"Ruhe geben; mit der Praxis sanftere Abläufe besprechen." },
  { id:"kombi-begruessung", wenn:["schwanz-aufrecht","kontext-tuer"], emotion:"positiv", deutung:"Freudige Begrüßung – sie freut sich, dass du da bist.", wasTun:"Ruhig zurückbegrüßen, Aufmerksamkeit schenken." },
  { id:"kombi-spielhallo", wenn:["laute-gurren","schwanz-aufrecht"], emotion:"positiv", deutung:"Freundliches „Hallo, komm mit“ – Einladung zu Kontakt oder Spiel.", wasTun:"Folgen, Kontakt oder Spiel anbieten." },
  { id:"kombi-reizgrenze", wenn:["kontext-streicheln","schwanz-zucken"], emotion:"anspannung", deutung:"Reizgrenze fast erreicht – gleich wird es zu viel.", wasTun:"Streicheln jetzt beenden, bevor es kippt." },
  { id:"kombi-petting-bite", wenn:["kontext-streicheln","ohren-leicht-zurueck","schwanz-peitschen"], emotion:"anspannung", deutung:"Klassische Vorboten des Streichel-Bisses.", wasTun:"Sofort aufhören, Hand ruhig wegnehmen." },
  { id:"kombi-tiefenentspannung", wenn:["koerper-seitlich-liegen","augen-halbgeschlossen"], emotion:"positiv", deutung:"Tiefenentspannung und Geborgenheit.", wasTun:"In Ruhe lassen oder sanft Gesellschaft leisten." },
  { id:"kombi-laerm-angst", wenn:["kontext-laerm","schwanz-tief","augen-pupillen-weit"], emotion:"anspannung", deutung:"Deutliche Angst durch Lärm.", wasTun:"Sicheres Versteck anbieten, ruhig bleiben, nicht aufdrängen." },
  { id:"kombi-drohung", wenn:["augen-starren","ohren-angelegt","laute-knurren"], emotion:"anspannung", deutung:"Ernste Drohung – fühlt sich stark bedroht.", wasTun:"Blickkontakt lösen, langsam zurückziehen." },
  { id:"kombi-jagdfieber", wenn:["augen-pupillen-ploetzlich-weit","laute-zaehneklappern","kontext-fenster"], emotion:"neutral", deutung:"Maximales Jagdfieber bei Beute-Sichtung.", wasTun:"Jagdspiel anbieten, Energie kanalisieren." },
  { id:"kombi-morgens-futter", wenn:["laute-solicitation","kontext-nachts"], emotion:"neutral", deutung:"Drängendes Wecken, meist ums Futter (typisch früh morgens).", wasTun:"Späten Futterautomaten testen; Aufstehen nicht belohnen." },
  { id:"kombi-mehrkatzen-spannung", wenn:["kontext-neue-katze","ohren-seitlich","schwanz-peitschen"], emotion:"anspannung", deutung:"Spannung gegenüber dem neuen Tier.", wasTun:"Schritt zurück bei der Zusammenführung, Ressourcen trennen." },
  { id:"kombi-krank-warnung", wenn:["augen-nickhaut","koerper-loaf","laute-heulen"], emotion:"anspannung", deutung:"Mehrere mögliche Krankheitszeichen zusammen – ernst nehmen.", wasTun:"Zeitnah tierärztlich abklären lassen.", tierarztFlag:true },
  { id:"kombi-geschenk", wenn:["koerper-geschenk","laute-gurren"], emotion:"positiv", deutung:"Stolze, zugewandte Geste – sie teilt „Beute“ mit dir.", wasTun:"Ruhig annehmen und loben, niemals schimpfen." },
];
