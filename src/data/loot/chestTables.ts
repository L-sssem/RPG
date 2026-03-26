export const normalChestTable = [
  { type: "gold", chance: 45 },
  { type: "normal_material", chance: 35 },
  { type: "rare_material", chance: 15 },
  { type: "accessory", chance: 5 },
] as const;

export const specialChestTable = [
  { type: "gold", chance: 30 },
  { type: "normal_material", chance: 20 },
  { type: "rare_material", chance: 25 },
  { type: "seal", chance: 20 },
  { type: "accessory", chance: 5 },
] as const;

export const chestGoldRanges = {
  normal: {
    tier1: { min: 50, max: 150 },
    tier2: { min: 150, max: 350 },
    tier3: { min: 350, max: 800 },
    tier4: { min: 800, max: 1800 },
    tier5: { min: 1800, max: 4000 },
  },
  special: {
    min: 2500,
    max: 9000,
  },
} as const;
