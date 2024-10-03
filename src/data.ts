interface IAssetsData {
  alias: string,
  src: string,
}

interface IConstants {
  WIDTH: number,
  HEIGHT: number,
  SLOTSTRIPEFULLSIZE: number,
  SYMBOLSQUANTITY: keyof typeof slotItemIds,
  SYMBOLSREELQUANTITY: number,
  SYMBOLSPERREELVIEW: number,
  SLOTSSPEED: number,
  SPEEDLIMIT: number,
  SPEEDSTEP: number,
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
  WIDTH: 135,
  HEIGHT: 135,
  SLOTSTRIPEFULLSIZE: 150,
  SYMBOLSQUANTITY: 5,
  SYMBOLSREELQUANTITY: 20,
  SYMBOLSPERREELVIEW: 3,
  SLOTSSPEED: 7.5,
  SPEEDLIMIT: 0.4,
  SPEEDSTEP: 0.0015,
}