import { Application, Container, Renderer, Graphics } from "pixi.js";
import { SlotReel } from "./slotReel";
import { CONSTANTS } from "./data";

const { SYMBOLSPERREELVIEW, SLOTSTRIPEFULLSIZE } = CONSTANTS;

export class SlotBuilder {
  app: Application<Renderer>;
  reels: SlotReel[];
  container: Container = new Container();
  private mask: Graphics;
  private reelCount: number;
  private posX: number;
  private posY: number;

  constructor(app: Application, reelsCount: number = SYMBOLSPERREELVIEW) {
    this.reels = Array.from({ length: reelsCount }, () => new SlotReel(app));
    this.reelCount = reelsCount;
    this.app = app;
    this.posX = this.app.canvas.width / 2 - (this.reelCount * SLOTSTRIPEFULLSIZE) / 2;
    this.posY = this.app.canvas.height / 2 - (this.reelCount * SLOTSTRIPEFULLSIZE) / 2;
    this.mask = new Graphics()
      .rect(this.posX, this.posY, SLOTSTRIPEFULLSIZE * reelsCount, SLOTSTRIPEFULLSIZE * reelsCount)
      .fill(0xff0000);
  }

  createSlotMachine() {
    console.log(this.container.y);
    this.reels.forEach((reel, index) => {
      this.container.mask = this.mask;
      reel.createReelContainer();
      reel.container.position.set(index * SLOTSTRIPEFULLSIZE, 0);
      this.container.addChild(reel.container);
      this.app.stage.addChild(this.container);
      this.container.position.set(this.posX, this.posY);
    });
  }

  constructNewSlotMachine() {
    this.reels.forEach(reel => {
      reel.consctructNewReel();
    })
    this.createSlotMachine();
    console.log(this.container)
  }
}