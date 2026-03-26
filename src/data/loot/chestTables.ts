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
