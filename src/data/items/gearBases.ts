import type { GearBaseDef, Tier } from "@/types/game";

type SlotStats = {
  min: number;
  max: number;
  cost: number;
};

const tierWeapon: Record<Tier, SlotStats> = {
  1: { min: 10, max: 16, cost: 300 },
  2: { min: 22, max: 30, cost: 1200 },
  3: { min: 38, max: 48, cost: 4000 },
  4: { min: 58, max: 70, cost: 12000 },
  5: { min: 82, max: 98, cost: 35000 },
};

const tierHead: Record<Tier, SlotStats> = {
  1: { min: 3, max: 5, cost: 210 },
  2: { min: 7, max: 10, cost: 840 },
  3: { min: 12, max: 16, cost: 2800 },
  4: { min: 18, max: 24, cost: 8400 },
  5: { min: 26, max: 34, cost: 24500 },
};

const tierHands: Record<Tier, SlotStats> = {
  1: { min: 2, max: 4, cost: 210 },
  2: { min: 5, max: 8, cost: 840 },
  3: { min: 9, max: 13, cost: 2800 },
  4: { min: 14, max: 19, cost: 8400 },
  5: { min: 20, max: 27, cost: 24500 },
};

const tierFeet: Record<Tier, SlotStats> = {
  1: { min: 2, max: 4, cost: 210 },
  2: { min: 5, max: 8, cost: 840 },
  3: { min: 9, max: 13, cost: 2800 },
  4: { min: 14, max: 19, cost: 8400 },
  5: { min: 20, max: 27, cost: 24500 },
};

const tierBody: Record<Tier, SlotStats> = {
  1: { min: 5, max: 8, cost: 360 },
  2: { min: 11, max: 15, cost: 1440 },
  3: { min: 18, max: 24, cost: 4800 },
  4: { min: 27, max: 35, cost: 14400 },
  5: { min: 38, max: 48, cost: 42000 },
};

const tierAwakenMaterials: Record<Tier, Array<{ materialId: string; amount: number }>> = {
  1: [{ materialId: "grass_king_fang", amount: 15 }],
  2: [
    { materialId: "grass_king_fang", amount: 10 },
    { materialId: "overseer_core", amount: 8 },
  ],
  3: [
    { materialId: "cursed_wood", amount: 10 },
    { materialId: "sap_core", amount: 8 },
    { materialId: "eldertree_core", amount: 1 },
  ],
  4: [
    { materialId: "cold_crystal", amount: 12 },
    { materialId: "ice_fang", amount: 10 },
    { materialId: "queen_ice_core", amount: 1 },
  ],
  5: [
    { materialId: "heat_core", amount: 15 },
    { materialId: "crimson_ore", amount: 12 },
    { materialId: "dragon_flame_marrow", amount: 1 },
  ],
};

const tierSetData = {
  1: {
    prefix: "grass_king",
    blueprintId: "bp_grass_king_set",
    names: {
      weapon: "草王牙剣",
      head: "草王牙兜",
      hands: "草王牙手甲",
      feet: "草王牙脚甲",
      body: "草王牙鎧",
    },
  },
  2: {
    prefix: "ironheart",
    blueprintId: "bp_ironheart_set",
    names: {
      weapon: "鉄心断剣",
      head: "鉄心鋼兜",
      hands: "鉄心鋼籠手",
      feet: "鉄心鋼脚甲",
      body: "鉄心鋼鎧",
    },
  },
  3: {
    prefix: "eldertree",
    blueprintId: "bp_eldertree_set",
    names: {
      weapon: "母樹の枝刃",
      head: "母樹冠帽",
      hands: "母樹の蔓手",
      feet: "母樹の根脚",
      body: "母樹樹皮鎧",
    },
  },
  4: {
    prefix: "icetear",
    blueprintId: "bp_icetear_set",
    names: {
      weapon: "氷涙処刑刃",
      head: "氷涙王冠",
      hands: "氷涙籠手",
      feet: "氷涙脚甲",
      body: "氷涙霊鎧",
    },
  },
  5: {
    prefix: "flamemarrow",
    blueprintId: "bp_flamemarrow_set",
    names: {
      weapon: "炎髄竜牙",
      head: "炎髄竜兜",
      hands: "炎髄竜籠手",
      feet: "炎髄竜脚甲",
      body: "炎髄竜鎧",
    },
  },
} as const;

function makeWeapon(tier: Tier): GearBaseDef {
  const t = tierSetData[tier];
  const s = tierWeapon[tier];
  return {
    id: `${t.prefix}_weapon`,
    name: t.names.weapon,
    tier,
    slot: "weapon",
    blueprintId: t.blueprintId,
    baseStatsMin: { attack: s.min },
    baseStatsMax: { attack: s.max },
    craftGoldCost: s.cost,
    awakenMaterials: tierAwakenMaterials[tier],
  };
}

function makeArmorPiece(
  tier: Tier,
  slot: "head" | "hands" | "feet" | "body",
  stat: SlotStats,
): GearBaseDef {
  const t = tierSetData[tier];
  return {
    id: `${t.prefix}_${slot}`,
    name: t.names[slot],
    tier,
    slot,
    blueprintId: t.blueprintId,
    baseStatsMin: { defense: stat.min },
    baseStatsMax: { defense: stat.max },
    craftGoldCost: stat.cost,
    awakenMaterials: tierAwakenMaterials[tier],
  };
}

export const gearBases: GearBaseDef[] = [
  makeWeapon(1),
  makeArmorPiece(1, "head", tierHead[1]),
  makeArmorPiece(1, "hands", tierHands[1]),
  makeArmorPiece(1, "feet", tierFeet[1]),
  makeArmorPiece(1, "body", tierBody[1]),

  makeWeapon(2),
  makeArmorPiece(2, "head", tierHead[2]),
  makeArmorPiece(2, "hands", tierHands[2]),
  makeArmorPiece(2, "feet", tierFeet[2]),
  makeArmorPiece(2, "body", tierBody[2]),

  makeWeapon(3),
  makeArmorPiece(3, "head", tierHead[3]),
  makeArmorPiece(3, "hands", tierHands[3]),
  makeArmorPiece(3, "feet", tierFeet[3]),
  makeArmorPiece(3, "body", tierBody[3]),

  makeWeapon(4),
  makeArmorPiece(4, "head", tierHead[4]),
  makeArmorPiece(4, "hands", tierHands[4]),
  makeArmorPiece(4, "feet", tierFeet[4]),
  makeArmorPiece(4, "body", tierBody[4]),

  makeWeapon(5),
  makeArmorPiece(5, "head", tierHead[5]),
  makeArmorPiece(5, "hands", tierHands[5]),
  makeArmorPiece(5, "feet", tierFeet[5]),
  makeArmorPiece(5, "body", tierBody[5]),
];
