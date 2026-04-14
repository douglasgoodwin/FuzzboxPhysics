# Breadboard Filters Worksheet — Answer Key

CSCM 373-01 — Fuzzbox Physics — CalArts

---

## Part 1 — Know Your Signal Chain

**1.** A 3.5 mm TRS plug: **Tip** = Left channel, **Ring** = Right channel, **Sleeve** = Ground. The sleeve is the longest section, nearest the cable. Students should identify which of their three wires corresponds to each.

**2.** The resistors isolate the two output amplifiers inside the phone from each other. Without them, any difference in level or phase between L and R causes the two amps to fight (one tries to push current into the other), increasing distortion and stressing the output stage. The 10 kΩ resistors limit the current that can flow between channels, letting each amp see a safe load while the signals add together at the junction.

**3.**
- **VCC** — Power supply input. Connect to the positive terminal of the 9V battery. This powers the amplifier chip.
- **IN** — Audio signal input. The filtered signal from the breadboard enters here.
- **GND** — Ground / 0V reference. Connect to the negative terminal of the battery and the headphone ground. All parts of the circuit must share a common ground.

**4.** A headphone output is designed to drive low-impedance loads (16–32 Ω headphones) at very low power (milliwatts). A piezo speaker needs more voltage swing to produce audible sound — the LM386 provides voltage gain (~20× by default, up to 200×) and enough current to drive the piezo. Without the amp, the signal would be too quiet to hear clearly.

---

## Part 2 — Direct Connection

**Q1.** The piezo naturally emphasizes midrange and upper frequencies — it sounds thin, tinny, and "buzzy" compared to the phone speaker. Bass is almost completely absent because piezo elements are very stiff and don't move enough air at low frequencies. High-mids and treble are exaggerated.

**Q2.** With a sine sweep, the piezo is typically silent below ~300–500 Hz, begins to produce faint sound in the 500–1000 Hz range, and gets loudest around 2–4 kHz (where the piezo's resonant frequency sits). It drops off again in the high treble. This is the piezo's own frequency response acting as a built-in bandpass filter. Results will vary by piezo element.

---

## Part 3 — Low-Pass Filter

**B.** The sound is noticeably darker / more muffled than the unfiltered version. High-frequency detail (cymbals, sibilance, pick attack) is reduced. The bass and lower mids remain relatively unchanged.

**C.** With the sine sweep, the sound should start getting noticeably quieter somewhere around 700–800 Hz. Above ~1.5 kHz it's very faint or gone. Compare to the unfiltered sweep where the piezo was loudest at 2–4 kHz — that peak is now suppressed by the filter.

**D.** fc = 1 / (2π × 22000 × 10 × 10⁻⁹) = 1 / (2π × 0.00022) ≈ **723 Hz**. This should match the measured cutoff from the sweep (the -3 dB point, where the volume drops to ~70% of the unfiltered level).

**E.** With 47 nF: fc = 1 / (2π × 22000 × 47 × 10⁻⁹) = 1 / (2π × 0.001034) ≈ **154 Hz**. The sound is much darker — almost everything above bass is cut. The larger capacitor lowers the cutoff dramatically because it shunts more signal to ground at lower frequencies.

**F.** With 10 kΩ + 47 nF: fc = 1 / (2π × 10000 × 47 × 10⁻⁹) ≈ **339 Hz**. The cutoff moves up compared to 22 kΩ + 47 nF (154 Hz), so slightly more treble comes through. Lower resistance means the capacitor has to "work harder" (reach a lower impedance) to shunt the signal, which only happens at higher frequencies.

---

## Part 4 — High-Pass Filter

**B.** Bass and lower-mids are removed. The sound becomes thin, bright, and "tinny" — like listening through a telephone. Kick drum and bass guitar disappear. Cymbals and vocals (upper harmonics) remain.

**C.** fc = 1 / (2π × 22000 × 100 × 10⁻⁹) = 1 / (2π × 0.0022) ≈ **72 Hz**. This is a gentle bass cut — only the deepest bass is removed, though on the piezo (which already lacks bass) the effect may be subtle.

**D.** With 10 nF: fc = 1 / (2π × 22000 × 10 × 10⁻⁹) ≈ **723 Hz**. Now the filter cuts everything below 723 Hz — a much more aggressive bass cut. The smaller capacitor has higher impedance at low frequencies, blocking more of the signal from reaching the output. The sound becomes very thin and hollow.

---

## Part 5 — Component Swap Table

| Filter type | R | C | Calculated fc | Sound description |
|------------|---|---|--------------|-------------------|
| Low-pass | 22 kΩ | 10 nF | **723 Hz** | Noticeable treble cut, muffled |
| Low-pass | 22 kΩ | 47 nF | **154 Hz** | Very dark, almost only bass |
| Low-pass | 10 kΩ | 47 nF | **339 Hz** | Dark but less extreme than above |
| High-pass | 22 kΩ | 100 nF | **72 Hz** | Subtle — cuts only sub-bass |
| High-pass | 22 kΩ | 10 nF | **723 Hz** | Thin, bright, no bass or low-mids |

---

## Part 6 — Thinking It Through

**1.** At high frequencies the capacitor's impedance drops very low (Xc = 1/2πfC), so it acts almost like a short circuit to ground. High-frequency current flows through the capacitor to ground instead of continuing to the output. The energy is dissipated as heat in the resistor (which limits the current) and in the source impedance. The capacitor doesn't "absorb" the energy — it diverts it away from the output path.

**2.** The R and C form a voltage divider, but one element's impedance changes with frequency. In a low-pass, you take the output across the capacitor (to ground) — its impedance is high at low frequencies (full voltage appears there) and low at high frequencies (voltage drops to zero). In a high-pass, you take the output across the resistor (to ground) — the resistor's impedance is constant, but the capacitor in series blocks low frequencies (high impedance) and passes high frequencies (low impedance). Same components, same fc, but the output tap point determines what survives.

**3.** When R decreases, fc = 1/(2πRC) increases — wait, actually in a guitar tone circuit, the pot is wired so that turning the knob down *decreases* the resistance in series with the cap, which *lowers* fc (more treble gets shunted to ground). So fc drops, cutting more highs, making the sound darker. Yes, this matches what you hear: tone knob down = darker.

**4.** The piezo naturally emphasizes upper-mids and treble and has almost no bass response. This means: the **low-pass** filter has a very obvious effect because it cuts exactly the frequencies the piezo reproduces well. The **high-pass** at 72 Hz might sound almost identical to unfiltered because the piezo wasn't reproducing those low frequencies anyway. The piezo's own frequency response "masks" the high-pass effect at low cutoff frequencies.

---

## Challenge — Bandpass Filter

High-pass: C = 100 nF, R = 10 kΩ → fc = 1 / (2π × 10000 × 100 × 10⁻⁹) ≈ **159 Hz** (passes above 159 Hz)

Low-pass: R = 22 kΩ, C = 10 nF → fc = 1 / (2π × 22000 × 10 × 10⁻⁹) ≈ **723 Hz** (passes below 723 Hz)

The surviving band is roughly **159–723 Hz** — a midrange window. This is the "telephone" effect: bass below 159 Hz is cut by the high-pass, treble above 723 Hz is cut by the low-pass. What's left is the fundamental range of the human voice and the body of guitars. The result sounds nasal, boxy, and bandwidth-limited — like AM radio or a phone call.

Note: The piezo's own frequency response already de-emphasizes bass, so the high-pass stage may sound less dramatic than expected. The low-pass cutting the upper-mids and treble should be the more obvious effect on the piezo.
