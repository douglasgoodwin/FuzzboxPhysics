## # Shared power block for all builds

Use this on every board.



**9 V input protection + filtering**

- DPROT: 1N5817 in series with +9 V (anode at supply, cathode to circuit +9 V)
- RPS: 47 ohm from DPROT cathode to VCC
- CPS1: 47 uF from VCC to GND
- CPS2: 100 nF from VCC to GND (right at the circuit)



If you want “sag” experiments later, you can increase RPS or replace RPS with a pot.

Great. Below are **clear, buildable vero/stripboard layouts** for **each hands-on week**, written so someone with basic vero experience can wire them **without guessing**. I’ll use a consistent convention so you can redraw these cleanly or turn them into diagrams later.



I’ll assume:



- Standard **vero board** with **horizontal copper strips**
- **Component side view**
- **Left = input**, **Right = output**
- **Top strip = VCC (+9 V)**, **bottom strip = GND**
- Cuts are critical and explicitly listed





I’ll label rows **A (top) downward**, and columns **1–20 left to right**.

You can scale width as needed.



------





# **WEEK 2**







## **JFET Booster (Common Source)**





**Board:** 9 strips x 18 holes





### **Strip assignments**





- **A**: VCC
- **B**: Drain node
- **C**: Gate node
- **D**: Input signal
- **E**: Source node
- **F**: Ground
- **G–I**: unused / mechanical







### **Layout**





**Cuts**



- Cut strip B under Q1 source pin
- Cut strip C under Q1 drain pin
- Cut strip E under Q1 gate pin





**JFET placement**



- Q1 J201 spans strips B–C–E

  (Drain → B, Gate → C, Source → E)





**Components**



- R2 33k from **A → B**
- R1 1M from **C → F**
- R3 1.5k from **E → F**
- C2 22uF from **E → F** (electrolytic, + to E)
- Input jack → **D**
- C1 100n from **D → C**
- C3 1uF from **B → volume pot lug 3**
- Volume pot lug 1 → **F**
- Output from pot wiper
- Pulldown 1M from input jack → **F**





**Power**



- +9 V to **A**
- GND to **F**





------





# **WEEK 3**







## **JFET Buffer (Source Follower)**





**Board:** 8 strips x 16 holes





### **Strip assignments**





- **A**: VCC
- **B**: Drain (tied to VCC)
- **C**: Gate
- **D**: Input
- **E**: Source / output
- **F**: Ground







### **Layout**





**Cuts**



- Cut strip C under source pin
- Cut strip E under gate pin





**JFET**



- Q1 spans B–C–E

  (Drain B, Gate C, Source E)





**Components**



- Drain B → A (wire link)
- R1 1M from **C → F**
- R2 4.7k from **E → F**
- C1 100n from **D → C**
- Input jack → **D**
- C2 1uF from **E → output jack**
- R3 100k from output jack → **F**





------





# **WEEK 4**







## **Spring Reverb Driver + Recovery (Two Boards Recommended)**







### **A) Driver board (transistor push)**





**Board:** 8 strips x 14 holes



**Strips**



- **A**: VCC
- **B**: Base bias
- **C**: Base
- **D**: Emitter
- **E**: GND





**Q1 2N3904**



- Collector → **A**
- Base → **C**
- Emitter → **D**





**Parts**



- R2 220k from **A → B**
- R3 100k from **B → E**
- R1 10k from input cap → **C**
- C1 100n from input jack → R1
- R4 100 ohm from **D → spring driver**
- Spring other side → **E**





------





### **B) Recovery board (two-stage amplifier)**





**Board:** 10 strips x 22 holes



**Strips**



- **A**: VCC
- **B**: Q3 collector
- **C**: Q3 base
- **D**: Q3 emitter
- **E**: Interstage
- **F**: Q4 base
- **G**: Q4 collector
- **H**: Q4 emitter
- **I**: GND





**Cuts**



- Under each transistor pin where strips cross unintentionally





**Q3 and Q4**



- Both 2N3904 in same orientation





**Bias and gain**



- R7 470k from **A → C**
- R8 100k from **C → I**
- R9 47k from **A → B**
- R10 1k from **D → I**
- C2 10n from spring pickup → **C**
- C3 100n from **B → F**
- R12 470k from **A → F**
- R13 100k from **F → I**
- R14 47k from **A → G**
- R15 1k from **H → I**
- Output from **G → C4 1uF → volume pot**





------





# **WEEK 5**







## **Pickup Load Box + Buffer**







### **A) Load box**





No board needed.

Wire rotary switch:



- Common → signal
- Throws → resistors (1M, 470k, 220k, 100k) to ground
- Optional second pole for caps to ground







### **B) Buffer**





Use **Week 3 buffer layout** unchanged.



------





# **WEEK 6**







## **Two-Transistor Fuzz (Hendrix-era)**





**Board:** 10 strips x 20 holes



**Strips**



- **A**: VCC
- **B**: Q1 collector
- **C**: Q1 base
- **D**: Q1 emitter
- **E**: Interstage
- **F**: Q2 base
- **G**: Q2 collector
- **H**: Q2 emitter
- **I**: GND





**Q1 and Q2**



- Both 2N3904





**Components**



- C1 2.2u from input → **C**
- R1 33k from **C → I**
- R2 100k from **A → B**
- R3 470 ohm from **D → I**
- C2 10n from **B → F**
- R4 100k from **F → I**
- R5 4.7k + 10k trimmer from **A → G**
- FUZZ pot 1k from **H → I**
- Output from **G → C3 100n → volume pot**





------





# **WEEK 7**







## **Transistor Clipper + Filters**





**Board:** 8 strips x 18 holes



**Strips**



- **A**: VCC
- **B**: Collector
- **C**: Base
- **D**: Input
- **E**: Ground





**Q1**



- 2N3904





**Components**



- R3 10k from **A → B**
- R2 470k from **C → E**
- C1 22n from **D → R1**
- R1 10k from C1 → **C**
- Diodes D1/D2 antiparallel from **B → E**
- Output from **B → C2 100n → volume pot**





**Pre-filter (switchable)**



- CFpre 10n before C1
- Rpre 220k from base side of CFpre → E





**Post-filter (switchable)**



- Rpost 4.7k between **B and C2**
- Cpost 4.7n from Rpost/C2 junction → E





------





# **WEEK 8**







## **CMOS Logic Effects**







### **A) CD4069 Distortion**





**Board:** 9 strips x 16 holes



**Strips**



- **A**: VCC
- **B**: Bias node
- **C**: Inverter input
- **D**: Inverter output
- **E**: GND





**IC**



- CD4069 straddling center gap





**Components**



- R1 1M from **A → B**
- R2 1M from **B → E**
- R3 1M from **D → B**
- C1 100n from input → **B**
- Diodes antiparallel from **D → E**
- Output from **D → C2 1uF → volume pot**





------





### **B) CD4013 Octave Divider**





**Board:** 10 strips x 18 holes



**Strips**



- **A**: VCC
- **B**: Clock
- **C**: Q output
- **D**: GND





**Front-end squarer**



- Q1 2N3904
- R3 10k from **A → collector**
- Base via 10k from input
- Base pulldown 100k to GND
- Collector output → **B**





**4013**



- CLOCK → **B**
- D tied to /Q
- SET and RESET to **D**
- Q → **C → C2 100n → volume pot**





------





# **WEEK 10**







## **Capstone Pedal**





Combine:



- Week 3 buffer
- Week 7 pre-filter
- Week 6 fuzz
- Week 7 post-filter
- Optional Week 8 logic block on toggle





Best practice:



- Separate each block with a 100n coupling cap
- Use pulldowns (100k–1M) at each block input
- Star ground all blocks to one strip





------





## **Next step options**





I can now:



1. Convert these into **printable vero diagrams**
2. Provide **drill + cut maps**
3. Create **one universal vero board** that fits all blocks modularly
4. Produce **student-facing build sheets**





Tell me which one you want next.