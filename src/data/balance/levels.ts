export const MAX_LEVEL = 100;

export function getBaseExpToNextLevel(level: number): number {
  return Math.floor(12 + (level - 1) * (level - 1) * 2.2 + (level - 1) * 8);
}
