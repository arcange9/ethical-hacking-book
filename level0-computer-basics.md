# Level 0 — COMPUTER BASICS

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- What a computer is and how its components work together
- The difference between hardware and software
- How the CPU, RAM, and storage function
- What operating systems do
- What virtualization is and why it matters for cybersecurity

---

## Chapter 1 — What Is a Computer?

A computer is a machine that takes input, processes it, and produces output. That's the simplest way to understand it. You give it something (a keystroke, a click, a file), it does something with that input, and it gives you a result (text on screen, a saved file, a web page).

### The Analogy: A Kitchen

Think of a computer like a kitchen:
- The **CPU** is the chef — it does the actual work of cooking (processing)
- The **RAM** is the counter space — ingredients you're using right now sit here (temporary, fast)
- The **storage (disk)** is the pantry — all your ingredients are stored here long-term (permanent, slower)
- The **input devices** (keyboard, mouse) are the orders coming in
- The **output devices** (screen, speakers) are the plates leaving the kitchen

If the counter (RAM) is too small, the chef has to keep running to the pantry (disk), which slows everything down. That's why more RAM makes a computer feel faster.

### Hardware vs Software

```
┌─────────────────────────────────────────┐
│              YOUR COMPUTER               │
│                                          │
│  HARDWARE (physical parts you can touch) │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐   │
│  │ CPU │  │ RAM │  │ SSD │  │ GPU │   │
│  └─────┘  └─────┘  └─────┘  └─────┘   │
│  ┌──────────────────────────────────┐   │
│  │ Motherboard / Network / USB      │   │
│  └──────────────────────────────────┘   │
│                                          │
│  SOFTWARE (instructions the hardware runs)│
│  ┌──────────────────────────────────┐   │
│  │ Operating System (Windows/Linux) │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │ Applications (Browser, Games)    │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

Hardware is the physical machine. Software is the set of instructions that tells the hardware what to do. Without software, hardware does nothing. Without hardware, software has nothing to run on.

### The CPU (Central Processing Unit)

The CPU is the "brain" of the computer. It executes instructions — billions of them per second. Every program you run, every command you type, every pixel on your screen — the CPU makes it happen.

```
CPU Performance Factors:
┌─────────────────────────────────────┐
│ Cores:    How many brains it has     │
│ Threads:  How many tasks per core    │
│ Clock:    How fast each core runs    │
│ Cache:    Built-in ultra-fast memory  │
└─────────────────────────────────────┘
```

💡 TIP: For running a cybersecurity lab in VirtualBox, you want a CPU with at least 4 cores. Most modern CPUs have 4-8 cores.

### RAM (Random Access Memory)

RAM is temporary, fast memory. When you open a program, it gets loaded from your storage disk into RAM. When you close the program or turn off the computer, RAM is cleared.

```
┌──────────────────────────────────────┐
│           RAM vs STORAGE              │
├──────────────────┬────────────────────┤
│      RAM         │    Storage (SSD)   │
├──────────────────┼────────────────────┤
│ Very fast        │ Slower             │
│ Temporary        │ Permanent          │
│ Cleared on reboot│ Survives reboot    │
│ Expensive per GB │ Cheap per GB       │
│ Working memory   │ Long-term storage  │
└──────────────────┴────────────────────┘
```

For cybersecurity labs, you need at least 8GB of RAM total (4GB for your main OS, 4GB for your Kali VM). 16GB is ideal.

### Storage: SSD vs HDD

```
SSD (Solid State Drive):
  - No moving parts
  - Very fast (10x - 50x faster than HDD)
  - More expensive
  - Best for running VMs

HDD (Hard Disk Drive):
  - Spinning magnetic disk
  - Slow
  - Cheap
  - Not recommended for VMs
```

📌 IMPORTANT: If you're running VirtualBox labs, use an SSD. Running VMs on an HDD will be painfully slow.

### BIOS/UEFI

When you press the power button, the first thing that runs is the BIOS or UEFI — a tiny program stored on a chip on your motherboard. It:

1. Checks that all hardware is working (POST — Power-On Self-Test)
2. Finds the boot device (your SSD/HDD)
3. Loads the operating system from that device

```
Power On → BIOS/UEFI → POST → Find Boot Device → Load OS → Login Screen
```

🔧 UNDER THE HOOD: BIOS (Basic Input/Output System) is the older standard. UEFI (Unified Extensible Firmware Interface) is the modern replacement. For virtualization, you may need to enable "Virtualization Technology" (VT-x for Intel, AMD-V for AMD) in your BIOS/UEFI settings. VirtualBox needs this to run VMs.

### Processes

A process is a running program. When you open a web browser, the operating system creates a process for it. Each process gets its own slice of RAM and CPU time.

```
You double-click Firefox
  → OS creates a process
  → Process gets some RAM
  → CPU starts executing Firefox's instructions
  → Firefox appears on your screen
  → You close Firefox
  → OS ends the process
  → RAM is freed
```

### Users and Permissions

Operating systems use **users** and **permissions** to control who can do what.

```
┌──────────────────────────────────────────┐
│            PERMISSION LEVELS              │
├──────────────────────────────────────────┤
│                                          │
│  Regular User:  Can use apps, edit own   │
│                 files, cannot change OS  │
│                                          │
│  Admin User:    Can install software,    │
│                 change system settings,  │
│                 access all files         │
│                                          │
│  System/Root:   Full control of          │
│                 everything (most powerful)│
│                                          │
└──────────────────────────────────────────┘
```

🛡️ DEFENSIVE: This permission system is the foundation of security. When a hacker tries to "escalate privileges," they're trying to go from Regular User to Admin. We'll learn how to prevent this later.

---

## Chapter 2 — Operating Systems & Software

An operating system (OS) is the master program that manages all hardware and software on a computer. It's the bridge between you and the machine.

### Major Operating Systems

```
┌────────────────────────────────────────────────────┐
│              OPERATING SYSTEMS                      │
├────────────┬───────────────────────────────────────┤
│ Windows    │ Most common desktop OS               │
│            │ Target of many attacks                │
│            │ Active Directory environments         │
├────────────┼───────────────────────────────────────┤
│ Linux      │ Open-source, free                     │
│            │ Kali Linux is built on this            │
│            │ Runs most of the internet's servers    │
├────────────┼───────────────────────────────────────┤
│ macOS      │ Unix-based (similar to Linux)         │
│            │ Apple hardware only                   │
├────────────┼───────────────────────────────────────┤
│ Android    │ Linux-based, for phones               │
│ iOS        │ Unix-based, for iPhones                │
└────────────┴───────────────────────────────────────┘
```

For ethical hacking, you'll primarily work with:
- **Kali Linux** (your attacking/testing platform)
- **Windows** (common target in enterprise environments)
- Sometimes **Ubuntu/Debian** (server targets)

### What an Operating System Does

```
┌─────────────────────────────────────────┐
│        OPERATING SYSTEM JOBS             │
├─────────────────────────────────────────┤
│ 1. Manage CPU — decides who runs when   │
│ 2. Manage RAM — allocates memory         │
│ 3. Manage Storage — reads/writes files   │
│ 4. Manage Network — sends/receives data  │
│ 5. Manage Devices — keyboard, display   │
│ 6. Manage Security — permissions, users │
│ 7. Run Programs — loads and runs apps    │
└─────────────────────────────────────────┘
```

### Files and Folders

A file system is how the OS organizes data on your storage device. Think of it like a filing cabinet:

```
/ (Root — the whole cabinet)
├── home/ (personal files drawer)
│   ├── user/ (your folder)
│   │   ├── Documents/
│   │   ├── Downloads/
│   │   └── Pictures/
├── etc/ (system configuration drawer)
├── var/ (variable data — logs, databases)
├── bin/ (program binaries — executable programs)
└── tmp/ (temporary files)
```

This is the Linux file system structure. Windows uses a different structure (C:\, D:\, etc.) but the concept is the same.

### Drivers

A driver is a small program that tells the OS how to communicate with a specific piece of hardware. Without the right driver, the OS can't use that hardware.

```
Your OS wants to use a WiFi adapter
  → OS loads the WiFi driver
  → Driver knows how to talk to that specific chip
  → WiFi adapter works
```

---

## Chapter 3 — Virtualization & Virtual Machines

Virtualization is the technology that lets you run a "computer inside a computer." This is essential for cybersecurity because you need isolated lab environments.

### What Is Virtualization?

```
┌──────────────────────────────────────────────┐
│              YOUR PHYSICAL COMPUTER           │
│  ┌────────────────────────────────────────┐  │
│  │     VirtualBox (Hypervisor)            │  │
│  │  ┌──────────┐  ┌──────────────────┐  │  │
│  │  │ Kali VM  │  │ Metasploitable VM │  │  │
│  │  │ (Attacker)│  │ (Target)          │  │  │
│  │  └──────────┘  └──────────────────┘  │  │
│  │  ┌──────────────────────────────────┐ │  │
│  │  │ OWASP Juice Shop VM              │ │  │
│  │  │ (Web Target)                     │ │  │
│  │  └──────────────────────────────────┘ │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  [CPU] [RAM] [SSD] [Network]                 │
└──────────────────────────────────────────────┘
```

### What Is a Virtual Machine?

A virtual machine (VM) is a software-based computer that runs inside your real computer. It has its own:
- Virtual CPU (borrowed from your real CPU)
- Virtual RAM (borrowed from your real RAM)
- Virtual disk (a file on your real disk that acts like a hard drive)
- Virtual network (a simulated network)

### The Hypervisor

The hypervisor is the software that creates and manages VMs. Oracle VirtualBox is a **Type 2 hypervisor** — it runs on top of an existing operating system.

```
Type 1 (Bare Metal):       Type 2 (Hosted):
┌──────────────┐          ┌──────────────┐
│   VMs        │          │   VMs        │
├──────────────┤          ├──────────────┤
│  Hypervisor  │          │  Hypervisor  │
├──────────────┤          ├──────────────┤
│  Hardware    │          │  Host OS     │
└──────────────┘          ├──────────────┤
                          │  Hardware    │
                          └──────────────┘
(VMware ESXi,             (VirtualBox,
 Proxmox)                   VMware Workstation)
```

### Why Virtualization Matters for Cybersecurity

1. **Isolation** — VMs are isolated from your real system. If something goes wrong in a VM, your real computer is safe.
2. **Snapshots** — You can save the state of a VM and revert to it. Made a mistake? Just restore the snapshot.
3. **Multiple OS** — You can run Kali Linux, Windows, and other systems simultaneously.
4. **Isolated Networks** — You can create virtual networks that have no connection to the internet, making them safe for testing.
5. **Cost** — You don't need multiple physical computers.

```
┌─────────────────────────────────────────────────┐
│          WHY WE USE VMs FOR HACKING              │
├─────────────────────────────────────────────────┤
│                                                  │
│  SAFETY:     Attacking a VM won't break your     │
│              real computer                       │
│                                                  │
│  ISOLATION:  VM networks can be cut off from     │
│              the internet                        │
│                                                  │
│  SNAPSHOTS:  Made a mistake? Revert to a saved   │
│              state in seconds                    │
│                                                  │
│  MULTIPLE:   Run Kali (attacker) + targets        │
│              all on one laptop                   │
│                                                  │
│  LEGAL:      Everything happens on your own      │
│              hardware, no real targets involved  │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Enabling Virtualization in BIOS/UEFI

Before you can run VirtualBox, you need to enable hardware virtualization in your computer's BIOS/UEFI:

1. Restart your computer
2. Enter BIOS/UEFI (usually F2, F12, Del, or Esc during startup)
3. Look for "Virtualization Technology," "VT-x," "AMD-V," or "SVM Mode"
4. Enable it
5. Save and exit

⚠️ WARNING: If virtualization is disabled, VirtualBox VMs will either not start or run extremely slowly.

---

## Chapter Summary

- A computer takes input, processes it, and produces output
- Hardware is physical; software is instructions
- The CPU does the processing; RAM is temporary working memory; storage is permanent
- SSDs are much faster than HDDs for running VMs
- The OS manages everything — CPU, RAM, storage, network, security
- Virtualization lets you run computers inside your computer
- VirtualBox is the tool we'll use to create isolated cybersecurity labs
- You must enable virtualization in your BIOS/UEFI settings

## Key Terms

- **CPU** — Central Processing Unit, the "brain" that executes instructions
- **RAM** — Random Access Memory, temporary fast working memory
- **SSD** — Solid State Drive, fast permanent storage
- **OS** — Operating System, manages hardware and software
- **Process** — A running program
- **Virtualization** — Running a computer inside a computer
- **VM** — Virtual Machine, a software-based computer
- **Hypervisor** — Software that creates and manages VMs
- **Snapshot** — A saved state of a VM you can revert to

## Knowledge Check

1. What is the difference between RAM and storage?
2. Why would you enable virtualization in BIOS/UEFI?
3. What is a process?
4. Why are SSDs recommended for running VMs?
5. What does a hypervisor do?

## Practical Challenge

🟢 Beginner

Check your computer's specifications:
1. Find out how many CPU cores you have
2. Find out how much RAM you have
3. Check if you have an SSD or HDD
4. Check if virtualization is enabled

On Windows: Open Task Manager (Ctrl+Shift+Esc) → Performance tab
On macOS: Apple Menu → About This Mac
On Linux: Run `lscpu` and `free -h` in terminal

## Common Mistakes

- Trying to run VMs on an HDD — it will be unbearably slow
- Not enabling virtualization in BIOS — VMs won't start
- Allocating too much RAM to a VM — your host OS will freeze
- Not taking snapshots before making changes to a VM

## Defensive Takeaway

Understanding computer fundamentals is the foundation of cybersecurity. Every security concept builds on these basics — how CPUs process instructions, how memory works, how the OS manages permissions. Attackers exploit these exact mechanisms, so understanding them is your first step in defense.

## Next Chapter

In Level 1, we'll learn how computers communicate — networking fundamentals. Before you can secure a network, you need to understand how it works.
