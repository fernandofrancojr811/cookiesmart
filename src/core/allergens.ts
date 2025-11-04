import type { AllergenReport } from "./types";

const CERTAIN = {
  milk: ["milk","butter","cheese","whey","casein","yogurt","cream"],
  eggs: ["egg","albumen","albumin"],
  fish: ["salmon","tuna","cod","anchovy","trout","tilapia"],
  shellfish: ["shrimp","prawn","crab","lobster","clam","oyster","scallop","mussel"],
  "tree nuts": ["almond","walnut","pecan","hazelnut","cashew","pistachio","macadamia","brazil nut"],
  peanuts: ["peanut"],
  wheat: ["wheat","semolina","spelt","durum"],
  soy: ["soy","soybean","edamame","tofu","tempeh","soy lecithin"],
  sesame: ["sesame","tahini"],
};

const POSSIBLE_CONTEXT = {
  milk: ["chocolate","cream-filled","custard"],
  eggs: ["mayo","meringue"],
  wheat: ["flour","breadcrumbs","batter"],
  soy: ["vegetable oil","lecithin"],
  sesame: ["seed mix","middle eastern"],
};

export function detectAllergens(tokens: string[]): AllergenReport {
  const lower = tokens.map(t => t.toLowerCase());
  const hits = Object.keys(CERTAIN).map((name) => {
    const certainTerms = (CERTAIN as any)[name] as string[];
    const certain = certainTerms.filter(t => lower.some(s => s.includes(t)));
    let possible: string[] = [];
    const poss = (POSSIBLE_CONTEXT as any)[name] as string[] | undefined;
    if (poss) possible = poss.filter(t => lower.some(s => s.includes(t)));
    return {
      name,
      level: certain.length ? "Certain" : (possible.length ? "Possible" : "Possible"),
      sourceTerms: certain.length ? certain : possible,
    };
  });
  return { hits };
}
