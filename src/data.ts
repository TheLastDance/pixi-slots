interface IAssetsData {
  alias: string,
  src: string,
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