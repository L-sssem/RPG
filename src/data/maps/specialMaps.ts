import type { MapDef } from "@/types/game";

export const specialMaps: MapDef[] = [
  {
    id: "deep_tomb",
    name: "深層墓所",
    tier: 99,
    isSpecial: true,
    entryRoomId: "tomb_entry",
    rooms: [
      { id: "tomb_entry", name: "墓所入口", roomType: "start", enemies: [{ enemyId: "frost_skeleton", count: 3 }], connectedRoomIds: ["tomb_hall"] },
      { id: "tomb_hall", name: "納骨回廊", roomType: "normal", enemies: [{ enemyId: "grave_executioner", count: 1 }, { enemyId: "frost_skeleton", count: 4 }, { enemyId: "ice_mage", count: 2 }], connectedRoomIds: ["tomb_chamber", "tomb_treasure"] },
      { id: "tomb_treasure", name: "宝箱室", roomType: "treasure", enemies: [{ enemyId: "frost_skeleton", count: 3 }], chestCount: 2, connectedRoomIds: ["tomb_hall"] },
      { id: "tomb_chamber", name: "深層霊廟", roomType: "normal", enemies: [{ enemyId: "grave_executioner", count: 1 }, { enemyId: "ice_mage", count: 3 }], connectedRoomIds: ["tomb_boss"] },
      { id: "tomb_boss", name: "ボス部屋", roomType: "boss", enemies: [], bossId: "tomb_agares", connectedRoomIds: [] },
    ],
  },

  {
    id: "star_eclipse",
    name: "星蝕回廊",
    tier: 99,
    isSpecial: true,
    entryRoomId: "star_entry",
    rooms: [
      { id: "star_entry", name: "星門", roomType: "start", enemies: [{ enemyId: "crater_magic_eye", count: 2 }], connectedRoomIds: ["star_hall"] },
      { id: "star_hall", name: "蝕の通路", roomType: "normal", enemies: [{ enemyId: "star_eater_spawn", count: 1 }, { enemyId: "crater_magic_eye", count: 3 }], connectedRoomIds: ["star_square", "star_treasure"] },
      { id: "star_treasure", name: "落星室", roomType: "treasure", enemies: [{ enemyId: "crater_magic_eye", count: 2 }], chestCount: 2, connectedRoomIds: ["star_hall"] },
      { id: "star_square", name: "星蝕祭壇", roomType: "normal", enemies: [{ enemyId: "star_eater_spawn", count: 1 }, { enemyId: "crater_magic_eye", count: 4 }], connectedRoomIds: ["star_boss"] },
      { id: "star_boss", name: "ボス部屋", roomType: "boss", enemies: [], bossId: "star_nox", connectedRoomIds: [] },
    ],
  },

  {
    id: "dragon_core",
    name: "竜骸の炉心",
    tier: 99,
    isSpecial: true,
    entryRoomId: "core_entry",
    rooms: [
      { id: "core_entry", name: "炉心入口", roomType: "start", enemies: [{ enemyId: "abyss_lizard_soldier", count: 3 }], connectedRoomIds: ["core_hall"] },
      { id: "core_hall", name: "灼骨通路", roomType: "normal", enemies: [{ enemyId: "burning_forge_bones", count: 1 }, { enemyId: "lava_giant", count: 2 }, { enemyId: "abyss_lizard_soldier", count: 2 }], connectedRoomIds: ["core_square", "core_treasure"] },
      { id: "core_treasure", name: "鍛炎工房跡", roomType: "treasure", enemies: [{ enemyId: "lava_giant", count: 2 }], chestCount: 2, connectedRoomIds: ["core_hall"] },
      { id: "core_square", name: "炉心前庭", roomType: "normal", enemies: [{ enemyId: "burning_forge_bones", count: 1 }, { enemyId: "crater_magic_eye", count: 3 }], connectedRoomIds: ["core_boss"] },
      { id: "core_boss", name: "ボス部屋", roomType: "boss", enemies: [], bossId: "dragon_bahald", connectedRoomIds: [] },
    ],
  },
];
