# Level 5 — ETHICAL HACKING METHODOLOGY

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- The professional penetration testing lifecycle
- Types of security assessments
- Authorization, scope, and rules of engagement
- Reporting and remediation

---

## Chapter 18 — The Penetration Testing Lifecycle

Ethical hacking follows a structured methodology. It's not random — it's a disciplined process that mirrors how real attackers operate, but with authorization and safety boundaries.

### The Penetration Testing Lifecycle

```
┌──────────────────────────────────────────────────────┐
│          PENETRATION TESTING LIFECYCLE                │
├──────────────────────────────────────────────────────┤
│                                                        │
│  1. AUTHORIZATION & SCOPE                              │
│     → Get written permission                           │
│     → Define what's in/out of scope                    │
│     → Establish rules of engagement                    │
│                                                        │
│  2. INFORMATION GATHERING (Reconnaissance)             │
│     → Passive: OSINT, public records                   │
│     → Active: scanning, probing                       │
│                                                        │
│  3. ENUMERATION                                        │
│     → Identify services, versions, users              │
│     → Map the attack surface                           │
│                                                        │
│  4. VULNERABILITY IDENTIFICATION                       │
│     → Scan for known weaknesses                        │
│     → Research CVEs and exploits                       │
│                                                        │
│  5. VALIDATION (Controlled Lab)                        │
│     → Test exploits in isolated environment            │
│     → Verify findings without causing damage           │
│                                                        │
│  6. EXPLOITATION (If authorized)                       │
│     → Demonstrate impact safely                        │
│     → Document evidence                                │
│                                                        │
│  7. POST-EXPLOITATION (If authorized)                  │
│     → Assess impact and access gained                  │
│     → Identify privilege escalation paths              │
│                                                        │
│  8. REPORTING                                          │
│     → Document findings with evidence                  │
│     → Rate severity and risk                          │
│     → Recommend remediation                            │
│                                                        │
│  9. REMEDIATION                                        │
│     → Fix the vulnerabilities                          │
│     → Apply patches, config changes                    │
│                                                        │
│ 10. RETESTING                                          │
│     → Verify fixes are effective                       │
│     → Confirm no new issues introduced                 │
│                                                        │
└──────────────────────────────────────────────────────┘
```

### Types of Security Assessments

```
┌──────────────────────────────────────────────────────┐
│         TYPES OF SECURITY ASSESSMENTS                 │
├──────────────────────────────────────────────────────┤
│                                                        │
│  VULNERABILITY ASSESSMENT                              │
│  → Identify weaknesses (no exploitation)              │
│  → Automated scanning + manual verification           │
│  → Output: list of vulnerabilities with severity      │
│  → Like a health checkup (finds problems)            │
│                                                        │
│  PENETRATION TESTING                                   │
│  → Find AND exploit weaknesses safely                  │
│  → Demonstrates actual impact                         │
│  → Output: detailed report with proof                 │
│  → Like trying to break into your own house          │
│                                                        │
│  RED TEAMING                                           │
│  → Full-scope simulated attack                         │
│  → Tests people, process, AND technology               │
│  → Often unannounced (blue team doesn't know)         │
│  → Measures detection and response                   │
│  → Like a fire drill that nobody knows about          │
│                                                        │
│  BLUE TEAMING                                          │
│  → Defensive side                                      │
│  → Detect, respond, and prevent attacks               │
│  → Monitors logs, investigates alerts                 │
│  → The firefighters to the red team's arson           │
│                                                        │
│  PURPLE TEAMING                                        │
│  → Red + Blue working together                         │
│  → Red attacks, Blue defends, they share knowledge    │
│  → Both sides improve together                        │
│  → Like training where offense and defense learn      │
│                                                        │
└──────────────────────────────────────────────────────┘
```

### Authorization and Scope

```
┌──────────────────────────────────────────────────┐
│          AUTHORIZATION CHECKLIST                   │
├──────────────────────────────────────────────────┤
│                                                    │
│  BEFORE any testing:                               │
│                                                    │
│  ✅ Written authorization from system owner       │
│  ✅ Scope defined: which systems, networks        │
│  ✅ IP ranges listed explicitly                    │
│  ✅ Exclusions clearly stated                      │
│  ✅ Time window agreed upon                        │
│  ✅ Rules of engagement defined                    │
│  ✅ Emergency contact established                  │
│  ✅ Data handling agreement signed                │
│  ✅ Insurance/liability discussed                   │
│                                                    │
│  NEVER test without ALL of the above              │
│                                                    │
└──────────────────────────────────────────────────┘
```

⛔ ETHICS: Authorization is the line between ethical hacking and cybercrime. A penetration tester without authorization is just a criminal. The only difference between ethical and malicious hacking is permission, scope, and intent.

### Rules of Engagement

Rules of Engagement (RoE) define what the tester can and cannot do:

```
┌─────────────────────────────────────────────────┐
│           SAMPLE RULES OF ENGAGEMENT             │
├─────────────────────────────────────────────────┤
│                                                   │
│  ALLOWED:                                         │
│  → Port scanning on 192.168.1.0/24               │
│  → Web application testing on https://app.test    │
│  → Password strength testing (offline only)       │
│  → Social engineering (email phishing only)       │
│                                                   │
│  NOT ALLOWED:                                     │
│  → No denial-of-service attacks                   │
│  → No social engineering of executives             │
│  → No data exfiltration                           │
│  → No testing of production databases              │
│  → No persistence or backdoor installation          │
│  → No testing outside IP scope                     │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Reporting

A penetration test report is the deliverable. It's what the client pays for.

```
┌──────────────────────────────────────────────────┐
│            PEN TEST REPORT STRUCTURE              │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. Executive Summary                              │
│     → Non-technical overview for management       │
│     → Key findings and risk level                  │
│                                                    │
│  2. Scope and Methodology                         │
│     → What was tested and how                      │
│     → Tools used, time period                     │
│                                                    │
│  3. Findings (by severity)                         │
│     → Critical → High → Medium → Low → Info       │
│     → Each finding: description, evidence,        │
│       impact, remediation                          │
│                                                    │
│  4. Risk Assessment                               │
│     → Likelihood × Impact = Risk                  │
│     → Business impact analysis                    │
│                                                    │
│  5. Remediation Recommendations                    │
│     → Prioritized by risk                          │
│     → Specific, actionable fixes                  │
│                                                    │
│  6. Appendices                                    │
│     → Raw scan output                             │
│     → Screenshots and evidence                    │
│     → Tool configurations                          │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Severity Rating

```
┌──────────────────────────────────────────────────┐
│            SEVERITY RATING SCALE                  │
├────────────┬─────────────────────────────────────┤
│ Critical   │ Immediate system compromise          │
│            │ No interaction needed                │
│            │ Example: RCE without auth            │
├────────────┼─────────────────────────────────────┤
│ High       │ Serious impact, may need interaction │
│            │ Example: SQL injection               │
├────────────┼─────────────────────────────────────┤
│ Medium     │ Limited impact or requires access    │
│            │ Example: Stored XSS                  │
├────────────┼─────────────────────────────────────┤
│ Low        │ Minor impact, defense-in-depth issue │
│            │ Example: Verbose error messages      │
├────────────┼─────────────────────────────────────┤
│ Informational │ No direct security impact         │
│            │ Example: Missing security header     │
└────────────┴─────────────────────────────────────┘
```

---

## Chapter Summary

- Penetration testing follows a structured 10-step lifecycle
- Authorization and scope are mandatory before any testing
- Vulnerability assessment finds problems; pentest demonstrates impact
- Red team tests attack, blue team defends, purple team works together
- Rules of engagement define what's allowed and forbidden
- Reporting is the final deliverable — clear, actionable, prioritized
- Severity ratings: Critical, High, Medium, Low, Informational

## Key Terms

- **Penetration Testing** — Authorized attempt to exploit vulnerabilities
- **Vulnerability Assessment** — Finding weaknesses without exploitation
- **Red Team** — Offensive security team simulating attacks
- **Blue Team** — Defensive security team protecting systems
- **Purple Team** — Red and Blue working together
- **Rules of Engagement** — Boundaries of what a tester can do
- **Scope** — What's included in the assessment
- **CVE** — Common Vulnerabilities and Exposures identifier
- **CVSS** — Common Vulnerability Scoring System

## Knowledge Check

1. What are the 10 steps of the penetration testing lifecycle?
2. What is the difference between a vulnerability assessment and a penetration test?
3. What must you have before starting any security testing?
4. What are Rules of Engagement?
5. What severity would you give to a remote code execution vulnerability?

## Practical Challenge

🟢 Beginner

Write a one-page penetration testing scope document for a fictional company "SecureCorp" that wants their web application tested. Include:
1. Authorization statement
2. IP addresses/URLs in scope
3. What's allowed and not allowed
4. Time window
5. Emergency contacts

## Common Mistakes

- Starting testing without written authorization
- Going beyond the agreed scope
- Not documenting findings properly
- Testing production systems during business hours
- Not having an emergency contact for when things go wrong

## Defensive Takeaway

The methodology works both ways. Defenders who understand how attackers operate can build better defenses. Every step in the pentest lifecycle reveals what defenders need to protect against.

## Next Chapter

Level 6 covers reconnaissance — how to gather information about a target (using only your lab environment).
