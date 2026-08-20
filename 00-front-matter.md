# ETHICAL HACKING

## From Computer Basics to Advanced Cybersecurity

### A Practical Beginner-to-Advanced Guide Using Kali Linux & VirtualBox

---

*Designed by Mukamyi Izere Arcange*

---

**2026 Edition**

All practical exercises in this book are designed for isolated, learner-owned laboratory environments only. Never test techniques on systems you do not own or do not have explicit written authorization to test.

---

# COMPLETE TABLE OF CONTENTS

**FRONT MATTER**
- About This Book
- Learning Methodology
- Safety & Ethics
- How to Use This Book

**LEVEL 0 — Computer Basics**
- Chapter 1: What Is a Computer?
- Chapter 2: Operating Systems & Software
- Chapter 3: Virtualization & Virtual Machines

**LEVEL 1 — Networking Fundamentals**
- Chapter 4: Networks & the Internet
- Chapter 5: IP, MAC, Ports & Protocols
- Chapter 6: The OSI & TCP/IP Models
- Chapter 7: DNS, DHCP & Common Protocols
- Chapter 8: Subnetting & CIDR

**LEVEL 2 — Linux & Command Line**
- Chapter 9: Linux & Kali Linux Overview
- Chapter 10: The Terminal & Filesystem
- Chapter 11: File & Permission Management
- Chapter 12: Processes, Services & Package Management
- Chapter 13: Bash Scripting Basics

**LEVEL 3 — Python for Cybersecurity**
- Chapter 14: Python Fundamentals
- Chapter 15: Python for Security Automation

**LEVEL 4 — Cybersecurity Fundamentals**
- Chapter 16: Security Principles (CIA Triad)
- Chapter 17: Cryptography & Password Security

**LEVEL 5 — Ethical Hacking Methodology**
- Chapter 18: The Penetration Testing Lifecycle

**LEVEL 6 — Reconnaissance & Information Gathering**
- Chapter 19: Passive & Active Reconnaissance

**LEVEL 7 — Network Enumeration**
- Chapter 20: Host Discovery & Port Scanning
- Chapter 21: Service Enumeration & Banner Grabbing

**LEVEL 8 — Web Hacking Basics**
- Chapter 22: How the Web Works
- Chapter 23: OWASP Top 10 Vulnerabilities

**LEVEL 9 — Web Security Tools**
- Chapter 24: Burp Suite, ZAP & Browser DevTools

**LEVEL 10 — Exploitation Concepts**
- Chapter 25: Exploits & Metasploit Framework

**LEVEL 11 — Privilege Escalation**
- Chapter 26: Linux & Windows Privilege Escalation

**LEVEL 12 — Wireless Security**
- Chapter 27: Wi-Fi Security Fundamentals

**LEVEL 13 — Social Engineering Awareness**
- Chapter 28: Social Engineering & Human Factors

**LEVEL 14 — Reverse Engineering Fundamentals**
- Chapter 29: Static & Dynamic Analysis

**LEVEL 15 — Malware Analysis Fundamentals**
- Chapter 30: Malware Types & Analysis

**LEVEL 16 — Active Directory & Windows Security**
- Chapter 31: Active Directory Architecture & Security

**LEVEL 17 — Security Monitoring & Blue Team**
- Chapter 32: SIEM, Logs & Incident Response

**LEVEL 18 — Advanced Security Concepts**
- Chapter 33: Zero Trust, Cloud & DevSecOps

**APPENDICES**
- Appendix A: Lab Setup Guide (Kali + VirtualBox)
- Appendix B: Troubleshooting Guide
- Appendix C: End-of-Book Projects
- Appendix D: Cybersecurity Glossary
- Appendix E: Your Ethical Hacking Roadmap
- Appendix F: References & Further Study

---

# LEARNING METHODOLOGY

This book teaches using a structured, progressive approach:

1. **What You Will Learn** — clear objectives at the start of every chapter
2. **Simple Explanation** — concepts explained in plain language first
3. **Real-World Analogy** — every concept gets an analogy you already understand
4. **Visual Diagram** — ASCII diagrams to make concepts concrete
5. **Technical Deep Dive** — then we go technical, step by step
6. **Practical Lab** — hands-on exercises in a safe, isolated lab
7. **Command Explanations** — every command explained line by line
8. **Common Mistakes** — what beginners get wrong
9. **Defensive Takeaway** — how defenders use this knowledge
10. **Chapter Summary** — key points recapped
11. **Knowledge Check** — test your understanding
12. **Next Chapter** — what's coming next

### Difficulty System

🟢 Beginner — No prerequisites needed
🟡 Intermediate — Requires earlier chapters
🔴 Advanced — Requires solid foundation

### Callout Boxes

```
📌 IMPORTANT: Critical information you must remember
```
```
⚠️ WARNING: Common pitfalls, legal boundaries, or safety concerns
```
```
💡 TIP: Practical advice from experienced professionals
```
```
🔧 UNDER THE HOOD: How things work internally
```
```
🛡️ DEFENSIVE: How defenders use this knowledge
```
```
🌍 REAL WORLD: Where this is used in practice
```
```
🔥 LAB: Hands-on exercise in your isolated lab
```
```
⛔ ETHICS: Legal and ethical boundary reminder
```

---

# SAFETY AND ETHICS

⚠️ WARNING: Read this section before attempting ANY practical exercise in this book.

This is an **ethical hacking and defensive cybersecurity** textbook.

## What This Book Teaches

This book teaches you to think like a security professional. You will learn how attackers think so you can defend systems effectively. All practical exercises use **isolated, learner-owned laboratory environments** only.

## What You May Do

✅ Practice on your own computer
✅ Use local VirtualBox laboratories
✅ Attack intentionally vulnerable machines (DVWA, Metasploitable, OWASP Juice Shop)
✅ Participate in CTF (Capture The Flag) challenges
✅ Use legal training platforms (HackTheBox, TryHackMe, PortSwigger Web Security Academy)
✅ Test systems where you have **explicit written authorization**

## What You Must Never Do

❌ Attack real websites, organizations, or networks without authorization
❌ Steal real credentials or personal data
❌ Deploy malware against real users
❌ Create or deploy ransomware
❌ Perform denial-of-service attacks against public targets
❌ Phish real people
❌ Bypass security controls on systems you don't own
❌ Persist on unauthorized systems
❌ Evade law enforcement

## The Rules of Ethical Hacking

1. **Authorization** — Always have explicit, written permission before testing
2. **Scope** — Stay within the agreed boundaries of your engagement
3. **Do No Harm** — Never cause damage, disruption, or data loss
4. **Confidentiality** — Protect any sensitive information you encounter
5. **Responsible Disclosure** — Report vulnerabilities to the owner privately
6. **Documentation** — Keep detailed records of all your activities
7. **Professionalism** — Act with integrity at all times

⛔ ETHICS: Unauthorized hacking is a crime in most countries. Penalties include fines and imprisonment. Ethical hacking is distinguished by authorization, scope, and intent. If you are unsure whether you have permission, you do not have permission.
