import { Application, Renderer, Text } from "pixi.js";
import { Loading } from "./loading";
import { SlotReel } from "./slotReel";

export class GameBase {
  app: Application<Renderer>;
  root: HTMLElement;
  value: number;

  constructor() {
    const root = document.createElement("main");
    document.body.appendChild(root);
    root.style.cssText = "position: absolute; top: 50%; left:50%; transform: translate(-50%,-50%);"
    document.body.style.cssText = "margin: 0px; padding:0px; width: 100%; height: 100%; overflow: hidden;";

    this.root = root;
    this.app = new Application();
    this.value = 0;
  }

  init() {
    (async () => {
      await this.app.init({
        backgroundColor: "#ff0",
        width: 900,
        height: 600,
        // resizeTo: window,
      });


      this.root.appendChild(this.app.canvas);
      const load = new Loading(this.app);
      load.loadInit();

      const reel = new SlotReel(this.app);
      reel.createReelContainer();

      const text = new Text({
        text: this.value,
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
        this.value = this.value + 1;
        text.text = this.value;
        const container = reel.container;
        container.y = 0;
        const speed = 7.5; // Scrolling speed

        const scrollTicker = () => {
          if (container.y > -150 * (20 - 1 - 2)) {
            container.y -= speed;
            text.interactive = false;
          } else {
            this.app.ticker.remove(scrollTicker);
            text.interactive = true;
            reel.consctructNewReel();
          }
        }

        this.app.ticker.add(scrollTicker);
      })

    })()
  }

}