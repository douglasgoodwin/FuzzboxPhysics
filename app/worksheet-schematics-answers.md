# Schematics & Passive Filters Worksheet — Answer Key

CSCM 373-01 — Fuzzbox Physics — CalArts

---

## Part 1 — Symbol Identification

| Symbol | Name | Unit | What it does |
|--------|------|------|-------------|
| Zigzag | **Resistor** | Ohms (Ω) | Opposes current flow; used to set gain, bias points, and form voltage dividers in audio circuits |
| Two parallel lines | **Capacitor** (unpolarized) | Farads (F) | Blocks DC and passes AC; its impedance decreases with frequency, so it's used for coupling, filtering, and tone shaping |
| Humps/coils | **Inductor** | Henrys (H) | Stores energy in a magnetic field; impedance increases with frequency. Used in wah pedals and speaker crossovers |
| Zigzag + arrow | **Potentiometer** | Ohms (Ω) | Variable resistor with a wiper; used for volume and tone knobs — the wiper taps a variable point on the voltage divider |
| Stacked horizontal lines | **Ground** | — | The 0V reference point; all voltages in the circuit are measured relative to ground |
| Dot at junction | **Wire junction** (node) | — | Indicates wires are electrically connected; without the dot, crossing wires are NOT connected |

---

## Part 2 — Draw RC Filters

**2C.** The *only* difference is which component is in series and which is to ground. In the low-pass, R is in series and C shunts to ground. In the high-pass, C is in series and R shunts to ground. The topology is identical — just R and C swap positions.

---

## Part 3 — Simulate & Observe

**3.1.** At 100 Hz the output is nearly the same amplitude as the input (the capacitor's impedance is very high, so almost no signal is shunted to ground). At 2000 Hz the output drops significantly — the capacitor's impedance is low at high frequencies, so it shorts the signal to ground.

**3.2.** The default EveryCircuit example uses R = 1 kΩ, C = 1 µF. Calculated: fc = 1/(2π × 1000 × 0.000001) ≈ **159 Hz**. The simulated measurement should be close.

| R value | C value | Measured fc | Calculated fc | Match? |
|---------|---------|-------------|---------------|--------|
| 1 kΩ | 1 µF | ~160 Hz | 159 Hz | Y |

**3.3.** It becomes a **high-pass filter**. Now low frequencies are attenuated and high frequencies pass through. The cutoff frequency stays the same (159 Hz) — only which side is passed/blocked reverses.

---

## Part 4 — Build & Measure in Falstad

**4.1.** With R = 22 kΩ, C = 10 nF:

| Frequency | 100 Hz | 300 Hz | 500 Hz | 723 Hz | 1 kHz | 2 kHz | 5 kHz |
|-----------|--------|--------|--------|--------|-------|-------|-------|
| Output level | ~1.0 | ~0.92 | ~0.82 | ~0.70 | ~0.58 | ~0.34 | ~0.14 |

**4.2.** Yes — at 723 Hz the output should be approximately 0.707 (−3 dB). This is because fc = 1/(2π × 22000 × 10×10⁻⁹) = 1/(2π × 0.00022) ≈ **723 Hz**. At the cutoff frequency, the capacitor's impedance equals the resistance, forming a 1:1 voltage divider that outputs 1/√2 ≈ 0.707.

**4.3.** The response inverts: low frequencies are now attenuated while high frequencies pass. At 100 Hz the output is near zero; at 5 kHz it's near full. The cutoff is still 723 Hz, but it's now the −3 dB point from below rather than above.

---

## Part 5 — Calculate Cutoff Frequencies

| R | C | Calculation | fc | Context |
|---|---|------------|-----|---------|
| 22 kΩ | 10 nF | 1/(2π × 22000 × 10⁻⁸) | **723 Hz** | Tone knob (typical) |
| 10 kΩ | 47 nF | 1/(2π × 10000 × 4.7×10⁻⁸) | **339 Hz** | Bass-heavy tone |
| 100 kΩ | 1 nF | 1/(2π × 100000 × 10⁻⁹) | **1,592 Hz** | Bright treble |
| 1 MΩ | 100 pF | 1/(2π × 1000000 × 10⁻¹⁰) | **1,592 Hz** | Guitar cable capacitance |

**Cable Q:** With R = 500 kΩ and C = 2 nF: fc = 1/(2π × 500000 × 2×10⁻⁹) = 1/(2π × 0.001) ≈ **159 Hz**. This is extremely low — it means a long cable with a high-impedance pickup acts as a low-pass filter that rolls off almost all the treble and presence. This is why long cables sound dark and why buffers (low output impedance) are placed early in the signal chain.

---

## Big Question

An RC filter is a frequency-dependent voltage divider. A capacitor's impedance (Xc = 1/2πfC) is high at low frequencies and low at high frequencies.

In a **low-pass** (R in series, C to ground): at low frequencies the capacitor has high impedance, so most of the voltage appears across it (the output node). At high frequencies the capacitor's impedance drops toward zero, shunting the signal to ground — the output goes to zero.

In a **high-pass** (C in series, R to ground): at low frequencies the capacitor has high impedance and drops most of the voltage across itself, leaving little across R (the output). At high frequencies the capacitor's impedance is negligible, so the signal passes through it freely and the full voltage appears across R.

Swapping R and C swaps which element drops the voltage at each frequency extreme. The output is always taken across the component that shunts to ground — so whichever component is "on the bottom" determines what frequencies survive.
