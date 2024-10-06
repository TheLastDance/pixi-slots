import { Application, Renderer, Assets, Sprite, Texture, Text, Container } from "pixi.js";
import { CONSTANTS, SlotItemIdsKeys, slotItemIds } from "./data";

const { WIDTH, SLOTSTRIPEFULLSIZE, SYMBOLSPERREELVIEW, INITIALMONEY, POPUPTIME } = CONSTANTS;

export class UiElementsBuilder {
  spinButtonActive: Sprite | null = null;
  spinButtonInactive: Sprite | null = null;
  creditText: Text | null = null;
  soundOnButton: Sprite | null = null;
  soundOffButton: Sprite | null = null;
  private buttonMarginCoef = 1.25;
  private downScaleButtonPressCoef = 0.9;
  private popupSize = 450;
  private victoryContainer = new Container();

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

  buttonPointerDownEffect(button: Sprite) {
    button.width = WIDTH * this.downScaleButtonPressCoef;
    button.height = WIDTH * this.downScaleButtonPressCoef;
  }

  buttonPointerUpEffect(button: Sprite) {
    button.width = WIDTH;
    button.height = WIDTH;
  }

  spinButtonOnPlay() {
    if (this.spinButtonActive && this.spinButtonInactive) {
      this.spinButtonActive.visible = false;
      this.spinButtonInactive.visible = true;
    }
  }

  spinButtonOnStop() {
    if (this.spinButtonActive && this.spinButtonInactive) {
      this.spinButtonActive.visible = true;
      this.spinButtonInactive.visible = false;
    }
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

  async runVictoryPopup(app: Application, symbol: SlotItemIdsKeys, amount: number) {
    const popup = await this.createSprite("victory-popup");
    const symbolSprite = await this.createSprite(slotItemIds[symbol]);

    popup.width = this.popupSize;
    popup.height = this.popupSize;
    symbolSprite.width = WIDTH;
    symbolSprite.height = WIDTH;

    const text = new Text({
      text: `YOU WIN ${amount}$ !`,
      style: {
        fontFamily: 'Arial',
        fontSize: 40,
        fill: "#fff",
      }
    });

    symbolSprite.position.set(this.popupSize / 2 - symbolSprite.width / 2, this.popupSize / 2 - symbolSprite.height / 6);
    text.position.set(this.popupSize / 2 - text.width / 2, this.popupSize - symbolSprite.height / 2);
    this.victoryContainer.addChild(popup, symbolSprite, text);
    app.stage.addChild(this.victoryContainer);

    await new Promise(res => setTimeout(res, POPUPTIME));

    text.destroy();
    symbolSprite.destroy();
    popup.destroy();

  }

  async soundButton(app: Application) {
    const soundOn = await this.createSprite("btn-sound");
    const soundOff = await this.createSprite("btn-no-sound");
    soundOn.position.set(app.canvas.width - soundOn.width, 0);
    soundOff.position.set(app.canvas.width - soundOff.width, 0);
    soundOn.eventMode = "static";
    soundOff.eventMode = "static";
    soundOn.interactive = true;
    soundOff.visible = false;
    soundOn.cursor = "pointer";
    soundOff.cursor = "pointer";
    app.stage.addChild(soundOn, soundOff);

    this.soundOnButton = soundOn;
    this.soundOffButton = soundOff;
  }

  async buildAllInitialElements(app: Application) {
    this.addDiamondSprite(app, true);
    this.addDiamondSprite(app, false);
    await this.addBackground(app);
    await this.addCredit(app, INITIALMONEY);
    await this.addSpinButton(app);
    await this.addSpinButtonInactive(app);
    await this.soundButton(app);
    this.victoryContainer.position.set(app.canvas.width / 2 - this.popupSize / 2, app.canvas.height / 2 - this.popupSize / 2);
    app.stage.addChild(this.victoryContainer);
  }

}

export const uiElements = new UiElementsBuilder();