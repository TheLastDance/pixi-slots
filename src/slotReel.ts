import { Application, Renderer, Container, Assets, Sprite, Graphics } from "pixi.js";
import { slotItemIds } from "./data";

type SlotItemIdsKeys = keyof typeof slotItemIds;

export class SlotReel {
  app: Application<Renderer>;
  length: number;
  symbolQuantity: number;
  reel: SlotItemIdsKeys[] = [];
  container: Container = new Container();

  constructor(app: Application<Renderer>, length = 20, symbolQuantity = 5) {
    this.app = app;
    this.length = length;
    this.symbolQuantity = symbolQuantity;
  }

  generateReel(length: number = this.length) {
    this.reel = [];
    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * this.symbolQuantity) + 1;
      this.reel.push(random as SlotItemIdsKeys);
    }

    return this.reel;
  }

  createReelContainer(reel: SlotItemIdsKeys[] = this.generateReel()) {
    reel.forEach(async (slot, index) => {
      const asset = await Assets.load(slotItemIds[slot]);
      const sprite = new Sprite(asset);
      sprite.width = 135;
      sprite.height = 135;
      this.container.addChild(sprite);
      sprite.position.set(0, index * 150)
    });

    const mask = new Graphics()
      .rect(0, 0, 135, 150 * 3)
      .fill(0xff0000);

    this.container.mask = mask;
    this.app.stage.addChild(mask);
    this.app.stage.addChild(this.container);
  }

  consctructNewReel() {
    const array = this.reel.splice(-3);
    const generateReel = this.generateReel(this.length - 3);
    const newReel = array.concat(generateReel);
    this.container.destroy({ children: true });
    this.container = new Container();
    this.createReelContainer(newReel);
  }

  get getContainer() {
    return this.container;
  }

  get getReel() {
    return this.reel;
  }
}