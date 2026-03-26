export type GearSlot =
  | "weapon"
  | "head"
  | "hands"
  | "feet"
  | "body"
  | "accessory";

export type GearRank =
  | "common"
  | "magic"
  | "rare"
  | "epic"
  | "legendary"
  | "unique";

export type Tier = 1 | 2 | 3 | 4 | 5;

export type StatKey =
  | "hp"
  | "attack"
  | "defense"
  | "moveSpeed"
  | "critRate"
  | "critDamage"
  | "expRate"
  | "goldRate"
  | "dropRate";

export type MaterialRarity = "normal" | "rare" | "boss" | "special";

export interface StatBlock {
  hp?: number;
  attack?: number;
  defense?: number;
  moveSpeed?: number;
  critRate?: number;
  critDamage?: number;
  expRate?: number;
  goldRate?: number;
  dropRate?: number;
}

export interface MaterialDef {
  id: string;
  name: string;
  rarity: MaterialRarity;
  tier?: Tier;
  sellPrice: number;
}

export interface GearBaseDef {
  id: string;
  name: string;
  tier: Tier;
  slot: Exclude<GearSlot, "accessory">;
  baseStatsMin: StatBlock;
  baseStatsMax: StatBlock;
  craftGoldCost: number;
  blueprintId: string;
  awakenMaterials: Array<{
    materialId: string;
    amount: number;
  }>;
}

export interface AccessoryDef {
  id: string;
  name: string;
  tier: Tier;
  baseStats?: StatBlock;
  baseEffectText: string;
  uniqueEffectId?: string;
}

export interface EnemyDropDef {
  materialId: string;
  min: number;
  max: number;
  chance: number;
}

export interface EnemyDef {
  id: string;
  name: string;
  tier: Tier;
  hp: number;
  attack: number;
  defense: number;
  moveSpeed: number;
  exp: number;
  goldMin: number;
  goldMax: number;
  normalDrops: EnemyDropDef[];
  rareDrops: EnemyDropDef[];
  accessoryDropChance?: number;
  uniqueAccessoryDropChance?: number;
  attackPatternIds: string[];
}

export interface RoomEnemySpawn {
  enemyId: string;
  count: number;
}

export interface RoomDef {
  id: string;
  name: string;
  roomType: "start" | "normal" | "treasure" | "boss";
  enemies: RoomEnemySpawn[];
  chestCount?: number;
  bossId?: string;
  connectedRoomIds: string[];
}

export interface MapDef {
  id: string;
  name: string;
  tier: Tier | 99;
  isSpecial: boolean;
  rooms: RoomDef[];
  entryRoomId: string;
}

export interface MissionReward {
  gold?: number;
  materials?: Array<{
    materialId: string;
    amount: number;
  }>;
  seals?: Array<{
    sealId: string;
    amount: number;
  }>;
  guaranteedAccessory?: boolean;
  uniqueAccessoryTicket?: boolean;
}

export interface MissionDef {
  id: string;
  name: string;
  description: string;
  category: "kill" | "boss" | "craft" | "awaken" | "special" | "level" | "rebirth";
  targetId?: string;
  goal: number;
  rewards: MissionReward;
}
