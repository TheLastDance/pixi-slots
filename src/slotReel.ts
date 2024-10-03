import { Application, Renderer, Container, Assets, Sprite, Graphics } from "pixi.js";
import { slotItemIds } from "./data";

type SlotItemIdsKeys = keyof typeof slotItemIds;

export class SlotReel {
  app: Application<Renderer>;
  length: number;
  symbolQuantity: number;
  reel: SlotItemIdsKeys[];
  container: Container = new Container();
  private mask: Graphics;

  constructor(app: Application<Renderer>, length = 20, symbolQuantity = 5) {
    this.app = app;
    this.length = length;
    this.symbolQuantity = symbolQuantity;
    this.reel = this.generateReel();
    this.mask = new Graphics()
      .rect(0, 0, 135, 150 * 3)
      .fill(0xff0000);
  }

  generateReel(length: number = this.length) {
    const reel: SlotItemIdsKeys[] = [];

    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * this.symbolQuantity) + 1;
      reel.push(random as SlotItemIdsKeys);
    }

    return reel;
  }

  createReelContainer(reel: SlotItemIdsKeys[] = this.reel, posRatio: number = 0) {
    console.log(this.reel)

    const spriteBulder = async () => {
      const promises = reel.map((slot) => Assets.load(slotItemIds[slot]));
      const assets = await Promise.all(promises);

      assets.forEach(async (slot, index) => {
        const sprite = new Sprite(slot);
        sprite.width = 135;
        sprite.height = 135;
        this.container.addChild(sprite);
        sprite.position.set(0, (index + posRatio) * 150)
      });
    }

    spriteBulder();

    this.container.mask = this.mask;
    this.app.stage.addChild(this.container);
  }

  consctructNewReel() {
    const lastThreeSprites = this.container.children.slice(-3);
    const generateReel = this.generateReel(this.length - 3);
    const newReel = this.reel.slice(-3).concat(generateReel);
    this.reel = newReel;
    const newContainer = new Container();

    lastThreeSprites.forEach((sprite, index) => {
      sprite.position.set(0, index * 150);
      newContainer.addChild(sprite);
    });

    this.container.destroy({ children: true });
    this.container = newContainer;

    this.createReelContainer(generateReel, 3);
  }

  get getContainer() {
    return this.container;
  }

  get getReel() {
    return this.reel;
  }
}