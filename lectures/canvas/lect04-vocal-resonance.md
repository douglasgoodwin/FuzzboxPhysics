# LECT04: Vocal resonance: Throat singing, Squawk box, formants

**Fuzzbox Physics -- Week 03 (Vocal Acoustics: Formants, Helium, Resonance)**

**Announcements and framing**

Sorry about all the assignments. I had the dates wrong for the things due today. Some of you did the main one anyway, which is great. If you didn't, don't panic. You're going to do it today.

What I want you to do is listen to some Tuvan throat singing and try to figure out what's going on. We just watched an example with a group of singers where some of them were throat singing. I asked who had heard of it before.

I once saw a documentary about a blind guy in Chicago who, late at night, heard throat singing on shortwave radio. He didn't know what it was, became obsessed, and decided to learn. A friend told him there's a competition every year, so he found a way to raise money, went, and competed. He did pretty well and they gave him a horse. He's a big guy, and it's a tiny horse, so there's this great scene of a blind man riding a small horse. It's a wonderful story.

#### The film is called [Genghis Blues](https://en.wikipedia.org/wiki/Genghis_Blues)

But the sound itself can feel completely impenetrable at first. So: listen.

Listening: what are we hearing?

There's this low drone sound. That's cool in the background. Then there's this other sound.

What are you hearing? No right answers. What instruments are here? What voices? How many?

Students suggested it felt like low, slow, full-bodied sound, like a cello-like drone, with something higher floating above it. Someone mentioned it felt spiritual, and someone connected it to "Turkish music" or music from the region.

I don't really know the answer in the sense of "one correct description," but those observations are useful. The key is: there's a low drone, and then there's another sound that feels like it's "riding" on top.

Resonance, the vocal source, and the mouth as a filter

One way to think about it is resonance: where is the resonance happening?

Think about a trash can: if you roll it or hit it, the resonance inside shapes what you hear. It's not unlike our mouths and throats. The resonant space changes the tone.

Your vocal cords are the vibrating source: two folds of tissue that open and close and vibrate. You can stretch them and change the fundamental pitch. That's the source.

But then there's resonance inside the mouth and vocal tract. The shape you make with your tongue, jaw, lips, and throat changes the resonances. Opera singers train this deliberately, but everyone does it unconsciously for speech. You're changing the filter.

So: the vocal cords provide the fundamental and harmonics, and the vocal tract shapes which parts of that spectrum get emphasized. That's where formants come in.

In throat singing, it's like they're "playing" the resonances of the vocal tract very deliberately, in a way that makes a strong, whistle-like peak appear above the drone.

**The talk box (Peter Frampton) as a "mouth filter" demonstration**

Let's look at another example: the talk box (Peter Frampton).

A guitarist has a tube coming from a small speaker/amplifier box. The guitar signal drives a speaker in the box, and the sound travels up the tube into the performer's mouth. The performer shapes their mouth as if speaking, and that mouth-shape filters the sound. A microphone picks up the sound coming out of the mouth (not the tube by itself), which is why they have to be right on the mic.

So what's changing the sound? The guitar is the source; the mouth is the filter. The wild vowel-like shaping is basically "vocal tract filtering," but with a non-voice sound source. It's conceptually similar to what we're pointing at in throat singing, except throat singing has a vocal source and then the same "filtering" effect.

Question: could you "speak" with a talk box? At least vowels, yes. Consonants are harder because consonants involve fast, noisy, interrupted airflow and articulations that aren't just steady resonant filtering.

Formants: what they are (and what they are not)

One of the most important things in speech acoustics is the formant frequencies of vowels.

When we talk about speech as source + filter, the filter (vocal tract shape) creates the formant frequencies. Formants are not the individual harmonics. Harmonics come from the vocal source (the vibrating vocal folds). Formants are the broader spectral peaks--regions where energy is boosted because of the resonances of the vocal tract.

In a spectrum, harmonics look like many narrow, evenly spaced lines. Formants look more like larger "hills" or broad peaks that those harmonics pass through. Vowels are largely distinguished by where the first few formants land (especially F1 and F2).

Even if the fundamental stays the same, you can shape the mouth differently and produce different vowel sounds. We perceive those differences as language.

**Phonemes, "all the sounds," and AI avatar speech**

English has on the order of a few dozen distinct phonemes (often cited around 40-ish, depending on dialect and counting conventions). A common technique in speech/recording work is to record a sentence or set of sentences that covers the full range of sounds, so a system can capture the mouth movements and audio for all phonemes.

That's relevant to AI avatar systems: you record an actor producing a wide set of sounds so the system can model the mapping between facial motion, mouth shapes, and speech. Then text can be synthesized or assembled to produce new utterances.

I mentioned an older example from my own work: a phone-tree system where we built messages dynamically. We didn't know the exact daily message content in advance, so we recorded building blocks (including numbers), and the system assembled them into new sentences based on conditions (like snowfall totals). The same idea can be applied to speech sounds, though doing it convincingly is hard.

[The Vowel demonstrator](https://www.youtube.com/watch?v=sx5KNQYY_cg)

**Barbershop "ring," tuning systems, and just intonation**

Next we moved into barbershop and the idea of "ring." The "ring" is often described as an expanded sound--almost like additional voices appear. It's not something that can be covered fully in one video, but a key ingredient is intonation.

A piano is tuned with equal temperament, a compromise tuning where intervals are adjusted so you can play in all keys consistently. Singers can tune more freely, and ensembles can align intervals closer to just intonation, where frequency ratios align more directly with the harmonic series.

In practice, that means some intervals are slightly different from equal temperament--sometimes only by a few cents, but enough to change how stable the sound feels and how strongly the harmonics line up.

When harmonics line up well across multiple voices, the combined spectrum can reinforce certain frequencies strongly enough that you perceive an extra, "ghost" pitch (often called a "difference tone" or "combination tone" in related contexts), and the overall chord can feel louder and more locked-in. Barbershoppers describe that as "ring."

We discussed the idea of tuning in an orchestra: one instrument (often the oboe) provides a reference pitch, and everyone tunes to it. The important thing is that everyone is tuned together, even if the reference pitch isn't exactly "correct" in an absolute sense.

We also did a quick demonstration idea: if two people sing nearly the same pitch but slightly different, you hear beating--an audible pulsing as the waves interfere. When they line up, the beating reduces and the sound feels more stable and often more powerful.

**Transition to the helium lab**

At that point we took a break: "Come back in 15 minutes. I'm going to get the helium ready."

The plan: record your voice normally and with helium, and then analyze what changes. I wanted you to describe what you hear, and then we would measure it using Audacity and/or Praat.

Helium: what it's for and where it comes from (class discussion)

We talked briefly about what helium is used for. Students mentioned MRI machines. We also mentioned electronics manufacturing (for certain processes).

We also discussed that helium is a finite resource: it can escape the atmosphere over time. Helium on Earth is produced largely through radioactive decay processes (alpha decay produces helium nuclei that become helium gas), and it accumulates in certain underground natural gas deposits that can be extracted.

Audacity: waveform vs spectrogram; fundamental vs harmonics

Then we moved to the software. We used Audacity (free software) and looked at sound in two main ways:

Waveform view: amplitude over time (louder looks "bigger").

Spectrogram view: frequency content over time (frequency on the vertical axis; time on the horizontal; brightness/color indicates energy).

I zoomed into a sung note and asked: why isn't the waveform a perfect sine wave? Why does it look "frilly"?

Answer: because a voice isn't just a single frequency. The waveform contains the fundamental plus harmonics, so the shape becomes more complex.

Then we looked at the spectrogram and identified the fundamental and the higher partials. The point was to connect: the "frill" in the waveform corresponds to additional frequencies riding on top of the fundamental.

Praat: pitch and formants

Then we switched to Praat, which can estimate pitch and also display formants. We talked about using Praat to see how vowel formants shift, and how those formants are closely related to the kinds of spectral emphasis used in throat singing.

**Helium balloon experiment: recording and comparison**

Then we handed out balloons. The instruction was: try to sing the same note twice, once normally and once after inhaling a small amount of helium, and record both. Keep the phrase consistent so the comparison is clean.

Students recorded short phrases (including "Happy Lunar New Year") and reacted to the high, "squeaky" timbre. We tried group singing for comparison ("Let It Be," then "Jingle Bells"), mostly to generate shared examples and laughs while people got usable recordings.

I kept emphasizing: the point isn't just that it sounds funny. The point is to discover what the gas is changing acoustically.

What you were meant to discover (setup for the lab writeup)

I reminded everyone: the assignment is to use the software, try to make it crash, try things, and upload your results. But there's a secret you should discover: what helium is actually changing in your voice, and how to show it in analysis.

We ended with logistics and a preview of where we're going next: moving toward transduction and building devices related to these ideas (including talk-box-like or resonator-driven approaches), and continuing the thread from vocal acoustics into sound systems.
