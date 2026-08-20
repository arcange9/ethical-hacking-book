# Level 14 — REVERSE ENGINEERING FUNDAMENTALS

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- What reverse engineering means in cybersecurity
- Binary files, executables, and assembly concepts
- Static vs dynamic analysis
- Tools: Ghidra, strings, file

---

## Chapter 29 — Static & Dynamic Analysis

### What Is Reverse Engineering?

Reverse engineering is the process of analyzing a program to understand how it works — without having the source code. In cybersecurity, this is used to:
- Understand what malware does
- Find vulnerabilities in software
- Verify software security
- Understand undocumented protocols

```
┌──────────────────────────────────────────────────┐
│           REVERSE ENGINEERING                      │
├──────────────────────────────────────────────────┤
│                                                    │
│  Source Code → Compiler → Binary (executable)     │
│                                                    │
│  Reverse Engineering:                             │
│  Binary → Analysis → Understanding                 │
│                                                    │
│  Analogy: You can't read the recipe (source code),│
│  but you can taste the cake (binary) and figure   │
│  out what's in it.                                  │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Types of Analysis

```
┌──────────────────────────────────────────────────┐
│        STATIC vs DYNAMIC ANALYSIS                  │
├──────────────────────────────────────────────────┤
│                                                    │
│  STATIC ANALYSIS:                                 │
│  → Analyze the binary without running it           │
│  → Safe — no execution risk                        │
│  → Tools: strings, file, Ghidra, objdump           │
│  → Finds: strings, imports, structure              │
│                                                    │
│  DYNAMIC ANALYSIS:                                 │
│  → Run the program in a controlled environment     │
│  → Observe behavior in real-time                    │
│  → Tools: debugger (gdb), sandbox, strace           │
│  → Finds: actual behavior, network calls, files    │
│                                                    │
│  HYBRID: Combine both for best results             │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Basic Tools

```bash
# file — identify file type
file /bin/ls
# Output: ELF 64-bit LSB executable, x86-64, dynamically linked

# strings — extract readable text from binary
strings /bin/ls | head -20
strings /bin/ls | grep -i "version"
strings /bin/ls | grep -i "error"

# strace — trace system calls
strace /bin/ls 2>&1 | head -30
strace -e network /bin/ls 2>&1  # Network calls only

# ltrace — trace library calls
ltrace /bin/ls 2>&1 | head -30

# objdump — disassemble binary
objdump -d /bin/ls | head -50
objdump -t /bin/ls  # Symbol table

# readelf — ELF file information
readelf -h /bin/ls  # Header
readelf -l /bin/ls  # Program headers
readelf -S /bin/ls  # Section headers
```

### Ghidra

Ghidra is a free, open-source reverse engineering tool developed by the NSA.

```bash
# Launch Ghidra
ghidra

# Steps:
# 1. Create a new project
# 2. Import a binary (File → Import File)
# 3. Open the imported binary in CodeBrowser
# 4. Ghidra decompiles the binary to C-like code
# 5. Analyze functions, strings, and control flow
```

### Assembly Basics

```
┌──────────────────────────────────────────────────┐
│          ASSEMBLY CONCEPTS                        │
├──────────────────────────────────────────────────┤
│                                                    │
│  CPU Registers (x86-64):                           │
│  RAX, RBX, RCX, RDX — General purpose              │
│  RSI, RDI — Source/Destination index               │
│  RSP — Stack pointer (top of stack)                │
│  RBP — Base pointer (stack frame)                   │
│  RIP — Instruction pointer (next instruction)      │
│                                                    │
│  Common Instructions:                              │
│  mov  → Move data between registers/memory        │
│  push → Push value onto stack                      │
│  pop  → Pop value from stack                       │
│  call → Call a function                            │
│  ret  → Return from function                        │
│  cmp  → Compare values                              │
│  jmp  → Jump to address                             │
│  je/jne → Jump if equal/not equal                  │
│  add/sub → Add/subtract                            │
│  xor  → XOR operation (often used in malware)      │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Simple Analysis Example (Lab)

Create a harmless C program for analysis:

```c
// hello.c — harmless program for reverse engineering practice
#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[]) {
    char password[50];
    printf("Enter password: ");
    scanf("%s", password);
    if (strcmp(password, "secret123") == 0) {
        printf("Access granted\n");
    } else {
        printf("Access denied\n");
    }
    return 0;
}
```

```bash
# Compile without optimization for easier analysis
gcc -o hello hello.c -no-pie

# Static analysis
file hello
strings hello | grep -i "password"
strings hello | grep -i "access"
# You'll find "secret123", "Access granted", "Access denied"

# The password is visible in the binary as a string!
# This is why hardcoded passwords are a bad idea
```

🛡️ DEFENSIVE: Reverse engineering reveals what attackers can see. If you can find hardcoded secrets with `strings`, so can attackers. Never hardcode passwords, API keys, or secrets in binaries.

---

## Chapter Summary

- Reverse engineering analyzes programs without source code
- Static analysis examines the binary without running it (safe)
- Dynamic analysis runs the program in a controlled environment
- `strings` extracts readable text; `file` identifies file type
- Ghidra is a powerful free decompiler (NSA-developed)
- Assembly is the low-level language the CPU executes
- Hardcoded secrets in binaries are easily found with `strings`
- Reverse engineering helps understand malware and find vulnerabilities

## Key Terms

- **Reverse Engineering** — Analyzing a program without source code
- **Static Analysis** — Examining without executing
- **Dynamic Analysis** — Running in controlled environment
- **Disassembly** — Converting binary to assembly
- **Decompilation** — Converting binary back to source-like code
- **Assembly** — Low-level CPU instructions
- **Ghidra** — Free reverse engineering tool

## Knowledge Check

1. What is the difference between static and dynamic analysis?
2. What does the `strings` command do?
3. Why are hardcoded passwords dangerous in binaries?
4. What is Ghidra used for?

## Defensive Takeaway

Reverse engineering reveals what attackers can see in your software. If secrets, passwords, or sensitive logic are visible through reverse engineering, they're a security risk. Obfuscation, proper key management, and security-by-design are essential.
