import { Application, Renderer, Container } from "pixi.js";
import { SlotBuilder } from "./slotBuilder";
import { CONSTANTS, winMultiplier, SlotItemIdsKeys } from "../data";
import { randomizer } from "./slotRandomizer";
import { uiElements } from "./uiElementsBuilder";
import { sound } from "./sound";

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
  private idle = false;

  constructor(app: Application) {
    this.app = app;
    this.slotBuilder = new SlotBuilder(this.app);
  }

  getIdleState = () => this.idle;

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
    this.idle = true;

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
    this.idle = false;
    if (randomizer.checkWin()) {
      const amount = this.calculateWinAmount(randomizer.mainLine[0]);
      sound.runSound(sound.victorySound);
      await uiElements.runVictoryPopup(this.app, randomizer.mainLine[0], amount);
    }
    uiElements.spinButtonOnStop();
    this.slotBuilder.constructNewSlotMachine();
  }

  spinButtonPress() {
    const activeButton = uiElements.spinButtonActive!;
    if (this.idle || !this.isEnoughMoney()) return;
    uiElements.buttonPointerUpEffect(activeButton);

    sound.runSoundLoop(sound.spinSound);
    uiElements.spinButtonOnPlay();

    this.placeBet();

    this.spinAnimation(this.slotBuilder.container, this.spinAnimationStop);
  }

  run() {
    this.slotBuilder.createSlotMachine();
    const activeButton = uiElements.spinButtonActive!;

    activeButton.on("pointerdown", () => uiElements.buttonPointerDownEffect(activeButton));

    activeButton.on("pointerup", () => this.spinButtonPress());

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !this.idle && uiElements.victoryContainer.children.length === 0) uiElements.buttonPointerDownEffect(activeButton);
    });

    window.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' && uiElements.victoryContainer.children.length === 0) this.spinButtonPress();
    });

    sound.toggleSound(this.getIdleState);
  }
}