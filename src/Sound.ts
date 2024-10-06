

export class Sound {
  isSoundOn = true;
  spinSound = new Audio("./assets/wheel-sound.wav");
  victorySound = new Audio("./assets/victory-sound.wav");

  soundOn() {
    this.isSoundOn = true;
    for (const key in this) {
      if (this[key] instanceof Audio) this[key].volume = 0.35;
    }
  }

  soundOff() {
    this.isSoundOn = false;
    for (const key in this) {
      if (this[key] instanceof Audio) this[key].volume = 0;
    }
  }

  runSound(sound: HTMLAudioElement) {
    sound.volume = 0.35;
    sound.play();
  }

  runSoundLoop(sound: HTMLAudioElement) {
    sound.volume = 0.35;
    sound.loop = true;
    sound.play();
  }
}

export const sound = new Sound();