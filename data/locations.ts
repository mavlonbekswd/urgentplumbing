// Towns covered, taken from the service-area list on the previous website (Cambridge listed
// as the main base). Grouped by county so customers can scan for their area quickly.
// Coordinates are approximate town centres, used only to draw the coverage map.

export type County =
  | "Cambridgeshire"
  | "Suffolk"
  | "Norfolk"
  | "Essex"
  | "Hertfordshire"
  | "Bedfordshire";

export interface Town {
  name: string;
  county: County;
  lat: number;
  lon: number;
  isBase?: boolean;
}

export const towns: Town[] = [
  { name: "Cambridge", county: "Cambridgeshire", lat: 52.205, lon: 0.119, isBase: true },
  { name: "Ely", county: "Cambridgeshire", lat: 52.399, lon: 0.262 },
  { name: "Huntingdon", county: "Cambridgeshire", lat: 52.331, lon: -0.183 },
  { name: "St Ives", county: "Cambridgeshire", lat: 52.333, lon: -0.075 },
  { name: "St Neots", county: "Cambridgeshire", lat: 52.228, lon: -0.27 },
  { name: "March", county: "Cambridgeshire", lat: 52.551, lon: 0.088 },
  { name: "Soham", county: "Cambridgeshire", lat: 52.333, lon: 0.336 },
  { name: "Newmarket", county: "Suffolk", lat: 52.245, lon: 0.405 },
  { name: "Haverhill", county: "Suffolk", lat: 52.083, lon: 0.437 },
  { name: "Bury St Edmunds", county: "Suffolk", lat: 52.246, lon: 0.711 },
  { name: "Mildenhall", county: "Suffolk", lat: 52.344, lon: 0.509 },
  { name: "Lakenheath", county: "Suffolk", lat: 52.414, lon: 0.519 },
  { name: "Brandon", county: "Suffolk", lat: 52.447, lon: 0.624 },
  { name: "Stowmarket", county: "Suffolk", lat: 52.188, lon: 0.997 },
  { name: "Thetford", county: "Norfolk", lat: 52.413, lon: 0.75 },
  { name: "Diss", county: "Norfolk", lat: 52.376, lon: 1.108 },
  { name: "Downham Market", county: "Norfolk", lat: 52.602, lon: 0.383 },
  { name: "Saffron Walden", county: "Essex", lat: 52.022, lon: 0.239 },
  { name: "Royston", county: "Hertfordshire", lat: 52.048, lon: -0.024 },
  { name: "Bedford", county: "Bedfordshire", lat: 52.136, lon: -0.467 },
];

export const countyOrder: County[] = [
  "Cambridgeshire",
  "Suffolk",
  "Norfolk",
  "Essex",
  "Hertfordshire",
  "Bedfordshire",
];

export const townsByCounty = countyOrder.map((county) => ({
  county,
  towns: towns.filter((t) => t.county === county),
}));

export const baseTown = towns.find((t) => t.isBase)!;

/** The regions covered, for running text: "towns across {coverageRegions}". */
export const coverageRegions =
  "Cambridgeshire, west Suffolk and nearby parts of Norfolk, Essex, Hertfordshire and Bedfordshire";

/**
 * Towns grouped by direction from the base. Each group is a contiguous range of compass
 * bearings worked out from the coordinates above (e.g. "North" is March 357°, Downham Market
 * 22°, Ely 24°, Soham 46°), so the groups are geographically accurate, not marketing regions.
 * Within a group, towns are listed nearest first.
 */
export const areaGroups: { id: string; title: string; towns: string[] }[] = [
  { id: "north", title: "North — towards Ely and the Fens", towns: ["Ely", "Soham", "March", "Downham Market"] },
  { id: "north-east", title: "North-east — Mildenhall and the Brecks", towns: ["Mildenhall", "Lakenheath", "Brandon", "Thetford"] },
  { id: "east", title: "East — Newmarket, Bury St Edmunds and beyond", towns: ["Newmarket", "Bury St Edmunds", "Stowmarket", "Diss"] },
  { id: "south", title: "South — Royston, Saffron Walden and Haverhill", towns: ["Royston", "Saffron Walden", "Haverhill"] },
  { id: "west", title: "West — St Ives, Huntingdon, St Neots and Bedford", towns: ["St Ives", "Huntingdon", "St Neots", "Bedford"] },
];

/** Every town, base first, then the groups in order — the order used in compact grids. */
export const townsInDisplayOrder: Town[] = [
  baseTown,
  ...areaGroups.flatMap((g) => g.towns.map((name) => towns.find((t) => t.name === name)!)),
];

// Guard: every town appears in exactly one group (plus the base), so nothing is lost or invented.
if (process.env.NODE_ENV !== "production") {
  const grouped = areaGroups.flatMap((g) => g.towns);
  const missing = towns.filter((t) => !t.isBase && !grouped.includes(t.name));
  const unknown = grouped.filter((n) => !towns.some((t) => t.name === n));
  if (missing.length || unknown.length || new Set(grouped).size !== grouped.length) {
    throw new Error(`areaGroups out of sync with towns: missing ${missing.map((t) => t.name)}, unknown ${unknown}`);
  }
}
