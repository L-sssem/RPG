import type { MissionDef } from "@/types/game";

export const missions: MissionDef[] = [
  {
    id: "mission_t1_kill_slime",
    name: "スライム討伐",
    description: "スライムを30体倒す",
    category: "kill",
    targetId: "slime",
    goal: 30,
    rewards: {
      gold: 300,
      materials: [{ materialId: "slime_gel", amount: 10 }],
    },
  },
  {
    id: "mission_t1_boss_grawl",
    name: "草原王討伐",
    description: "草原王グラウルを3回倒す",
    category: "boss",
    targetId: "grassland_king_grawl",
    goal: 3,
    rewards: {
      gold: 900,
      materials: [{ materialId: "grass_king_fang", amount: 1 }],
    },
  },
  {
    id: "mission_level_100",
    name: "極致到達",
    description: "Lv100に到達する",
    category: "level",
    goal: 100,
    rewards: {
      gold: 15000,
      guaranteedAccessory: true,
    },
  },
];
