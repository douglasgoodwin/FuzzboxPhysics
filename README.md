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

Three browser-based tools built with the Web Audio API. All are single self-contained HTML files — no build step, no frameworks.

### Distortion Lab (`fuzzbox-lab.html`)

Seven clipping algorithms (hard, soft/tanh, asymmetric, foldback, bitcrush, tube, half-wave rectify) with real-time oscilloscopes, spectrum analyzers, spectrograms, and VU meters. Input from oscillator, microphone, or audio files. Reverb chamber with five synthetic impulse responses. Wet/dry on everything.

### Spectral Sculptor (`fuzzbox-sculptor.html`)

Interactive spectrogram editor. Displays a 2-second audio loop as a full spectrogram, then lets students paint energy directly into the frequency domain with a brush tool. STFT analysis, modification, and ISTFT resynthesis on mouse release. Built-in source generators (pluck, drone, fifth, vowel, noise, silence) plus mic recording.

### Digital Octavia (`fuzzbox-octavia.html`)

Stage-by-stage simulation of the Roger Mayer Octavia octave fuzz (1967). Five visible signal chain stages — input buffer, fuzz, transformer, full-wave rectifier, output filter — each with its own oscilloscope showing before/after waveforms. Germanium vs silicon transistor and diode models. The rectifier stage demonstrates how `|x|` doubles frequency to produce an octave up.

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

