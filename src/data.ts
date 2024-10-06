
// for game manipulation change this constants
export const CONSTANTS: IConstants = {
  WIDTH: 120, // size of main sprites
  HEIGHT: 120, // size of main sprites
  SLOTSTRIPEFULLSIZE: 157, // size + gap of main sprites
  SYMBOLSQUANTITY: 5, // unique symbols (plum, orange, lemon, cherries, watermelon)
  SYMBOLSREELQUANTITY: 20, // symbols quantity in each reel
  SYMBOLSPERREELVIEW: 3, // 3x3 reel
  SLOTSSPEED: 8, // animation
  SPEEDLIMIT: 0.3, // animation
  SPEEDSTEP: 0.0015, // animation
  SAMENUMBERSPROBABILITY: 0.1, // probability of winning
  BET: 1,
  INITIALMONEY: 100,
  POPUPTIME: 2000,
}

// each symbol probabilities on main line
export const winningProbabilities: { [key: number]: number } = {
  1: 0.35, // plum
  2: 0.25, // orange
  3: 0.2, // lemon
  4: 0.125, // cherries
  5: 0.075, // watermelon
}

// winning multiplier for each symbol
export const winMultiplier = {
  1: 3, // plum
  2: 5, // orange
  3: 10, // lemon
  4: 15, // cherries
  5: 50, // watermelon
}

export const slotItemIds = {
  1: "plum",
  2: "orange",
  3: "lemon",
  4: "cherries",
  5: "watermelon",
}

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
  POPUPTIME: number,
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
  },
  {
    alias: "victory-popup",
    src: "./assets/victory-popup.jpg",
  },
  {
    alias: "btn-sound",
    src: "./assets/btn-sound.png",
  },
  {
    alias: "btn-no-sound",
    src: "./assets/btn-no-sound.png",
  }
]