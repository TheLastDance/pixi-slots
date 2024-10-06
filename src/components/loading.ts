import { Text, Application, Renderer, Assets } from "pixi.js";
import { assetsData } from "../data";

export class Loading {
  app: Application<Renderer>;
  loadProgressText: Text = new Text();

  constructor(app: Application<Renderer>) {
    this.app = app;
  }

  createLoadProgressText() {
    const text = new Text({
      text: `Loading: 0%`,
      style: {
        fontFamily: 'Arial',
        fontSize: 40,
        fill: "#fff",
      }
    });

    this.loadProgressText = text;
    this.app.stage.addChild(text);
    this.loadProgressText.position.set(this.app.canvas.width / 2 - this.loadProgressText.width / 2, this.app.canvas.height / 2 - this.loadProgressText.height / 2);
  }

  onProgress = (progress: number) => {
    console.log("Loading:", progress);
    this.loadProgressText.text = `Loading: ${Math.floor(progress * 100)}%`;
    if (progress >= 1) this.loadProgressText.destroy();
  }

  async loadAssets() {
    assetsData.forEach((item) => Assets.add(item));
    await Assets.load(assetsData, this.onProgress);
  }

  loadInit() {
    this.createLoadProgressText();
    this.loadAssets();
  }
}