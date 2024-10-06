import { uiElements } from "./uiElementsBuilder";

export class Sound {
  isSoundOn = true;
  spinSound = new Audio("./assets/wheel-sound.wav");
  victorySound = new Audio("./assets/victory-sound.wav");

  soundOn = (getIdle: () => boolean) => {
    this.isSoundOn = true;
    const soundOffButton = uiElements.soundOffButton!;
    const soundOnButton = uiElements.soundOffButton!;

    const idle = getIdle();

    if (idle) this.spinSound.play();

    soundOffButton.visible = true;
    soundOffButton.interactive = true;
    soundOnButton.visible = false;
    soundOnButton.interactive = false;
  }

  soundOff = () => {
    this.isSoundOn = false;
    const soundOffButton = uiElements.soundOffButton!;
    const soundOnButton = uiElements.soundOffButton!;

    for (const key in this) {
      if (this[key] instanceof Audio && !this[key].paused) {
        this[key].pause();
        this[key].currentTime = 0;
      }
    }

    soundOffButton.visible = false;
    soundOffButton.interactive = false;
    soundOnButton.visible = true;
    soundOnButton.interactive = true;
  }

  runSound(sound: HTMLAudioElement) {
    if (this.isSoundOn) {
      sound.volume = 0.35;
      sound.play();
    }
  }

  runSoundLoop(sound: HTMLAudioElement) {
    if (this.isSoundOn) {
      sound.volume = 0.35;
      sound.loop = true;
      sound.play();
    }
  }

  toggleSound(getIdle: () => boolean) {
    const soundOnButton = uiElements.soundOnButton!;
    const soundOffButton = uiElements.soundOffButton!;

    soundOnButton.on("pointerdown", this.soundOff);
    soundOffButton.on("pointerdown", () => this.soundOn(getIdle));
  }
}

export const sound = new Sound();