import { Application, Renderer } from "pixi.js";
import { Loading } from "./loading";
import { SlotMachine } from "./slotMachine";

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
      const slotMachine = new SlotMachine(this.app);
      slotMachine.run();

    })()
  }

}