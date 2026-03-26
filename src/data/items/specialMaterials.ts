import type { MaterialDef } from "@/types/game";

export const specialMaterials: MaterialDef[] = [
  { id: "tomb_dust", name: "墓石粉", rarity: "normal", sellPrice: 5 },
  { id: "tomb_cloth_piece", name: "呪布片", rarity: "normal", sellPrice: 5 },
  { id: "spirit_ash", name: "霊灰", rarity: "normal", sellPrice: 5 },
  { id: "grave_crystal", name: "墓守結晶", rarity: "rare", sellPrice: 40 },
  { id: "tomb_king_ash", name: "墓所王の封灰", rarity: "boss", sellPrice: 300 },

  { id: "star_sand", name: "星屑砂", rarity: "normal", sellPrice: 5 },
  { id: "shadow_cloth", name: "影布", rarity: "normal", sellPrice: 5 },
  { id: "eclipse_fragment", name: "蝕片", rarity: "normal", sellPrice: 5 },
  { id: "star_core", name: "輝蝕核", rarity: "rare", sellPrice: 40 },
  { id: "star_bishop_eye", name: "星蝕王の瞳核", rarity: "boss", sellPrice: 300 },

  { id: "flame_bone_shard", name: "炎骨片", rarity: "normal", sellPrice: 5 },
  { id: "dragonbone_powder", name: "竜骸粉", rarity: "normal", sellPrice: 5 },
  { id: "core_ash", name: "炉心灰", rarity: "normal", sellPrice: 5 },
  { id: "core_crystal", name: "炉心晶", rarity: "rare", sellPrice: 40 },
  { id: "core_dragon_ash", name: "炉心王の竜灰", rarity: "boss", sellPrice: 300 },
];
