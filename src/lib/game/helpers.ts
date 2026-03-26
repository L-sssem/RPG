import { accessories } from "@/data/items/accessories";
import { materials } from "@/data/items/materials";
import { gearBases } from "@/data/items/gearBases";
import { accessoryDropPools, uniqueAccessoryIds } from "@/data/loot/accessoryTables";
import { normalChestTable, specialChestTable, chestGoldRanges } from "@/data/loot/chestTables";
import { enemyDropRules } from "@/data/loot/dropTables";
import {
  accessoryOptionPool,
  gearOptionPool,
  optionValueRanges,
  slotRestrictedOptions,
} from "@/data/loot/optionTables";
import {
  accessoryRankRates,
  gearRankBaseMultiplier,
  gearRankOptionCount,
  gearRankRates,
} from "@/data/balance/ranks";
import { awakenBalance } from "@/data/balance/awaken";
import { getBaseExpToNextLevel } from "@/data/balance/levels";
import { rebirthBonusPerCount, rebirthExpMultipliers } from "@/data/balance/rebirth";
import { systemBalance } from "@/data/balance/system";
import type {
  AccessoryDef,
  EnemyDef,
  GearBaseDef,
  GearRank,
  GearSlot,
  StatBlock,
  Tier,
} from "@/types/game";

type WeightedEntry<T extends string> = Record<T, number>;
type AccessoryRank = keyof typeof accessoryRankRates;
type TierKey = `tier${Tier}`;
type OptionKey = keyof typeof optionValueRanges;
type CoreStatKey = keyof Pick<Required<StatBlock>, "hp" | "attack" | "defense">;

const CORE_STATS: CoreStatKey[] = ["hp", "attack", "defense"];

function randomInt(min: number, max: number, rng: () => number): number {
  const span = max - min + systemBalance.minRollInclusiveOffset;
  return Math.floor(rng() * span) + min;
}

function pickRandom<T>(values: readonly T[], rng: () => number): T {
  return values[Math.floor(rng() * values.length)] as T;
}

function buildTierKey(tier: Tier): TierKey {
  return `tier${tier}`;
}

export function rollWeightedKey<T extends string>(
  table: WeightedEntry<T>,
  rng: () => number = Math.random,
): T {
  const entries = Object.entries(table) as Array<[T, number]>;
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  const cursor = rng() * total;

  let cumulative = 0;
  for (const [key, weight] of entries) {
    cumulative += weight;
    if (cursor <= cumulative) {
      return key;
    }
  }

  return entries[entries.length - 1][0];
}

export function rollGearRank(rng: () => number = Math.random): GearRank {
  return rollWeightedKey(gearRankRates, rng);
}

export function rollStatFromMinMax(min: number, max: number, rng: () => number = Math.random): number {
  return randomInt(min, max, rng);
}

export function rollGearBaseStats(
  gearBase: GearBaseDef,
  rank: GearRank,
  rng: () => number = Math.random,
): StatBlock {
  const multiplier = gearRankBaseMultiplier[rank];
  const result: StatBlock = {};

  for (const stat of CORE_STATS) {
    const min = gearBase.baseStatsMin[stat];
    const max = gearBase.baseStatsMax[stat];
    if (typeof min !== "number" || typeof max !== "number") {
      continue;
    }

    const scaledMin = Math.floor(min * multiplier);
    const scaledMax = Math.floor(max * multiplier);
    result[stat] = rollStatFromMinMax(scaledMin, scaledMax, rng);
  }

  return result;
}

export function rollGearOptions(
  rank: Exclude<GearRank, "unique">,
  slot: Exclude<GearSlot, "accessory">,
  rng: () => number = Math.random,
): Array<{ key: OptionKey; value: number; label: string }> {
  const basePool = [...gearOptionPool[rank]];
  const slotPool = slotRestrictedOptions[slot];
  const candidatePool = slotPool
    ? basePool.filter((option) => slotPool.includes(option))
    : basePool;

  const optionCount = Math.min(gearRankOptionCount[rank], candidatePool.length);
  const result: Array<{ key: OptionKey; value: number; label: string }> = [];
  const rankMultiplier = gearRankBaseMultiplier[rank];

  for (let i = 0; i < optionCount; i += 1) {
    const picked = pickRandom(candidatePool, rng);
    const pickedIndex = candidatePool.indexOf(picked);
    candidatePool.splice(pickedIndex, 1);

    const range = optionValueRanges[picked];
    const min = Math.floor(range.min * rankMultiplier);
    const max = Math.floor(range.max * rankMultiplier);
    const value = rollStatFromMinMax(min, max, rng);

    result.push({ key: picked, value, label: range.label });
  }

  return result;
}

export function rollAccessory(
  tier: Tier,
  rng: () => number = Math.random,
): { rank: AccessoryRank; accessoryId: string } {
  const rank = rollWeightedKey(accessoryRankRates, rng);
  const tierPool = accessoryDropPools[buildTierKey(tier)] as readonly string[];
  const targetPool =
    rank === "unique"
      ? tierPool.filter((id) => uniqueAccessoryIds.includes(id as (typeof uniqueAccessoryIds)[number]))
      : tierPool.filter((id) => !uniqueAccessoryIds.includes(id as (typeof uniqueAccessoryIds)[number]));

  const fallbackPool = targetPool.length > 0 ? targetPool : tierPool;
  return { rank, accessoryId: pickRandom(fallbackPool, rng) };
}

export function rollAccessoryOptions(
  rank: Exclude<AccessoryRank, "unique">,
  rng: () => number = Math.random,
): Array<{ key: OptionKey; value: number; label: string }> {
  const pool = [...accessoryOptionPool[rank]];
  const optionCount = Math.min(gearRankOptionCount[rank], pool.length);
  const rankMultiplier = gearRankBaseMultiplier[rank];
  const results: Array<{ key: OptionKey; value: number; label: string }> = [];

  for (let i = 0; i < optionCount; i += 1) {
    const picked = pickRandom(pool, rng);
    const pickedIndex = pool.indexOf(picked);
    pool.splice(pickedIndex, 1);

    const range = optionValueRanges[picked];
    const min = Math.floor(range.min * rankMultiplier);
    const max = Math.floor(range.max * rankMultiplier);
    const value = rollStatFromMinMax(min, max, rng);

    results.push({ key: picked, value, label: range.label });
  }

  return results;
}

export type ChestRewardType = "gold" | "normal_material" | "rare_material" | "seal" | "accessory";

export function rollChestReward(
  tier: Tier,
  isSpecial: boolean,
  rng: () => number = Math.random,
):
  | { type: "gold"; amount: number }
  | { type: "normal_material" | "rare_material"; materialId: string; amount: number }
  | { type: "seal"; materialId: string; amount: number }
  | { type: "accessory"; rank: AccessoryRank; accessoryId: string } {
  const chestTable = isSpecial ? specialChestTable : normalChestTable;
  const table = Object.fromEntries(chestTable.map((entry) => [entry.type, entry.chance])) as Record<
    ChestRewardType,
    number
  >;

  const pickedType = rollWeightedKey(table, rng);

  if (pickedType === "gold") {
    const amount = isSpecial
      ? rollStatFromMinMax(chestGoldRanges.special.min, chestGoldRanges.special.max, rng)
      : rollStatFromMinMax(
          chestGoldRanges.normal[buildTierKey(tier)].min,
          chestGoldRanges.normal[buildTierKey(tier)].max,
          rng,
        );

    return { type: "gold", amount };
  }

  if (pickedType === "accessory") {
    return { type: "accessory", ...rollAccessory(tier, rng) };
  }

  if (pickedType === "seal") {
    const seals = materials.filter((material) => material.rarity === "special");
    return { type: "seal", materialId: pickRandom(seals, rng).id, amount: 1 };
  }

  const rarity = pickedType === "normal_material" ? "normal" : "rare";
  const tierMaterials = materials.filter((material) => material.rarity === rarity && material.tier === tier);
  return {
    type: pickedType,
    materialId: pickRandom(tierMaterials, rng).id,
    amount: rollStatFromMinMax(1, 3, rng),
  };
}

export type EnemyKillReward = {
  gold: number;
  materials: Array<{ materialId: string; amount: number }>;
  accessory?: { rank: AccessoryRank; accessoryId: string };
};

export function rollEnemyDrop(
  enemy: EnemyDef,
  enemyKind: "normal" | "elite" | "boss",
  rng: () => number = Math.random,
): EnemyKillReward {
  const materialsReward: Array<{ materialId: string; amount: number }> = [];

  for (const normalDrop of enemy.normalDrops) {
    const chance = Math.min(normalDrop.chance, enemyDropRules.normalMaterialChance);
    if (rng() * systemBalance.percentDivisor <= chance) {
      materialsReward.push({
        materialId: normalDrop.materialId,
        amount: rollStatFromMinMax(normalDrop.min, normalDrop.max, rng),
      });
    }
  }

  for (const rareDrop of enemy.rareDrops) {
    const chance = Math.min(rareDrop.chance, enemyDropRules.rareMaterialChance);
    if (rng() * systemBalance.percentDivisor <= chance) {
      materialsReward.push({
        materialId: rareDrop.materialId,
        amount: rollStatFromMinMax(rareDrop.min, rareDrop.max, rng),
      });
    }
  }

  const accessoryChance =
    enemy.accessoryDropChance ??
    (enemyKind === "boss" ? enemyDropRules.bossAccessoryChance : enemyDropRules.eliteAccessoryChance);

  const uniqueChance =
    enemy.uniqueAccessoryDropChance ?? (enemyKind === "boss" ? enemyDropRules.bossUniqueAccessoryChance : 0);

  const uniqueRoll = rng() * systemBalance.percentDivisor;
  const accessoryRoll = rng() * systemBalance.percentDivisor;

  let accessoryReward: EnemyKillReward["accessory"];
  if (uniqueRoll <= uniqueChance) {
    const tierPool = accessoryDropPools[buildTierKey(enemy.tier)] as readonly string[];
    const uniquePool = tierPool.filter((id) => uniqueAccessoryIds.includes(id as (typeof uniqueAccessoryIds)[number]));
    if (uniquePool.length > 0) {
      accessoryReward = { rank: "unique", accessoryId: pickRandom(uniquePool, rng) };
    }
  } else if (accessoryRoll <= accessoryChance) {
    accessoryReward = rollAccessory(enemy.tier, rng);
  }

  return {
    gold: rollStatFromMinMax(enemy.goldMin, enemy.goldMax, rng),
    materials: materialsReward,
    accessory: accessoryReward,
  };
}

export function calcAwakenedBaseValue(baseValue: number, awakenLevel: number): number {
  const clampedAwakenLevel = Math.min(awakenLevel, awakenBalance.maxLevel);
  return Math.floor(baseValue * (1 + awakenBalance.baseGrowthPerLevel * clampedAwakenLevel));
}

export function calcRequiredExpForLevel(level: number): number {
  return getBaseExpToNextLevel(level);
}

export function calcRequiredExpWithRebirthMultiplier(level: number, rebirthCount: number): number {
  const multiplier =
    rebirthExpMultipliers[Math.min(rebirthCount, rebirthExpMultipliers.length - 1)] ??
    rebirthExpMultipliers[rebirthExpMultipliers.length - 1];
  return Math.floor(calcRequiredExpForLevel(level) * multiplier);
}

export function calcFinalPlayerStats(input: {
  level: number;
  rebirthCount: number;
  baseStats: Pick<Required<StatBlock>, "hp" | "attack" | "defense">;
  levelGrowth: Pick<Required<StatBlock>, "hp" | "attack" | "defense">;
  gearFlatStats?: StatBlock;
  accessoryFlatStats?: StatBlock;
  percentBonusStats?: Partial<Record<"hp" | "attack" | "defense", number>>;
  rateBonusStats?: Partial<Record<"expRate" | "goldRate" | "dropRate" | "critRate" | "critDamage", number>>;
}): Required<Pick<StatBlock, "hp" | "attack" | "defense">> &
  Pick<StatBlock, "moveSpeed" | "expRate" | "goldRate" | "dropRate" | "critRate" | "critDamage"> {
  const levelOffset = Math.max(0, input.level - 1);
  const rebirth = input.rebirthCount;

  const rebirthBaseBonus = {
    hp: rebirthBonusPerCount.baseHp * rebirth,
    attack: rebirthBonusPerCount.baseAttack * rebirth,
    defense: rebirthBonusPerCount.baseDefense * rebirth,
  };

  const rebirthGrowthBonus = {
    hp: rebirthBonusPerCount.hpGrowth * rebirth,
    attack: rebirthBonusPerCount.attackGrowth * rebirth,
    defense: rebirthBonusPerCount.defenseGrowth * rebirth,
  };

  const coreResult = CORE_STATS.reduce(
    (acc, stat) => {
      const base = input.baseStats[stat] + rebirthBaseBonus[stat];
      const growth = input.levelGrowth[stat] + rebirthGrowthBonus[stat];
      const baseWithLevel = base + growth * levelOffset;
      const flat = (input.gearFlatStats?.[stat] ?? 0) + (input.accessoryFlatStats?.[stat] ?? 0);
      const percent = input.percentBonusStats?.[stat] ?? 0;

      acc[stat] = Math.floor(baseWithLevel * (1 + percent / systemBalance.percentDivisor) + flat);
      return acc;
    },
    { hp: 0, attack: 0, defense: 0 } as Required<Pick<StatBlock, "hp" | "attack" | "defense">>,
  );

  return {
    ...coreResult,
    moveSpeed: (input.gearFlatStats?.moveSpeed ?? 0) + (input.accessoryFlatStats?.moveSpeed ?? 0),
    expRate: input.rateBonusStats?.expRate ?? 0,
    goldRate: input.rateBonusStats?.goldRate ?? 0,
    dropRate: input.rateBonusStats?.dropRate ?? 0,
    critRate: input.rateBonusStats?.critRate ?? 0,
    critDamage: input.rateBonusStats?.critDamage ?? 0,
  };
}

export function findGearBase(gearBaseId: string): GearBaseDef | undefined {
  return gearBases.find((gearBase) => gearBase.id === gearBaseId);
}

export function findAccessory(accessoryId: string): AccessoryDef | undefined {
  return accessories.find((accessory) => accessory.id === accessoryId);
}
