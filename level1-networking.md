# Level 1 — NETWORKING FUNDAMENTALS

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- How computers talk to each other (networks)
- IP addresses, MAC addresses, ports, and protocols
- The OSI model and TCP/IP model
- How DNS, DHCP, HTTP, HTTPS, and other protocols work
- Subnetting and CIDR notation
- How to use Wireshark to see real network traffic

---

## Chapter 4 — Networks & the Internet

A network is two or more computers connected together so they can share information. The internet is just a very large network — actually, a network of networks.

### The Analogy: Postal System

Think of networking like the postal system:
- Your **IP address** is your home address
- Your **MAC address** is the physical mailbox itself
- A **port** is which slot in the mailbox (bills, personal, packages)
- A **protocol** is the language the mail carrier understands
- A **packet** is an individual letter
- A **router** is the post office that routes letters to the right place

### Network Types

```
┌──────────────────────────────────────────────────────┐
│                  NETWORK TYPES                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  LAN (Local Area Network)                            │
│  → Computers in the same building/room               │
│  → Your home WiFi network is a LAN                    │
│  → Your VirtualBox lab network is a LAN              │
│                                                      │
│  WAN (Wide Area Network)                             │
│  → Computers spread across large distances           │
│  → The internet is the ultimate WAN                   │
│                                                      │
│  WLAN (Wireless LAN)                                 │
│  → A LAN that uses WiFi instead of cables            │
│                                                      │
│  VPN (Virtual Private Network)                       │
│  → A secure tunnel through an untrusted network      │
│  → Like a private courier through public mail        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Client and Server

```
┌──────────────┐         ┌──────────────┐
│   CLIENT     │ ──────→ │   SERVER     │
│ (Your browser)│  request │ (Web server) │
│              │ ←────── │              │
│              │ response │              │
└──────────────┘         └──────────────┘
```

A **client** requests something. A **server** provides it. When you open a website:
1. Your browser (client) sends a request to a web server
2. The web server processes the request
3. The web server sends back the web page (response)
4. Your browser displays it

In cybersecurity, you'll often be testing servers from a client (your Kali VM).

---

## Chapter 5 — IP, MAC, Ports & Protocols

### IP Addresses

Every device on a network needs a unique address — an IP address. This is how data knows where to go.

#### IPv4

IPv4 addresses look like this: `192.168.1.100`

They are made of 4 numbers (0-255) separated by dots. That gives us about 4.3 billion possible addresses — which turned out to not be enough, so IPv6 was created.

```
IPv4 Address Structure:
  192   .   168   .   1   .   100
  │         │       │       │
  Network   Network Host   Host
```

Private IP ranges (used in local networks, not on the internet):
```
10.0.0.0    - 10.255.255.255
172.16.0.0  - 172.31.255.255
192.168.0.0 - 192.168.255.255  ← Most common for home/lab networks
```

📌 IMPORTANT: Your VirtualBox lab will use addresses in the 192.168.x.x range. This is by design — these addresses are not routable on the internet, adding a layer of isolation.

#### IPv6

IPv6 addresses look like: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`

Much longer, using hex digits. Designed to solve the address shortage. You won't need to deal with IPv6 much in this book's labs.

### MAC Addresses

A MAC (Media Access Control) address is a permanent, unique identifier assigned to a network interface card (NIC) at the factory.

```
MAC Address: 08:00:27:AB:CD:EF
             │      │
             OUI    Device-specific
             (manufacturer ID)
```

```
┌────────────────────────────────────────────────┐
│            IP vs MAC ADDRESS                    │
├────────────────┬───────────────────────────────┤
│  IP Address    │  MAC Address                   │
├────────────────┼───────────────────────────────┤
│  Logical       │  Physical                      │
│  Can change    │  Burned into hardware           │
│  Network layer │  Data link layer               │
│  Like your     │  Like your house's             │
│  street address│  GPS coordinates               │
│  (can move)    │  (fixed to building)            │
└────────────────┴───────────────────────────────┘
```

💡 TIP: MAC addresses can be "spoofed" (faked) in software. Hackers do this to hide their identity or impersonate other devices. In Kali: `macchanger -m XX:XX:XX:XX:XX:XX eth0`

### Ports

A port is a number that identifies a specific service on a device. Think of an IP address as an apartment building address, and the port number as the apartment number.

```
┌──────────────────────────────────────────────┐
│  IP Address = Building  │  Port = Apartment   │
│  192.168.1.10:80       │  Port 80 = Web      │
│  192.168.1.10:22       │  Port 22 = SSH       │
│  192.168.1.10:443      │  Port 443 = HTTPS    │
└──────────────────────────────────────────────┘
```

Common ports:

```
┌────────────────────────────────────────────┐
│           COMMON PORTS                      │
├──────────────┬─────────┬──────────────────┤
│ Port         │ Protocol│ Service           │
├──────────────┼─────────┼──────────────────┤
│ 20, 21       │ FTP     │ File transfer     │
│ 22           │ SSH     │ Secure shell      │
│ 23           │ Telnet  │ Old remote access │
│ 25           │ SMTP    │ Email sending     │
│ 53           │ DNS     │ Name resolution   │
│ 80           │ HTTP    │ Web traffic       │
│ 110          │ POP3    │ Email receiving   │
│ 143          │ IMAP    │ Email receiving   │
│ 443          │ HTTPS   │ Secure web        │
│ 445          │ SMB     │ File sharing      │
│ 3306         │ MySQL   │ Database          │
│ 3389         │ RDP     │ Remote desktop    │
│ 5432         │ Postgres│ Database          │
│ 8080         │ HTTP-Alt│ Alt web           │
└──────────────┴─────────┴──────────────────┘
```

🛡️ DEFENSIVE: Every open port is a potential entry point for an attacker. Security teams regularly scan for open ports and close unnecessary ones.

### Protocols

A protocol is a set of rules for how data is formatted, transmitted, and received. It's the language that two computers agree to speak.

```
┌──────────────────────────────────────────────┐
│            KEY PROTOCOLS                      │
├──────────┬───────────────────────────────────┤
│ TCP      │ Reliable, ordered delivery        │
│          │ Like registered mail (tracked)    │
├──────────┼───────────────────────────────────┤
│ UDP      │ Fast, unreliable delivery         │
│          │ Like regular mail (no tracking)   │
├──────────┼───────────────────────────────────┤
│ ICMP     │ Network diagnostics (ping)        │
│          │ Like a "is anyone home?" knock     │
├──────────┼───────────────────────────────────┤
│ HTTP     │ Web page transfer (unencrypted)   │
│ HTTPS    │ Web page transfer (encrypted)      │
│ DNS      │ Converts names to IP addresses     │
│ DHCP     │ Assigns IP addresses automatically │
│ SSH      │ Secure remote terminal access      │
│ FTP/SFTP │ File transfer                     │
└──────────┴───────────────────────────────────┘
```

### TCP vs UDP

```
TCP (Transmission Control Protocol):
┌──────┐                    ┌──────┐
│Client│ ── SYN ────────→ │Server│
│      │ ←─ SYN-ACK ────── │      │
│      │ ── ACK ────────→ │      │
│      │                  │      │
│      │ ── Data ───────→ │      │
│      │ ←─ ACK ───────── │      │
│      │ ── FIN ────────→ │      │
│      │ ←─ FIN-ACK ───── │      │
└──────┘                  └──────┘

Three-way handshake: SYN → SYN-ACK → ACK
Then data flows both ways with acknowledgments.
Every packet is confirmed. If a packet is lost, it's resent.

UDP (User Datagram Protocol):
┌──────┐                    ┌──────┐
│Client│ ── Data ────────→ │Server│
│      │ ── Data ────────→ │      │
│      │ ── Data ────────→ │      │
└──────┘                    └──────┘

No handshake. No acknowledgments. Just send and hope.
Faster, but data can be lost.
```

💡 TIP: TCP is used when reliability matters (web browsing, file transfer, email). UDP is used when speed matters more (video streaming, gaming, DNS).

---

## Chapter 6 — The OSI & TCP/IP Models

### The OSI Model

The OSI (Open Systems Interconnection) model describes networking in 7 layers. It's a conceptual framework — a way to understand what happens at each stage of network communication.

```
┌──────────────────────────────────────────────────┐
│              THE OSI MODEL (7 LAYERS)              │
├──────────────────────────────────────────────────┤
│                                                    │
│  Layer 7: APPLICATION    │ HTTP, DNS, FTP, SSH     │
│  → What the user sees    │ Your browser             │
│                          │                          │
│  Layer 6: PRESENTATION   │ Encryption, encoding     │
│  → Data formatting       │ TLS/SSL, JPEG, JSON     │
│                          │                          │
│  Layer 5: SESSION        │ Manages connections      │
│  → Keeps the session     │ Opening/closing          │
│                          │                          │
│  Layer 4: TRANSPORT      │ TCP, UDP                 │
│  → Reliable delivery     │ Ports, segments          │
│                          │                          │
│  Layer 3: NETWORK        │ IP, ICMP                 │
│  → Routing & addressing  │ Routers, IP addresses    │
│                          │                          │
│  Layer 2: DATA LINK      │ Ethernet, MAC addresses │
│  → Frame delivery        │ Switches, MAC            │
│                          │                          │
│  Layer 1: PHYSICAL       │ Cables, radio waves      │
│  → Raw bits on wire      │ Voltage, light           │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Memory Aid

Remember the layers bottom-to-top with:
**P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way

```
Physical → Data Link → Network → Transport → Session → Presentation → Application
   1          2          3          4           5           6             7
```

### How Data Flows Through the Layers

When you type a website URL, data travels DOWN the layers on your computer, across the network, and UP the layers on the server:

```
Your Computer                    Server
┌─────────────┐                ┌─────────────┐
│ App (L7)    │                │ App (L7)    │
│ Present (L6)│                │ Present (L6)│
│ Session (L5)│                │ Session (L5)│
│ Transport(L4)│ ── Network ──→│ Transport(L4)│
│ Network (L3) │               │ Network (L3) │
│ Data (L2)   │                │ Data (L2)   │
│ Physical (L1)│═══ Wire ═════│ Physical (L1)│
└─────────────┘                └─────────────┘
```

At each layer, the data gets a "header" added (encapsulation):

```
┌──────────────────────────────────────────────┐
│              ENCAPSULATION                     │
│                                                │
│  Data + [L4 Header: TCP port 80]               │
│  + [L3 Header: IP addresses]                    │
│  + [L2 Header: MAC addresses]                  │
│  = [L1: Raw bits on wire]                       │
│                                                │
│  Each layer wraps the data from above           │
│  like putting a letter in nested envelopes      │
└──────────────────────────────────────────────┘
```

### The TCP/IP Model

The TCP/IP model is a simpler, practical version with 4 layers:

```
┌──────────────────────────────────────────────────┐
│           TCP/IP MODEL vs OSI MODEL               │
├──────────────┬───────────────────────────────────┤
│ TCP/IP        │ OSI Equivalent                    │
├──────────────┼───────────────────────────────────┤
│ Application   │ Application + Presentation +     │
│               │ Session (Layers 5-7)              │
├──────────────┼───────────────────────────────────┤
│ Transport     │ Transport (Layer 4)              │
├──────────────┼───────────────────────────────────┤
│ Internet      │ Network (Layer 3)                │
├──────────────┼───────────────────────────────────┤
│ Network       │ Data Link + Physical (Layers 1-2)│
│ Access        │                                  │
└──────────────┴───────────────────────────────────┘
```

🔧 UNDER THE HOOD: The TCP/IP model is what the actual internet uses. The OSI model is more of a teaching/reference framework. Both are important for understanding networking.

---

## Chapter 7 — DNS, DHCP & Common Protocols

### DNS (Domain Name System)

DNS converts human-readable names into IP addresses. It's the phonebook of the internet.

```
You type: google.com
         ↓
DNS Server looks up: google.com
         ↓
DNS returns: 142.250.190.78
         ↓
Your browser connects to: 142.250.190.78
```

```
DNS Resolution Process:
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Browser  │ ──→ │ Resolver │ ──→ │ Root (.) │ ──→ │ .com TLD │
│          │     │ (ISP)    │     │ Server   │     │ Server   │
│          │     │          │     └──────────┘     └────┬─────┘
│          │     │          │                              │
│          │     │          │     ┌─────────────────────────┘
│          │     │          │     ↓
│          │     │          │ ┌──────────┐
│          │     │          │ │google.com│
│          │     │          │ │DNS server│
│          │     │          │ └────┬─────┘
│          │ ←── │ ←────────│ ←───┘
│  IP:     │     │  142.250.190.78
│  142...  │     │
└──────────┘     └──────────┘
```

DNS record types:
```
A     → Maps name to IPv4 address
AAAA  → Maps name to IPv6 address
CNAME → Alias from one name to another
MX    → Mail server
TXT   → Text records (verification, SPF)
NS    → Name server
SOA   → Start of authority
```

🛡️ DEFENSIVE: DNS is often abused by attackers. They can use DNS to exfiltrate data, redirect users to fake sites (DNS spoofing), or use it for command-and-control. Defenders monitor DNS traffic for suspicious patterns.

### DHCP (Dynamic Host Configuration Protocol)

DHCP automatically assigns IP addresses to devices on a network.

```
┌──────────┐                     ┌──────────┐
│  Device  │ ── DHCP Discover ──→ │DHCP Server│
│ (New on  │                     │           │
│ network) │ ←─ DHCP Offer ────── │           │
│          │ ── DHCP Request ──→ │           │
│          │ ←─ DHCP Acknowledge─│           │
│          │                     │           │
│  Now has │                     │           │
│  IP addr │                     │           │
└──────────┘                     └──────────┘
```

### HTTP (Hypertext Transfer Protocol)

HTTP is how web pages are transferred. It's a request-response protocol:

```
HTTP Request:
┌──────────────────────────────────────┐
│ GET /index.html HTTP/1.1            │
│ Host: www.example.com               │
│ User-Agent: Mozilla/5.0             │
│ Accept: text/html                    │
└──────────────────────────────────────┘

HTTP Response:
┌──────────────────────────────────────┐
│ HTTP/1.1 200 OK                     │
│ Content-Type: text/html              │
│ Content-Length: 1234                 │
│                                      │
│ <html>                               │
│   <body>                             │
│     <h1>Hello World</h1>             │
│   </body>                            │
│ </html>                              │
└──────────────────────────────────────┘
```

Common HTTP methods:
```
GET     → Retrieve a resource (read)
POST    → Submit data (create)
PUT     → Update a resource (replace)
DELETE  → Remove a resource
PATCH   → Partially update
OPTIONS → Check what methods are allowed
HEAD    → Get headers only, no body
```

### HTTPS (HTTP Secure)

HTTPS is HTTP with TLS/SSL encryption. The same request-response pattern, but the data is encrypted so nobody can read it in transit.

```
HTTP:  [Browser] ── plaintext ──→ [Server]
       Anyone on the network can read this

HTTPS: [Browser] ── encrypted ──→ [Server]
       Even if intercepted, data is unreadable
```

### SSH (Secure Shell)

SSH provides encrypted remote terminal access to another computer.

```
┌──────────┐                          ┌──────────┐
│ Your Kali│ ── ssh user@192.168.1.10─→│ Target   │
│          │ ←── encrypted terminal ──│          │
│          │                          │          │
│  You can │                          │          │
│  run cmds│                          │          │
│  remotely│                          │          │
└──────────┘                          └──────────┘
```

---

## Chapter 8 — Subnetting & CIDR

Subnetting is dividing a large network into smaller sub-networks. It's how you control how many addresses a network has.

### CIDR Notation

CIDR (Classless Inter-Domain Routing) notation looks like: `192.168.1.0/24`

The `/24` means the first 24 bits are the network portion, leaving 8 bits for hosts.

```
┌────────────────────────────────────────────────┐
│              CIDR CHEAT SHEET                    │
├──────────┬───────────┬────────────┬─────────────┤
│ CIDR     │ Hosts     │ Usable     │ Subnet Mask  │
├──────────┼───────────┼────────────┼─────────────┤
│ /24      │ 256       │ 254        │ 255.255.255.0│
│ /25      │ 128       │ 126        │ 255.255.255.128│
│ /26      │ 64        │ 62         │ 255.255.255.192│
│ /27      │ 32        │ 30         │ 255.255.255.224│
│ /28      │ 16        │ 14         │ 255.255.255.240│
│ /29      │ 8         │ 6          │ 255.255.255.248│
│ /30      │ 4         │ 2          │ 255.255.255.252│
│ /16      │ 65,536    │ 65,534     │ 255.255.0.0  │
│ /8       │ 16M+      │ 16M+       │ 255.0.0.0    │
└──────────┴───────────┴────────────┴─────────────┘
```

💡 TIP: For your VirtualBox lab, you'll typically use a /24 network (192.168.56.0/24), giving you 254 usable addresses. That's more than enough for your lab machines.

### NAT (Network Address Translation)

NAT allows multiple devices on a private network to share one public IP address.

```
Private Network          NAT Router          Internet
┌──────────┐             ┌──────┐          ┌──────────┐
│ Device A │── 192.168.1.5  │   │ ──→ 203.0.113.1
│ Device B │── 192.168.1.6  │   │
│ Device C │── 192.168.1.7  │   │
└──────────┘             └──────┘          └──────────┘
                         All share one
                         public IP
```

### Firewalls

A firewall is a network security device that monitors and filters traffic based on rules.

```
┌──────────────────────────────────────────────────┐
│                  FIREWALL                         │
├──────────────────────────────────────────────────┤
│                                                    │
│  ALLOW: Port 443 (HTTPS) from any source           │
│  ALLOW: Port 22 (SSH) from 192.168.1.0/24 only    │
│  DENY:  Port 3389 (RDP) from any source            │
│  DENY:  All other inbound traffic                  │
│                                                    │
└──────────────────────────────────────────────────┘
```

🛡️ DEFENSIVE: Firewalls are your first line of network defense. The principle is "deny by default" — block everything, then allow only what's needed.

---

## LAB 1 — Wireshark Packet Capture 🟢

Objective: See real network traffic on your Kali VM
Difficulty: Beginner
Environment: Kali Linux VM with internet access
Safety: This is passive observation only — no attacks

Prerequisites: Kali Linux installed (see Appendix A)

Step 1: Open Wireshark
```bash
sudo wireshark
```

Step 2: Select your network interface (usually eth0 or wlan0)

Step 3: Start capturing by clicking the shark fin icon

Step 4: In another terminal, generate some traffic:
```bash
ping -c 4 8.8.8.8
curl http://example.com
```

Step 5: Stop the capture (red square icon)

Step 6: Look at the captured packets — you'll see:
- ICMP packets (from ping)
- DNS queries (from curl)
- TCP handshakes (from HTTP connection)
- HTTP requests and responses

Expected Result: You should see colored rows of packets. Each row is one packet showing source IP, destination IP, protocol, and data.

Understanding Check:
1. What protocol does ping use?
2. Can you identify the TCP three-way handshake in the capture?
3. What port does the HTTP traffic use?

Defensive Lesson: Wireshark shows you exactly what's traveling on your network. Security analysts use it to detect suspicious traffic — unexpected connections, data exfiltration, or malware communication.

Cleanup: Close Wireshark. No cleanup needed — you only observed traffic.

---

## Chapter Summary

- Networks connect computers so they can share data
- IP addresses identify devices; MAC addresses identify network cards; ports identify services
- TCP is reliable (handshake, acknowledgments); UDP is fast (fire-and-forget)
- The OSI model has 7 layers; the TCP/IP model has 4
- DNS converts names to IPs; DHCP assigns IPs automatically
- HTTP/HTTPS is for web; SSH is for secure remote access
- CIDR notation defines network sizes (/24 = 254 hosts)
- Firewalls filter traffic based on rules; NAT allows sharing public IPs

## Key Terms

- **IP Address** — Unique network identifier for a device
- **MAC Address** — Physical hardware identifier for a network card
- **Port** — Number identifying a specific service (80=HTTP, 22=SSH)
- **Protocol** — Rules for how data is formatted and transmitted
- **TCP** — Connection-oriented, reliable protocol with handshake
- **UDP** — Connectionless, fast protocol without guarantees
- **DNS** — Converts domain names to IP addresses
- **DHCP** — Automatically assigns IP addresses to devices
- **OSI Model** — 7-layer networking framework
- **CIDR** — Notation for defining network size (/24, /16, etc.)
- **NAT** — Network Address Translation, shares one public IP
- **Firewall** — Filters network traffic based on rules

## Knowledge Check

1. What is the difference between TCP and UDP?
2. What port does HTTPS use?
3. What does DNS do?
4. How many usable hosts are in a /24 network?
5. Name the 7 layers of the OSI model (bottom to top)

## Practical Challenge

🟢 Beginner

On your Kali VM (once installed), run these commands and observe the output:
```bash
ip addr          # See your IP and MAC addresses
ip route         # See your routing table
ss -tlnp         # See which ports are listening
ping -c 4 8.8.8.8  # Test connectivity
```

## Common Mistakes

- Confusing IP addresses with MAC addresses
- Forgetting that ports identify services, not just computers
- Not understanding the difference between TCP and UDP
- Thinking DNS only resolves websites — it resolves any named resource

## Defensive Takeaway

Understanding networking is fundamental to cybersecurity. Every attack crosses a network. Every defense includes network controls. You cannot protect what you don't understand.

## Next Chapter

Level 2 covers Linux and the command line — your primary toolkit as an ethical hacker.
