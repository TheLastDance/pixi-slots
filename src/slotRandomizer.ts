import { winningProbabilities, CONSTANTS, SlotItemIdsKeys } from "./data";
const { SAMENUMBERSPROBABILITY, SYMBOLSPERREELVIEW } = CONSTANTS;

export class SlotRandomizer {
  sameNumbersProbability = SAMENUMBERSPROBABILITY;
  mainLine: SlotItemIdsKeys[] = [];

  wheightedRandomSymbol(probabilities: { [key: number]: number } = winningProbabilities): SlotItemIdsKeys {
    const rand = Math.random();
    let sum = 0;

    for (const key in probabilities) {
      sum += probabilities[key];
      if (rand <= sum) {
        return +key as SlotItemIdsKeys;
      }
    }

    return 1;
  }

  randomizeMain() {
    let result: SlotItemIdsKeys[] = [];
    const sameNumbersRand = Math.random();

    if (sameNumbersRand <= this.sameNumbersProbability) {
      const sameNumber = this.wheightedRandomSymbol();
      result = [sameNumber, sameNumber, sameNumber];
    } else {
      for (let i = 0; i < SYMBOLSPERREELVIEW; i++) {
        result.push(this.wheightedRandomSymbol());
      }
    }

    this.mainLine = result;
    return result;
  }

  checkWin(mainLine: SlotItemIdsKeys[] = this.mainLine) {
    return mainLine.every(item => item === mainLine[0]);
  }

}

export const randomizer = new SlotRandomizer();