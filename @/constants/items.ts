export type IconKey =
  | "car"
  | "utensils"
  | "cowboy"
  | "coffee"
  | "trafficCone"
  | "trainTrack"
  | "windmill"
  | "waves"
  | "tent"
  | "mountain"
  | "milestone"
  | "shrub"
  | "bridge"
  | "truck"
  | "megaphone"
  | "motorcycle"
  | "policeCar"
  | "siren"
  | "carFront"
  | "camper"
  | "fastFood"
  | "telescope"
  | "rollercoaster"
  | "tractor"
  | "towerControl"
  | "carTunnel"
  | "gasStation"
  | "ferry"
  | "sun"
  | "boombox"
  | "sportCar"
  | "bike"
  | "barn"
  | "castle"
  | "rain"
  | "cloud"
  | "caravan"
  | "mountainCity"
  | "plane"
  | "helicopter"
  | "ambulance"
  | "mapPinned"
  | "church"
  | "windTurbine"
  | "cctv"
  | "anchor"
  | "towtruck";

// 20. Språkstöd för fler språk

export type Language =
  | "sv"
  | "en"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "fi"
  | "no"
  | "da";

export const items: {
  key: IconKey;
  text: Record<Language, string>;
}[] = [
  {
    key: "car",
    text: {
      en: "Foreign car",
      sv: "Utländsk bil",
      fr: "Voiture étrangère",
      de: "Ausländisches Auto",
      es: "Coche extranjero",
      it: "Auto straniera",
      fi: "Ulkomainen auto",
      no: "Utenlandsk bil",
      da: "Udenlandsk bil",
    },
  },
  {
    key: "utensils",
    text: {
      en: "Roadside diner",
      sv: "Vägkrog",
      fr: "Restaurant routier",
      de: "Straßenimbiss",
      es: "Cafetería junto a la carretera",
      it: "Ristorante lungo la strada",
      fi: "Tienvarsiravintola",
      no: "Spisested ved veikanten",
      da: "Spisested ved vejkanten",
    },
  },
  {
    key: "cowboy",
    text: {
      en: "Livestock",
      sv: "Boskap",
      fr: "Bétail",
      de: "Vieh",
      es: "Ganado",
      it: "Bestiame",
      fi: "Karja",
      no: "Husdyr",
      da: "Husdyr",
    },
  },
  {
    key: "coffee",
    text: {
      en: "Rest area",
      sv: "Rastplats",
      fr: "Aire de repos",
      de: "Rastplatz",
      es: "Área de descanso",
      it: "Area di sosta",
      fi: "Levähtyspaikka",
      no: "Rastplass",
      da: "Rastested",
    },
  },
  {
    key: "trafficCone",
    text: {
      en: "Roadwork",
      sv: "Vägarbete",
      fr: "Travaux routiers",
      de: "Straßenarbeiten",
      es: "Obras viales",
      it: "Lavori stradali",
      fi: "Tietyöt",
      no: "Veiarbeid",
      da: "Vejarbejde",
    },
  },
  {
    key: "trainTrack",
    text: {
      en: "Railroad crossing",
      sv: "Tågövergång",
      fr: "Passage à niveau",
      de: "Bahnübergang",
      es: "Paso a nivel",
      it: "Passaggio a livello",
      fi: "Tasoristeys",
      no: "Jernbaneovergang",
      da: "Jernbaneoverskæring",
    },
  },
  {
    key: "windmill",
    text: {
      en: "Windmill",
      sv: "Väderkvarn",
      fr: "Moulin à vent",
      de: "Windmühle",
      es: "Molino de viento",
      it: "Mulino a vento",
      fi: "Tuulimylly",
      no: "Vindmølle",
      da: "Vindmølle",
    },
  },
  {
    key: "waves",
    text: {
      en: "Watercourse",
      sv: "Vattendrag",
      fr: "Cours d'eau",
      de: "Wasserlauf",
      es: "Curso de agua",
      it: "Corso d'acqua",
      fi: "Vesistö",
      no: "Vassdrag",
      da: "Vandløb",
    },
  },
  {
    key: "tent",
    text: {
      en: "Campsite",
      sv: "Campingplats",
      fr: "Camping",
      de: "Campingplatz",
      es: "Camping",
      it: "Campeggio",
      fi: "Leirintäalue",
      no: "Campingplass",
      da: "Campingplads",
    },
  },
  {
    key: "mountain",
    text: {
      en: "Hill",
      sv: "Kulle",
      fr: "Colline",
      de: "Hügel",
      es: "Colina",
      it: "Collina",
      fi: "Kukkula",
      no: "Haug",
      da: "Bakke",
    },
  },
  {
    key: "milestone",
    text: {
      en: "Wildlife sign",
      sv: "Viltskylt",
      fr: "Panneau de signalisation d'animaux sauvages",
      de: "Wildwarnschild",
      es: "Señal de fauna salvaje",
      it: "Cartello animali selvatici",
      fi: "Villieläinvaroitusmerkki",
      no: "Viltskilt",
      da: "Vildtskilt",
    },
  },
  {
    key: "shrub",
    text: {
      en: "Park",
      sv: "Park",
      fr: "Parc",
      de: "Park",
      es: "Parque",
      it: "Parco",
      fi: "Puisto",
      no: "Park",
      da: "Park",
    },
  },
  {
    key: "bridge",
    text: {
      en: "Bridge",
      sv: "Bro",
      fr: "Pont",
      de: "Brücke",
      es: "Puente",
      it: "Ponte",
      fi: "Silta",
      no: "Bro",
      da: "Bro",
    },
  },
  {
    key: "truck",
    text: {
      en: "Truck",
      sv: "Lastbil",
      fr: "Camion",
      de: "LKW",
      es: "Camión",
      it: "Camion",
      fi: "Kuorma-auto",
      no: "Lastebil",
      da: "Lastbil",
    },
  },
  {
    key: "megaphone",
    text: {
      en: "Billboard",
      sv: "Reklam",
      fr: "Panneau publicitaire",
      de: "Werbetafel",
      es: "Cartel publicitario",
      it: "Cartello pubblicitario",
      fi: "Mainostaulu",
      no: "Reklameskilt",
      da: "Reklameskilt",
    },
  },
  {
    key: "motorcycle",
    text: {
      en: "Motorcycle",
      sv: "Motorcykel",
      fr: "Moto",
      de: "Motorrad",
      es: "Motocicleta",
      it: "Motocicletta",
      fi: "Moottoripyörä",
      no: "Motorsykkel",
      da: "Motorcykel",
    },
  },
  {
    key: "policeCar",
    text: {
      en: "Police car",
      sv: "Polisbil",
      fr: "Voiture de police",
      de: "Polizeiauto",
      es: "Coche de policía",
      it: "Auto della polizia",
      fi: "Poliisiauto",
      no: "Politibil",
      da: "Politibil",
    },
  },
  {
    key: "siren",
    text: {
      en: "Emergency response",
      sv: "Utryckning",
      fr: "Intervention d'urgence",
      de: "Notfalleinsatz",
      es: "Respuesta de emergencia",
      it: "Intervento di emergenza",
      fi: "Hätätilannevastaus",
      no: "Utrykning",
      da: "Udrykning",
    },
  },
  {
    key: "carFront",
    text: {
      en: "Convertible",
      sv: "Cabriolet",
      fr: "Cabriolet",
      de: "Cabriolet",
      es: "Convertible",
      it: "Cabriolet",
      fi: "Avoauto",
      no: "Cabriolet",
      da: "Cabriolet",
    },
  },
  {
    key: "camper",
    text: {
      en: "Motorhome",
      sv: "Husbil",
      fr: "Camping-car",
      de: "Wohnmobil",
      es: "Autocaravana",
      it: "Camper",
      fi: "Matkailuauto",
      no: "Bobil",
      da: "Autocamper",
    },
  },
  {
    key: "fastFood",
    text: {
      en: "Fast food",
      sv: "Snabbmat",
      fr: "Restauration rapide",
      de: "Fast Food",
      es: "Comida rápida",
      it: "Fast food",
      fi: "Pikaruoka",
      no: "Hurtigmat",
      da: "Fastfood",
    },
  },
  {
    key: "telescope",
    text: {
      en: "Viewpoint",
      sv: "Utsikt",
      fr: "Point de vue",
      de: "Aussichtspunkt",
      es: "Mirador",
      it: "Punto panoramico",
      fi: "Näköalapaikka",
      no: "Utsiktspunkt",
      da: "Udsigtspunkt",
    },
  },
  {
    key: "rollercoaster",
    text: {
      en: "Amusement park",
      sv: "Nöjespark",
      fr: "Parc d'attractions",
      de: "Vergnügungspark",
      es: "Parque de atracciones",
      it: "Parco divertimenti",
      fi: "Huvipuisto",
      no: "Fornøyelsespark",
      da: "Forlystelsespark",
    },
  },
  {
    key: "tractor",
    text: {
      en: "Tractor",
      sv: "Traktor",
      fr: "Tracteur",
      de: "Traktor",
      es: "Tractor",
      it: "Trattore",
      fi: "Traktori",
      no: "Traktor",
      da: "Traktor",
    },
  },
  {
    key: "towerControl",
    text: {
      en: "Airport",
      sv: "Flygplats",
      fr: "Aéroport",
      de: "Flughafen",
      es: "Aeropuerto",
      it: "Aeroporto",
      fi: "Lentokenttä",
      no: "Flyplass",
      da: "Lufthavn",
    },
  },
  {
    key: "carTunnel",
    text: {
      en: "Tunnel",
      sv: "Tunnel",
      fr: "Tunnel",
      de: "Tunnel",
      es: "Túnel",
      it: "Tunnel",
      fi: "Tunneli",
      no: "Tunnel",
      da: "Tunnel",
    },
  },
  {
    key: "gasStation",
    text: {
      en: "Gas station",
      sv: "Bensinstation",
      fr: "Station-service",
      de: "Tankstelle",
      es: "Estación de servicio",
      it: "Stazione di servizio",
      fi: "Huoltoasema",
      no: "Bensinstasjon",
      da: "Tankstation",
    },
  },
  {
    key: "ferry",
    text: {
      en: "Ferry",
      sv: "Färja",
      fr: "Ferry",
      de: "Fähre",
      es: "Ferry",
      it: "Traghetto",
      fi: "Lautta",
      no: "Ferge",
      da: "Færge",
    },
  },
  {
    key: "sun",
    text: {
      en: "Solar panels",
      sv: "Solpaneler",
      fr: "Panneaux solaires",
      de: "Solarpaneele",
      es: "Paneles solares",
      it: "Pannelli solari",
      fi: "Aurinkopaneelit",
      no: "Solcellepaneler",
      da: "Solpaneler",
    },
  },
  {
    key: "boombox",
    text: {
      en: "Radio advertisement",
      sv: "Radioreklam",
      fr: "Publicité radio",
      de: "Radiowerbung",
      es: "Anuncio de radio",
      it: "Pubblicità radiofonica",
      fi: "Radiomainos",
      no: "Radioreklame",
      da: "Radioreklame",
    },
  },
  {
    key: "sportCar",
    text: {
      en: "Unique vehicle",
      sv: "Unikt fordon",
      fr: "Véhicule unique",
      de: "Einzigartiges Fahrzeug",
      es: "Vehículo único",
      it: "Veicolo unico",
      fi: "Ainulaatuinen ajoneuvo",
      no: "Unikt kjøretøy",
      da: "Unikt køretøj",
    },
  },
  {
    key: "bike",
    text: {
      en: "Bicycle",
      sv: "Cykel",
      fr: "Vélo",
      de: "Fahrrad",
      es: "Bicicleta",
      it: "Bicicletta",
      fi: "Polkupyörä",
      no: "Sykkel",
      da: "Cykel",
    },
  },
  {
    key: "barn",
    text: {
      en: "Barn",
      sv: "Ladugård",
      fr: "Grange",
      de: "Scheune",
      es: "Granero",
      it: "Granaio",
      fi: "Navetta",
      no: "Låve",
      da: "Lade",
    },
  },
  {
    key: "castle",
    text: {
      en: "Landmark",
      sv: "Sevärdhet",
      fr: "Site d'intérêt",
      de: "Sehenswürdigkeit",
      es: "Atracción turística",
      it: "Attrazione turistica",
      fi: "Nähtävyys",
      no: "Attraksjon",
      da: "Seværdighed",
    },
  },
  {
    key: "rain",
    text: {
      en: "Rain",
      sv: "Regn",
      fr: "Pluie",
      de: "Regen",
      es: "Lluvia",
      it: "Pioggia",
      fi: "Sade",
      no: "Regn",
      da: "Regn",
    },
  },
  {
    key: "cloud",
    text: {
      en: "Fluffy cloud",
      sv: "Fluffigt moln",
      fr: "Nuage duveteux",
      de: "Flauschige Wolke",
      es: "Nube esponjosa",
      it: "Nuvola soffice",
      fi: "Pehmeä pilvi",
      no: "Luftig sky",
      da: "Luftig sky",
    },
  },
  {
    key: "caravan",
    text: {
      en: "Caravan",
      sv: "Husvagn",
      fr: "Caravane",
      de: "Wohnwagen",
      es: "Caravana",
      it: "Roulotte",
      fi: "Asuntovaunu",
      no: "Campingvogn",
      da: "Campingvogn",
    },
  },
  {
    key: "mountainCity",
    text: {
      en: "Changing municipality",
      sv: "Byter kommun",
      fr: "Changement de commune",
      de: "Gemeindewechsel",
      es: "Cambio de municipio",
      it: "Cambio di comune",
      fi: "Kunnan vaihto",
      no: "Endring av kommune",
      da: "Skift af kommune",
    },
  },
  {
    key: "plane",
    text: {
      en: "Airplane",
      sv: "Flygplan",
      fr: "Avion",
      de: "Flugzeug",
      es: "Avión",
      it: "Aereo",
      fi: "Lentokone",
      no: "Fly",
      da: "Fly",
    },
  },
  {
    key: "helicopter",
    text: {
      en: "Helicopter",
      sv: "Helikopter",
      fr: "Hélicoptère",
      de: "Hubschrauber",
      es: "Helicóptero",
      it: "Elicottero",
      fi: "Helikopteri",
      no: "Helikopter",
      da: "Helikopter",
    },
  },
  {
    key: "ambulance",
    text: {
      en: "Ambulance",
      sv: "Ambulans",
      fr: "Ambulance",
      de: "Krankenwagen",
      es: "Ambulancia",
      it: "Ambulanza",
      fi: "Ambulanssi",
      no: "Ambulanse",
      da: "Ambulance",
    },
  },
  {
    key: "mapPinned",
    text: {
      en: "County border",
      sv: "Korsar länsgräns",
      fr: "Frontière du comté",
      de: "Kreisgrenze",
      es: "Frontera del condado",
      it: "Confine di contea",
      fi: "Läänin raja",
      no: "Fylkesgrense",
      da: "Amtsgrænse",
    },
  },
  {
    key: "church",
    text: {
      en: "Church",
      sv: "Kyrka",
      fr: "Église",
      de: "Kirche",
      es: "Iglesia",
      it: "Chiesa",
      fi: "Kirkko",
      no: "Kirke",
      da: "Kirke",
    },
  },
  {
    key: "windTurbine",
    text: {
      en: "Wind turbine",
      sv: "Vindkraftverk",
      fr: "Éolienne",
      de: "Windturbine",
      es: "Turbina eólica",
      it: "Turbina eolica",
      fi: "Tuulivoimala",
      no: "Vindturbine",
      da: "Vindmølle",
    },
  },
  {
    key: "cctv",
    text: {
      en: "Speed camera",
      sv: "Fartkamera",
      fr: "Radar de vitesse",
      de: "Geschwindigkeitskamera",
      es: "Radar de velocidad",
      it: "Autovelox",
      fi: "Nopeusvalvontakamera",
      no: "Fartskamera",
      da: "Fartkamera",
    },
  },
  {
    key: "anchor",
    text: {
      en: "Sea",
      sv: "Havet",
      fr: "Mer",
      de: "Meer",
      es: "Mar",
      it: "Mare",
      fi: "Meri",
      no: "Sjø",
      da: "Hav",
    },
  },
  {
    key: "towtruck",
    text: {
      en: "Tow truck",
      sv: "Bärgningsbil",
      fr: "Dépanneuse",
      de: "Abschleppwagen",
      es: "Grúa",
      it: "Carro attrezzi",
      fi: "Hinaaja",
      no: "Bergingsbil",
      da: "Bugserbil",
    },
  },
];
