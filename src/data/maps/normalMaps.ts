import type { MapDef } from "@/types/game";

export const normalMaps: MapDef[] = [
  {
    id: "t1_field",
    name: "草原の外縁",
    tier: 1,
    isSpecial: false,
    entryRoomId: "field_start",
    rooms: [
      { id: "field_start", name: "開始広場", roomType: "start", enemies: [{ enemyId: "slime", count: 3 }], connectedRoomIds: ["field_path"] },
      { id: "field_path", name: "草地通路", roomType: "normal", enemies: [{ enemyId: "slime", count: 4 }, { enemyId: "wild_dog", count: 2 }], connectedRoomIds: ["field_nest", "field_branch"] },
      { id: "field_nest", name: "獣の巣", roomType: "normal", enemies: [{ enemyId: "wild_dog", count: 4 }, { enemyId: "slime", count: 2 }, { enemyId: "big_fang_dog", count: 1 }], connectedRoomIds: ["field_camp"] },
      { id: "field_branch", name: "宝箱部屋", roomType: "treasure", enemies: [{ enemyId: "goblin", count: 2 }], chestCount: 1, connectedRoomIds: ["field_path"] },
      { id: "field_camp", name: "ゴブリン野営地", roomType: "normal", enemies: [{ enemyId: "goblin", count: 5 }, { enemyId: "wild_dog", count: 2 }], connectedRoomIds: ["field_front"] },
      { id: "field_front", name: "草原の祭壇前", roomType: "normal", enemies: [{ enemyId: "wild_dog", count: 2 }, { enemyId: "goblin", count: 3 }], connectedRoomIds: ["field_boss"] },
      { id: "field_boss", name: "ボス部屋", roomType: "boss", enemies: [], bossId: "grassland_king_grawl", connectedRoomIds: [] },
    ],
  },

  {
    id: "t2_mine",
    name: "廃坑の坑道",
    tier: 2,
    isSpecial: false,
    entryRoomId: "mine_entry",
    rooms: [
      { id: "mine_entry", name: "坑道入口", roomType: "start", enemies: [{ enemyId: "mine_bat", count: 3 }], connectedRoomIds: ["mine_hall"] },
      { id: "mine_hall", name: "採掘通路A", roomType: "normal", enemies: [{ enemyId: "mine_bat", count: 3 }, { enemyId: "mine_zombie", count: 3 }], connectedRoomIds: ["mine_collapse", "mine_hut"] },
      { id: "mine_collapse", name: "崩落広間", roomType: "normal", enemies: [{ enemyId: "ore_golem", count: 3 }, { enemyId: "mine_zombie", count: 3 }, { enemyId: "collapse_guardian", count: 1 }], connectedRoomIds: ["mine_cross"] },
      { id: "mine_hut", name: "採掘小屋", roomType: "treasure", enemies: [{ enemyId: "mine_zombie", count: 4 }], chestCount: 1, connectedRoomIds: ["mine_hall"] },
      { id: "mine_cross", name: "分岐坑道", roomType: "normal", enemies: [{ enemyId: "mine_bat", count: 2 }, { enemyId: "ore_golem", count: 2 }], connectedRoomIds: ["mine_vein", "mine_front"] },
      { id: "mine_vein", name: "鉱脈部屋", roomType: "treasure", enemies: [{ enemyId: "ore_golem", count: 3 }, { enemyId: "mine_bat", count: 2 }], chestCount: 1, connectedRoomIds: ["mine_cross"] },
      { id: "mine_front", name: "旧監督室前", roomType: "normal", enemies: [{ enemyId: "mine_zombie", count: 3 }, { enemyId: "ore_golem", count: 2 }], connectedRoomIds: ["mine_boss"] },
      { id: "mine_boss", name: "ボス部屋", roomType: "boss", enemies: [], bossId: "mine_overseer_durgan", connectedRoomIds: [] },
    ],
  },

  {
    id: "t3_forest",
    name: "呪森の深部",
    tier: 3,
    isSpecial: false,
    entryRoomId: "forest_entry",
    rooms: [
      { id: "forest_entry", name: "森の入口", roomType: "start", enemies: [{ enemyId: "cursed_wood_soldier", count: 3 }, { enemyId: "poison_flower_spider", count: 2 }], connectedRoomIds: ["forest_hall"] },
      { id: "forest_hall", name: "呪木の回廊", roomType: "normal", enemies: [{ enemyId: "cursed_wood_soldier", count: 4 }, { enemyId: "poison_flower_spider", count: 3 }], connectedRoomIds: ["forest_pit", "forest_square"] },
      { id: "forest_pit", name: "毒花の窪地", roomType: "normal", enemies: [{ enemyId: "poison_flower_spider", count: 5 }, { enemyId: "cursed_wood_soldier", count: 2 }, { enemyId: "poison_flower_mother", count: 1 }], connectedRoomIds: ["forest_square"] },
      { id: "forest_square", name: "祭具の広場", roomType: "normal", enemies: [{ enemyId: "forest_caster", count: 4 }, { enemyId: "cursed_wood_soldier", count: 2 }], connectedRoomIds: ["forest_camp", "forest_spring", "forest_front"] },
      { id: "forest_camp", name: "呪術師の営地", roomType: "treasure", enemies: [{ enemyId: "forest_caster", count: 4 }, { enemyId: "poison_flower_spider", count: 2 }], chestCount: 1, connectedRoomIds: ["forest_square"] },
      { id: "forest_spring", name: "枯れ泉", roomType: "treasure", enemies: [{ enemyId: "cursed_wood_soldier", count: 3 }, { enemyId: "forest_caster", count: 2 }], chestCount: 1, connectedRoomIds: ["forest_square"] },
      { id: "forest_front", name: "母樹前庭", roomType: "normal", enemies: [{ enemyId: "cursed_wood_soldier", count: 3 }, { enemyId: "poison_flower_spider", count: 2 }, { enemyId: "forest_caster", count: 2 }], connectedRoomIds: ["forest_boss"] },
      { id: "forest_boss", name: "ボス部屋", roomType: "boss", enemies: [], bossId: "eldermother_eldermea", connectedRoomIds: [] },
    ],
  },

  {
    id: "t4_ice_tomb",
    name: "霜墓の回廊",
    tier: 4,
    isSpecial: false,
    entryRoomId: "ice_gate",
    rooms: [
      { id: "ice_gate", name: "凍門", roomType: "start", enemies: [{ enemyId: "frost_skeleton", count: 3 }], connectedRoomIds: ["ice_hall"] },
      { id: "ice_hall", name: "骸兵回廊", roomType: "normal", enemies: [{ enemyId: "frost_skeleton", count: 4 }, { enemyId: "white_spirit_wolf", count: 2 }], connectedRoomIds: ["ice_square"] },
      { id: "ice_square", name: "氷結広間", roomType: "normal", enemies: [{ enemyId: "ice_mage", count: 4 }, { enemyId: "frost_skeleton", count: 3 }, { enemyId: "ice_tomb_priest", count: 1 }], connectedRoomIds: ["ice_wolves", "ice_storage", "ice_corridor"] },
      { id: "ice_wolves", name: "白狼の間", roomType: "normal", enemies: [{ enemyId: "white_spirit_wolf", count: 5 }, { enemyId: "frost_skeleton", count: 2 }], connectedRoomIds: ["ice_square"] },
      { id: "ice_storage", name: "霜術保管庫", roomType: "treasure", enemies: [{ enemyId: "ice_mage", count: 4 }, { enemyId: "white_spirit_wolf", count: 2 }], chestCount: 1, connectedRoomIds: ["ice_square"] },
      { id: "ice_corridor", name: "霊柩通路", roomType: "normal", enemies: [{ enemyId: "frost_skeleton", count: 3 }, { enemyId: "ice_mage", count: 2 }], connectedRoomIds: ["ice_front"] },
      { id: "ice_front", name: "女王前庭", roomType: "normal", enemies: [{ enemyId: "white_spirit_wolf", count: 3 }, { enemyId: "frost_skeleton", count: 2 }, { enemyId: "ice_mage", count: 2 }], connectedRoomIds: ["ice_treasure", "ice_boss"] },
      { id: "ice_treasure", name: "宝物庫", roomType: "treasure", enemies: [{ enemyId: "white_spirit_wolf", count: 2 }], chestCount: 1, connectedRoomIds: ["ice_front"] },
      { id: "ice_boss", name: "ボス部屋", roomType: "boss", enemies: [], bossId: "queen_frigia", connectedRoomIds: [] },
    ],
  },

  {
    id: "t5_crater",
    name: "深淵火口",
    tier: 5,
    isSpecial: false,
    entryRoomId: "crater_entry",
    rooms: [
      { id: "crater_entry", name: "火口入口", roomType: "start", enemies: [{ enemyId: "abyss_lizard_soldier", count: 3 }], connectedRoomIds: ["crater_road"] },
      { id: "crater_road", name: "焼灼断道", roomType: "normal", enemies: [{ enemyId: "abyss_lizard_soldier", count: 4 }, { enemyId: "crater_magic_eye", count: 2 }], connectedRoomIds: ["crater_pool"] },
      { id: "crater_pool", name: "熔岩溜まり", roomType: "normal", enemies: [{ enemyId: "lava_giant", count: 3 }, { enemyId: "abyss_lizard_soldier", count: 2 }, { enemyId: "molten_core_keeper", count: 1 }], connectedRoomIds: ["crater_square"] },
      { id: "crater_square", name: "深紅の祭場", roomType: "normal", enemies: [{ enemyId: "crater_magic_eye", count: 4 }, { enemyId: "abyss_lizard_soldier", count: 3 }], connectedRoomIds: ["crater_eye", "crater_giant", "crater_front"] },
      { id: "crater_eye", name: "魔眼回廊", roomType: "normal", enemies: [{ enemyId: "crater_magic_eye", count: 4 }, { enemyId: "lava_giant", count: 1 }], connectedRoomIds: ["crater_square"] },
      { id: "crater_giant", name: "巨人の炉前", roomType: "treasure", enemies: [{ enemyId: "lava_giant", count: 3 }, { enemyId: "abyss_lizard_soldier", count: 2 }], chestCount: 1, connectedRoomIds: ["crater_square"] },
      { id: "crater_front", name: "竜骸の裂け目", roomType: "normal", enemies: [{ enemyId: "abyss_lizard_soldier", count: 3 }, { enemyId: "crater_magic_eye", count: 2 }, { enemyId: "lava_giant", count: 1 }], connectedRoomIds: ["crater_treasure", "crater_boss"] },
      { id: "crater_treasure", name: "宝庫跡", roomType: "treasure", enemies: [{ enemyId: "crater_magic_eye", count: 2 }], chestCount: 1, connectedRoomIds: ["crater_front"] },
      { id: "crater_boss", name: "ボス部屋", roomType: "boss", enemies: [], bossId: "valgarlos", connectedRoomIds: [] },
    ],
  },
];
