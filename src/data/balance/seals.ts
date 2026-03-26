export const sealEffects = {
  trainingSeal: {
    description: "10個ごとに鍛冶屋生成時の高ランク率を微増",
    step: 10,
    maxStacks: 10,
  },
  wealthSeal: {
    description: "5個ごとにゴールド獲得量+1%",
    step: 5,
    maxStacks: 50,
  },
  knowledgeSeal: {
    description: "5個ごとに獲得経験値+1%",
    step: 5,
    maxStacks: 50,
  },
  explorationSeal: {
    description: "10個ごとにレア素材ドロップ率+1%",
    step: 10,
    maxStacks: 20,
  },
  jewelSeal: {
    description: "10個ごとにアクセドロップ率+0.5%",
    step: 10,
    maxStacks: 20,
  },
} as const;
