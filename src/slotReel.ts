import { Application, Renderer, Container, Assets, Sprite } from "pixi.js";
import { slotItemIds, SlotItemIdsKeys } from "./data";
import { CONSTANTS } from "./data";

const {
  WIDTH,
  HEIGHT,
  SYMBOLSQUANTITY,
  SYMBOLSREELQUANTITY,
  SYMBOLSPERREELVIEW,
  SLOTSTRIPEFULLSIZE
} = CONSTANTS;

export class SlotReel {
  app: Application<Renderer>;
  length: number;
  symbolQuantity: number;
  reel: SlotItemIdsKeys[];
  container: Container = new Container();

  constructor(app: Application<Renderer>, length = SYMBOLSREELQUANTITY, symbolQuantity = SYMBOLSQUANTITY) {
    this.app = app;
    this.length = length;
    this.symbolQuantity = symbolQuantity;
    this.reel = this.generateReel();
  }

  generateReel(length: number = this.length) {
    const reel: SlotItemIdsKeys[] = [];

    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * this.symbolQuantity) + 1;
      reel.push(random as SlotItemIdsKeys);
    }

    return reel;
  }

  createReelContainer(reel: SlotItemIdsKeys[] = this.reel) {
    const spriteBuilder = async () => {
      const promises = reel.map((slot) => Assets.load(slotItemIds[slot]));
      const assets = await Promise.all(promises);

      assets.forEach(async (slot, index) => {
        const sprite = new Sprite(slot);
        sprite.width = WIDTH;
        sprite.height = HEIGHT;
        this.container.addChild(sprite);
        sprite.position.set(0, index * SLOTSTRIPEFULLSIZE);
      });
    }

    spriteBuilder();
    this.app.stage.addChild(this.container);
  }

  consctructNewReel() {
    const lastThreeSprites = this.container.children.slice(-SYMBOLSPERREELVIEW);
    const generateReel = this.generateReel(this.length - SYMBOLSPERREELVIEW);
    const newReel = this.reel.slice(-SYMBOLSPERREELVIEW).concat(generateReel);
    this.reel = newReel;
    const newContainer = new Container();

    lastThreeSprites.forEach((sprite, index) => {
      sprite.position.set(0, index * SLOTSTRIPEFULLSIZE);
      newContainer.addChild(sprite);
    });

    this.container.destroy({ children: true });
    this.container = newContainer;
  }
}