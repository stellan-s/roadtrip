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
  | "anchor";

export const items: {
  key: IconKey;
  text: Record<"sv" | "en", string>;
}[] = [
  { key: "car", text: { en: "Foreign car", sv: "Utländsk bil" } },
  { key: "utensils", text: { en: "Roadside diner", sv: "Vägkrog" } },
  { key: "cowboy", text: { en: "Livestock", sv: "Boskap" } },
  { key: "coffee", text: { en: "Rest area", sv: "Rastplats" } },
  { key: "trafficCone", text: { en: "Roadwork", sv: "Vägarbete" } },
  { key: "trainTrack", text: { en: "Railroad crossing", sv: "Tågövergång" } },
  { key: "windmill", text: { en: "Windmill", sv: "Väderkvarn" } },
  { key: "waves", text: { en: "Watercourse", sv: "Vattendrag" } },
  { key: "tent", text: { en: "Campsite", sv: "Campingplats" } },
  { key: "mountain", text: { en: "Hill", sv: "Kulle" } },
  { key: "milestone", text: { en: "Wildlife sign", sv: "Viltskylt" } },
  { key: "shrub", text: { en: "Park", sv: "Park" } },
  { key: "bridge", text: { en: "Bridge", sv: "Bro" } },
  { key: "truck", text: { en: "Truck", sv: "Lastbil" } },
  { key: "megaphone", text: { en: "Billboard", sv: "Reklam" } },
  { key: "motorcycle", text: { en: "Motorcycle", sv: "Motorcykel" } },
  { key: "policeCar", text: { en: "Police car", sv: "Polisbil" } },
  { key: "siren", text: { en: "Emergency response", sv: "Utryckning" } },
  { key: "carFront", text: { en: "Convertible", sv: "Cabriolet" } },
  { key: "camper", text: { en: "Motorhome", sv: "Husbil" } },
  { key: "fastFood", text: { en: "Fast food", sv: "Snabbmat" } },
  { key: "telescope", text: { en: "Viewpoint", sv: "Utsikt" } },
  { key: "rollercoaster", text: { en: "Amusement park", sv: "Nöjespark" } },
  { key: "tractor", text: { en: "Tractor", sv: "Traktor" } },
  { key: "towerControl", text: { en: "Airport", sv: "Flygplats" } },
  { key: "carTunnel", text: { en: "Tunnel", sv: "Tunnel" } },
  { key: "gasStation", text: { en: "Gas station", sv: "Bensinstation" } },
  { key: "ferry", text: { en: "Ferry", sv: "Färja" } },
  { key: "sun", text: { en: "Solar panels", sv: "Solpaneler" } },
  { key: "boombox", text: { en: "Radio advertisement", sv: "Radioreklam" } },
  { key: "sportCar", text: { en: "Unique vehicle", sv: "Unikt fordon" } },
  { key: "bike", text: { en: "Bicycle", sv: "Cykel" } },
  { key: "barn", text: { en: "Barn", sv: "Ladugård" } },
  { key: "castle", text: { en: "Landmark", sv: "Sevärdhet" } },
  { key: "rain", text: { en: "Rain", sv: "Regn" } },
  { key: "cloud", text: { en: "Fluffy cloud", sv: "Fluffigt moln" } },
  { key: "caravan", text: { en: "Caravan", sv: "Husvagn" } },
  { key: "mountainCity", text: { en: "Changing municipality", sv: "Byter kommun" } },
  { key: "plane", text: { en: "Airplane", sv: "Flygplan" } },
  { key: "helicopter", text: { en: "Helicopter", sv: "Helikopter" } },
  { key: "ambulance", text: { en: "Ambulance", sv: "Ambulans" } },
  { key: "mapPinned", text: { en: "County border", sv: "Korsar länsgräns" } },
  { key: "church", text: { en: "Church", sv: "Kyrka" } },
  { key: "windTurbine", text: { en: "Wind turbine", sv: "Vindkraftverk" } },
  { key: "cctv", text: { en: "Speed camera", sv: "Fartkamera" } },
  { key: "anchor", text: { en: "Sea", sv: "Havet" } },
];