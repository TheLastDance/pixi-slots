import { Application, Renderer, Container } from "pixi.js";
import { SlotBuilder } from "./slotBuilder";
import { CONSTANTS, winMultiplier, SlotItemIdsKeys } from "./data";
import { randomizer } from "./slotRandomizer";
import { uiElements } from "./uiElementsBuilder";
import { sound } from "./Sound";

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
  private slotBuilder: SlotBuilder;

  constructor(app: Application) {
    this.app = app;
    this.slotBuilder = new SlotBuilder(this.app);
  }

  isEnoughMoney() {
    return this.money >= this.bet;
  }

  placeBet() {
    this.money -= this.bet;
    uiElements.creditText!.text = `CREDIT ${this.money}`;
  }

  calculateWinAmount(symbol: SlotItemIdsKeys) {
    const winning = this.bet * winMultiplier[symbol];
    this.money += winning;
    uiElements.creditText!.text = `CREDIT ${this.money}`;
    return winning;
  }

  spinAnimation(container: Container, onAnimationEnd: () => void) {
    const containerInitialY = container.y;
    const containerLastPoint = -SLOTSTRIPEFULLSIZE * (SYMBOLSREELQUANTITY - SYMBOLSPERREELVIEW) + containerInitialY;
    const speed = SLOTSSPEED; // Scrolling speed
    let speedChange = 1;

    const ticker = () => {
      if (container.y > containerLastPoint) {
        if (speedChange > SPEEDLIMIT) speedChange -= SPEEDSTEP;
        container.position.y -= speed * speedChange;
      } else {
        this.app.ticker.remove(ticker);
        onAnimationEnd();
      }
    }

    this.app.ticker.add(ticker);
  }

  spinAnimationStop = async () => {
    sound.spinSound.pause();
    sound.spinSound.currentTime = 0;
    if (randomizer.checkWin()) {
      const amount = this.calculateWinAmount(randomizer.mainLine[0]);
      sound.runSound(sound.victorySound);
      await uiElements.runVictoryPopup(this.app, randomizer.mainLine[0], amount);
    }
    uiElements.spinButtonOnStop();
    this.slotBuilder.constructNewSlotMachine();
  }

  run() {
    this.slotBuilder.createSlotMachine();

    const activeButton = uiElements.spinButtonActive!;

    activeButton.on("pointerdown", () => uiElements.buttonPointerDownEffect(activeButton))

    activeButton.on("pointerup", () => {
      sound.runSoundLoop(sound.spinSound);
      uiElements.buttonPointerUpEffect(activeButton);
      if (!this.isEnoughMoney()) return;
      uiElements.spinButtonOnPlay();

      this.placeBet();

      this.spinAnimation(this.slotBuilder.container, this.spinAnimationStop);
    })
  }
}