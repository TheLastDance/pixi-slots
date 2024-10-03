import { Application, Renderer, Text } from "pixi.js";
import { Loading } from "./loading";
import { SlotBuilder } from "./slotBuilder";
import { CONSTANTS } from "./data";

const {
  SLOTSTRIPEFULLSIZE,
  SYMBOLSPERREELVIEW,
  SYMBOLSREELQUANTITY,
  SLOTSSPEED,
  SPEEDLIMIT,
  SPEEDSTEP
} = CONSTANTS;

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
        backgroundColor: "#000",
        width: 900,
        height: 600,
        //resizeTo: window,
      });


      this.root.appendChild(this.app.canvas);
      const load = new Loading(this.app);
      load.loadInit();

      const reels = new SlotBuilder(this.app);
      reels.createSlotMachine();

      const text = new Text({
        text: `PRESS ME ${this.value}`,
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
        text.text = `PRESS ME ${this.value}`;
        const container = reels.container;
        const containerInitialY = container.y;
        const speed = SLOTSSPEED; // Scrolling speed
        let speedChange = 1;

        const scrollTicker = () => {
          const containerLastPoint = -SLOTSTRIPEFULLSIZE * (SYMBOLSREELQUANTITY - SYMBOLSPERREELVIEW) + containerInitialY;
          if (container.y > containerLastPoint) {
            if (speedChange > SPEEDLIMIT) speedChange -= SPEEDSTEP;
            container.position.y -= speed * speedChange;
            text.interactive = false;
          } else {
            this.app.ticker.remove(scrollTicker);
            text.interactive = true;
            reels.constructNewSlotMachine();
          }
        }

        this.app.ticker.add(scrollTicker);
      })

    })()
  }

}