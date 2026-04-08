# LECT5.5: Distortion Circuit Design

Distortion is all about how a **nonlinear transfer function** reshapes a waveform around some chosen **bias point**. That's what decides which harmonics -- even, odd, or both -- appear and how they evolve through stages. This document gives you the conceptual framework for *designing* distortion, not just using it.

## 1. Nonlinear Transfer and Harmonics

Think of an amp stage as a function y = f(x) applied sample by sample: the input waveform x(t) goes into a nonlinear curve, and the output y(t) is that same waveform but reshaped.

If f(x) is smooth, you can approximate it with a power series around the region where the signal lives:

`f(x) = a₁x + a₂x² + a₃x³ + a₄x⁴ + ...`

Feed in a pure sine x(t) = sin(wt), and each power of x generates specific harmonics via trig identities:

| Term | Expansion | Produces |
|------|-----------|----------|
| x² | sin²(wt) = 1/2 - 1/2 cos(**2**wt) | DC + **2nd harmonic** |
| x³ | sin³(wt) = 3/4 sin(wt) - 1/4 sin(**3**wt) | fundamental + **3rd harmonic** |
| x⁴ | mix of DC + cos(2wt) + cos(4wt) | DC + **2nd** + **4th** |
| x⁵ | mix of sin(wt) + sin(3wt) + sin(5wt) | fundamental + **3rd** + **5th** |

Rule

**Even powers produce even harmonics** (2nd, 4th, ...) plus DC.
**Odd powers produce odd harmonics** (1st, 3rd, 5th, ...).

The FFT/spectrum analyzer only *decomposes* the already-reshaped waveform into these components. It doesn't create them.

## 2. Symmetry, the Zero Line, and Odd vs. Even Content

Draw the horizontal axis and call it the **zero line** -- zero volts, zero pressure. The waveform oscillates above and below this line.

- If the transfer function is **symmetric** in the sense f(-x) = -f(x), its series has only odd powers (no x², x⁴, ...).
- A sine through a symmetric nonlinearity produces **only odd harmonics** (3rd, 5th, 7th...) plus the fundamental.

### What symmetric distortion looks like on a scope

- The positive and negative halves of the waveform are **mirror images** around the zero line.
- Clipping or rounding happens similarly on the top and bottom.
- Zero crossings stay regularly spaced. The shape is "balanced."

**Break that mirror symmetry** and you inevitably get even harmonics. As soon as the positive and negative halves no longer match, representing that lopsided shape requires even-order components (2nd, 4th, ...).

## 3. Bias: Where We Park the Wave on the Curve

Bias is the **DC offset** you apply so that, with no audio signal present, the device sits at a chosen operating point on its transfer curve.

`input = x(t) + B -> output = f(x(t) + B)`

Changing B moves the oscillation of x(t) into different parts of the curve:

| Bias Position | What Happens | Harmonics |
|---------------|-------------|-----------|
| Centered | Signal swings symmetrically around the linear-ish region. Both halves hit the same part of the curve. | Mostly **odd-order** when pushed hard |
| Shifted | Positive and negative swings live in different regions of the curve. One side compresses or clips earlier than the other. | **Both even and odd** as soon as you drive into nonlinearity |

From the power series perspective, adding bias effectively injects even-power behavior into the local expansion, even if the underlying device is mathematically odd-symmetric around zero.

Key Insight

You can take a perfectly symmetric nonlinear element and make it produce even harmonics just by shifting the bias. The **same circuit, different bias**, gives a fundamentally different harmonic recipe.

## 4. Tube vs. Solid-State in These Terms

This isn't about tubes magically "loving music" and transistors "hating it." It's about how typical stages are biased and what their transfer curves look like.

| | Solid-State (Typical) | Tube (Typical) |
|---|----------------------|----------------|
| Curve | Tight, symmetric clipping when overdriven. Hard rails, feedback around op-amps, carefully biased transistor pairs. | Biased and coupled so the signal rides asymmetrically on the tube's S-shaped curve. Transformers and coupling caps further tilt the operating point. |
| On a scope | Clipping is abrupt and fairly symmetric about zero. The envelope stays similar until you really slam it. | One half-cycle rounds/compresses before the other, or the entire waveform sits slightly above or below the nominal zero line. |
| Harmonics | Strong **odd-order** content, especially higher odd harmonics -> "buzzy," "grainy" | **Even-order** components alongside odd; the mixture plus softer onset -> "warm," "thick," "singing" |

You can demonstrate this directly: same input sine, three cases -- **clean** (linear), **symmetric clip**, **asymmetric clip** -- and tie each to the harmonic story: "fundamental only," "odd only," "even + odd."

[Try it in the Transfer Function Lab](https://fuzzbox.cairn.com/fuzzbox-transfer.html)

## 5. Thinking in Stages for Distortion Design

If you're planning multiple stages, think of each stage as a different combination of **curve shape + bias point**. Here's a four-stage mental model:

**Stage 1 -- Clean Gain**

Nearly linear. Sets overall level and maybe a small, mostly odd-order softening. Goal: place the signal at a good amplitude for the next, more nonlinear stage.

-> fundamental + gentle odd

**Stage 2 -- Symmetric Distortion**

Centered bias, symmetric curve (soft or hard). Deliberately generates odd harmonics for brightness and edge without too much asymmetry.

-> odd harmonics = "edge"

**Stage 3 -- Asymmetric / Biased**

Deliberately offset bias or a curve that's not centered about zero. This is where you dial in even harmonics and a gentle sense of compression.

-> even + odd = "warmth"

**Stage 4 -- Post-Shaping**

Filtering to tame or emphasize certain harmonics (low-pass to soften fizz, mid bumps for "voice"). Compression/limiting to reshape the large-scale envelope.

-> character + taming

Design Principle

Each stage chooses two things: **what curve** we use, and **where we bias** the input on that curve. That's the entire design space for distortion. Everything else -- "tube vs. solid-state," "warm vs. harsh," "vintage vs. modern" -- is a consequence of those two choices repeated through a chain of stages.

### Distortion Stage Archetypes

Six building blocks you can mix and match in any order to design a signal chain:

| Stage Type | Curve Shape | Bias / Symmetry | Harmonics Focus | Sonic / Visual Note |
|------------|-------------|-----------------|-----------------|---------------------|
| Odd-soft pre-stage | Gently rounded | Centered, symmetric | Mostly low-order odd | Adds mild edge; sine becomes "plumper" but still centered on the scope. |
| Odd-hard clipper | Abrupt flat rails | Centered, symmetric | Strong high-order odd | Square-ish tops and bottoms; buzzy, aggressive, scope looks very rectangular. |
| Even+odd soft "tube-ish" | S-curve (tanh-like) | Slightly off-center bias | Mix of even + odd, softer onset | One side rounds earlier; waveform rides above/below the zero line, sounds warm/chewy. |
| Even-rich rectifier | Half / full rectifier | Strongly asymmetric (biased) | Strong even (2nd, 4th) + some odd | One polarity suppressed; envelope "pulses" at twice the original frequency. |
| Saturating compressor | Gradual ceiling | Often slightly asymmetric | Mostly low-order, both even/odd | Peaks gently squash; envelope flattens while oscillation still visible. |
| Post-shaper EQ/filter | Linear (filters only) | N/A (no new nonlinearity) | No new harmonics; selective emphasis | Carves the existing spectrum; makes certain harmonics or bands read as "voice." |

You can describe a chain by combining these archetypes. For example:

Example Chain

**Odd-soft pre-stage** to wake up harmonics -> **even+odd soft tube-ish** for warmth -> **odd-hard clipper** for aggression -> **post-shaper EQ** to sculpt what's been generated.

### Case Study: The Fuzz Face (1966)

The Dallas-Arbiter Fuzz Face is one of the simplest distortion circuits ever made -- just two transistors and a handful of passive components. But it maps cleanly onto the archetype framework.

**Q1 -- Pre-Stage (Common Emitter)**

The first transistor (originally germanium AC128/NKT275) provides moderate gain with a soft, slightly asymmetric transfer curve. Biased via the 33K/8.2K voltage divider. At low input levels, this is the **odd-soft pre-stage** -- it rounds the signal gently. As the signal grows, the transistor's base-emitter junction starts to compress one side earlier than the other.

-> gentle odd + hint of even

**Q2 -- Main Fuzz Stage**

The second transistor gets the already-clipped signal from Q1 and drives it much harder. This is where the heavy distortion happens. The 500R collector resistor and direct coupling from Q1 set the bias point. At full fuzz, Q2 is driven into hard saturation and cutoff -- the signal slams into both rails. This is the **odd-hard clipper**. But because Q1's output is already slightly asymmetric, Q2's clipping isn't perfectly symmetric either -- so both even and odd harmonics are present.

-> strong odd + moderate even

**Output -- Post-Shaping**

The output network (coupling cap + volume pot) acts as a simple high-pass into a resistive load. This rolls off bass mud from the heavy clipping and the DC offset from the asymmetry. The guitar's volume knob interacts with Q1's input impedance to change the effective bias -- cleaning up the sound at lower volumes. This is why Hendrix could go from clean to fuzz by rolling his volume knob.

-> post-shaper + interactive bias

Why Germanium vs. Silicon Matters

The original germanium transistors (AC128, NKT275) have a lower, softer turn-on voltage (~0.2V) compared to silicon (~0.6V). This means the transfer curve bends more gradually -- the transition from linear to clipping is smoother. In archetype terms, germanium makes Q1 more "odd-soft" and Q2's clipping onset more gradual. Silicon replacements (BC108, 2N3904) have a sharper knee, pushing the character toward "odd-hard" with a more abrupt, buzzy clip. Same topology, different curve shape -> different harmonic recipe.

### Case Study: The Octavia (1967)

The [Digital Octavia lab](https://fuzzbox.cairn.com/fuzzbox-octavia.html) demonstrates a more complex staging approach. Roger Mayer's Octavia chains five stages:

1. **Input buffer** -- clean gain, impedance matching (odd-soft pre-stage)
2. **Fuzz / transistor gain** -- heavy symmetric clipping (odd-hard clipper)
3. **Transformer saturation** -- soft asymmetric, adds even harmonics (even+odd soft)
4. **Full-wave rectifier** -- extreme asymmetry, doubles frequency = octave up (even-rich rectifier)
5. **Output filter** -- tames the high-frequency mess (post-shaper EQ)

Each stage has a purpose in the harmonic story. The fuzz gives edge, the transformer gives body, the rectifier gives the octave, and the filter makes it playable. Remove any stage and the character changes fundamentally.

## 6. The 4069UB: A Multi-Stage Lab on a Chip

The **CD4069UB** is an unbuffered CMOS hex inverter -- six independent gain stages in a single 14-pin IC that costs about $0.50. It's one of the best components for exploring multi-stage distortion design on a breadboard.

### Why the 4069UB?

Each of the six inverters is a complementary MOSFET pair (one NMOS, one PMOS) that forms a voltage amplifier. The **UB (unbuffered)** designation is critical -- it means the inverters have a smooth, analog transfer curve rather than the sharp digital snap of the buffered 4069. When biased at the midpoint of the supply voltage, each inverter acts like a small amplifier with a gain of roughly 20-40x and a transfer curve that looks like a steep S-curve -- essentially a tanh-like function.

| Feature | What It Means for Distortion |
|---------|------------------------------|
| 6 stages | You can cascade 2, 3, 4, or all 6 inverters in series, each adding its own layer of harmonic content. This is the multi-stage design framework made physical. |
| S-curve transfer | Each stage is naturally an **odd-soft** archetype when biased at center. Gentle saturation, tanh-like. Shift the bias off-center and it becomes **even+odd soft**. |
| Bias via resistor | A single resistor from output to input (typically 1MR) biases each inverter at its midpoint. Change the resistor value or add a voltage divider to shift the bias point -- that's the "where we park the wave" knob, physically realized. |
| Variable supply | The 4069UB runs on 3V to 15V. Lower voltage = less headroom = earlier clipping = more distortion at lower signal levels. Battery sag is a feature, not a bug. |
| $0.50 | Cheap enough to put one on every student's breadboard. |

### Basic Single-Stage: Self-Biased Inverter Amp

The simplest useful circuit -- one inverter stage biased at its midpoint:

```
input --||-- INV1 in ---- INV1 out --||-- output
         C1       |              |          C2
                  +-- Rf --------+

Rf = 1MR (self-bias to midpoint)
C1, C2 = 100nF (DC blocking / coupling)
Gain ~ 20-40x depending on supply voltage
```

The feedback resistor Rf sets the DC operating point at the center of the S-curve. The input coupling cap blocks DC so the guitar signal swings symmetrically around that midpoint. At low levels this is nearly linear. Turn up the input and the S-curve starts to round the peaks -- **odd-soft pre-stage** behavior. Push it harder and the output clips against the supply rails -- **odd-hard clipper**.

### Multi-Stage: Cascading Inverters

This is where it gets interesting. Chain two or three inverter stages, each with its own bias resistor and coupling cap:

```
input --||-- [INV1 + Rf1] --||-- [INV2 + Rf2] --||-- [INV3 + Rf3] --||-- output

Each stage: Rf = 1MR (centered) or voltage divider (shifted)
Coupling caps between stages: 100nF (full range) or 10nF (treble only)
```

Now you have independent control at each stage:

- **Stage 1** -- Rf1 = 1MR (centered bias): odd-soft pre-stage. Wakes up harmonics gently.
- **Stage 2** -- Rf2 = 1MR (centered): another symmetric stage. The already-rounded signal gets rounded further. Odd harmonics compound -- 3rd x 3rd starts generating 9th, etc. Things get buzzy.
- **Stage 3** -- Replace Rf3 with a voltage divider to shift bias off-center: now this stage is **even+odd soft**. The asymmetry introduces 2nd harmonic warmth into the already harmonically rich signal.

Between stages, the **coupling cap value** acts as a simple post-shaper. A smaller cap (10nF instead of 100nF) rolls off bass before it hits the next stage, reducing low-frequency intermodulation and keeping the distortion tighter. A larger cap (1uF) lets everything through for a fatter, woolier sound.

Experiment: Three Stages, Three Characters

Build three inverter stages on a breadboard. Make all three center-biased first -- listen to how the odd harmonics stack up with each added stage. Then shift the bias on stage 3 by replacing its 1MR feedback resistor with a 2.2MR to ground and 470KR to supply. Listen for the even harmonics appearing. Then try moving the bias shift to stage 1 instead -- the character changes because the asymmetry happens *before* the heavy clipping rather than after. **Same components, different order -> different sound.**

### The 4069UB vs. the Fuzz Face

| | Fuzz Face | 4069UB Chain |
|---|-----------|-------------|
| Stages | 2 (fixed topology) | 1-6 (you choose) |
| Curve | Transistor exponential (germanium = softer, silicon = sharper) | CMOS S-curve (tanh-like), consistent stage to stage |
| Bias control | Set by resistor network + transistor B (temperature-sensitive with germanium) | Simple: one resistor per stage, or a voltage divider to shift |
| Design flexibility | Low -- the topology is the sound, hard to modify without breaking it | High -- add/remove stages, change bias per stage, vary coupling caps |
| Best for | That specific classic fuzz character | Exploring the design space, learning, prototyping custom distortion |

The Fuzz Face is a finished instrument -- beautiful, specific, hard to improve on for what it does. The 4069UB is a **laboratory** -- it lets you test the archetype framework hands-on and hear exactly what happens when you change one variable at a time.

## 7. Where to Go from Here

With this framework in mind:

- Open the [Transfer Function Lab](https://fuzzbox.cairn.com/fuzzbox-transfer.html) and draw custom curves. Try centered vs. offset bias by shifting your curve left or right on the grid.
- Open the [Digital Octavia](https://fuzzbox.cairn.com/fuzzbox-octavia.html) and watch each stage's oscilloscope. Identify which stages add odd harmonics and which add even.
- Play the [Name That Distortion](https://fuzzbox.cairn.com/fuzzbox-game.html) game -- once you can reliably hear the difference between symmetric and asymmetric clipping, you have the ear for circuit design.
- **Breadboard a 4069UB chain.** Start with one self-biased inverter. Add a second. Listen after each addition. Then experiment with bias shifting on one stage. You're building a custom distortion pedal from first principles.
- Think about what happens when you **reorder** the stages. Asymmetry before hard clipping vs. after. Bass rolloff between stages vs. at the end. Same building blocks, different sequence -> different sound.

The Two-Knob Mental Model

Tell a student "each stage chooses two things: **what curve we use** and **where we bias the input on that curve**" and they have a clear conceptual handle for designing different flavors of distortion -- rather than treating "tube vs. solid-state" as a binary myth.
