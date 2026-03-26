import type { GearRank } from "@/types/game";

export const gearRankRates: Record<GearRank, number> = {
  common: 48,
  magic: 28,
  rare: 15,
  epic: 6.5,
  legendary: 2.2,
  unique: 0.3,
};

export const gearRankBaseMultiplier: Record<GearRank, number> = {
  common: 1.0,
  magic: 1.07,
  rare: 1.15,
  epic: 1.27,
  legendary: 1.42,
  unique: 1.3,
};

export const gearRankOptionCount: Record<GearRank, number> = {
  common: 0,
  magic: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
  unique: 2,
};

export const accessoryRankRates = {
  magic: 45,
  rare: 30,
  epic: 16,
  legendary: 7,
  unique: 2,
} as const;
