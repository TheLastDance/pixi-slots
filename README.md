# Pixi Slots Machine

This is a simple slot machine game developed using the PixiJS library.

[Production link](https://pixi-slots.vercel.app)

## Installation

1. Clone this repository to your local machine with `git clone`
2. Install dependencies - `npm install`
3. Start the project - `npm run start`

## Game options manipulation

If you'd like to modify game settings, such as bet amounts, starting credits, or win probabilities, you can make changes in the `src/data.ts` file.

CONSTANTS - In the CONSTANTS object, you can change the primary game settings (SAMENUMBERSPROBABILITY affects the probability of victory which is 10% by default)

```
export const CONSTANTS: IConstants = {
  WIDTH: 120, // size of main sprites
  HEIGHT: 120, // size of main sprites
  SLOTSTRIPEFULLSIZE: 157, // size + gap of main sprites
  SYMBOLSQUANTITY: 5, // unique symbols (plum, orange, lemon, cherries, watermelon)
  SYMBOLSREELQUANTITY: 20, // symbols quantity in each reel
  SYMBOLSPERREELVIEW: 3, // 3x3 reel
  SLOTSSPEED: 8, // animation
  SPEEDLIMIT: 0.3, // animation
  SPEEDSTEP: 0.0015, // animation
  SAMENUMBERSPROBABILITY: 0.1, // probability of winning
  BET: 1, // bet
  INITIALMONEY: 100, // initial credits
  POPUPTIME: 2000, // victory popup show time
}

```

winningProbabilities - To adjust the probability for each symbol to appear on the center line, modify the winningProbabilities object

```
export const winningProbabilities: { [key: number]: number } = {
  1: 0.35, // plum
  2: 0.25, // orange
  3: 0.2, // lemon
  4: 0.125, // cherries
  5: 0.075, // watermelon
}

```

winMultiplier - To set the payout multiplier for each symbol, adjust the winMultiplier object

```
export const winMultiplier = {
  1: 3, // plum
  2: 5, // orange
  3: 10, // lemon
  4: 15, // cherries
  5: 50, // watermelon
}

```

