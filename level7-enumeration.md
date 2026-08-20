# Level 7 — NETWORK ENUMERATION

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- Host discovery techniques
- Service enumeration in depth
- Banner grabbing and what it reveals
- Using Nmap, Netcat, and Wireshark for enumeration
- Network mapping and vulnerability identification

---

## Chapter 20 — Host Discovery & Port Scanning

### Host Discovery

Before scanning ports, you need to know which hosts are alive on the network.

```bash
# ARP scan (Layer 2 - only works on local network)
nmap -PR 192.168.56.0/24

# ICMP echo (ping)
nmap -PE 192.168.56.0/24

# Ping scan (fastest host discovery)
nmap -sn 192.168.56.0/24

# ARP scan using arp-scan
sudo arp-scan --localnet
sudo arp-scan 192.168.56.0/24
```

### Port Scanning Techniques

```
┌──────────────────────────────────────────────────────┐
│             PORT SCANNING TECHNIQUES                  │
├──────────────────────────────────────────────────────┤
│                                                        │
│  SYN SCAN (-sS) — "Half-open scan"                   │
│  → Sends SYN, waits for SYN-ACK (open) or RST (closed)│
│  → Never completes the handshake                      │
│  → Fast and stealthy (doesn't log on target)          │
│  → Requires root/sudo                                 │
│                                                        │
│  TCP CONNECT (-sT) — "Full connection"                │
│  → Completes the full 3-way handshake                 │
│  → Slower, more detectable (logs on target)           │
│  → Works without root                                  │
│                                                        │
│  UDP SCAN (-sU) — "UDP scan"                          │
│  → Scans UDP ports (DNS, SNMP, etc.)                  │
│  → Very slow (UDP has no acknowledgments)             │
│  → Important: many services use UDP                    │
│                                                        │
│  FIN/XMAS/NULL — Stealth scans                        │
│  → Uses unusual TCP flag combinations                 │
│  → Can bypass some firewalls                          │
│  → Not all systems respond predictably                │
│                                                        │
└──────────────────────────────────────────────────────┘
```

### NSE Scripts (Nmap Scripting Engine)

Nmap includes a powerful scripting engine with 600+ scripts for deep enumeration.

```bash
# Default scripts (safe)
nmap -sC 192.168.56.20

# SMB enumeration
nmap --script smb-enum-shares -p 445 192.168.56.20
nmap --script smb-os-discovery -p 445 192.168.56.20

# HTTP enumeration
nmap --script http-title -p 80 192.168.56.20
nmap --script http-headers -p 80 192.168.56.20
nmap --script http-methods -p 80 192.168.56.20

# Vulnerability detection
nmap --script vuln 192.168.56.20

# All HTTP scripts
nmap --script "http-*" -p 80,443 192.168.56.20

# SMB vulnerability check
nmap --script smb-vuln* -p 445 192.168.56.20
```

---

## Chapter 21 — Service Enumeration & Banner Grabbing

### Banner Grabbing

Banner grabbing means connecting to a service and reading the "banner" — the text the service sends when you connect. This reveals the software and version.

```bash
# Using netcat to grab banners
nc 192.168.56.20 80
# Then type: GET / HTTP/1.0 and press Enter twice

# Grab SSH banner
nc 192.168.56.20 22
# Output: SSH-2.0-OpenSSH_4.7p1 Debian-8ubuntu1

# Grab FTP banner
nc 192.168.56.20 21
# Output: 220 (vsFTPd 2.3.4)

# Grab SMTP banner
nc 192.168.56.20 25
# Output: 220 metasploitable ESMTP Postfix
```

```
┌──────────────────────────────────────────────────┐
│        WHAT BANNERS REVEAL                        │
├──────────────────────────────────────────────────┤
│                                                    │
│  SSH banner → SSH version → Known CVEs            │
│  FTP banner → FTP version → Anonymous access?     │
│  HTTP headers → Web server, frameworks, versions  │
│  SMTP banner → Mail server type and version        │
│  SMB info → Windows version, domain name           │
│  MySQL → Database version → Known exploits         │
│                                                    │
└──────────────────────────────────────────────────┘
```

### SMB Enumeration (Lab)

```bash
# List shared folders
nmap --script smb-enum-shares -p 445 192.168.56.20

# Enumerate users
nmap --script smb-enum-users -p 445 192.168.56.20

# OS discovery via SMB
nmap --script smb-os-discovery -p 445 192.168.56.20

# Using enum4linux (comprehensive SMB enum)
enum4linux 192.168.56.20

# Using smbclient to list shares
smbclient -L //192.168.56.20/
smbclient -L //192.168.56.20/ -N  # Null session
```

### HTTP Enumeration (Lab)

```bash
# Get HTTP headers
curl -I http://192.168.56.20

# WhatWeb — identifies web technologies
whatweb http://192.168.56.20

# Nikto — web vulnerability scanner
nikto -h http://192.168.56.20

# Directory brute-forcing with gobuster
gobuster dir -u http://192.168.56.20 -w /usr/share/wordlists/dirb/common.txt

# Directory brute-forcing with dirb
dirb http://192.168.56.20

# Nmap HTTP scripts
nmap --script http-enum -p 80 192.168.56.20
nmap --script http-robots.txt -p 80 192.168.56.20
```

### Wireshark for Enumeration

Wireshark captures and analyzes network traffic in real-time.

```bash
# Capture traffic on interface
sudo wireshark

# Or use tshark (command-line Wireshark)
sudo tshark -i eth0

# Capture and filter by port
sudo tshark -i eth0 -f "port 80"

# Capture specific host traffic
sudo tshark -i eth0 -f "host 192.168.56.20"
```

Wireshark display filters:
```
ip.addr == 192.168.56.20     # All traffic to/from target
tcp.port == 80               # Only HTTP traffic
tcp.port == 22               # Only SSH traffic
tcp.flags.syn == 1           # Only SYN packets (scanning)
http.request.method == "GET" # Only GET requests
dns                          # Only DNS traffic
```

### Netcat — The Swiss Army Knife

```bash
# Port scanning
nc -zv 192.168.56.20 1-1000      # Scan ports 1-1000
nc -zv 192.168.56.20 22 80 443  # Scan specific ports

# Banner grabbing
nc -nv 192.168.56.20 22         # Grab SSH banner

# Listen on a port (for reverse connection testing in lab)
nc -lvp 4444                     # Listen on port 4444

# Transfer a file (lab only)
# Receiver:
nc -lvp 4444 > received_file.txt
# Sender:
nc 192.168.56.10 4444 < myfile.txt

# Port forwarding (lab only)
nc -lvp 8080 -c "nc 192.168.56.20 80"
```

---

## LAB 5 — Full Enumeration Lab 🔴

Objective: Complete enumeration of a lab target
Difficulty: Advanced
Environment: Kali + Metasploitable VM
Safety: Lab only, authorized

Step 1: Network discovery
```bash
nmap -sn 192.168.56.0/24
```

Step 2: Full port scan with version detection
```bash
nmap -sV -p- 192.168.56.20 -oN full_enum.txt
```

Step 3: OS detection and traceroute
```bash
nmap -O --traceroute 192.168.56.20
```

Step 4: NSE script scan
```bash
nmap -sC 192.168.56.20 -oN script_scan.txt
```

Step 5: SMB enumeration
```bash
enum4linux 192.168.56.20
smbclient -L //192.168.56.20/ -N
```

Step 6: HTTP enumeration
```bash
curl -I http://192.168.56.20
whatweb http://192.168.56.20
nikto -h http://192.168.56.20
```

Step 7: Banner grab on key ports
```bash
nc -nv 192.168.56.20 22
nc -nv 192.168.56.20 21
nc -nv 192.168.56.20 25
```

Step 8: Document findings
- Hosts discovered
- Open ports and services
- Software versions
- Potential vulnerabilities
- SMB shares and users
- Web technologies

Expected Result: Comprehensive enumeration report of the target's attack surface.

Understanding Check:
1. What is banner grabbing and why is it useful?
2. What does enum4linux do?
3. How would you identify outdated software versions?
4. What is the Nmap Scripting Engine?

Defensive Lesson: Every service running is a potential attack vector. Defenders should: close unnecessary ports, update all software, hide version information in banners, and monitor for scanning activity.

Cleanup: Save all results. Restore VM snapshot if needed.

---

## Chapter Summary

- Host discovery finds live systems on a network
- SYN scan (-sS) is stealthy; TCP connect (-sT) is noisy but reliable
- Banner grabbing reveals software versions by connecting to services
- NSE scripts automate deep enumeration
- SMB enumeration reveals shares, users, and OS info
- HTTP enumeration reveals web technologies, directories, and vulnerabilities
- Wireshark captures and analyzes network traffic
- Netcat is a versatile tool for scanning, banner grabbing, and connections
- Enumeration maps the full attack surface of a target

## Key Terms

- **Enumeration** — Extracting detailed information about services
- **Banner Grabbing** — Reading service identification strings
- **NSE** — Nmap Scripting Engine
- **SMB** — Server Message Block (file sharing protocol)
- **Wireshark** — Network packet capture and analysis tool
- **Netcat** — Versatile network utility (reading/writing network connections)

## Knowledge Check

1. What is the difference between SYN scan and TCP connect scan?
2. How do you grab a banner using netcat?
3. What does enum4linux enumerate?
4. How would you discover hidden directories on a web server?
5. What Wireshark filter shows only HTTP traffic?

## Practical Challenge

🔴 Advanced

Perform a complete enumeration of your Metasploitable VM:
1. Discover all open ports
2. Identify all service versions
3. Enumerate SMB shares and users
4. Scan for known vulnerabilities using NSE
5. Write a summary report of findings

## Common Mistakes

- Not scanning UDP ports (important services use UDP)
- Ignoring banner information
- Not saving scan results
- Scanning too aggressively and crashing services
- Not cross-referencing versions with known CVEs

## Defensive Takeaway

Enumeration is where attackers find their entry points. Defenders reduce the attack surface by closing unnecessary ports, updating software, removing version information from banners, and monitoring for scanning activity.

## Next Chapter

Level 8 covers web hacking basics — how web applications work and the OWASP Top 10 vulnerabilities.
