// szenarien.ts — Alltags-Szenarien für Schnurrcode
// =============================================================
// Das Praxis-Herzstück: typische Alltagssituationen, in denen
// VERSTEHEN (was sie sagt) und ANTWORTEN (was du tust) zusammen-
// kommen. Genau die Momente, die Menschen wirklich googeln.
//
// ⚠️ Vor Launch fachlich gegenchecken. "kein Tierarzt-Ersatz".
// =============================================================

export interface Szenario {
  id: string;
  titel: string;
  situation: string;       // die Alltagssituation
  wasSieSagt: string;      // Deutung aus Katzensicht
  soAntwortest: string[];  // konkrete Reaktion des Menschen
  tipp: string;            // ein prägnanter Geheimtipp
  tierarztHinweis?: string; // optional, wenn relevant
}

export const SZENARIEN: Szenario[] = [
  {
    id:"weckt-5-uhr",
    titel:"Sie weckt dich um 5 Uhr morgens",
    situation:"Maunzen, Pfötchen ins Gesicht, über dich laufen – jeden Morgen viel zu früh.",
    wasSieSagt:"„Ich hab Hunger / Langeweile, und du bist meine Lösung.“ Katzen sind in der Dämmerung von Natur aus aktiv, und sie hat gelernt, dass Wecken funktioniert.",
    soAntwortest:[
      "Reagiere NICHT aufs Wecken – kein Aufstehen, kein Füttern, kein Schimpfen (auch Schimpfen ist Aufmerksamkeit)",
      "Spiel sie abends müde und füttere die Hauptmahlzeit spät (Jagen-Fressen-Schlafen)",
      "Stell einen Futterautomaten auf eine frühe Uhrzeit – dann bist nicht du die Futterquelle",
      "Sei konsequent: ein einziges Nachgeben setzt das Training zurück",
    ],
    tipp:"Der Futterautomat ist der Gamechanger: Er trennt „Hunger“ von „Mensch wecken“.",
    tierarztHinweis:"Plötzlich neues, intensives Frühwecken bei älteren Katzen ggf. abklären (Schilddrüse, Demenz).",
  },
  {
    id:"heimkommen",
    titel:"Du kommst nach Hause",
    situation:"Sie wartet an der Tür, Schwanz hoch, reibt sich an deinen Beinen, maunzt.",
    wasSieSagt:"„Schön, dass du wieder da bist – du gehörst zu mir.“ Aufrechter Schwanz und Reiben sind Begrüßung und Duftmarkierung.",
    soAntwortest:[
      "Begrüße sie ruhig auf ihrer Höhe, geh in die Hocke",
      "Streck einen Finger zum Nasen-Gruß hin",
      "Sanftes Kraulen an Wange/Kinn, wenn sie sich reibt",
      "Ein paar Minuten Aufmerksamkeit, bevor du im Alltag verschwindest",
    ],
    tipp:"Eine feste kleine Begrüßungsroutine gibt ihr Sicherheit und stärkt eure Bindung.",
  },
  {
    id:"bauch-zeigen",
    titel:"Sie rollt sich hin und zeigt den Bauch",
    situation:"Sie wälzt sich vor dir auf den Rücken und präsentiert den Bauch.",
    wasSieSagt:"„Ich vertraue dir komplett.“ Das ist ein großer Vertrauensbeweis – aber in den meisten Fällen KEINE Einladung zum Bauchkraulen.",
    soAntwortest:[
      "Freu dich über das Vertrauen, das ist ein Kompliment",
      "Widersteh dem Reflex, den Bauch zu streicheln",
      "Kraul stattdessen Kopf oder Wange",
      "Nur wenn SIE wiederholt zeigt, dass sie Bauchkraulen mag, vorsichtig testen",
    ],
    tipp:"Bauch zeigen heißt „ich fühl mich sicher“, nicht „kraul mich hier“. Diesen Unterschied verstehen die wenigsten.",
  },
  {
    id:"beisst-beim-streicheln",
    titel:"Sie schnurrt – und beißt plötzlich",
    situation:"Erst genießt sie das Streicheln, dann zwickt sie unvermittelt in die Hand.",
    wasSieSagt:"„Jetzt ist es genug.“ Das ist Reizüberflutung – und meist hat sie vorher gewarnt: Schwanzzucken, Hautzucken, leicht zurückgedrehte Ohren.",
    soAntwortest:[
      "Lern die Vorsignale zu lesen und hör VOR dem Biss auf",
      "Halte Streicheleinheiten kurz",
      "Hand ruhig wegnehmen, nicht wegreißen, nicht schimpfen",
      "Bevorzuge Wange/Kinn statt Rücken/Schwanzbasis",
    ],
    tipp:"Mach den „Pause-Test“: kurz aufhören. Stupst sie dich an = weiter. Bleibt sie ruhig/geht = fertig.",
    tierarztHinweis:"Wird sie plötzlich schon bei sanfter Berührung empfindlich, an Schmerz denken und abklären.",
  },
  {
    id:"neue-katze",
    titel:"Eine zweite Katze zieht ein",
    situation:"Fauchen, Verstecken, Spannung zwischen den Tieren.",
    wasSieSagt:"„Wer ist das und nimmt sie mir mein Revier?“ Anfangs ist Spannung völlig normal – es geht um Sicherheit und Ressourcen.",
    soAntwortest:[
      "Langsam zusammenführen: erst getrennt, Geruch tauschen (Decken)",
      "Dann Sichtkontakt durch Gittertür/Spalt, dann gemeinsame Zeit",
      "Ressourcen verdoppeln und verteilen: Klos (Anzahl Katzen +1), Futter, Wasser, Schlafplätze",
      "Vertikalen Raum schaffen, positive gemeinsame Erlebnisse (Abstand-Fütterung)",
    ],
    tipp:"Tempo ist alles: lieber zwei Wochen langsam als eine verkorkste erste Begegnung, die sich einbrennt.",
  },
  {
    id:"gewitter",
    titel:"Gewitter oder Feuerwerk",
    situation:"Sie versteckt sich, große Pupillen, eingezogener Schwanz.",
    wasSieSagt:"„Ich hab Angst und will mich sicher fühlen.“ Laute, unvorhersehbare Geräusche sind eine klassische Angstsituation.",
    soAntwortest:[
      "Biete ein sicheres Versteck an (Höhle, erhöhter, dunkler Platz)",
      "Bleib selbst ruhig – deine Gelassenheit überträgt sich",
      "Dräng dich nicht auf, hol sie nicht aus dem Versteck",
      "Pheromon-Stecker bei wiederkehrendem Lärm vorbeugend einsetzen",
    ],
    tipp:"„Trösten“ durch Hochnehmen verstärkt die Angst. Sichere Präsenz schlägt aktives Beruhigen.",
  },
  {
    id:"bringt-beute",
    titel:"Sie bringt dir eine „Beute“",
    situation:"Sie legt dir ein Spielzeug (oder Schlimmeres) vor die Füße und gurrt stolz.",
    wasSieSagt:"„Das teile ich mit dir / das hab ich für dich.“ Ein soziales, zugewandtes Verhalten – kein Fehlverhalten.",
    soAntwortest:[
      "Ruhig und freundlich reagieren, kurz loben",
      "Auf keinen Fall schimpfen – das verwirrt und verletzt",
      "Beute unauffällig entsorgen, wenn sie nicht hinschaut",
      "Mehr Jagdspiele anbieten, um den Trieb auszuleben",
    ],
    tipp:"Sieh es als Kompliment: Sie behandelt dich wie ein Familienmitglied, dem man etwas mitbringt.",
  },
  {
    id:"ignoriert-nach-urlaub",
    titel:"Sie ignoriert dich nach dem Urlaub",
    situation:"Du kommst zurück und sie ist abweisend, dreht dir den Rücken zu.",
    wasSieSagt:"Meist „Ich war verunsichert“ – eine Mischung aus Routinebruch und veränderten Gerüchen. Den Rücken zudrehen ist oft sogar Vertrauen, nicht Schmollen.",
    soAntwortest:[
      "Kein Drängen – gib ihr Zeit und Raum",
      "Stell die gewohnte Routine schnell wieder her",
      "Biete ruhig Nähe an (Slow Blink, Finger zum Nasen-Gruß)",
      "Belohne jede Annäherung von ihr",
    ],
    tipp:"Katzen „strafen“ nicht aus Trotz – sie reagieren auf Routinebruch. Routine zurück = Nähe zurück.",
  },
  {
    id:"schnattern-fenster",
    titel:"Sie schnattert am Fenster",
    situation:"Vögel draußen, sie macht ein schnelles „Ekekek“ und wedelt mit dem Schwanz.",
    wasSieSagt:"„Ich will jagen, komm aber nicht ran!“ Jagderregung gemischt mit Frust.",
    soAntwortest:[
      "Biete sofort ein Jagdspiel an, um den Trieb auszuleben",
      "Lass sie im Spiel erfolgreich „fangen“",
      "Fensterplatz attraktiv halten (Aussicht ist Beschäftigung)",
      "Ggf. katzensicheres Vogelhäuschen in Sichtweite – „Katzen-TV“",
    ],
    tipp:"Frust am Fenster ist gestaute Jagdenergie. Ein kurzes Spiel danach baut sie ab.",
  },
  {
    id:"knetet-schoss",
    titel:"Sie knetet auf deinem Schoß und schnurrt",
    situation:"Rhythmisches Pfotentreten, vielleicht etwas Sabbern, lautes Schnurren.",
    wasSieSagt:"„Ich fühl mich geborgen wie als Kätzchen bei der Mama.“ Tiefstes Wohlgefühl und Bindung.",
    soAntwortest:[
      "Genieß den Moment – das ist maximale Zuneigung",
      "Leg bei Krallen eine Decke unter",
      "Ruhig bleiben, langsam blinzeln",
      "Nicht stören oder „nur kurz“ wegschieben",
    ],
    tipp:"Kneten + Schnurren + langsames Blinzeln ist die höchste Vertrauensstufe. Blinzle einfach zurück.",
  },
  {
    id:"frisst-pflanzen",
    titel:"Sie knabbert an Zimmerpflanzen",
    situation:"Sie beißt regelmäßig an Pflanzen oder Blumen.",
    wasSieSagt:"Oft Langeweile, Faserbedarf oder einfach Neugier – manchmal auch Stress.",
    soAntwortest:[
      "Sofort prüfen, ob die Pflanze giftig ist (Lilien sind lebensgefährlich!)",
      "Giftige Pflanzen komplett aus der Wohnung entfernen",
      "Katzengras als sichere Alternative anbieten",
      "Mehr Beschäftigung gegen Langeweile",
    ],
    tipp:"Erst Sicherheit, dann Verhalten: Eine einzige Lilie kann tödlich sein – die kommt sofort raus.",
    tierarztHinweis:"Bei Verdacht auf Aufnahme einer Giftpflanze SOFORT Tierarzt/Klinik kontaktieren.",
  },
  {
    id:"versteckt-plus-fressunlust",
    titel:"Sie versteckt sich UND frisst nicht",
    situation:"Plötzlicher Rückzug, Apathie, lässt das Futter stehen.",
    wasSieSagt:"Das ist oft kein „Verhaltens“-Thema, sondern ein Krankheits- oder Schmerzsignal. Katzen verstecken Schwäche instinktiv.",
    soAntwortest:[
      "Genau beobachten: seit wann, weitere Symptome?",
      "Stress minimieren, ruhige Umgebung",
      "Nicht abwarten „ob's von selbst weggeht“",
    ],
    tipp:"Rückzug + Fressunlust zusammen ist eine der wichtigsten Warnkombinationen überhaupt.",
    tierarztHinweis:"Frisst sie über ~24 h kaum/nichts oder wirkt apathisch: zeitnah bzw. sofort zum Tierarzt (Gefahr Leberverfettung).",
  },
  {
    id:"will-spielen",
    titel:"Sie schleicht an und wackelt mit dem Hinterteil",
    situation:"Geduckte Haltung, weite Pupillen, wackelndes Hinterteil.",
    wasSieSagt:"„Jagdmodus an – lass uns spielen!“ Die klassische Sprung-Vorbereitung.",
    soAntwortest:[
      "Spielzeug holen (Angel, Maus) – jetzt ist der perfekte Moment",
      "Beute realistisch bewegen: ruckartig, weg von ihr, mal verstecken",
      "Erfolgreiches Fangen zulassen",
      "Mit Fang + kleiner Mahlzeit beenden",
    ],
    tipp:"Niemals die Hand als Beute anbieten – sonst lernt sie, Hände zu jagen.",
  },
  {
    id:"starrt-andere-katze",
    titel:"Zwei Katzen starren sich regungslos an",
    situation:"Beide erstarrt, fixierter Blick, evtl. leises Knurren.",
    wasSieSagt:"„Das ist mein Bereich.“ Ein stiller Konflikt – Starren ist unter Katzen eine Drohung.",
    soAntwortest:[
      "Situation ruhig auflösen (Ablenkung, nicht dazwischengreifen)",
      "Ressourcen und Rückzugsräume prüfen und trennen",
      "Vertikalen Raum schaffen (mehr Ausweichmöglichkeiten)",
      "Bei häufigen Konflikten Zusammenführung schrittweise neu aufbauen",
    ],
    tipp:"Nicht mit den Händen dazwischen – umgeleitete Aggression trifft sonst dich.",
  },
  {
    id:"miaut-am-napf",
    titel:"Sie maunzt durchdringend am Napf",
    situation:"Lautes, drängendes Maunzen direkt am Futterplatz.",
    wasSieSagt:"„Ich will Futter – jetzt.“ Eine klare, an dich gerichtete Forderung.",
    soAntwortest:[
      "Fütterungszeiten und -mengen prüfen (ist sie wirklich hungrig?)",
      "Feste Zeiten statt Füttern auf Zuruf etablieren",
      "Drängen nicht jedes Mal sofort belohnen",
      "Fummelbrett gegen Langeweile/Schlingen einsetzen",
    ],
    tipp:"Wer auf jedes Napf-Maunzen füttert, züchtet sich einen Dauer-Maunzer. Feste Zeiten beruhigen.",
  },
  {
    id:"schoss-vertrauen",
    titel:"Sie dreht dir den Rücken zu",
    situation:"Sie setzt sich zu dir und schaut bewusst weg.",
    wasSieSagt:"Meist „Ich fühl mich sicher genug, dich nicht beobachten zu müssen.“ Vertrauen – nicht Ablehnung.",
    soAntwortest:[
      "Als Kompliment verstehen, nicht als Zurückweisung",
      "Ruhe lassen, ihre Nähe einfach annehmen",
      "Kein Drängen auf Blickkontakt oder Streicheln",
    ],
    tipp:"Der zugewandte Rücken ist eine der am häufigsten missverstandenen Gesten – es ist Vertrauen.",
  },
];
