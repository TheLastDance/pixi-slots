import { Application, Renderer } from "pixi.js";
import { SlotBuilder } from "./slotBuilder";
import { CONSTANTS, winMultiplier, SlotItemIdsKeys } from "./data";
import { randomizer } from "./slotRandomizer";
import { uiElements } from "./uiElementsBuilder";

const {
  SLOTSTRIPEFULLSIZE,
  SYMBOLSPERREELVIEW,
  SYMBOLSREELQUANTITY,
  SLOTSSPEED,
  SPEEDLIMIT,
  SPEEDSTEP,
  BET,
  INITIALMONEY
} = CONSTANTS;

export class SlotMachine {
  app: Application<Renderer>;
  money: number = INITIALMONEY;
  bet: number = BET;

  constructor(app: Application) {
    this.app = app;
  }

  isEnoughMoney() {
    return this.money >= this.bet;
  }

  placeBet() {
    this.money -= this.bet;
  }

  calculateWinAmount(symbol: SlotItemIdsKeys) {
    const winning = this.bet * winMultiplier[symbol];
    this.money += winning;
  }

  run() {
    const reels = new SlotBuilder(this.app);
    reels.createSlotMachine();

    const text = uiElements.creditText!;
    const activeButton = uiElements.spinButtonActive!;
    const inactiveButton = uiElements.spinButtonInactive!;

    activeButton.on("pointerdown", () => {
      activeButton.width = 110;
      activeButton.height = 110;
    })

    activeButton.on("pointerup", () => {
      activeButton.width = 120;
      activeButton.height = 120;
      activeButton.visible = false;
      inactiveButton.visible = true;

      if (!this.isEnoughMoney()) return;

      this.placeBet();

      text.text = `CREDIT ${this.money}`;
      const container = reels.container;
      const containerInitialY = container.y;
      const speed = SLOTSSPEED; // Scrolling speed
      let speedChange = 1;

      const scrollTicker = () => {
        const containerLastPoint = -SLOTSTRIPEFULLSIZE * (SYMBOLSREELQUANTITY - SYMBOLSPERREELVIEW) + containerInitialY;
        if (container.y > containerLastPoint) {
          if (speedChange > SPEEDLIMIT) speedChange -= SPEEDSTEP;
          container.position.y -= speed * speedChange;
        } else {
          this.app.ticker.remove(scrollTicker);
          activeButton.visible = true;
          inactiveButton.visible = false;
          console.log(randomizer.checkWin(), randomizer.mainLine);
          if (randomizer.checkWin()) {
            this.calculateWinAmount(randomizer.mainLine[0]);
            text.text = `CREDIT ${this.money}`;
          }
          reels.constructNewSlotMachine();
        }
      }

      this.app.ticker.add(scrollTicker);
    })
  }
}