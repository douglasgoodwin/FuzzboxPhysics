# Fuzzbox Physics

**CSCM 373-01 — CalArts Experimental Animation**
Doug Goodwin

A course that traces sound from air vibration through transduction, amplification, and intentional distortion. Students build circuits on breadboards and explore the physics through browser-based labs.

## Quick Start

```
node server.js
```

Opens at [http://localhost:3000](http://localhost:3000). Drop audio files into `wavs/` and they appear automatically in the web labs.

Requires [Node.js](https://nodejs.org) (any recent version). No dependencies to install.

## Web Labs

Browser-based tools built with the Web Audio API. No build step, no frameworks. Most labs are single self-contained HTML files with inline JS. The two pedalboard pages share a common engine (`pedalboard-engine.js`) to avoid duplication.

### Distortion Lab (`fuzzbox-lab.html`)

Seven clipping algorithms (hard, soft/tanh, asymmetric, foldback, bitcrush, tube, half-wave rectify) with real-time oscilloscopes, spectrum analyzers, spectrograms, and VU meters. Input from oscillator, microphone, or audio files. Reverb chamber with five synthetic impulse responses. Wet/dry on everything.

### Spectral Sculptor (`fuzzbox-sculptor.html`)

Interactive spectrogram editor. Displays a 2-second audio loop as a full spectrogram, then lets students paint energy directly into the frequency domain with a brush tool. STFT analysis, modification, and ISTFT resynthesis on mouse release. Built-in source generators (pluck, drone, fifth, vowel, noise, silence) plus mic recording.

### Digital Octavia (`fuzzbox-octavia.html`)

Stage-by-stage simulation of the Roger Mayer Octavia octave fuzz (1967). Five visible signal chain stages — input buffer, fuzz, transformer, full-wave rectifier, output filter — each with its own oscilloscope showing before/after waveforms. Germanium vs silicon transistor and diode models. The rectifier stage demonstrates how `|x|` doubles frequency to produce an octave up.

### Reverb Matching Lab (`fuzzbox-reverb.html`)

Record a clap in a real room, then match its reverb with a synthetic impulse response engine. Seven-band Schroeder decay curves show how each octave band dies out over time. A/B comparison with match scoring.

### Transfer Function Lab (`fuzzbox-transfer.html`)

Draw your own waveshaper transfer function and hear the result in real time. The drawn curve maps input amplitude to output amplitude — any departure from a straight diagonal creates distortion. Presets for hard clip, soft clip, foldback, half rectify, staircase, and dead zone. See the [note on harmonics](#how-distortion-creates-harmonics) below.

### Spectrograph (`fuzzbox-spectrograph.html`)

Encode an image into sound. Upload a photo or take a selfie, map pixel brightness to spectral magnitudes, and synthesize audio via inverse FFT. The output spectrogram reveals your image — like the Aphex Twin face hidden in "Equation."

### Spectral Average (`fuzzbox-average.html`)

What does an entire piece of music sound like all at once? Computes the average spectrum of a recording — thousands of FFT frames collapsed into a single composite tone. Inspired by Jim Campbell's *Illuminated Averages*.

### Name That Distortion (`fuzzbox-game.html`)

Ear training game. A mystery distortion is applied to a signal — students use the waveform, spectrum, and their ears to identify which algorithm is active. Three difficulty levels, streak scoring, and the option to hide the visualizations for ears-only mode.

### Modular Pedalboard (`fuzzbox-pedalboard.html`)

Build your own signal chain from scratch. Drag and reorder filter, gain, distortion, and utility modules to hear how topology changes the sound. Each module shows its analog circuit schematic — JFET common-source amplifiers for gain, CMOS 4069UB inverters for clipping, passive RC networks for filters. Bias point control on clipping stages demonstrates how shifting the DC operating point introduces even harmonics. One example preset (TS-style) plus guided experiments. Save/load chains as JSON files. Shared engine in `pedalboard-engine.js`.

Available modules: Low-Pass, High-Pass, Band-Pass, Tone Stack (Flat/Treble Cut/Big Muff/Fender/Marshall), Peak EQ, Clean Boost, Soft Clip (with bias + asymmetry), Hard Clip (with bias + asymmetry), Foldback, Rectifier (full-wave/half-wave), Bit Crush, Noise Gate, Delay.

### Pedalboard Recipe Book (`fuzzbox-pedalboard-recipes.html`)

Thirteen classic pedal topologies deconstructed into building blocks. Each recipe shows the signal chain, component-level rationale, and source topology reference. Load any recipe, then rearrange blocks to hear what each stage contributes.

- **Overdrive:** Tube Screamer, Klon Centaur, Blues Driver, Clean Boost, Rangemaster
- **Distortion:** ProCo Rat, Boss DS-1, MXR Distortion+ / DOD 250
- **Fuzz:** Big Muff Pi, Fuzz Face, Tonebender Mk II, Octavia
- **Lo-fi:** AM Radio

### Phase Drift (`fuzzbox-drift.html`)

Generative phasing piece. Fourteen sine wave voices cycle at slightly different rates through D major, drifting in and out of alignment. The harmony is always consonant but never repeats. Uses the Strudel library.

### Exercises and Worksheets

- `sculptor-exercise.html` — Building Timbre from Nothing (Spectral Sculptor exercise)
- `transfer-exercise.html` — Waveform Distortion Worksheet (online version)
- `worksheet-distortion.html` — Printable distortion worksheet for class

## How Distortion Creates Harmonics

No FFT is involved in creating harmonics — the FFT spectrum analyzer only reveals them after the fact. Distortion is a purely time-domain operation: the nonlinear transfer function reshapes the waveform sample by sample (`output[i] = f(input[i])`), and the reshaped waveform is mathematically equivalent to a sum of new sinusoidal components.

The mechanism is the **power series expansion** of the transfer function:

```
f(x) = a₁x + a₂x² + a₃x³ + a₄x⁴ + ...
```

When you feed in a sine wave `sin(ωt)`, each power of x generates specific harmonics via trigonometric identities:

- **x²** → sin²(ωt) = ½ − ½cos(2ωt) → DC + **2nd harmonic**
- **x³** → sin³(ωt) = ¾sin(ωt) − ¼sin(3ωt) → fundamental + **3rd harmonic**
- **x⁴** → DC + **2nd** + **4th** (even harmonics)
- **x⁵** → fundamental + **3rd** + **5th** (odd harmonics)

The pattern: **even powers produce even harmonics, odd powers produce odd harmonics.**

### Symmetric → odd harmonics only

A symmetric transfer function satisfies `f(−x) = −f(x)`. This forces all even-power coefficients (a₂, a₄, a₆...) to zero — only odd powers survive. Examples: `tanh(x)` = x − x³/3 + 2x⁵/15 − ..., hard clipping, foldback. All produce only odd harmonics (3rd, 5th, 7th...).

### Asymmetric → even + odd harmonics

An asymmetric function has `f(−x) ≠ −f(x)`, meaning the even-power coefficients are nonzero. The tube model in the labs demonstrates this: adding a DC bias (`x + 0.15`) shifts the sine wave off-center on the tanh curve, so positive peaks hit a different region of the S-curve than negative peaks. This breaks the symmetry and introduces even harmonics (2nd, 4th...) alongside the odd ones. Half-wave rectification is the extreme case — the Fourier series of a half-rectified sine explicitly contains the 2nd and 4th harmonics.

### The intuition

If you clip the top and bottom of a wave identically (symmetric), the top half still mirrors the bottom. That mirror symmetry cancels even harmonics. Break the mirror — clip the top harder than the bottom, or remove the bottom entirely — and the waveform requires even harmonics to describe its lopsided shape. This is why tube amps (biased asymmetrically) sound "warm" (even harmonics) while transistor hard clipping sounds "buzzy" (odd harmonics).

## Server (`server.js`)

Zero-dependency Node.js static file server with one API endpoint:

- `GET /api/wavs` — returns a JSON list of audio files in `wavs/`

The web labs call this endpoint on load to build WAV-loading buttons dynamically. Files can also be loaded via drag-and-drop or file picker without the server.

## Course Materials

- `_Fuzzbox overview.md` — 10-week course plan
- `fuzzbox_hybrid.md` — 14-week hybrid version (with Handmade Electronic Music integration)
- `DECKS/` — weekly lecture plans (W01–W10) and shared power block schematic
- `LISTEN01/` — week 1 listening materials (Bessie Smith, Son House, Howlin' Wolf, Muddy Waters)
- `wavs/` — audio clips for use in the web labs
- Artist study notes: `SonHouse.md`, `BessieSmith.md`, `Rumble.md`, `DickDale.md`, `JimiHendrix.md`
- `vocalovertones+formants.md` — vocal harmonics and formant reference
- `W02_fuzzbox.md` — week 2 slide deck (resonance, Lucier, room profiling)
- `wind_pickup/` — field recordings and photos from wind pickup experiments
- `cscm-373-01-fuzzbox-physics-export.imscc` — Instructure Canvas course export
- Breadboard images: `5,2 breadboard 1.png`, `breadboard for gain 1 schem.png`
- `main.js` — Strudel generative music sketch

## Reference Texts

- Nicolas Collins, *Handmade Electronic Music* (3rd ed.)
- Caleb Kelly (ed.), *Sound* (Whitechapel: Documents of Contemporary Art)
- Jonathan Sterne (ed.), *The Sound Studies Reader*

## Proposed File Reorganization

The project has grown organically. Here is a suggested structure:

```
_FUZZBOX/
  README.md
  server.js

  app/                          # web labs
    fuzzbox-lab.html
    fuzzbox-sculptor.html
    fuzzbox-octavia.html
    fuzzbox-pedalboard.html       # modular pedalboard (starter)
    fuzzbox-pedalboard-recipes.html # pedalboard recipe book (13 presets)
    pedalboard-engine.js          # shared engine for both pedalboard pages
    fuzzbox-drift.html

  wavs/                         # audio clips for the labs
    cmajdirect_2sec.wav
    cmajdirect_4sec.wav

  course/                       # syllabus and planning
    overview.md
    hybrid.md
    canvas-export.imscc

  lectures/                     # weekly slide decks and lecture notes
    W01.md
    W02.md
    ...
    W10.md
    W02_fuzzbox.md
    power-block.md

  listening/                    # artist studies + media
    artists/
      SonHouse.md
      BessieSmith.md
      Rumble.md
      DickDale.md
      JimiHendrix.md
    W01/                        # week 1 listening media
      (mp4, webm files)
      finals/
    vocalovertones+formants.md

  hardware/                     # breadboard builds and schematics
    breadboard-5.2.png
    gain-1-schematic.png

  field/                        # field recordings and experiments
    wind_pickup/

  sketches/                     # code experiments
    main.js                     # Strudel sketch

  texts/                        # reference PDFs
    collins-handmade-electronic-music.pdf
    kelly-sound-whitechapel.pdf
    sterne-sound-studies-reader.pdf
```

