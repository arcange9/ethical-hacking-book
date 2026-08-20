# Level 13 — SOCIAL ENGINEERING AWARENESS

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- What social engineering is and why it's dangerous
- Types of social engineering attacks
- How to recognize and defend against them
- Security awareness principles

---

## Chapter 28 — Social Engineering & Human Factors

### What Is Social Engineering?

Social engineering is manipulating people into revealing information or performing actions that compromise security. Instead of hacking computers, social engineers hack humans.

```
┌──────────────────────────────────────────────────┐
│       "The weakest link in security is the         │
│        human sitting between the keyboard          │
│              and the chair."                        │
└──────────────────────────────────────────────────┘
```

### Types of Social Engineering

```
┌──────────────────────────────────────────────────────┐
│          SOCIAL ENGINEERING TYPES                    │
├──────────────────────────────────────────────────────┤
│                                                        │
│  PHISHING: Mass emails pretending to be legitimate    │
│  → "Your account has been compromised, click here"    │
│  → Fake bank, PayPal, Amazon emails                   │
│  → Goal: steal credentials or install malware         │
│                                                        │
│  SPEAR PHISHING: Targeted phishing                    │
│  → Researched, personalized emails                    │
│  → "Hi [name], per your meeting with [boss]..."       │
│  → Higher success rate, harder to detect              │
│                                                        │
│  PRETEXTING: Creating a false scenario                │
│  → "I'm from IT support, need your password"          │
│  → "I'm the auditor, need access to records"           │
│  → Goal: build trust to extract information            │
│                                                        │
│  BAITING: Offering something enticing                  │
│  → USB drive labeled "salaries" left in lobby         │
│  → Free movie download (actually malware)              │
│                                                        │
│  TAILGATING: Following someone through a door          │
│  → Waiting for someone to open, then following         │
│  → "I forgot my badge, can you let me in?"              │
│                                                        │
│  IMPERSONATION: Pretending to be someone else         │
│  → Fake delivery person, fake IT worker               │
│  → Fake executive (CEO fraud / BEC)                   │
│                                                        │
│  VISHING: Voice phishing (phone calls)                 │
│  → "This is Microsoft support, your PC has a virus"   │
│  → "This is the IRS, you owe money"                   │
│                                                        │
│  SMISHING: SMS phishing                                │
│  → "Your package is delayed, click here"              │
│  → "You won a prize, reply with details"               │
│                                                        │
└──────────────────────────────────────────────────────┘
```

### How Social Engineering Works

```
┌──────────────────────────────────────────────────┐
│        SOCIAL ENGINEERING CYCLE                    │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. Information Gathering                         │
│     → LinkedIn, Facebook, company website          │
│     → Employee names, titles, emails               │
│     → Recent events, projects                      │
│                                                    │
│  2. Establish Trust / Pretext                      │
│     → Create a believable scenario                  │
│     → Use gathered information for credibility      │
│     → Create urgency or fear                        │
│                                                    │
│  3. Exploit / Execute                              │
│     → Ask for credentials                           │
│     → Send malicious attachment                     │
│     → Request a fund transfer                       │
│     → Ask to click a link                            │
│                                                    │
│  4. Maintain Access                               │
│     → Use stolen credentials                        │
│     → Maintain communication                       │
│     → Expand access                                 │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Red Flags of Social Engineering

```
┌──────────────────────────────────────────────────┐
│         SOCIAL ENGINEERING RED FLAGS               │
├──────────────────────────────────────────────────┤
│                                                    │
│  Urgency:      "Act now or your account closes"   │
│  Fear:         "You'll be fined if you don't..."   │
│  Authority:    "This is the CEO, do this now"     │
│  Secrecy:      "Don't tell anyone about this"     │
│  Unusual:      "Send gift cards for the client"   │
│  Misspellings: Poor grammar, wrong domain        │
│  Unexpected:   You didn't expect this message     │
│  Too good:     "You won a prize!"                  │
│  Asking:       Requests for passwords, MFA codes  │
│                                                    │
└──────────────────────────────────────────────────┘
```

### How to Defend Against Social Engineering

```
┌──────────────────────────────────────────────────┐
│          SOCIAL ENGINEERING DEFENSES              │
├──────────────────────────────────────────────────┤
│                                                    │
│  FOR INDIVIDUALS:                                  │
│  1. Never share passwords or MFA codes            │
│  2. Verify identity through known channels         │
│  3. Don't click unexpected links                    │
│  4. Check sender email address carefully           │
│  5. When in doubt, call the organization directly  │
│  6. Never plug in unknown USB drives               │
│  7. Be skeptical of urgency and pressure             │
│                                                    │
│  FOR ORGANIZATIONS:                                 │
│  1. Regular security awareness training            │
│  2. Phishing simulation exercises                   │
│  3. Clear reporting process for suspicious emails   │
│  4. Email filtering (spam, phishing detection)     │
│  5. Multi-factor authentication on all accounts    │
│  6. Principle of least privilege                    │
│  7. Financial controls for wire transfers           │
│  8. Badge access and visitor management              │
│  9. Clean desk policy                              │
│  10. Incident response plan for social eng          │
│                                                    │
└──────────────────────────────────────────────────┘
```

🛡️ DEFENSIVE: Social engineering bypasses technical controls because it targets humans. The best defense is a well-trained workforce that knows how to recognize and report suspicious activity.

⚠️ ETHICS: This book teaches social engineering for awareness and defense only. We do not teach readers to deceive real people or steal real credentials. All exercises are simulated.

---

## Chapter Summary

- Social engineering manipulates humans, not computers
- Types: phishing, spear phishing, pretexting, baiting, vishing, smishing
- Attackers exploit trust, urgency, fear, and authority
- Red flags: urgency, unexpected requests, spelling errors, secrecy
- Defense: training, verification, MFA, reporting procedures
- Organizations should conduct phishing simulations regularly
- Social engineering is often the first step in a larger attack

## Key Terms

- **Phishing** — Mass email scam pretending to be legitimate
- **Spear Phishing** — Targeted, personalized phishing
- **Vishing** — Voice phishing over phone
- **Smishing** — SMS phishing
- **Pretexting** — Creating a false scenario to extract information
- **Baiting** — Offering something to trick someone
- **Tailgating** — Following someone through a secured door

## Knowledge Check

1. What is the difference between phishing and spear phishing?
2. Name three red flags of social engineering
3. Why is social engineering effective even with technical controls?
4. What should you do if you receive a suspicious email?

## Defensive Takeaway

Technical security controls are useless if an employee willingly gives away their credentials. Security awareness training is as important as firewalls and antivirus. Humans are both the weakest link and the strongest defense.
