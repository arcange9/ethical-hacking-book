# Level 6 — RECONNAISSANCE & INFORMATION GATHERING

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- Passive vs active reconnaissance
- How to gather information about targets (lab only)
- Using reconnaissance tools in Kali Linux
- How defenders detect and prevent reconnaissance

---

## Chapter 19 — Passive & Active Reconnaissance

Reconnaissance is the first phase of any attack — gathering information about the target. The more an attacker knows, the better they can plan their attack.

### Passive vs Active Reconnaissance

```
┌──────────────────────────────────────────────────────┐
│         PASSIVE vs ACTIVE RECONNAISSANCE              │
├──────────────────────────────────────────────────────┤
│                                                        │
│  PASSIVE:                                             │
│  → Gather info WITHOUT touching the target            │
│  → Target doesn't know you're looking                  │
│  → Sources: public records, search engines, DNS       │
│  → Analogy: Looking at a house from the street        │
│  → Risk of detection: ZERO                            │
│                                                        │
│  ACTIVE:                                              │
│  → Gather info BY interacting with the target        │
│  → Target may detect your activity                     │
│  → Methods: scanning, probing, connecting             │
│  → Analogy: Walking up to the house and checking     │
│    every door and window                              │
│  → Risk of detection: HIGH                            │
│                                                        │
└──────────────────────────────────────────────────────┘
```

### Passive Reconnaissance Techniques

```
┌──────────────────────────────────────────────────┐
│         PASSIVE RECON SOURCES                     │
├──────────────────────────────────────────────────┤
│                                                    │
│  Search Engines:  Google, Bing, Shodan             │
│  → Google Dorking: special search queries          │
│                                                    │
│  DNS Records:     What domains/IPs exist           │
│  → dig, nslookup, host commands                    │
│                                                    │
│  Public Records:  WHOIS, certificates              │
│  → Who owns the domain, what SSL certs exist      │
│                                                    │
│  Social Media:    LinkedIn, GitHub, Twitter        │
│  → Employee info, tech stack, job postings        │
│                                                    │
│  Code Repos:      GitHub, GitLab                   │
│  → Accidental credential leaks, config files       │
│                                                    │
└──────────────────────────────────────────────────┘
```

### DNS Reconnaissance (Lab Exercise)

Using only your lab environment, practice DNS queries:

```bash
# Get A record (IP address)
dig example.com A

# Get all DNS records
dig example.com ANY

# Get nameservers
dig example.com NS

# Get mail servers
dig example.com MX

# Reverse DNS (IP to name)
dig -x 192.168.56.10

# Using host command
host example.com
host -t mx example.com

# Using nslookup
nslookup example.com
nslookup -type=any example.com
```

### Active Reconnaissance — Nmap Basics

Nmap (Network Mapper) is the most popular network scanning tool. We'll use it on your lab targets only.

```bash
# Basic host discovery (ping scan)
nmap -sn 192.168.56.0/24

# Scan common ports
nmap 192.168.56.20

# Scan specific ports
nmap -p 22,80,443 192.168.56.20

# Scan all 65535 ports
nmap -p- 192.168.56.20

# Service version detection
nmap -sV 192.168.56.20

# OS detection
nmap -O 192.168.56.20

# Comprehensive scan
nmap -A 192.168.56.20

# Save output to file
nmap -oN scan_results.txt 192.168.56.20
nmap -oX scan_results.xml 192.168.56.20
```

```
┌──────────────────────────────────────────────────┐
│             NMAP SCAN TYPES                       │
├──────────────┬───────────────────────────────────┤
│ -sn          │ Ping scan (host discovery only)   │
│ -sS          │ SYN scan (stealth scan)           │
│ -sT          │ Full TCP connect scan             │
│ -sU          │ UDP scan                          │
│ -sV          │ Service version detection         │
│ -O           │ OS detection                       │
│ -A           │ Aggressive (all of the above)     │
│ -p-          │ Scan all 65535 ports              │
│ -p 22,80,443 │ Scan specific ports               │
│ -T4          │ Faster timing                     │
│ -oN file     │ Save to normal text file           │
│ -oX file     │ Save to XML file                  │
└──────────────┴───────────────────────────────────┘
```

### Understanding Nmap Output

```
Nmap scan report for 192.168.56.20
Host is up (0.001s latency).
Not shown: 994 closed ports
PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 2.3.4
22/tcp   open  ssh         OpenSSH 4.7p1
23/tcp   open  telnet      Linux telnetd
80/tcp   open  http        Apache httpd 2.2.8
445/tcp  open  netbios-ssn Samba
3306/tcp open  mysql       MySQL 5.0.51a

Reading the output:
  PORT:     The port number and protocol (tcp/udp)
  STATE:    open, closed, filtered, or filtered
  SERVICE:  What service typically runs there
  VERSION:  Specific software version (important for exploits)
```

📌 IMPORTANT: The version information is the most valuable part of an Nmap scan. It tells you exactly what software is running, which you can then cross-reference with known vulnerabilities (CVEs).

### Service Detection

```bash
# What does -sV do?
# It connects to each open port and sends probes
# to identify the exact software and version

# Example:
nmap -sV -p 80 192.168.56.20

# Output might show:
# 80/tcp open http Apache httpd 2.2.8 ((Ubuntu) PHP/5.2.4)
# This tells us: Apache 2.2.8 with PHP 5.2.4 on Ubuntu
```

🛡️ DEFENSIVE: Defenders can detect Nmap scans using:
- Intrusion Detection Systems (IDS) like Snort/Suricata
- Log monitoring (connection attempts to many ports)
- Honeypots (fake services that detect scanning)
- Network behavior anomaly detection

---

## LAB 4 — Reconnaissance Lab 🟡

Objective: Perform reconnaissance on your lab target
Difficulty: Intermediate
Environment: Kali Linux + Metasploitable VM
Safety: Lab network only, authorized

Prerequisites: Lab setup complete (Appendix A), Metasploitable running

Step 1: Host discovery
```bash
nmap -sn 192.168.56.0/24
```
Find which hosts are up on your lab network.

Step 2: Port scan
```bash
nmap -p- 192.168.56.20
```
Discover all open ports on the target.

Step 3: Service detection
```bash
nmap -sV 192.168.56.20
```
Identify what services and versions are running.

Step 4: OS detection
```bash
nmap -O 192.168.56.20
```
Try to identify the operating system.

Step 5: Comprehensive scan
```bash
nmap -A 192.168.56.20 -oN full_scan.txt
```
Run everything and save results.

Step 6: Analyze results
- Which ports are open?
- What services are running?
- What versions?
- Any obvious outdated software?

Expected Result: Complete map of the target's attack surface — all open ports, services, versions, and OS.

Understanding Check:
1. What is the difference between -sn and -sS?
2. Why is version detection important?
3. How would a defender detect this scan?

Defensive Lesson: Every piece of information an attacker gathers is also information a defender should be monitoring. If you can see it, the defender should be able to log it and alert on it.

Cleanup: Save your scan results for future labs. No cleanup needed.

---

## Chapter Summary

- Reconnaissance is the first step in any security assessment
- Passive recon doesn't touch the target (zero detection risk)
- Active recon interacts with the target (high detection risk)
- DNS records reveal domain information, mail servers, nameservers
- Nmap is the primary tool for network scanning
- Key Nmap options: -sn (ping scan), -sV (version), -O (OS), -A (all)
- Version information from scans is critical for finding vulnerabilities
- Defenders can detect scans with IDS, log monitoring, and honeypots

## Key Terms

- **Reconnaissance** — Information gathering about a target
- **Passive Recon** — Gathering info without touching the target
- **Active Recon** — Gathering info by interacting with the target
- **Nmap** — Network Mapper, the primary scanning tool
- **Port Scanning** — Checking which ports are open
- **Service Detection** — Identifying what's running on a port
- **OS Fingerprinting** — Identifying the operating system
- **OSINT** — Open Source Intelligence

## Knowledge Check

1. What is the difference between passive and active reconnaissance?
2. What Nmap flag does service version detection?
3. Why is OS detection useful?
4. How can defenders detect active reconnaissance?
5. What information does a DNS MX record provide?

## Practical Challenge

🟡 Intermediate

Using Nmap on your lab:
1. Discover all live hosts on your lab network
2. Run a full port scan on Metasploitable
3. Save results in both text and XML format
4. Research the software versions found — are any outdated?

## Common Mistakes

- Running aggressive scans that may cause service disruption
- Not saving scan results for later analysis
- Scanning too fast and missing open ports
- Ignoring UDP ports (many services use UDP)
- Not documenting what was found

## Defensive Takeaway

Reconnaissance is where attacks begin. If you can detect reconnaissance, you can catch attacks before they progress. Monitoring for port scans, DNS queries, and unusual connections are key defensive activities.

## Next Chapter

Level 7 goes deeper into network enumeration — host discovery, port scanning, and service enumeration.
