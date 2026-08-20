# Level 18 — ADVANCED SECURITY CONCEPTS

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- Attack chains and threat modeling
- Zero Trust architecture
- Cloud security fundamentals
- API security
- Container security
- DevSecOps
- Secure coding practices

---

## Chapter 33 — Zero Trust, Cloud & DevSecOps

### Attack Chains

An attack chain is a sequence of steps an attacker takes from initial access to achieving their objective.

```
┌──────────────────────────────────────────────────┐
│           EXAMPLE ATTACK CHAIN                    │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. Phishing email → User clicks link              │
│  2. Credential capture → Attacker has login        │
│  3. VPN access → Attacker enters network            │
│  4. Network scanning → Find vulnerable server       │
│  5. Exploit → Attacker gains server access         │
│  6. Privilege escalation → Becomes admin           │
│  7. Lateral movement → Reaches database server     │
│  8. Data exfiltration → Steals customer data        │
│                                                    │
│  Defense at each step:                              │
│  → Email filtering                                  │
│  → MFA                                              │
│  → Network segmentation                             │
│  → Patching                                         │
│  → Least privilege                                  │
│  → Monitoring                                        │
│  → Data encryption                                  │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Threat Modeling

Threat modeling is the process of identifying and prioritizing potential threats to a system.

```
┌──────────────────────────────────────────────────┐
│         THREAT MODELING PROCESS                    │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. Identify assets (what are we protecting?)       │
│  2. Identify threats (who might attack?)            │
│  3. Identify vulnerabilities (what's weak?)         │
│  4. Assess risk (likelihood × impact)               │
│  5. Plan mitigations (how to reduce risk?)           │
│                                                    │
│  Common frameworks:                                 │
│  → STRIDE (Spoofing, Tampering, Repudiation,        │
│    Information disclosure, Denial of service,        │
│    Elevation of privilege)                           │
│  → PASTA (Process for Attack Simulation and        │
│    Threat Analysis)                                  │
│  → DREAD (Damage, Reproducibility, Exploitability, │
│    Affected users, Discoverability)                 │
│                                                    │
└──────────────────────────────────────────────────┘
```

### STRIDE Threat Model

```
┌──────────────────────────────────────────────────┐
│              STRIDE THREAT MODEL                    │
├──────────────────┬──────────────┬─────────────────┤
│ Threat           │ Violates      │ Example          │
├──────────────────┼──────────────┼─────────────────┤
│ Spoofing         │ Authentication│ Fake login       │
│ Tampering        │ Integrity     │ Modify data      │
│ Repudiation      │ Accountability│ Deny action      │
│ Info Disclosure  │ Confidentiality│ Data leak       │
│ Denial of Service│ Availability  │ DDoS attack      │
│ Elevation of     │ Authorization │ Privesc          │
│ Privilege        │              │                  │
└──────────────────┴──────────────┴─────────────────┘
```

### Zero Trust Architecture

```
┌──────────────────────────────────────────────────┐
│          ZERO TRUST PRINCIPLES                    │
├──────────────────────────────────────────────────┤
│                                                    │
│  "Never trust, always verify"                     │
│                                                    │
│  Traditional model: "Trust but verify"             │
│  → Once inside the network, you're trusted          │
│  → Like a castle: strong walls, soft interior       │
│                                                    │
│  Zero Trust: "Verify always, trust nothing"        │
│  → Every access is verified, every time             │
│  → Like a passport check at every door               │
│                                                    │
│  Key principles:                                   │
│  1. Verify explicitly — every request authenticated  │
│  2. Least privilege — minimal access always           │
│  3. Assume breach — design as if already compromised │
│  4. Micro-segmentation — isolate everything           │
│  5. Continuous monitoring — never stop checking       │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Cloud Security Fundamentals

```
┌──────────────────────────────────────────────────┐
│         CLOUD SERVICE MODELS                      │
├──────────────────────────────────────────────────┤
│                                                    │
│  IaaS (Infrastructure as a Service)               │
│  → You get virtual machines, storage, network      │
│  → You manage OS, apps, data                        │
│  → AWS EC2, Azure VMs, Google Compute              │
│  → Security: mostly YOUR responsibility              │
│                                                    │
│  PaaS (Platform as a Service)                     │
│  → You get a platform to run apps                   │
│  → Provider manages OS, runtime                    │
│  → You manage your app and data                     │
│  → Heroku, Google App Engine, Elastic Beanstalk     │
│                                                    │
│  SaaS (Software as a Service)                     │
│  → You get a ready application                     │
│  → Provider manages everything                      │
│  → You just use it and manage your data             │
│  → Gmail, Office 365, Salesforce                    │
│                                                    │
└──────────────────────────────────────────────────┘
```

### API Security

```
┌──────────────────────────────────────────────────┐
│           API SECURITY CONCERNS                    │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. Authentication — Verify API callers             │
│     → API keys, OAuth, JWT tokens                   │
│                                                    │
│  2. Authorization — Enforce access controls         │
│     → Rate limiting, scope checks                   │
│                                                    │
│  3. Input validation — Prevent injection             │
│     → Validate all input data                       │
│                                                    │
│  4. Rate limiting — Prevent abuse                   │
│     → Limit requests per user/time                  │
│                                                    │
│  5. Encryption — Protect data in transit             │
│     → Always use HTTPS/TLS                           │
│                                                    │
│  6. Monitoring — Detect attacks                      │
│     → Log all API calls                               │
│     → Alert on anomalies                             │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Container Security

```
┌──────────────────────────────────────────────────┐
│          CONTAINER SECURITY                        │
├──────────────────────────────────────────────────┤
│                                                    │
│  Containers (Docker) are lightweight, portable      │
│  application packages.                              │
│                                                    │
│  Security best practices:                           │
│  1. Use minimal base images (Alpine)                 │
│  2. Don't run as root                               │
│  3. Scan images for vulnerabilities                  │
│  4. Use signed images                               │
│  5. Limit container resources                        │
│  6. Use read-only filesystems                       │
│  7. Network segmentation between containers         │
│  8. Don't store secrets in images                    │
│                                                    │
└──────────────────────────────────────────────────┘
```

### DevSecOps

```
┌──────────────────────────────────────────────────┐
│            DEVSECOPS                               │
├──────────────────────────────────────────────────┤
│                                                    │
│  DevSecOps = Development + Security + Operations   │
│                                                    │
│  Traditional: Security at the end (too late)       │
│  DevSecOps: Security from the start (shift left)   │
│                                                    │
│  Key practices:                                     │
│  → Code scanning in CI/CD pipeline                  │
│  → Dependency vulnerability checking                 │
│  → Infrastructure as Code (IaC) scanning             │
│  → Automated security testing                        │
│  → Security in code reviews                          │
│  → Threat modeling in design phase                   │
│  → Continuous monitoring                             │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Secure Coding Practices

```
┌──────────────────────────────────────────────────┐
│         SECURE CODING CHECKLIST                   │
├──────────────────────────────────────────────────┤
│                                                    │
│  INPUT VALIDATION                                   │
│  → Validate all input (server-side)                │
│  → Use allowlists, not blocklists                  │
│  → Sanitize before use                              │
│                                                    │
│  AUTHENTICATION                                     │
│  → Strong password policies                        │
│  → Multi-factor authentication                      │
│  → Session management                               │
│  → Rate limiting                                    │
│                                                    │
│  ACCESS CONTROL                                     │
│  → Principle of least privilege                    │
│  → Check authorization on every request             │
│  → Use roles/permissions                            │
│                                                    │
│  DATA PROTECTION                                    │
│  → Encrypt sensitive data at rest                  │
│  → Use HTTPS for data in transit                    │
│  → Hash passwords with bcrypt/Argon2                │
│  → Don't store secrets in code                      │
│                                                    │
│  ERROR HANDLING                                     │
│  → Don't expose stack traces to users              │
│  → Log errors internally                            │
│  → Generic error messages to users                 │
│                                                    │
│  DEPENDENCY MANAGEMENT                             │
│  → Keep dependencies updated                        │
│  → Scan for known vulnerabilities                   │
│  → Use trusted sources                              │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Vulnerability Management

```
┌──────────────────────────────────────────────────┐
│        VULNERABILITY MANAGEMENT CYCLE            │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. DISCOVER: Scan for vulnerabilities              │
│  2. PRIORITIZE: Rank by risk (CVSS + context)       │
│  3. REMEDIATE: Fix or mitigate                      │
│  4. VERIFY: Confirm the fix works                   │
│  5. MONITOR: Watch for new vulnerabilities          │
│  6. REPORT: Track metrics and compliance             │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Risk Management

```
┌──────────────────────────────────────────────────┐
│          RISK = LIKELIHOOD × IMPACT                │
├──────────────────────────────────────────────────┤
│                                                    │
│  Risk Treatment Options:                           │
│  → Mitigate: Reduce with controls                    │
│  → Transfer: Shift to insurance/third party         │
│  → Accept: Acknowledge and monitor                   │
│  → Avoid: Eliminate the risk source                  │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

## Chapter Summary

- Attack chains show the path from initial access to objective
- Threat modeling identifies and prioritizes threats (STRIDE)
- Zero Trust: never trust, always verify — verify every access
- Cloud models: IaaS, PaaS, SaaS — security responsibility varies
- API security: authentication, authorization, validation, rate limiting
- Container security: minimal images, no root, scanning, secrets management
- DevSecOps: security from the start of development, not the end
- Secure coding: validate input, enforce access control, encrypt data
- Vulnerability management: discover, prioritize, remediate, verify, monitor
- Risk = Likelihood × Impact; treat by mitigating, transferring, accepting, or avoiding

## Key Terms

- **Attack Chain** — Sequence of attack steps
- **Threat Modeling** — Identifying and prioritizing threats
- **STRIDE** — Spoofing, Tampering, Repudiation, Info disclosure, DoS, Elevation
- **Zero Trust** — Never trust, always verify
- **DevSecOps** — Security integrated into development pipeline
- **IaaS/PaaS/SaaS** — Cloud service models
- **Container** — Lightweight application package (Docker)
- **Vulnerability Management** — Process of finding and fixing vulnerabilities

## Knowledge Check

1. What is Zero Trust and how does it differ from traditional security?
2. What does STRIDE stand for?
3. What is the shared responsibility model in cloud security?
4. What is DevSecOps?
5. Name three secure coding practices

## Defensive Takeaway

Advanced security is about defense in depth, continuous monitoring, and integrating security into every stage of development. Zero Trust, threat modeling, and DevSecOps are the modern approaches to staying ahead of attackers. Security is a process, not a product.

## Next Steps

You've completed all 18 levels. The appendices that follow provide lab setup guides, troubleshooting, end-of-book projects, a glossary, your ethical hacking roadmap, and references for further study.

Congratulations on completing this journey from computer basics to advanced cybersecurity!
