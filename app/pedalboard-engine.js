// ============================================================
// MODULE DEFINITIONS
// ============================================================
// ============================================================
// SCHEMATIC SVG GENERATORS
// Each returns an SVG string showing the internal topology.
// Components: JFET symbols, CMOS inverter gates, R/C passives.
// ============================================================
const SCH = {
  // Helper: draw a resistor zig-zag path at (x,y) going right, width w
  R: (x, y, w) => {
    const s = w / 6;
    return `M${x},${y} l${s},0 l${s/2},-4 l${s},8 l${s},-8 l${s},8 l${s/2},-4 l${s},0`;
  },
  // Helper: capacitor at (x,y) with gap
  C: (x, y) => `<line x1="${x}" y1="${y-5}" x2="${x}" y2="${y+5}" stroke="#86868b" stroke-width="1.5"/>
    <line x1="${x+3}" y1="${y-5}" x2="${x+3}" y2="${y+5}" stroke="#86868b" stroke-width="1.5"/>`,
  // Helper: ground symbol
  GND: (x, y) => `<line x1="${x}" y1="${y}" x2="${x}" y2="${y+4}" stroke="#6e6e73" stroke-width="1"/>
    <line x1="${x-4}" y1="${y+4}" x2="${x+4}" y2="${y+4}" stroke="#6e6e73" stroke-width="1"/>
    <line x1="${x-2.5}" y1="${y+6}" x2="${x+2.5}" y2="${y+6}" stroke="#6e6e73" stroke-width="0.8"/>
    <line x1="${x-1}" y1="${y+8}" x2="${x+1}" y2="${y+8}" stroke="#6e6e73" stroke-width="0.6"/>`,
  // JFET symbol (N-channel) at (x,y) — gate on left, drain up, source down
  JFET: (x, y) => `<line x1="${x}" y1="${y}" x2="${x+6}" y2="${y}" stroke="#e8803a" stroke-width="1"/>
    <line x1="${x+6}" y1="${y-8}" x2="${x+6}" y2="${y+8}" stroke="#e8803a" stroke-width="1.5"/>
    <line x1="${x+6}" y1="${y-6}" x2="${x+12}" y2="${y-6}" stroke="#e8803a" stroke-width="1"/>
    <line x1="${x+12}" y1="${y-6}" x2="${x+12}" y2="${y-10}" stroke="#e8803a" stroke-width="1"/>
    <line x1="${x+6}" y1="${y+6}" x2="${x+12}" y2="${y+6}" stroke="#e8803a" stroke-width="1"/>
    <line x1="${x+12}" y1="${y+6}" x2="${x+12}" y2="${y+10}" stroke="#e8803a" stroke-width="1"/>
    <text x="${x+14}" y="${y-6}" fill="#e8803a" font-size="6" font-family="IBM Plex Mono">D</text>
    <text x="${x+14}" y="${y+8}" fill="#e8803a" font-size="6" font-family="IBM Plex Mono">S</text>
    <text x="${x-4}" y="${y+3}" fill="#e8803a" font-size="6" font-family="IBM Plex Mono">G</text>`,
  // CMOS inverter (4069UB style) at (x,y), width 16
  CMOS: (x, y) => `<polygon points="${x},${y-8} ${x},${y+8} ${x+14},${y}" fill="none" stroke="#e8803a" stroke-width="1"/>
    <circle cx="${x+16}" cy="${y}" r="2" fill="none" stroke="#e8803a" stroke-width="1"/>
    <text x="${x+2}" y="${y+3}" fill="#e8803a" font-size="6" font-family="IBM Plex Mono">1</text>`,
  // Diode at (x,y) pointing right
  DIODE: (x, y) => `<polygon points="${x},${y-4} ${x},${y+4} ${x+6},${y}" fill="none" stroke="#86868b" stroke-width="1"/>
    <line x1="${x+6}" y1="${y-4}" x2="${x+6}" y2="${y+4}" stroke="#86868b" stroke-width="1"/>`,
  // Op-amp triangle
  OPAMP: (x, y) => `<polygon points="${x},${y-10} ${x},${y+10} ${x+16},${y}" fill="none" stroke="#86868b" stroke-width="1"/>
    <text x="${x+2}" y="${y-3}" fill="#6e6e73" font-size="5" font-family="IBM Plex Mono">+</text>
    <text x="${x+2}" y="${y+5}" fill="#6e6e73" font-size="5" font-family="IBM Plex Mono">-</text>`,
};

// Each module gets a schematic SVG generator
const SCHEMATICS = {
  lowpass: () => `<svg viewBox="0 0 156 50" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="25" x2="30" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <path d="${SCH.R(30, 25, 30)}" fill="none" stroke="#86868b" stroke-width="1"/>
    <line x1="60" y1="25" x2="80" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="38" y="20" fill="#6e6e73" font-size="5" font-family="IBM Plex Mono">R</text>
    ${SCH.C(80, 32)}
    <line x1="80" y1="25" x2="80" y2="27" stroke="#86868b" stroke-width="0.8"/>
    <line x1="81.5" y1="25" x2="81.5" y2="27" stroke="#86868b" stroke-width="0.8"/>
    <line x1="80" y1="37" x2="80" y2="40" stroke="#86868b" stroke-width="0.8"/>
    <line x1="81.5" y1="37" x2="81.5" y2="40" stroke="#86868b" stroke-width="0.8"/>
    ${SCH.GND(80, 40)}
    <text x="85" y="35" fill="#6e6e73" font-size="5" font-family="IBM Plex Mono">C</text>
    <line x1="80" y1="25" x2="95" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="96" y="20" fill="#6e6e73" font-size="5" font-family="IBM Plex Mono">fc = 1/2\u03c0RC</text>
    <line x1="95" y1="25" x2="140" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
    <circle cx="80" cy="25" r="1.5" fill="#86868b"/>
  </svg>`,

  highpass: () => `<svg viewBox="0 0 156 50" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="25" x2="35" y2="25" stroke="#86868b" stroke-width="0.8"/>
    ${SCH.C(38, 25)}
    <text x="35" y="18" fill="#6e6e73" font-size="5" font-family="IBM Plex Mono">C</text>
    <line x1="41" y1="25" x2="60" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <line x1="80" y1="25" x2="80" y2="30" stroke="#86868b" stroke-width="0.8"/>
    <path d="${SCH.R(80, 30, 0)}" fill="none" stroke="#86868b" stroke-width="0" />
    <line x1="80" y1="30" x2="80" y2="42" stroke="#86868b" stroke-width="0.8"/>
    <text x="83" y="38" fill="#6e6e73" font-size="5" font-family="IBM Plex Mono">R</text>
    ${SCH.GND(80, 42)}
    <line x1="60" y1="25" x2="80" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <circle cx="80" cy="25" r="1.5" fill="#86868b"/>
    <line x1="80" y1="25" x2="140" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="96" y="20" fill="#6e6e73" font-size="5" font-family="IBM Plex Mono">fc = 1/2\u03c0RC</text>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
  </svg>`,

  bandpass: () => `<svg viewBox="0 0 156 55" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="25" x2="25" y2="25" stroke="#86868b" stroke-width="0.8"/>
    ${SCH.C(28, 25)}
    <text x="25" y="18" fill="#6e6e73" font-size="5" font-family="IBM Plex Mono">C1</text>
    <line x1="31" y1="25" x2="50" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <path d="${SCH.R(50, 25, 24)}" fill="none" stroke="#86868b" stroke-width="1"/>
    <text x="56" y="20" fill="#6e6e73" font-size="5" font-family="IBM Plex Mono">R</text>
    <line x1="74" y1="25" x2="95" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <circle cx="95" cy="25" r="1.5" fill="#86868b"/>
    <line x1="95" y1="25" x2="95" y2="32" stroke="#86868b" stroke-width="0.8"/>
    ${SCH.C(95, 35)}
    <text x="100" y="38" fill="#6e6e73" font-size="5" font-family="IBM Plex Mono">C2</text>
    <line x1="95" y1="40" x2="95" y2="45" stroke="#86868b" stroke-width="0.8"/>
    ${SCH.GND(95, 45)}
    <line x1="95" y1="25" x2="140" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="100" y="20" fill="#6e6e73" font-size="5" font-family="IBM Plex Mono">HPF + LPF</text>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
  </svg>`,

  tonestack: () => `<svg viewBox="0 0 156 58" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="28" x2="22" y2="28" stroke="#86868b" stroke-width="0.8"/>
    <!-- HPF stage -->
    <rect x="22" y="20" width="28" height="16" rx="1" fill="none" stroke="#e8803a" stroke-width="0.8"/>
    <text x="26" y="30" fill="#e8803a" font-size="5.5" font-family="IBM Plex Mono">HPF</text>
    <line x1="50" y1="28" x2="58" y2="28" stroke="#86868b" stroke-width="0.8"/>
    <!-- Mid peak EQ -->
    <rect x="58" y="20" width="28" height="16" rx="1" fill="none" stroke="#e8803a" stroke-width="0.8"/>
    <text x="61" y="30" fill="#e8803a" font-size="5.5" font-family="IBM Plex Mono">MID</text>
    <line x1="86" y1="28" x2="94" y2="28" stroke="#86868b" stroke-width="0.8"/>
    <!-- LPF stage -->
    <rect x="94" y="20" width="28" height="16" rx="1" fill="none" stroke="#e8803a" stroke-width="0.8"/>
    <text x="99" y="30" fill="#e8803a" font-size="5.5" font-family="IBM Plex Mono">LPF</text>
    <line x1="122" y1="28" x2="140" y2="28" stroke="#86868b" stroke-width="0.8"/>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
    <text x="22" y="48" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">3 biquad filters in series</text>
    <text x="22" y="54" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">preset sets all cutoffs + gains</text>
  </svg>`,

  peaking: () => `<svg viewBox="0 0 156 55" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="28" x2="40" y2="28" stroke="#86868b" stroke-width="0.8"/>
    <!-- Feedback topology around op-amp -->
    ${SCH.OPAMP(50, 28)}
    <line x1="66" y1="28" x2="80" y2="28" stroke="#86868b" stroke-width="0.8"/>
    <!-- Frequency-selective feedback path -->
    <line x1="80" y1="28" x2="80" y2="10" stroke="#86868b" stroke-width="0.8" stroke-dasharray="2,1"/>
    <line x1="80" y1="10" x2="45" y2="10" stroke="#86868b" stroke-width="0.8" stroke-dasharray="2,1"/>
    <line x1="45" y1="10" x2="45" y2="24" stroke="#86868b" stroke-width="0.8" stroke-dasharray="2,1"/>
    <text x="50" y="8" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">RC feedback</text>
    <circle cx="80" cy="28" r="1.5" fill="#86868b"/>
    <line x1="80" y1="28" x2="140" y2="28" stroke="#86868b" stroke-width="0.8"/>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
    <text x="14" y="50" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">boost/cut at center freq via Q-dependent feedback</text>
  </svg>`,

  gain: () => `<svg viewBox="0 0 156 55" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="25" x2="30" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <!-- JFET buffer / gain stage -->
    ${SCH.JFET(30, 25)}
    <text x="28" y="46" fill="#e8803a" font-size="5" font-family="IBM Plex Mono">JFET</text>
    <!-- Drain resistor to Vdd -->
    <line x1="42" y1="15" x2="42" y2="8" stroke="#86868b" stroke-width="0.8"/>
    <text x="45" y="11" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">Rd</text>
    <text x="38" y="6" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">V+</text>
    <!-- Source resistor -->
    <line x1="42" y1="35" x2="42" y2="42" stroke="#86868b" stroke-width="0.8"/>
    <text x="45" y="40" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">Rs</text>
    ${SCH.GND(42, 42)}
    <!-- Output from drain -->
    <line x1="42" y1="15" x2="60" y2="15" stroke="#86868b" stroke-width="0.8"/>
    <circle cx="42" cy="15" r="1.5" fill="#86868b"/>
    ${SCH.C(63, 15)}
    <line x1="66" y1="15" x2="140" y2="15" stroke="#86868b" stroke-width="0.8"/>
    <text x="70" y="11" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">Av = gm \u00d7 Rd</text>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
    <text x="70" y="25" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">common-source amplifier</text>
  </svg>`,

  softclip: () => `<svg viewBox="0 0 156 60" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="28" x2="35" y2="28" stroke="#86868b" stroke-width="0.8"/>
    <!-- CMOS gain stage -->
    ${SCH.CMOS(38, 28)}
    <line x1="56" y1="28" x2="70" y2="28" stroke="#86868b" stroke-width="0.8"/>
    <text x="36" y="46" fill="#e8803a" font-size="5" font-family="IBM Plex Mono">4069UB</text>
    <!-- Feedback resistor (sets bias + soft clip) -->
    <line x1="70" y1="28" x2="70" y2="14" stroke="#86868b" stroke-width="0.8"/>
    <path d="${SCH.R(46, 14, 24)}" fill="none" stroke="#86868b" stroke-width="1"/>
    <line x1="46" y1="14" x2="35" y2="14" stroke="#86868b" stroke-width="0.8"/>
    <line x1="35" y1="14" x2="35" y2="28" stroke="#86868b" stroke-width="0.8"/>
    <text x="50" y="11" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">Rf (bias)</text>
    <!-- Diodes in feedback for clipping -->
    <line x1="70" y1="28" x2="70" y2="40" stroke="#86868b" stroke-width="0.8"/>
    ${SCH.DIODE(64, 42)}
    ${SCH.DIODE(74, 42)}
    <text x="62" y="52" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">soft-clip diodes</text>
    <circle cx="70" cy="28" r="1.5" fill="#86868b"/>
    <line x1="70" y1="28" x2="140" y2="28" stroke="#86868b" stroke-width="0.8"/>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
    <text x="80" y="24" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">TS-style: asym diodes</text>
    <text x="80" y="30" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">in feedback path</text>
  </svg>`,

  hardclip: () => `<svg viewBox="0 0 156 60" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="25" x2="35" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <!-- CMOS gain stage -->
    ${SCH.CMOS(38, 25)}
    <line x1="56" y1="25" x2="75" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="36" y="43" fill="#e8803a" font-size="5" font-family="IBM Plex Mono">4069UB</text>
    <!-- Feedback resistor -->
    <line x1="75" y1="25" x2="75" y2="12" stroke="#86868b" stroke-width="0.8"/>
    <path d="${SCH.R(46, 12, 29)}" fill="none" stroke="#86868b" stroke-width="1"/>
    <line x1="46" y1="12" x2="35" y2="12" stroke="#86868b" stroke-width="0.8"/>
    <line x1="35" y1="12" x2="35" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="50" y="9" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">Rf</text>
    <circle cx="75" cy="25" r="1.5" fill="#86868b"/>
    <!-- Diodes to rails (hard clip) -->
    <line x1="90" y1="25" x2="90" y2="15" stroke="#86868b" stroke-width="0.8"/>
    ${SCH.DIODE(87, 12)}
    <text x="95" y="14" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">V+</text>
    <line x1="90" y1="25" x2="90" y2="35" stroke="#86868b" stroke-width="0.8"/>
    ${SCH.DIODE(87, 38)}
    ${SCH.GND(90, 42)}
    <text x="96" y="30" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">clip to rails</text>
    <line x1="75" y1="25" x2="140" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
    <text x="96" y="55" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">RAT-style: diodes to ground</text>
  </svg>`,

  foldback: () => `<svg viewBox="0 0 156 55" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="25" x2="30" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <!-- Gain stage -->
    ${SCH.CMOS(33, 25)}
    <line x1="51" y1="25" x2="65" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="31" y="43" fill="#e8803a" font-size="5" font-family="IBM Plex Mono">4069UB</text>
    <!-- Full-wave rectifier bridge (simplified) -->
    <rect x="65" y="16" width="30" height="18" rx="1" fill="none" stroke="#86868b" stroke-width="0.8"/>
    ${SCH.DIODE(70, 22)}
    ${SCH.DIODE(70, 30)}
    ${SCH.DIODE(82, 22)}
    ${SCH.DIODE(82, 30)}
    <text x="68" y="14" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">diode bridge</text>
    <line x1="95" y1="25" x2="140" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
    <text x="60" y="48" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">signal "folds" back at threshold</text>
  </svg>`,

  rectifier: () => `<svg viewBox="0 0 156 55" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="25" x2="35" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <!-- Diode bridge (full-wave rectifier) -->
    <rect x="35" y="12" width="40" height="26" rx="1" fill="none" stroke="#e8803a" stroke-width="0.8"/>
    ${SCH.DIODE(42, 18)}
    ${SCH.DIODE(42, 30)}
    ${SCH.DIODE(58, 18)}
    ${SCH.DIODE(58, 30)}
    <text x="44" y="27" fill="#e8803a" font-size="5" font-family="IBM Plex Mono">|x|</text>
    <line x1="75" y1="25" x2="140" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
    <text x="35" y="48" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">full-wave: flips neg half-cycles</text>
    <text x="35" y="54" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">doubles fundamental = octave up</text>
  </svg>`,

  bitcrush: () => `<svg viewBox="0 0 156 50" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="25" x2="30" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <!-- S&H block -->
    <rect x="30" y="16" width="30" height="18" rx="1" fill="none" stroke="#e8803a" stroke-width="0.8"/>
    <text x="33" y="27" fill="#e8803a" font-size="5.5" font-family="IBM Plex Mono">S&amp;H</text>
    <text x="33" y="14" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">downsample</text>
    <line x1="60" y1="25" x2="75" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <!-- Quantizer block -->
    <rect x="75" y="16" width="30" height="18" rx="1" fill="none" stroke="#e8803a" stroke-width="0.8"/>
    <text x="78" y="27" fill="#e8803a" font-size="5.5" font-family="IBM Plex Mono">QUANT</text>
    <text x="78" y="14" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">N-bit</text>
    <line x1="105" y1="25" x2="140" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
    <text x="30" y="44" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">reduce sample rate + bit depth</text>
  </svg>`,

  noisegate: () => `<svg viewBox="0 0 156 55" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="25" x2="40" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <!-- JFET used as voltage-controlled attenuator -->
    ${SCH.JFET(44, 25)}
    <text x="42" y="46" fill="#e8803a" font-size="5" font-family="IBM Plex Mono">JFET</text>
    <!-- Envelope detector feeding gate -->
    <line x1="30" y1="25" x2="30" y2="42" stroke="#86868b" stroke-width="0.8" stroke-dasharray="2,1"/>
    <rect x="14" y="38" width="24" height="12" rx="1" fill="none" stroke="#6e6e73" stroke-width="0.7"/>
    <text x="16" y="46" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">ENV</text>
    <line x1="38" y1="44" x2="44" y2="32" stroke="#6e6e73" stroke-width="0.7" stroke-dasharray="2,1"/>
    <text x="18" y="36" fill="#6e6e73" font-size="4" font-family="IBM Plex Mono">detector</text>
    <circle cx="30" cy="25" r="1.5" fill="#86868b"/>
    <line x1="56" y1="15" x2="56" y2="10" stroke="#86868b" stroke-width="0.8"/>
    ${SCH.C(59, 10)}
    <line x1="62" y1="10" x2="80" y2="10" stroke="#86868b" stroke-width="0.8"/>
    <line x1="80" y1="10" x2="80" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <line x1="80" y1="25" x2="140" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
    <text x="68" y="22" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">JFET VCA: gate</text>
    <text x="68" y="28" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">voltage controls atten</text>
  </svg>`,

  delay: () => `<svg viewBox="0 0 156 60" xmlns="http://www.w3.org/2000/svg">
    <text x="4" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">IN</text>
    <line x1="14" y1="20" x2="30" y2="20" stroke="#86868b" stroke-width="0.8"/>
    <circle cx="30" cy="20" r="1.5" fill="#86868b"/>
    <!-- Dry path -->
    <line x1="30" y1="20" x2="30" y2="12" stroke="#86868b" stroke-width="0.8"/>
    <line x1="30" y1="12" x2="120" y2="12" stroke="#86868b" stroke-width="0.8"/>
    <text x="65" y="10" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">DRY</text>
    <!-- Wet path with delay line -->
    <line x1="30" y1="20" x2="30" y2="35" stroke="#86868b" stroke-width="0.8"/>
    <line x1="30" y1="35" x2="45" y2="35" stroke="#86868b" stroke-width="0.8"/>
    <rect x="45" y="28" width="30" height="14" rx="1" fill="none" stroke="#e8803a" stroke-width="0.8"/>
    <text x="48" y="37" fill="#e8803a" font-size="5" font-family="IBM Plex Mono">DELAY</text>
    <line x1="75" y1="35" x2="95" y2="35" stroke="#86868b" stroke-width="0.8"/>
    <!-- Feedback path -->
    <circle cx="95" cy="35" r="1.5" fill="#86868b"/>
    <line x1="95" y1="35" x2="95" y2="48" stroke="#86868b" stroke-width="0.8"/>
    <path d="${SCH.R(55, 48, 24)}" fill="none" stroke="#86868b" stroke-width="1"/>
    <line x1="55" y1="48" x2="38" y2="48" stroke="#86868b" stroke-width="0.8"/>
    <line x1="38" y1="48" x2="38" y2="35" stroke="#86868b" stroke-width="0.8"/>
    <text x="58" y="53" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">feedback</text>
    <circle cx="38" cy="35" r="1.5" fill="#86868b"/>
    <!-- Mix -->
    <line x1="95" y1="35" x2="120" y2="35" stroke="#86868b" stroke-width="0.8"/>
    <text x="100" y="33" fill="#6e6e73" font-size="4.5" font-family="IBM Plex Mono">WET</text>
    <!-- Summing node -->
    <circle cx="120" cy="20" r="5" fill="none" stroke="#86868b" stroke-width="0.8"/>
    <text x="117.5" y="22" fill="#86868b" font-size="7" font-family="IBM Plex Mono">\u03a3</text>
    <line x1="120" y1="35" x2="120" y2="25" stroke="#86868b" stroke-width="0.8"/>
    <line x1="125" y1="20" x2="140" y2="20" stroke="#86868b" stroke-width="0.8"/>
    <text x="141" y="8" fill="#6e6e73" font-size="5.5" font-family="IBM Plex Mono">OUT</text>
  </svg>`,
};

const MODULES = {
  // --- FILTERS ---
  'lowpass': {
    name: 'Low-Pass', group: 'Filters',
    create: (ctx) => {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass'; f.frequency.value = 1000; f.Q.value = 0.707;
      return { node: f, input: f, output: f };
    },
    params: [
      { key: 'frequency', label: 'CUTOFF', min: 20, max: 20000, value: 1000, step: 1, log: true,
        fmt: v => v < 1000 ? Math.round(v)+'Hz' : (v/1000).toFixed(1)+'kHz',
        apply: (n, v) => n.node.frequency.value = v },
      { key: 'Q', label: 'RESONANCE (Q)', min: 0.1, max: 20, value: 0.707, step: 0.01,
        fmt: v => v.toFixed(2),
        apply: (n, v) => n.node.Q.value = v },
      { key: 'slope', label: 'SLOPE', type: 'select', options: [['6 dB/oct','6'],['12 dB/oct','12']], value: '12',
        apply: (n, v, pedal, ctx) => {
          // 12 dB = single biquad, 6 dB = we lower Q to approximate
          if (v === '6') n.node.Q.value = 0.5;
        }}
    ]
  },
  'highpass': {
    name: 'High-Pass', group: 'Filters',
    create: (ctx) => {
      const f = ctx.createBiquadFilter();
      f.type = 'highpass'; f.frequency.value = 400; f.Q.value = 0.707;
      return { node: f, input: f, output: f };
    },
    params: [
      { key: 'frequency', label: 'CUTOFF', min: 20, max: 20000, value: 400, step: 1, log: true,
        fmt: v => v < 1000 ? Math.round(v)+'Hz' : (v/1000).toFixed(1)+'kHz',
        apply: (n, v) => n.node.frequency.value = v },
      { key: 'Q', label: 'RESONANCE (Q)', min: 0.1, max: 20, value: 0.707, step: 0.01,
        fmt: v => v.toFixed(2),
        apply: (n, v) => n.node.Q.value = v }
    ]
  },
  'bandpass': {
    name: 'Band-Pass', group: 'Filters',
    create: (ctx) => {
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass'; f.frequency.value = 800; f.Q.value = 2;
      return { node: f, input: f, output: f };
    },
    params: [
      { key: 'frequency', label: 'CENTER', min: 20, max: 20000, value: 800, step: 1, log: true,
        fmt: v => v < 1000 ? Math.round(v)+'Hz' : (v/1000).toFixed(1)+'kHz',
        apply: (n, v) => n.node.frequency.value = v },
      { key: 'Q', label: 'WIDTH (Q)', min: 0.1, max: 30, value: 2, step: 0.1,
        fmt: v => v.toFixed(1),
        apply: (n, v) => n.node.Q.value = v }
    ]
  },
  'tonestack': {
    name: 'Tone Stack', group: 'Filters',
    create: (ctx) => {
      // Simple 3-band: HPF → peaking mid → LPF
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 100; hp.Q.value = 0.5;
      const mid = ctx.createBiquadFilter(); mid.type = 'peaking'; mid.frequency.value = 700; mid.Q.value = 1.5; mid.gain.value = 0;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 5000; lp.Q.value = 0.5;
      hp.connect(mid).connect(lp);
      return { node: hp, input: hp, output: lp, hp, mid, lp, extras: [mid, lp] };
    },
    params: [
      { key: 'preset', label: 'TYPE', type: 'select',
        options: [['Flat','flat'],['Treble Cut','treblecut'],['Big Muff','muff'],['Fender','fender'],['Marshall','marshall']],
        value: 'flat',
        apply: (n, v) => {
          const stacks = {
            flat:      { hpF: 60,  midF: 700,  midG: 0,  midQ: 1,   lpF: 18000 },
            treblecut: { hpF: 60,  midF: 1000, midG: 0,  midQ: 1,   lpF: 2500  },
            muff:      { hpF: 120, midF: 1000, midG: -8, midQ: 0.8, lpF: 4500  },
            fender:    { hpF: 80,  midF: 800,  midG: 3,  midQ: 1.2, lpF: 6000  },
            marshall:  { hpF: 100, midF: 650,  midG: 6,  midQ: 1.5, lpF: 5500  }
          };
          const s = stacks[v] || stacks.flat;
          n.hp.frequency.value = s.hpF; n.mid.frequency.value = s.midF;
          n.mid.gain.value = s.midG; n.mid.Q.value = s.midQ; n.lp.frequency.value = s.lpF;
        }},
      { key: 'tone', label: 'TONE', min: 0, max: 1, value: 0.5, step: 0.01,
        fmt: v => Math.round(v * 100) + '%',
        apply: (n, v) => {
          // Sweeps LPF cutoff around the preset center
          const base = n.lp.frequency.value;
          n.lp.frequency.value = 500 + v * 9500;
        }}
    ]
  },
  'peaking': {
    name: 'Peak EQ', group: 'Filters',
    create: (ctx) => {
      const f = ctx.createBiquadFilter();
      f.type = 'peaking'; f.frequency.value = 1000; f.Q.value = 2; f.gain.value = 6;
      return { node: f, input: f, output: f };
    },
    params: [
      { key: 'frequency', label: 'FREQUENCY', min: 20, max: 20000, value: 1000, step: 1, log: true,
        fmt: v => v < 1000 ? Math.round(v)+'Hz' : (v/1000).toFixed(1)+'kHz',
        apply: (n, v) => n.node.frequency.value = v },
      { key: 'Q', label: 'WIDTH (Q)', min: 0.1, max: 20, value: 2, step: 0.1,
        fmt: v => v.toFixed(1),
        apply: (n, v) => n.node.Q.value = v },
      { key: 'gain', label: 'BOOST (dB)', min: -24, max: 24, value: 6, step: 0.5,
        fmt: v => (v > 0 ? '+' : '') + v.toFixed(1) + 'dB',
        apply: (n, v) => n.node.gain.value = v }
    ]
  },

  // --- GAIN / DISTORTION ---
  'gain': {
    name: 'Clean Boost', group: 'Gain / Distortion',
    create: (ctx) => {
      const g = ctx.createGain(); g.gain.value = 2;
      return { node: g, input: g, output: g };
    },
    params: [
      { key: 'gain', label: 'GAIN', min: 0, max: 10, value: 2, step: 0.1,
        fmt: v => v.toFixed(1) + 'x (' + (20*Math.log10(Math.max(0.001,v))).toFixed(1) + 'dB)',
        apply: (n, v) => n.node.gain.value = v }
    ]
  },
  'softclip': {
    name: 'Soft Clip', group: 'Gain / Distortion',
    create: (ctx) => {
      const sp = ctx.createScriptProcessor(2048, 1, 1);
      sp._drive = 4; sp._asym = 0; sp._bias = 0;
      sp.onaudioprocess = (e) => {
        const inp = e.inputBuffer.getChannelData(0);
        const out = e.outputBuffer.getChannelData(0);
        const d = sp._drive, a = sp._asym, b = sp._bias;
        for (let i = 0; i < inp.length; i++) {
          const x = inp[i] + b; // shift by bias point
          const drv = x >= 0 ? d * (1 + a) : d * (1 - a * 0.5);
          out[i] = Math.tanh(x * drv); // clip, keep DC shift in output
        }
      };
      return { node: sp, input: sp, output: sp };
    },
    params: [
      { key: 'drive', label: 'DRIVE', min: 1, max: 20, value: 4, step: 0.5,
        fmt: v => v.toFixed(1),
        apply: (n, v) => n.node._drive = v },
      { key: 'bias', label: 'BIAS POINT', min: -0.5, max: 0.5, value: 0, step: 0.01,
        fmt: v => v === 0 ? 'CENTER' : (v > 0 ? '+' : '') + v.toFixed(2) + ' (shifts ' + (v > 0 ? 'pos' : 'neg') + ', adds even harmonics)',
        apply: (n, v) => n.node._bias = v },
      { key: 'asym', label: 'DIODE ASYMMETRY', min: 0, max: 0.8, value: 0, step: 0.01,
        fmt: v => v === 0 ? 'SYM' : Math.round(v*100) + '% ASYM',
        apply: (n, v) => n.node._asym = v }
    ]
  },
  'hardclip': {
    name: 'Hard Clip', group: 'Gain / Distortion',
    create: (ctx) => {
      const sp = ctx.createScriptProcessor(2048, 1, 1);
      sp._threshold = 0.5; sp._asym = 0; sp._bias = 0;
      sp.onaudioprocess = (e) => {
        const inp = e.inputBuffer.getChannelData(0);
        const out = e.outputBuffer.getChannelData(0);
        const t = sp._threshold, a = sp._asym, b = sp._bias;
        for (let i = 0; i < inp.length; i++) {
          const x = inp[i] + b; // shift by bias point
          const tPos = t * (1 - a * 0.5);
          const tNeg = t * (1 + a * 0.5);
          out[i] = Math.max(-tNeg, Math.min(tPos, x));
        }
      };
      return { node: sp, input: sp, output: sp };
    },
    params: [
      { key: 'threshold', label: 'THRESHOLD', min: 0.01, max: 1, value: 0.5, step: 0.01,
        fmt: v => Math.round(v * 100) + '%',
        apply: (n, v) => n.node._threshold = v },
      { key: 'bias', label: 'BIAS POINT', min: -0.5, max: 0.5, value: 0, step: 0.01,
        fmt: v => v === 0 ? 'CENTER' : (v > 0 ? '+' : '') + v.toFixed(2) + ' (shifts ' + (v > 0 ? 'pos' : 'neg') + ', adds even harmonics)',
        apply: (n, v) => n.node._bias = v },
      { key: 'asym', label: 'DIODE ASYMMETRY', min: 0, max: 0.8, value: 0, step: 0.01,
        fmt: v => v === 0 ? 'SYM' : Math.round(v*100) + '% ASYM',
        apply: (n, v) => n.node._asym = v }
    ]
  },
  'foldback': {
    name: 'Foldback', group: 'Gain / Distortion',
    create: (ctx) => {
      const sp = ctx.createScriptProcessor(2048, 1, 1);
      sp._threshold = 0.5;
      sp.onaudioprocess = (e) => {
        const inp = e.inputBuffer.getChannelData(0);
        const out = e.outputBuffer.getChannelData(0);
        const t = sp._threshold;
        for (let i = 0; i < inp.length; i++) {
          let s = inp[i];
          if (t > 0) { while (s > t || s < -t) { s = s > t ? 2*t - s : -2*t - s; } }
          out[i] = s;
        }
      };
      return { node: sp, input: sp, output: sp };
    },
    params: [
      { key: 'threshold', label: 'FOLD POINT', min: 0.05, max: 1, value: 0.5, step: 0.01,
        fmt: v => Math.round(v * 100) + '%',
        apply: (n, v) => n.node._threshold = v }
    ]
  },
  'rectifier': {
    name: 'Rectifier', group: 'Gain / Distortion',
    create: (ctx) => {
      const sp = ctx.createScriptProcessor(2048, 1, 1);
      sp._mode = 'full'; // 'full' = |x| (octave up), 'half' = positive only
      sp.onaudioprocess = (e) => {
        const inp = e.inputBuffer.getChannelData(0);
        const out = e.outputBuffer.getChannelData(0);
        if (sp._mode === 'full') {
          for (let i = 0; i < inp.length; i++) out[i] = Math.abs(inp[i]);
        } else {
          for (let i = 0; i < inp.length; i++) out[i] = inp[i] > 0 ? inp[i] : 0;
        }
      };
      return { node: sp, input: sp, output: sp };
    },
    params: [
      { key: 'mode', label: 'MODE', type: 'select',
        options: [['Full-Wave (octave up)','full'],['Half-Wave (thin)','half']],
        value: 'full',
        apply: (n, v) => n.node._mode = v }
    ]
  },
  'bitcrush': {
    name: 'Bit Crush', group: 'Gain / Distortion',
    create: (ctx) => {
      const sp = ctx.createScriptProcessor(2048, 1, 1);
      sp._bits = 8; sp._ds = 1;
      sp.onaudioprocess = (e) => {
        const inp = e.inputBuffer.getChannelData(0);
        const out = e.outputBuffer.getChannelData(0);
        const levels = Math.pow(2, sp._bits);
        const step = 2 / levels;
        const ds = Math.max(1, Math.round(sp._ds));
        let held = 0;
        for (let i = 0; i < inp.length; i++) {
          if (i % ds === 0) {
            held = Math.floor((inp[i] + 1) / step) * step - 1 + step * 0.5;
            held = Math.max(-1, Math.min(1, held));
          }
          out[i] = held;
        }
      };
      return { node: sp, input: sp, output: sp };
    },
    params: [
      { key: 'bits', label: 'BIT DEPTH', min: 1, max: 16, value: 8, step: 1,
        fmt: v => v + ' bit', apply: (n, v) => n.node._bits = v },
      { key: 'ds', label: 'DOWNSAMPLE', min: 1, max: 64, value: 1, step: 1,
        fmt: v => v + 'x', apply: (n, v) => n.node._ds = v }
    ]
  },

  // --- UTILITY ---
  'noisegate': {
    name: 'Noise Gate', group: 'Utility',
    create: (ctx) => {
      const sp = ctx.createScriptProcessor(2048, 1, 1);
      sp._threshold = 0.01; sp._open = false; sp._attack = 0.005; sp._release = 0.05; sp._env = 0;
      sp.onaudioprocess = (e) => {
        const inp = e.inputBuffer.getChannelData(0);
        const out = e.outputBuffer.getChannelData(0);
        const t = sp._threshold;
        // Simple envelope follower
        for (let i = 0; i < inp.length; i++) {
          const abs = Math.abs(inp[i]);
          const coeff = abs > sp._env ? sp._attack : sp._release;
          sp._env += (abs - sp._env) * coeff * 10;
          out[i] = sp._env >= t ? inp[i] : inp[i] * (sp._env / t);
        }
      };
      return { node: sp, input: sp, output: sp };
    },
    params: [
      { key: 'threshold', label: 'THRESHOLD', min: 0.001, max: 0.2, value: 0.01, step: 0.001, log: true,
        fmt: v => (20*Math.log10(v)).toFixed(1) + 'dB',
        apply: (n, v) => n.node._threshold = v },
      { key: 'release', label: 'RELEASE', min: 0.01, max: 0.5, value: 0.05, step: 0.01,
        fmt: v => Math.round(v*1000) + 'ms',
        apply: (n, v) => n.node._release = v }
    ]
  },
  'delay': {
    name: 'Delay', group: 'Utility',
    create: (ctx) => {
      const input = ctx.createGain();
      const output = ctx.createGain();
      const dry = ctx.createGain(); dry.gain.value = 1;
      const wet = ctx.createGain(); wet.gain.value = 0.4;
      const del = ctx.createDelay(2.0); del.delayTime.value = 0.3;
      const fb = ctx.createGain(); fb.gain.value = 0.3;
      input.connect(dry).connect(output);
      input.connect(del).connect(wet).connect(output);
      del.connect(fb).connect(del);
      return { node: del, input, output, dry, wet, feedback: fb, extras: [dry, wet, fb] };
    },
    params: [
      { key: 'time', label: 'TIME (ms)', min: 10, max: 2000, value: 300, step: 10,
        fmt: v => v + 'ms', apply: (n, v) => n.node.delayTime.value = v / 1000 },
      { key: 'feedback', label: 'FEEDBACK', min: 0, max: 0.9, value: 0.3, step: 0.01,
        fmt: v => Math.round(v*100) + '%', apply: (n, v) => n.feedback.gain.value = v },
      { key: 'mix', label: 'MIX', min: 0, max: 1, value: 0.4, step: 0.01,
        fmt: v => Math.round(v*100) + '%', apply: (n, v) => n.wet.gain.value = v }
    ]
  }
};

// ============================================================
// AUDIO ENGINE
// ============================================================
let audioCtx, sourceNode, oscNode, micStream, fileSource, fileBuffer;
let inputGainNode, outputGainNode;
let analyserIn, analyserOut;
let powerNoiseNode, powerNoiseGain;
let playing = false, sourceType = 'osc';
let chain = [];
let nextId = 0;

function ud(id, txt) { document.getElementById(id).textContent = txt; }

async function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  inputGainNode = audioCtx.createGain();
  outputGainNode = audioCtx.createGain();
  analyserIn = audioCtx.createAnalyser(); analyserIn.fftSize = 2048;
  analyserOut = audioCtx.createAnalyser(); analyserOut.fftSize = 2048;

  // 60 Hz power noise oscillator
  powerNoiseNode = audioCtx.createOscillator();
  powerNoiseNode.type = 'sine';
  powerNoiseNode.frequency.value = 60;
  powerNoiseGain = audioCtx.createGain();
  powerNoiseGain.gain.value = 0;
  // Add a few harmonics for realism
  const noise120 = audioCtx.createOscillator(); noise120.type = 'sine'; noise120.frequency.value = 120;
  const noise180 = audioCtx.createOscillator(); noise180.type = 'sine'; noise180.frequency.value = 180;
  const harmGain = audioCtx.createGain(); harmGain.gain.value = 0.3;
  powerNoiseNode.connect(powerNoiseGain);
  noise120.connect(harmGain).connect(powerNoiseGain);
  noise180.connect(harmGain);
  powerNoiseGain.connect(inputGainNode);
  powerNoiseNode.start(); noise120.start(); noise180.start();

  updateGains();
  setupSource();
  rewire();
  playing = true;
  document.getElementById('play-btn').classList.add('active');
  document.getElementById('play-btn').textContent = 'PLAYING';
  document.getElementById('audio-dot').classList.add('active');
  document.getElementById('audio-status').textContent = 'AUDIO RUNNING';
  drawLoop();
}

function setupSource() {
  if (sourceNode) { try { sourceNode.disconnect(); } catch(e){} }
  if (oscNode) { oscNode.stop(); oscNode = null; }
  if (micStream) { micStream.getTracks().forEach(t => t.stop()); micStream = null; }
  if (fileSource) { try { fileSource.stop(); } catch(e){} fileSource = null; }

  if (sourceType === 'osc') {
    oscNode = audioCtx.createOscillator();
    oscNode.type = document.getElementById('osc-type').value;
    oscNode.frequency.value = parseFloat(document.getElementById('osc-freq').value);
    oscNode.start();
    sourceNode = oscNode;
  }
  sourceNode.connect(inputGainNode);
}

async function setSource(type) {
  sourceType = type;
  ['btn-osc','btn-mic','btn-wav'].forEach(b => document.getElementById(b).classList.remove('active'));
  document.getElementById('mic-warning').style.display = 'none';

  if (type === 'mic') {
    document.getElementById('btn-mic').classList.add('active');
    document.getElementById('mic-warning').style.display = '';
    if (!audioCtx) await initAudio();
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (sourceNode) { try { sourceNode.disconnect(); } catch(e){} }
      if (oscNode) { oscNode.stop(); oscNode = null; }
      sourceNode = audioCtx.createMediaStreamSource(micStream);
      sourceNode.connect(inputGainNode);
    } catch(e) { console.error('Mic:', e); }
  } else if (type === 'wav') {
    document.getElementById('btn-wav').classList.add('active');
    if (audioCtx && fileBuffer) playFileBuffer();
  } else {
    document.getElementById('btn-osc').classList.add('active');
    if (audioCtx) setupSource();
  }
}

function loadFile(input) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    if (!audioCtx) await initAudio();
    fileBuffer = await audioCtx.decodeAudioData(reader.result);
    sourceType = 'wav';
    setSource('wav');
    playFileBuffer();
  };
  reader.readAsArrayBuffer(file);
}

function playFileBuffer() {
  if (fileSource) { try { fileSource.stop(); } catch(e){} }
  if (sourceNode) { try { sourceNode.disconnect(); } catch(e){} }
  if (oscNode) { oscNode.stop(); oscNode = null; }
  fileSource = audioCtx.createBufferSource();
  fileSource.buffer = fileBuffer; fileSource.loop = true; fileSource.start();
  sourceNode = fileSource;
  sourceNode.connect(inputGainNode);
}

async function loadServerWav(filename) {
  if (!audioCtx) await initAudio();
  const resp = await fetch('/wavs/' + filename);
  const ab = await resp.arrayBuffer();
  fileBuffer = await audioCtx.decodeAudioData(ab);
  sourceType = 'wav'; setSource('wav'); playFileBuffer();
}

function updateOsc() {
  if (!oscNode) return;
  oscNode.type = document.getElementById('osc-type').value;
  oscNode.frequency.value = parseFloat(document.getElementById('osc-freq').value);
}

function updateGains() {
  if (!inputGainNode) return;
  inputGainNode.gain.value = parseFloat(document.getElementById('input-gain').value);
  outputGainNode.gain.value = parseFloat(document.getElementById('out-vol').value);
}

function updatePowerNoise() {
  if (!powerNoiseGain) return;
  powerNoiseGain.gain.value = parseFloat(document.getElementById('power-noise').value);
}

async function togglePlay() {
  if (!audioCtx) { await initAudio(); return; }
  if (playing) {
    await audioCtx.suspend(); playing = false;
    document.getElementById('play-btn').classList.remove('active');
    document.getElementById('play-btn').textContent = 'START';
    document.getElementById('audio-dot').classList.remove('active');
    document.getElementById('audio-status').textContent = 'AUDIO PAUSED';
  } else {
    await audioCtx.resume(); playing = true;
    document.getElementById('play-btn').classList.add('active');
    document.getElementById('play-btn').textContent = 'PLAYING';
    document.getElementById('audio-dot').classList.add('active');
    document.getElementById('audio-status').textContent = 'AUDIO RUNNING';
  }
}

// ============================================================
// SIGNAL CHAIN
// ============================================================
function rewire() {
  if (!audioCtx) return;
  try { inputGainNode.disconnect(); } catch(e){}
  chain.forEach(p => {
    try { p.nodes.output.disconnect(); } catch(e){}
    if (p.bypassGain) { try { p.bypassGain.disconnect(); } catch(e){} }
  });
  try { analyserIn.disconnect(); } catch(e){}
  try { analyserOut.disconnect(); } catch(e){}
  try { outputGainNode.disconnect(); } catch(e){}

  // Re-connect power noise to input (it was disconnected above indirectly)
  try { powerNoiseGain.connect(inputGainNode); } catch(e){}

  let current = inputGainNode;
  current.connect(analyserIn);

  for (const pedal of chain) {
    if (pedal.bypassed) {
      if (!pedal.bypassGain) pedal.bypassGain = audioCtx.createGain();
      current.connect(pedal.bypassGain);
      current = pedal.bypassGain;
    } else {
      current.connect(pedal.nodes.input);
      current = pedal.nodes.output;
    }
  }

  current.connect(analyserOut);
  analyserOut.connect(outputGainNode);
  outputGainNode.connect(audioCtx.destination);
}

// ============================================================
// CHAIN MANAGEMENT
// ============================================================
function addPedal(type) {
  if (!audioCtx) { initAudio().then(() => addPedal(type)); return; }
  const def = MODULES[type];
  const id = nextId++;
  const nodes = def.create(audioCtx);
  const pedal = { id, type, nodes, bypassed: false, paramValues: {}, el: null, bypassGain: null };
  def.params.forEach(p => { pedal.paramValues[p.key] = p.value; });
  chain.push(pedal);
  renderChain();
  rewire();
}

function removePedal(id) {
  const idx = chain.findIndex(p => p.id === id);
  if (idx === -1) return;
  const pedal = chain[idx];
  try { pedal.nodes.output.disconnect(); } catch(e){}
  try { pedal.nodes.input.disconnect(); } catch(e){}
  if (pedal.nodes.extras) pedal.nodes.extras.forEach(n => { try { n.disconnect(); } catch(e){} });
  if (pedal.bypassGain) { try { pedal.bypassGain.disconnect(); } catch(e){} }
  chain.splice(idx, 1);
  renderChain();
  rewire();
}

function toggleBypass(id) {
  const pedal = chain.find(p => p.id === id);
  if (!pedal) return;
  pedal.bypassed = !pedal.bypassed;
  renderChain();
  rewire();
}

// Drag reordering
let dragId = null;

function onDragStart(e, id) {
  dragId = id;
  e.dataTransfer.effectAllowed = 'move';
  e.target.closest('.pedal').classList.add('dragging');
}

function onDragEnd() {
  dragId = null;
  document.querySelectorAll('.pedal').forEach(el => el.classList.remove('dragging'));
}

function onDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }

function onDrop(e, targetId) {
  e.preventDefault();
  if (dragId === null || dragId === targetId) return;
  const from = chain.findIndex(p => p.id === dragId);
  const to = chain.findIndex(p => p.id === targetId);
  if (from === -1 || to === -1) return;
  const [moved] = chain.splice(from, 1);
  chain.splice(to, 0, moved);
  renderChain();
  rewire();
}

// ============================================================
// RENDER CHAIN
// ============================================================
function renderChain() {
  const rack = document.getElementById('rack');
  rack.innerHTML = '';

  if (chain.length === 0) {
    rack.innerHTML = '<div class="empty-chain">No pedals in chain — add modules from the palette above</div>';
    renderFlowOverview();
    return;
  }

  chain.forEach((pedal, i) => {
    if (i > 0) {
      const arrow = document.createElement('div');
      arrow.className = 'chain-arrow';
      arrow.textContent = '\u2192';
      rack.appendChild(arrow);
    }

    const def = MODULES[pedal.type];
    const el = document.createElement('div');
    el.className = 'pedal';
    el.draggable = true;
    el.ondragstart = (e) => onDragStart(e, pedal.id);
    el.ondragend = onDragEnd;
    el.ondragover = onDragOver;
    el.ondrop = (e) => onDrop(e, pedal.id);

    let html = `<div class="pedal-header">
      <span class="pedal-name">${def.name}</span>
      <button class="pedal-remove" onclick="removePedal(${pedal.id})">&times;</button>
    </div>
    <button class="bypass-btn ${pedal.bypassed ? 'bypassed' : 'active'}" onclick="toggleBypass(${pedal.id})">${pedal.bypassed ? 'BYPASSED' : 'ACTIVE'}</button>`;

    // Schematic SVG
    if (SCHEMATICS[pedal.type]) {
      html += `<div class="pedal-schematic">${SCHEMATICS[pedal.type]()}</div>`;
    }

    def.params.forEach(p => {
      const val = pedal.paramValues[p.key] !== undefined ? pedal.paramValues[p.key] : p.value;

      if (p.type === 'select') {
        html += `<div class="param-row"><div class="knob-group">
          <div class="knob-label">${p.label}</div>
          <select onchange="onSelectChange(${pedal.id}, '${p.key}', this.value)">
            ${p.options.map(([label, v]) => `<option value="${v}" ${v === val ? 'selected' : ''}>${label}</option>`).join('')}
          </select>
        </div></div>`;
      } else {
        const sliderVal = p.log ? logToSlider(val, p.min, p.max) : val;
        html += `<div class="param-row"><div class="knob-group">
          <div class="knob-label">${p.label}</div>
          <input type="range" min="${p.log ? 0 : p.min}" max="${p.log ? 1000 : p.max}" value="${p.log ? Math.round(sliderVal) : val}" step="${p.log ? 1 : p.step}"
            oninput="onParamChange(${pedal.id}, '${p.key}', this.value, ${!!p.log})">
          <div class="knob-value" id="pval-${pedal.id}-${p.key}">${p.fmt(val)}</div>
        </div></div>`;
      }
    });

    // Noise floor meter per pedal
    html += `<div class="noise-meter"><div class="noise-meter-fill" id="nm-${pedal.id}"></div></div>`;

    el.innerHTML = html;
    pedal.el = el;
    rack.appendChild(el);
  });

  renderFlowOverview();
}

function renderFlowOverview() {
  const container = document.getElementById('flow-overview');
  if (chain.length === 0) { container.innerHTML = ''; return; }

  // Build SVG signal flow: INPUT → [pedal1] → [pedal2] → ... → OUTPUT
  const boxW = 70, boxH = 22, arrowW = 24, padX = 10, padY = 8;
  const items = [
    { label: 'INPUT', color: '#86868b' },
    ...chain.map(p => ({
      label: MODULES[p.type].name.toUpperCase(),
      color: p.bypassed ? '#6e6e73' : '#e8803a',
      bypassed: p.bypassed
    })),
    { label: 'OUTPUT', color: '#86868b' }
  ];

  const totalW = items.length * boxW + (items.length - 1) * arrowW + padX * 2;
  const totalH = boxH + padY * 2 + 12;

  let svg = `<svg viewBox="0 0 ${totalW} ${totalH}" xmlns="http://www.w3.org/2000/svg" style="height:${totalH}px">`;

  items.forEach((item, i) => {
    const x = padX + i * (boxW + arrowW);
    const y = padY;
    const dash = item.bypassed ? ' stroke-dasharray="3,2"' : '';

    svg += `<rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="2" fill="none" stroke="${item.color}" stroke-width="1"${dash}/>`;
    svg += `<text x="${x + boxW/2}" y="${y + boxH/2 + 3.5}" fill="${item.color}" font-size="6" font-family="IBM Plex Mono" text-anchor="middle">${item.label}</text>`;

    if (item.bypassed) {
      svg += `<text x="${x + boxW/2}" y="${y + boxH + 9}" fill="#cc3333" font-size="5" font-family="IBM Plex Mono" text-anchor="middle">BYPASS</text>`;
    }

    // Arrow to next
    if (i < items.length - 1) {
      const ax = x + boxW;
      const ay = y + boxH / 2;
      svg += `<line x1="${ax}" y1="${ay}" x2="${ax + arrowW - 4}" y2="${ay}" stroke="#6e6e73" stroke-width="0.8"/>`;
      svg += `<polygon points="${ax+arrowW-4},${ay-3} ${ax+arrowW},${ay} ${ax+arrowW-4},${ay+3}" fill="#6e6e73"/>`;
    }
  });

  svg += '</svg>';
  container.innerHTML = svg;
}

function logToSlider(value, min, max) {
  return ((Math.log(value) - Math.log(min)) / (Math.log(max) - Math.log(min))) * 1000;
}

function sliderToLog(slider, min, max) {
  return Math.exp(Math.log(min) + (slider / 1000) * (Math.log(max) - Math.log(min)));
}

function onParamChange(pedalId, key, rawValue, isLog) {
  const pedal = chain.find(p => p.id === pedalId);
  if (!pedal) return;
  const paramDef = MODULES[pedal.type].params.find(p => p.key === key);
  if (!paramDef) return;
  const value = isLog ? sliderToLog(parseFloat(rawValue), paramDef.min, paramDef.max) : parseFloat(rawValue);
  pedal.paramValues[key] = value;
  paramDef.apply(pedal.nodes, value, pedal, audioCtx);
  const el = document.getElementById(`pval-${pedalId}-${key}`);
  if (el) el.textContent = paramDef.fmt(value);
}

function onSelectChange(pedalId, key, value) {
  const pedal = chain.find(p => p.id === pedalId);
  if (!pedal) return;
  const paramDef = MODULES[pedal.type].params.find(p => p.key === key);
  if (!paramDef) return;
  pedal.paramValues[key] = value;
  paramDef.apply(pedal.nodes, value, pedal, audioCtx);
}

// ============================================================
// PRESETS
// ============================================================
// Preset recipes: accurate block-level reconstructions of classic pedals

// PRESETS is defined per-page in inline <script> before this file loads

function loadPreset(name) {
  while (chain.length) removePedal(chain[0].id);

  const preset = PRESETS[name];
  if (!preset) return;

  // Show recipe description
  const recipeEl = document.getElementById('preset-recipe');
  if (recipeEl) {
    recipeEl.innerHTML = `<strong style="color:var(--accent)">${preset.label}</strong><br>${preset.recipe}<br><span style="color:var(--text-tertiary);font-size:0.7rem">${preset.source}</span>`;
  }

  const doLoad = () => {
    preset.chain.forEach(p => {
      addPedal(p.type);
      const pedal = chain[chain.length - 1];
      for (const [k, v] of Object.entries(p.params)) {
        pedal.paramValues[k] = v;
        const pd = MODULES[p.type].params.find(d => d.key === k);
        if (pd) pd.apply(pedal.nodes, v, pedal, audioCtx);
      }
    });
    renderChain();
  };

  if (!audioCtx) initAudio().then(doLoad); else doLoad();
}

// ============================================================
// SAVE / LOAD CHAIN
// ============================================================
function exportChain() {
  if (chain.length === 0) return;
  const data = {
    name: prompt('Name this chain (optional):') || 'Untitled',
    date: new Date().toISOString().slice(0, 10),
    modules: chain.map(p => ({
      type: p.type,
      params: { ...p.paramValues },
      bypassed: p.bypassed
    }))
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (data.name.replace(/[^a-zA-Z0-9_-]/g, '_') || 'chain') + '.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importChain(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data.modules || !Array.isArray(data.modules)) {
        console.error('Invalid chain file'); return;
      }
      if (!audioCtx) await initAudio();
      while (chain.length) removePedal(chain[0].id);
      data.modules.forEach(m => {
        if (!MODULES[m.type]) { console.warn('Unknown module:', m.type); return; }
        addPedal(m.type);
        const pedal = chain[chain.length - 1];
        if (m.params) {
          for (const [k, v] of Object.entries(m.params)) {
            pedal.paramValues[k] = v;
            const pd = MODULES[m.type].params.find(d => d.key === k);
            if (pd) pd.apply(pedal.nodes, v, pedal, audioCtx);
          }
        }
        if (m.bypassed) pedal.bypassed = true;
      });
      renderChain();
      rewire();
      // Show name in recipe area if present
      const recipeEl = document.getElementById('preset-recipe');
      if (recipeEl && data.name) {
        recipeEl.innerHTML = '<strong style="color:var(--accent)">Loaded: ' + data.name + '</strong>' +
          (data.date ? '<br><span style="color:var(--text-tertiary);font-size:0.7rem">saved ' + data.date + '</span>' : '');
      }
    } catch(e) { console.error('Error loading chain:', e); }
  };
  reader.readAsText(file);
  input.value = ''; // reset so same file can be loaded again
}

function clearChain() {
  while (chain.length) removePedal(chain[0].id);
  const recipeEl = document.getElementById('preset-recipe');
  if (recipeEl) recipeEl.innerHTML = '';
}

// ============================================================
// VISUALIZATION
// ============================================================
function drawLoop() {
  drawScope('scope-in', analyserIn);
  drawScope('scope-out', analyserOut);
  drawFFT('fft-in', analyserIn);
  drawFFT('fft-out', analyserOut);
  updateNoiseFloor();
  requestAnimationFrame(drawLoop);
}

function drawScope(canvasId, analyser) {
  const canvas = document.getElementById(canvasId);
  const c = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width = canvas.clientWidth * dpr;
  const h = canvas.height = canvas.clientHeight * dpr;

  const data = new Float32Array(analyser.fftSize);
  analyser.getFloatTimeDomainData(data);

  c.fillStyle = '#0a0a0a';
  c.fillRect(0, 0, w, h);

  c.strokeStyle = 'rgba(255,255,255,0.06)';
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(0, h/2); c.lineTo(w, h/2);
  c.moveTo(0, h/4); c.lineTo(w, h/4);
  c.moveTo(0, 3*h/4); c.lineTo(w, 3*h/4);
  c.stroke();

  c.strokeStyle = '#f5f5f7';
  c.lineWidth = 1.5;
  c.beginPath();
  for (let i = 0; i < data.length; i++) {
    const x = (i / data.length) * w;
    const y = (1 - data[i]) * h / 2;
    i === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
  }
  c.stroke();
}

function drawFFT(canvasId, analyser) {
  const canvas = document.getElementById(canvasId);
  const c = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width = canvas.clientWidth * dpr;
  const h = canvas.height = canvas.clientHeight * dpr;

  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);

  c.fillStyle = '#0a0a0a';
  c.fillRect(0, 0, w, h);

  const barW = w / data.length * 2;
  c.fillStyle = 'rgba(245,245,247,0.7)';
  for (let i = 0; i < data.length / 2; i++) {
    const barH = (data[i] / 255) * h;
    c.fillRect(i * barW, h - barH, Math.max(1, barW - 0.5), barH);
  }
}

function updateNoiseFloor() {
  // Overall output noise floor reading
  const data = new Float32Array(analyserOut.fftSize);
  analyserOut.getFloatTimeDomainData(data);
  let rms = 0;
  for (let i = 0; i < data.length; i++) rms += data[i] * data[i];
  rms = Math.sqrt(rms / data.length);
  const db = rms > 0 ? (20 * Math.log10(rms)).toFixed(1) : '-inf';
  document.getElementById('noise-floor-val').textContent = db;
}

// ============================================================
// INIT
// ============================================================
function buildPalette() {
  const palette = document.getElementById('palette');
  const groups = {};
  for (const [key, def] of Object.entries(MODULES)) {
    const g = def.group || 'Other';
    if (!groups[g]) groups[g] = [];
    groups[g].push({ key, def });
  }
  for (const [group, items] of Object.entries(groups)) {
    const label = document.createElement('div');
    label.className = 'palette-group-label';
    label.textContent = group;
    palette.appendChild(label);
    items.forEach(({ key, def }) => {
      const btn = document.createElement('button');
      btn.textContent = '+ ' + def.name;
      btn.onclick = () => addPedal(key);
      palette.appendChild(btn);
    });
  }
}

async function loadWavButtons() {
  try {
    const resp = await fetch('/api/wavs');
    const data = await resp.json();
    const container = document.getElementById('wav-btns');
    data.files.forEach(f => {
      const btn = document.createElement('button');
      btn.className = 'amber-btn';
      btn.style.fontSize = '0.65rem';
      btn.style.padding = '4px 8px';
      btn.textContent = f.replace(/\.[^.]+$/, '').substring(0, 20);
      btn.onclick = () => loadServerWav(f);
      container.appendChild(btn);
    });
  } catch(e) {}
}

buildPalette();
loadWavButtons();
renderChain();
