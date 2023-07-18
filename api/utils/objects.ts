export type ObjectsType = {
    name: string,
    rarity: string,
    description: string,
    probability: number,
    cost: number
}

export const objects: ObjectsType[] = [
    { name: "Object 1", rarity: "common", description: "cool obj", probability: 0.1, cost: 50 },
    { name: "Object 2", rarity: "common", description: "cool obj", probability: 0.1, cost: 50 },
    { name: "Object 3", rarity: "common", description: "cool obj", probability: 0.1, cost: 50 },
    { name: "Object 4", rarity: "common", description: "cool obj", probability: 0.1, cost: 50 },
    { name: "Object 5", rarity: "common", description: "cool obj", probability: 0.1, cost: 50  },
    { name: "Object 6", rarity: "common", description: "cool obj", probability: 0.1, cost: 50 },
    { name: "Object 7", rarity: "common", description: "cool obj", probability: 0.1, cost: 50 },
    { name: "Object 8", rarity: "common", description: "cool obj", probability: 0.1, cost: 50 },
    { name: "Object 9", rarity: "common", description: "cool obj", probability: 0.1, cost: 50 },
    { name: "Object 10", rarity: "common", description: "cool obj", probability: 0.1, cost: 50 },
    { name: "Object 11", rarity: "uncommon", description: "cool obj", probability: 0.05, cost: 100 },
    { name: "Object 12", rarity: "uncommon", description: "cool obj", probability: 0.05, cost: 100 },
    { name: "Object 13", rarity: "uncommon", description: "cool obj", probability: 0.05, cost: 100 },
    { name: "Object 14", rarity: "uncommon", description: "cool obj", probability: 0.05, cost: 100 },
    { name: "Object 15", rarity: "uncommon", description: "cool obj", probability: 0.05, cost: 100 },
    { name: "Object 16", rarity: "rare", description: "cool obj", probability: 0.2, cost: 200 },
    { name: "Object 17", rarity: "rare", description: "cool obj", probability: 0.2, cost: 200 },
    { name: "Object 18", rarity: "epic", description: "cool obj", probability: 0.15, cost: 300 },
    { name: "Object 19", rarity: "epic", description: "cool obj", probability: 0.15, cost: 300 },
    { name: "Object 20", rarity: "legendary", description: "cool obj", probability: 0.1, cost: 300 },
  ];

  const totalProbability = objects.reduce((acc, obj) => acc + obj.probability, 0);

  export function selectObject() {
    const random = Math.random() * totalProbability;
    let sum = 0;
    for (const obj of objects) {
        sum += obj.probability;
        if (random <= sum) {
            return obj;
        }
    }
  }