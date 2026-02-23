import { stack, note, repl } from "@strudel/core";
import { initAudioOnFirstClick, getAudioContext, webaudioOutput } from "@strudel/webaudio";

initAudioOnFirstClick();

const ctx = getAudioContext();
const { scheduler } = repl({
  defaultOutput: webaudioOutput,
  getTime: () => ctx.currentTime,
});

let hasSetPattern = false;

document.getElementById("start").addEventListener("click", () => {
  // Build your pattern once (or rebuild each time if you prefer)
  if (!hasSetPattern) {
    const pattern = stack(
      note("d3").slow(23.5),
      note("d4").slow(25.5),
      note("b3").slow(27.375),
      note("f#4").slow(29),

      note("a3 f#4").slow(24.25),
      note("a3 c#4").slow(26.5),
      note("c#4 e4").slow(28.25),

      note("e3 g3 b3").slow(25),
      note("f#3 a3 d4").slow(27),
      note("g3 d4 a4").slow(28.625),
      note("b3 e4 g4").slow(29.9375),

      note("g3 b3 d4 f#4").slow(26),
      note("e4 g4 b4 d5").slow(27.75),
      note("d3 a3 f#4 d5").slow(29.5)
    )
      .s("sine")
      .attack(0.8)
      .decay(0.5)
      .sustain(0.6)
      .release(2)
      .gain(0.3)
      .room(0.5)
      .size(4);

    // With defaultOutput set to webaudioOutput, you can set the pattern directly.
    scheduler.setPattern(pattern);
    hasSetPattern = true;
  }

  scheduler.start();
});

document.getElementById("stop").addEventListener("click", () => {
  scheduler.stop();
});