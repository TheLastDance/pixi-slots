interface IAssetsData {
  alias: string,
  src: string,
}

export type SlotItemIdsKeys = keyof typeof slotItemIds;

interface IConstants {
  WIDTH: number,
  HEIGHT: number,
  SLOTSTRIPEFULLSIZE: number,
  SYMBOLSQUANTITY: SlotItemIdsKeys,
  SYMBOLSREELQUANTITY: number,
  SYMBOLSPERREELVIEW: number,
  SLOTSSPEED: number,
  SPEEDLIMIT: number,
  SPEEDSTEP: number,
  SAMENUMBERSPROBABILITY: number,
  BET: number,
  INITIALMONEY: number,
  [key: string]: number,
}

export const assetsData: IAssetsData[] = [
  {
    alias: "cherries",
    src: "./assets/cherries.png",
  },
  {
    alias: "lemon",
    src: "./assets/lemon.png",
  },
  {
    alias: "orange",
    src: "./assets/orange.png",
  },
  {
    alias: "plum",
    src: "./assets/plum.png",
  },
  {
    alias: "watermelon",
    src: "./assets/watermelon.png",
  },
  {
    alias: "btn-active",
    src: "./assets/btn-active.png",
  },
  {
    alias: "btn-inactive",
    src: "./assets/btn-inactive.png",
  },
  {
    alias: "background",
    src: "./assets/background.jpg",
  },
  {
    alias: "diamond",
    src: "./assets/diamond.png",
  },
  {
    alias: "block-credit",
    src: "./assets/block-credit.png",
  }
]

export const slotItemIds = {
  1: "plum",
  2: "orange",
  3: "lemon",
  4: "cherries",
  5: "watermelon",
}

export const CONSTANTS: IConstants = {
  WIDTH: 120,
  HEIGHT: 120,
  SLOTSTRIPEFULLSIZE: 157,
  SYMBOLSQUANTITY: 5,
  SYMBOLSREELQUANTITY: 20,
  SYMBOLSPERREELVIEW: 3,
  SLOTSSPEED: 8,
  SPEEDLIMIT: 0.3,
  SPEEDSTEP: 0.0015,
  SAMENUMBERSPROBABILITY: 0.1,
  BET: 1,
  INITIALMONEY: 100,
}

export const winningProbabilities: { [key: number]: number } = {
  1: 0.35, // plum
  2: 0.25, // orange
  3: 0.2, // lemon
  4: 0.125, // cherries
  5: 0.075, // watermelon
}

export const winMultiplier = {
  1: 3, // plum
  2: 5, // orange
  3: 10, // lemon
  4: 15, // cherries
  5: 50, // watermelon
}