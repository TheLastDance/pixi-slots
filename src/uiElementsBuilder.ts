import { Application, Renderer, Assets, Sprite, Texture, Text, Container } from "pixi.js";
import { CONSTANTS } from "./data";

const { WIDTH, SLOTSTRIPEFULLSIZE, SYMBOLSPERREELVIEW } = CONSTANTS;

export class UiElementsBuilder {
  spinButtonActive: Sprite | null = null;
  spinButtonInactive: Sprite | null = null;
  creditText: Text | null = null;
  private buttonMarginCoef: number = 1.25;

  async addAsset(name: string): Promise<Texture> {
    const asset = Assets.load(name);
    return asset;
  }

  async createSprite(name: string) {
    const loadedAsset = await this.addAsset(name);
    const sprite = new Sprite(loadedAsset);
    return sprite;
  }

  async addBackground(app: Application<Renderer>) {
    const background = await this.createSprite("background");
    app.stage.addChild(background);
    app.stage.setChildIndex(background, 0);
    background.width = app.canvas.width;
    background.height = app.canvas.height;
  }

  async addSpinButton(app: Application<Renderer>) {
    const button = await this.createSprite("btn-active");
    app.stage.addChild(button);
    button.width = WIDTH;
    button.height = WIDTH;
    button.eventMode = "static";
    button.cursor = "pointer";
    button.anchor.set(0.5, 0.5);
    button.position.set(
      app.canvas.width - button.width,
      app.canvas.height - button.height / this.buttonMarginCoef
    );

    this.spinButtonActive = button;
    return button;
  }

  async addSpinButtonInactive(app: Application<Renderer>) {
    const button = await this.createSprite("btn-inactive");
    app.stage.addChild(button);
    button.width = WIDTH;
    button.height = WIDTH;
    button.eventMode = "static";
    button.anchor.set(0.5, 0.5);
    button.position.set(
      app.canvas.width - button.width,
      app.canvas.height - button.height / this.buttonMarginCoef
    );

    button.interactive = false;
    button.visible = false;
    this.spinButtonInactive = button;
    return button;
  }

  async addDiamondSprite(app: Application, isLeft = true) {
    const diamond = await this.createSprite("diamond");
    app.stage.addChild(diamond);
    diamond.width = 35;
    diamond.height = 35;
    diamond.anchor.set(0.5, 0.5);

    if (isLeft) {
      diamond.position.set(
        app.canvas.width / 2 - diamond.width / 2 - (SYMBOLSPERREELVIEW * SLOTSTRIPEFULLSIZE) / 2,
        (SYMBOLSPERREELVIEW * SLOTSTRIPEFULLSIZE) / 2 - diamond.height / 2);
      diamond.angle = -90;
    } else {
      diamond.position.set(
        app.canvas.width / 2 - diamond.width / 2 + (SYMBOLSPERREELVIEW * SLOTSTRIPEFULLSIZE) / 2,
        (SYMBOLSPERREELVIEW * SLOTSTRIPEFULLSIZE) / 2 - diamond.height / 2);
      diamond.angle = 90;
    }


    return diamond;
  }

  async addCredit(app: Application, money: number) {
    const block = await this.createSprite("block-credit");
    const container = new Container();

    const text = new Text({
      text: `CREDIT ${money}`,
      style: {
        fontFamily: 'Arial',
        fontSize: 22,
        fill: "#fff",
        align: 'center',
      }
    });

    text.position.set((block.width - text.width) / 2, (block.height - text.height) / 2)

    container.addChild(block, text);
    container.position.set(0, 0);
    app.stage.addChild(container);
    container.position.set(WIDTH / 2, app.canvas.height - block.height - WIDTH / 2)

    this.creditText = text;
    return { container, text, block };
  }

}

export const uiElements = new UiElementsBuilder();