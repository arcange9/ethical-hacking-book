# Level 17 — SECURITY MONITORING & BLUE TEAM

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- Security monitoring fundamentals
- SIEM concepts and log analysis
- Incident detection and response
- Threat intelligence and indicators
- Forensic basics

---

## Chapter 32 — SIEM, Logs & Incident Response

### Security Operations Center (SOC)

```
┌──────────────────────────────────────────────────────┐
│              SECURITY OPERATIONS CENTER               │
├──────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Firewalls │  │   IDS    │  │ Endpoints │            │
│  │  (logs)   │  │  (alerts)│  │  (EDR)   │            │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘            │
│       │              │              │                    │
│       └──────────────┼──────────────┘                    │
│                      ▼                                   │
│              ┌───────────────┐                           │
│              │     SIEM       │                           │
│              │ (correlates &  │                           │
│              │   analyzes)   │                           │
│              └───────┬───────┘                           │
│                      │                                   │
│                      ▼                                   │
│              ┌───────────────┐                           │
│              │ SOC Analysts  │                           │
│              │ (investigate &│                           │
│              │   respond)    │                           │
│              └───────────────┘                           │
│                                                        │
└──────────────────────────────────────────────────────┘
```

### What Is a SIEM?

SIEM (Security Information and Event Management) collects, correlates, and analyzes security logs from across the organization.

```
┌──────────────────────────────────────────────────┐
│              SIEM CAPABILITIES                     │
├──────────────────────────────────────────────────┤
│                                                    │
│  COLLECT:   Logs from all sources                    │
│             → Firewalls, servers, endpoints, apps    │
│                                                    │
│  CORRELATE: Connect related events                  │
│             → "100 failed logins + new admin account│
│                = potential compromise"              │
│                                                    │
│  ALERT:     Notify on suspicious activity           │
│             → Real-time alerts to SOC team          │
│                                                    │
│  INVESTIGATE: Search and analyze historical data    │
│             → "Show all activity from this IP"       │
│                                                    │
│  REPORT:    Compliance and metrics                   │
│                                                    │
│  Common SIEM tools:                                 │
│  → Splunk, Elastic SIEM, QRadar, Wazuh             │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Log Types

```
┌──────────────────────────────────────────────────┐
│              SECURITY LOG TYPES                   │
├──────────────────────────────────────────────────┤
│                                                    │
│  Authentication logs:                              │
│  → Login successes/failures                        │
│  → Account creation/deletion                       │
│  → Privilege changes                                │
│  → Location: /var/log/auth.log (Linux)            │
│  → Location: Event Viewer (Windows)                │
│                                                    │
│  Network logs:                                     │
│  → Firewall allow/deny                             │
│  → DNS queries                                      │
│  → Connection data                                  │
│  → Proxy logs                                       │
│                                                    │
│  System logs:                                      │
│  → Service starts/stops                            │
│  → Configuration changes                            │
│  → Crashes and errors                                │
│                                                    │
│  Application logs:                                   │
│  → Access and errors                                 │
│  → API calls                                         │
│  → Business logic events                             │
│                                                    │
│  Endpoint logs:                                     │
│  → Process creation                                 │
│  → File modifications                                │
│  → Registry changes (Windows)                       │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Incident Response Lifecycle

```
┌──────────────────────────────────────────────────┐
│         INCIDENT RESPONSE LIFECYCLE               │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. PREPARATION                                   │
│     → Build IR team                                │
│     → Create playbooks                             │
│     → Set up monitoring                             │
│     → Train and exercise                            │
│                                                    │
│  2. IDENTIFICATION                                 │
│     → Detect the incident                           │
│     → Assess scope and severity                     │
│     → Declare incident                              │
│                                                    │
│  3. CONTAINMENT                                    │
│     → Short-term: isolate affected systems         │
│     → Long-term: eradicate threat                   │
│                                                    │
│  4. ERADICATION                                    │
│     → Remove malware                                │
│     → Close vulnerabilities                         │
│     → Reset compromised accounts                    │
│                                                    │
│  5. RECOVERY                                       │
│     → Restore from backups                         │
│     → Verify systems are clean                     │
│     → Monitor for re-infection                     │
│                                                    │
│  6. LESSONS LEARNED                               │
│     → Post-incident review                          │
│     → Update playbooks                              │
│     → Improve defenses                              │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Threat Intelligence

```
┌──────────────────────────────────────────────────┐
│          THREAT INTELLIGENCE                      │
├──────────────────────────────────────────────────┤
│                                                    │
│  STRATEGIC: High-level trends and motives           │
│  → "APT group X is targeting finance sector"        │
│                                                    │
│  TACTICAL: TTPs (Tactics, Techniques, Procedures)  │
│  → "Group uses phishing + RDP for access"           │
│                                                    │
│  OPERATIONAL: Specific threat details               │
│  → "Campaign targeting company X"                   │
│                                                    │
│  TECHNICAL: IOCs (IPs, hashes, domains)              │
│  → "Malicious IP: 185.x.x.x"                        │
│  → "Malware hash: SHA-256 abc123..."                │
│                                                    │
│  Sources:                                           │
│  → MITRE ATT&CK Framework                           │
│  → VirusTotal                                       │
│  → AbuseIPDB                                        │
│  → Commercial feeds                                  │
│                                                    │
└──────────────────────────────────────────────────┘
```

### MITRE ATT&CK

MITRE ATT&CK is a knowledge base of attacker tactics and techniques.

```
┌──────────────────────────────────────────────────┐
│        MITRE ATT&CK TACTICS                        │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. Reconnaissance    → Gather information          │
│  2. Resource Dev      → Set up infrastructure       │
│  3. Initial Access    → Get into the network        │
│  4. Execution         → Run malicious code          │
│  5. Persistence       → Stay in the system          │
│  6. Privilege Esc     → Gain higher access           │
│  7. Defense Evasion   → Avoid detection             │
│  8. Credential Access → Steal passwords             │
│  9. Discovery         → Explore the environment      │
│  10. Lateral Movement → Move through network         │
│  11. Collection       → Gather data                 │
│  12. Command & Control→ Remote control              │
│  13. Exfiltration     → Steal data                  │
│  14. Impact           → Cause damage                 │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Log Analysis (Lab)

```bash
# Analyze auth log for failed logins (Linux)
grep "Failed password" /var/log/auth.log | head -20

# Count failed login attempts per IP
grep "Failed password" /var/log/auth.log | \
  grep -oP 'from \K\d+\.\d+\.\d+\.\d+' | \
  sort | uniq -c | sort -rn

# Find successful logins after failed attempts
grep -E "(Failed|Accepted) password" /var/log/auth.log | tail -50

# Check for new user creation
grep "useradd" /var/log/auth.log

# Check for sudo usage
grep "sudo" /var/log/auth.log

# Check for SSH key changes
grep "authorized_keys" /var/log/auth.log
```

---

## Chapter Summary

- SOC monitors and responds to security incidents
- SIEM collects, correlates, and analyzes security logs
- Key log types: authentication, network, system, application, endpoint
- Incident response: Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned
- Threat intelligence: Strategic, Tactical, Operational, Technical
- MITRE ATT&CK maps attacker tactics and techniques
- Log analysis reveals attack patterns and indicators

## Key Terms

- **SOC** — Security Operations Center
- **SIEM** — Security Information and Event Management
- **IOC** — Indicator of Compromise
- **Incident Response** — Process of handling security incidents
- **MITRE ATT&CK** — Attacker tactics and techniques framework
- **TTP** — Tactics, Techniques, and Procedures
- **Threat Intelligence** — Information about threats and threat actors

## Knowledge Check

1. What does a SIEM do?
2. What are the 6 phases of incident response?
3. What is MITRE ATT&CK?
4. Name three types of security logs
5. What is the difference between containment and eradication?

## Defensive Takeaway

The blue team uses the same knowledge as the red team — but for defense. Understanding how attacks work helps you detect them. Every attack technique has a corresponding detection method. Effective security requires both offensive understanding and defensive implementation.
