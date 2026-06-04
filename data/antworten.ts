// antworten.ts — Zwei-Wege-Kommunikation für Schnurrcode
// =============================================================
// DAS HERZSTÜCK DER DIFFERENZIERUNG: Wie DU als Mensch mit deiner
// Katze kommunizierst und ihr "antwortest". Nicht nur verstehen —
// zurücksprechen.
//
// ⚠️ Vor Launch tierärztlich/verhaltensfachlich gegenchecken.
// Basis: gängige Katzen-Ethologie & Verhaltensberatung (ISFM/Cat
// Friendly, Humphrey et al. 2020 zum Slow-Blink, Purina).
// =============================================================

export type AntwortKategorie =
  | "naehe"        // Zuneigung zeigen
  | "respekt"      // Grenzen & Vertrauen
  | "alltag"       // Routine, Spiel, Erziehung
  | "konflikt";    // Stress, "Nein", Mehrkatzen

export interface AntwortInfo {
  id: AntwortKategorie;
  label: string;
}

export const ANTWORT_KATEGORIEN: AntwortInfo[] = [
  { id: "naehe",    label: "Zuneigung zeigen" },
  { id: "respekt",  label: "Grenzen & Vertrauen" },
  { id: "alltag",   label: "Alltag, Spiel & Erziehung" },
  { id: "konflikt", label: "Stress & Konflikte" },
];

export interface Antwort {
  id: string;
  kategorie: AntwortKategorie;
  titel: string;
  worumGehts: string;     // 1-2 Sätze: was ist das
  warumWirkt: string;     // warum die Katze darauf reagiert
  soMachstDu: string[];   // konkrete Schritte
  haeufigerFehler: string;// was die meisten falsch machen
}

export const ANTWORTEN: Antwort[] = [
  // ───────────────────────── NÄHE ─────────────────────────
  {
    id: "slow-blink",
    kategorie: "naehe",
    titel: "Den Katzenkuss zurückgeben (Slow Blink)",
    worumGehts:
      "Das langsame Blinzeln ist die Liebeserklärung deiner Katze. Du kannst es bewusst erwidern — und damit auf ihrer Sprache „Ich hab dich auch lieb“ sagen.",
    warumWirkt:
      "Ein langsamer, weicher Blick signalisiert Katzen Entspannung und friedliche Absicht. Starren bedeutet Bedrohung — langsames Blinzeln das Gegenteil. Studien zeigen, dass Katzen Menschen, die zurückblinzeln, als angenehmer empfinden.",
    soMachstDu: [
      "Schau deine Katze ruhig und entspannt an, ohne zu starren",
      "Entspann dein Gesicht, kein angespannter Blick",
      "Schließe die Augen langsam für ein bis zwei Sekunden",
      "Öffne sie genauso langsam wieder",
      "Warte ab — oft blinzelt sie zurück. Das ist die Antwort.",
    ],
    haeufigerFehler:
      "Zu intensiv und direkt starren statt weich zu blicken — das wirkt auf Katzen bedrohlich, nicht liebevoll.",
  },
  {
    id: "stimme",
    kategorie: "naehe",
    titel: "Die richtige Stimme & ihr Name",
    worumGehts:
      "Wie du sprichst, ist für deine Katze wichtiger als was du sagst. Tonlage und Konstanz schaffen Vertrauen.",
    warumWirkt:
      "Katzen reagieren besonders auf höhere, sanfte „an die Katze gerichtete“ Stimmen und erkennen ihren Namen an der vertrauten Melodie. Eine ruhige Stimme beruhigt, eine laute oder scharfe verschreckt.",
    soMachstDu: [
      "Sprich in höherer, weicher Tonlage, ähnlich wie mit einem Baby",
      "Nutze ihren Namen konsequent, immer gleich betont",
      "Verknüpfe den Namen mit Schönem (Futter, Streicheln) statt mit Schimpfen",
      "Bleib leise und ruhig, auch wenn etwas schiefgeht",
    ],
    haeufigerFehler:
      "Den Namen zum Schimpfen benutzen — dann verknüpft die Katze ihn mit etwas Negativem und reagiert nicht mehr darauf.",
  },
  {
    id: "begruessung",
    kategorie: "naehe",
    titel: "Richtig begrüßen (der Nasen-Gruß)",
    worumGehts:
      "Katzen begrüßen sich, indem sie die Nasen aneinander berühren. Du kannst das mit dem Finger nachahmen — eine Einladung in ihrer Sprache.",
    warumWirkt:
      "Ein hingehaltener Finger auf Nasenhöhe imitiert die Nase einer anderen Katze. Die Katze entscheidet selbst, ob sie schnuppert und sich reibt — das gibt ihr Kontrolle und baut Vertrauen auf.",
    soMachstDu: [
      "Geh in die Hocke, mach dich kleiner statt über sie zu ragen",
      "Strecke ruhig einen Finger auf Höhe ihrer Nase aus",
      "Warte ab, lass sie schnuppern und entscheiden",
      "Reibt sie sich daran, darfst du sanft Wange oder Kopf kraulen",
    ],
    haeufigerFehler:
      "Die Hand von oben auf den Kopf zubewegen — das wirkt wie ein Greifer und macht vielen Katzen Angst.",
  },
  {
    id: "streicheln-konsent",
    kategorie: "naehe",
    titel: "Streicheln mit Einverständnis",
    worumGehts:
      "Nicht jede Stelle und nicht jeder Moment ist willkommen. Mit dem „Konsent-Test“ streichelst du nur, wenn sie es wirklich will.",
    warumWirkt:
      "Katzen mögen meist Wangen, Kinn, Kopf und Hals — Bauch, Pfoten und Schwanzbasis dagegen oft nicht. Wer die Katze wählen lässt, vermeidet Überreizung und das berüchtigte „Streichel-Beißen“.",
    soMachstDu: [
      "Bevorzuge Wangen, Kinn, hinter den Ohren und entlang des Rückens",
      "Meide Bauch, Pfoten und Schwanzansatz, außer sie zeigt, dass sie es mag",
      "Konsent-Test: hör nach ein paar Streicheleinheiten kurz auf — stupst sie dich an, will sie mehr; geht sie weg, war's genug",
      "Achte auf Stopp-Signale: Schwanzzucken, Hautzucken, angelegte Ohren",
    ],
    haeufigerFehler:
      "Weiterstreicheln, obwohl die Katze schon Stopp-Signale sendet — das führt direkt zum Abwehrbiss und untergräbt Vertrauen.",
  },

  // ───────────────────────── RESPEKT ─────────────────────────
  {
    id: "koerpersprache",
    kategorie: "respekt",
    titel: "Deine Körpersprache lesbar machen",
    worumGehts:
      "Dein Körper sagt der Katze mehr als deine Worte. Kleine Anpassungen wirken auf sie einladend statt bedrohlich.",
    warumWirkt:
      "Über der Katze aufragen, direkte schnelle Bewegungen und starrer Blick wirken bedrohlich. Wer sich klein macht, langsam bewegt und seitlich zuwendet, signalisiert Friedlichkeit.",
    soMachstDu: [
      "Geh in die Hocke oder setz dich, statt über sie zu ragen",
      "Beweg dich langsam und vorhersehbar",
      "Dreh dich leicht seitlich zu ihr statt frontal",
      "Vermeide langes direktes Anstarren — blinzle stattdessen",
    ],
    haeufigerFehler:
      "Sich von oben über die Katze beugen und sie fixieren — die klassische „Bedrohungshaltung“ aus Katzensicht.",
  },
  {
    id: "grenzen",
    kategorie: "respekt",
    titel: "Grenzen & Rückzug respektieren",
    worumGehts:
      "Eine Katze, die gehen darf, kommt lieber wieder. Rückzug zu gewähren ist eine der stärksten Vertrauensbotschaften.",
    warumWirkt:
      "Katzen brauchen Kontrolle über Nähe und Distanz. Wer Rückzugsorte respektiert und nie nachsetzt, wird als sicher erlebt — die Katze sucht dann von selbst mehr Nähe.",
    soMachstDu: [
      "Schaff erhöhte, ruhige Rückzugsorte, die immer tabu sind",
      "Hol die Katze nie aus ihrem Versteck oder vom Schlafplatz",
      "Lass sie immer einen Fluchtweg haben",
      "Akzeptiere ein „Nein“ (Weggehen, Ohren, Schwanz) sofort",
    ],
    haeufigerFehler:
      "Die Katze festhalten oder „nur noch kurz“ streicheln, obwohl sie weg will — das kostet Vertrauen.",
  },
  {
    id: "hochheben",
    kategorie: "respekt",
    titel: "Richtig hochheben & tragen",
    worumGehts:
      "Viele Katzen hassen es, hochgehoben zu werden — meist, weil es falsch gemacht wird und ihnen den Boden unter den Pfoten nimmt.",
    warumWirkt:
      "Sicherheit entsteht durch Unterstützung des ganzen Körpers. Hängende Beine und plötzliches Hochreißen lösen Panik und Kontrollverlust aus.",
    soMachstDu: [
      "Kündige es an: kurz ansprechen, sanft berühren",
      "Eine Hand unter die Brust, die andere stützt das Hinterteil",
      "Halte sie nah am Körper, alle vier Beine gestützt",
      "Setz sie sanft ab, bevor sie zappelt — nicht erst danach",
    ],
    haeufigerFehler:
      "Unter den Achseln hochziehen, sodass der Körper hängt — das fühlt sich für die Katze unsicher und unangenehm an.",
  },

  // ───────────────────────── ALLTAG ─────────────────────────
  {
    id: "spiel-als-sprache",
    kategorie: "alltag",
    titel: "Spielen als Kommunikation",
    worumGehts:
      "Spiel ist für die Katze eine ganze Unterhaltung — und dein wichtigstes Werkzeug für Bindung und Ausgeglichenheit.",
    warumWirkt:
      "Spiel bildet die Jagdsequenz nach: anschleichen, jagen, fangen, „töten“. Wird sie vollständig durchlaufen, ist die Katze befriedigt und ausgeglichen — das beugt vielen Problemen vor.",
    soMachstDu: [
      "Beweg das Spielzeug wie echte Beute: ruckartig, weg von der Katze, mal versteckt",
      "Lass sie zwischendurch erfolgreich „fangen“, nicht nur hinterherjagen",
      "Beende das Spiel mit einem Fang und danach einer kleinen Mahlzeit (Jagen-Fangen-Fressen-Schlafen)",
      "Lieber zwei kurze Einheiten täglich als eine lange",
    ],
    haeufigerFehler:
      "Mit den Händen spielen — das bringt der Katze bei, dass Hände Beute sind, und führt zu Kratzen und Beißen.",
  },
  {
    id: "routine",
    kategorie: "alltag",
    titel: "Routine als Sicherheit",
    worumGehts:
      "Vorhersehbarkeit ist für Katzen kein Luxus, sondern Sicherheit. Feste Abläufe senken Stress spürbar.",
    warumWirkt:
      "Katzen sind Gewohnheitstiere. Verlässliche Fütterungs-, Spiel- und Ruhezeiten geben ihnen ein Gefühl von Kontrolle über ihre Welt — das beugt Stressverhalten vor.",
    soMachstDu: [
      "Füttere zu möglichst gleichen Zeiten",
      "Bau feste kleine Rituale ein (Begrüßung, Abendspiel)",
      "Führe Veränderungen (neues Futter, Möbel) langsam ein",
      "Halte Ressourcen (Klo, Wasser, Schlafplatz) am gewohnten Ort",
    ],
    haeufigerFehler:
      "Fütterungs- und Spielzeiten ständig wechseln — das erzeugt unnötigen Stress und oft nächtliches Maunzen.",
  },
  {
    id: "belohnen-statt-strafen",
    kategorie: "alltag",
    titel: "Belohnen statt strafen",
    worumGehts:
      "Katzen lernen über positive Erfahrungen, nicht über Strafe. Strafe macht alles schlimmer.",
    warumWirkt:
      "Strafe (Anschreien, Wasserspritze, Nase reindrücken) erzeugt Angst und Misstrauen, ohne das Verhalten zu erklären. Die Katze lernt nur: „In deiner Nähe passiert Schlimmes.“ Belohnung lenkt Verhalten gezielt.",
    soMachstDu: [
      "Belohne erwünschtes Verhalten sofort (Leckerli, Lob, Streicheln)",
      "Ignoriere unerwünschtes Verhalten, das auf Aufmerksamkeit zielt",
      "Lenk um: bietet eine erlaubte Alternative an (Kratzbaum statt Sofa)",
      "Sei geduldig und konsequent — Katzen lernen schrittweise",
    ],
    haeufigerFehler:
      "Strafen, oft auch noch verspätet — die Katze verknüpft die Strafe nicht mit der Tat, sondern mit dir.",
  },
  {
    id: "nein-sagen",
    kategorie: "alltag",
    titel: "„Nein“ sagen ohne Strafe",
    worumGehts:
      "Du kannst Grenzen setzen, ohne deiner Katze Angst zu machen — durch Umlenken und Konsequenz statt Bestrafung.",
    warumWirkt:
      "Katzen reagieren nicht auf „Nein“ wie Hunde. Was wirkt: das unerwünschte Verhalten unattraktiv machen und gleichzeitig eine bessere Alternative bieten.",
    soMachstDu: [
      "Mach den unerwünschten Ort unattraktiv (Folie, Geruch), nicht die Katze ängstlich",
      "Biete sofort eine erlaubte Alternative an und belohne deren Nutzung",
      "Sei konsequent: was einmal verboten ist, bleibt verboten",
      "Unterbrich Verhalten neutral (Geräusch), ohne die Katze direkt zu strafen",
    ],
    haeufigerFehler:
      "Mal erlauben, mal verbieten — Inkonsequenz verwirrt die Katze und das Verhalten bleibt.",
  },

  // ───────────────────────── KONFLIKT ─────────────────────────
  {
    id: "stress-beruhigen",
    kategorie: "konflikt",
    titel: "Eine gestresste Katze beruhigen",
    worumGehts:
      "Bei Angst (Gewitter, Besuch, Tierarzt) kannst du nicht „wegtrösten“ — aber du kannst Sicherheit ausstrahlen.",
    warumWirkt:
      "Katzen übernehmen Ruhe oder Anspannung ihres Menschen. Aufdringliches Trösten verstärkt den Stress; ruhige Präsenz und Rückzugsmöglichkeiten reduzieren ihn.",
    soMachstDu: [
      "Bleib selbst ruhig und leise, hektik vermeiden",
      "Biete ein sicheres Versteck an (Höhle, erhöhter Platz)",
      "Dräng dich nicht auf — sei einfach ruhig in der Nähe",
      "Pheromon-Stecker (z. B. Feliway) bei wiederkehrendem Stress testen",
    ],
    haeufigerFehler:
      "Die ängstliche Katze hochnehmen und festhalten „zum Trösten“ — das nimmt ihr die Kontrolle und verstärkt die Angst.",
  },
  {
    id: "mehrkatzen",
    kategorie: "konflikt",
    titel: "Frieden zwischen mehreren Katzen",
    worumGehts:
      "Spannungen im Mehrkatzenhaushalt entstehen meist um Ressourcen. Du kannst die Lage über die Umgebung entschärfen.",
    warumWirkt:
      "Katzen teilen ungern. Genug verteilte Ressourcen und langsame, geruchsbasierte Gewöhnung verhindern Konkurrenz und Konflikte.",
    soMachstDu: [
      "Ressourcen vervielfachen und verteilen: Klos (eins pro Katze + eins), Wasser, Futter, Schlafplätze",
      "Vertikalen Raum schaffen (Regale, Bäume) — mehr Platz in der Höhe",
      "Neue Katzen langsam einführen: erst Geruch tauschen, dann Sichtkontakt, dann gemeinsam",
      "Positive gemeinsame Erlebnisse schaffen (gleichzeitig füttern in Abstand)",
    ],
    haeufigerFehler:
      "Zwei fremde Katzen sofort zusammen in einen Raum setzen — das brennt sich als negative erste Begegnung ein.",
  },
];
