import { Application, Renderer, Text } from "pixi.js";
import { SlotBuilder } from "./slotBuilder";
import { CONSTANTS, winMultiplier, SlotItemIdsKeys } from "./data";
import { randomizer } from "./slotRandomizer";

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

    const text = new Text({
      text: `PRESS ME ${this.money}`,
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xff1010,
        align: 'center',
      }
    });

    this.app.stage.addChild(text);
    text.position.set(0, 0);
    text.eventMode = "static";
    text.cursor = "pointer";

    text.on("pointerdown", () => {
      if (!this.isEnoughMoney()) return;

      this.placeBet();

      text.text = `PRESS ME ${this.money}`;
      const container = reels.container;
      const containerInitialY = container.y;
      const speed = SLOTSSPEED; // Scrolling speed
      let speedChange = 1;

      const scrollTicker = () => {
        const containerLastPoint = -SLOTSTRIPEFULLSIZE * (SYMBOLSREELQUANTITY - SYMBOLSPERREELVIEW) + containerInitialY;
        if (container.y > containerLastPoint) {
          if (speedChange > SPEEDLIMIT) speedChange -= SPEEDSTEP;
          container.position.y -= speed * speedChange;
          text.interactive = false;
        } else {
          this.app.ticker.remove(scrollTicker);
          text.interactive = true;
          console.log(randomizer.checkWin(), randomizer.mainLine);
          if (randomizer.checkWin()) {
            this.calculateWinAmount(randomizer.mainLine[0]);
            text.text = `PRESS ME ${this.money}`;
          }
          reels.constructNewSlotMachine();
        }
      }

      this.app.ticker.add(scrollTicker);
    })
  }
}