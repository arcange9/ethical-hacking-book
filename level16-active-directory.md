# Level 16 — ACTIVE DIRECTORY & WINDOWS SECURITY

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- Active Directory architecture
- Domains, domain controllers, and authentication
- Kerberos and LDAP concepts
- Common Active Directory security weaknesses
- Defensive remediation

---

## Chapter 31 — Active Directory Architecture & Security

### What Is Active Directory?

Active Directory (AD) is Microsoft's directory service for Windows domain networks. It manages users, computers, permissions, and policies in enterprise environments.

```
┌──────────────────────────────────────────────────┐
│         ACTIVE DIRECTORY ARCHITECTURE              │
├──────────────────────────────────────────────────┤
│                                                    │
│  ┌──────────────────────────────────┐             │
│  │        DOMAIN CONTROLLER          │             │
│  │  (AD database, authentication)    │             │
│  │                                   │             │
│  │  ┌────────┐  ┌────────┐         │             │
│  │  │ Users  │  │ Groups │         │             │
│  │  └────────┘  └────────┘         │             │
│  │  ┌────────┐  ┌────────┐         │             │
│  │  │Computers│ │  OUs   │         │             │
│  │  └────────┘  └────────┘         │             │
│  └──────────────────────────────────┘             │
│              │                                     │
│    ┌─────────┼─────────┐                           │
│    ▼         ▼         ▼                           │
│  ┌─────┐ ┌─────┐ ┌─────┐                         │
│  │ PC1 │ │ PC2 │ │ PC3 │  (Domain-joined)        │
│  └─────┘ └─────┘ └─────┘                         │
│                                                    │
│  Domain:  company.local                            │
│  Users:   alice, bob, admin                         │
│  Groups:  IT, HR, Finance                          │
│  OUs:     Computers, Users, Servers                 │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Key Components

```
┌──────────────────────────────────────────────────┐
│         AD KEY COMPONENTS                         │
├──────────────────────────────────────────────────┤
│                                                    │
│  Domain:         A logical group of computers      │
│                  sharing the same AD database       │
│                                                    │
│  Domain Controller: Server running AD               │
│                  that authenticates users            │
│                                                    │
│  Organizational Unit (OU): Container for users,   │
│                  computers, and groups               │
│                                                    │
│  Group Policy (GPO): Central configuration          │
│                  settings applied to users/computers│
│                                                    │
│  Trust:          Relationship between domains       │
│                  allowing cross-domain access        │
│                                                    │
│  Forest:         Collection of one or more domains  │
│                                                    │
│  Tree:           Hierarchical structure of domains   │
│                                                    │
│  Schema:         Blueprint of all AD objects        │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Authentication: Kerberos

```
┌──────────────────────────────────────────────────┐
│          KERBEROS AUTHENTICATION                   │
├──────────────────────────────────────────────────┤
│                                                    │
│  Client          KDC (Domain Controller)           │
│  ┌────┐                              ┌────┐        │
│  │    │ ── 1. Request TGT ─────────→ │    │        │
│  │    │                              │    │        │
│  │    │ ←── 2. TGT + Session Key ─── │    │        │
│  │    │                              │    │        │
│  │    │ ── 3. TGT + Service Request→│    │        │
│  │    │                              │    │        │
│  │    │ ←── 4. Service Ticket ──────│    │        │
│  │    │                              │    │        │
│  │    │ ── 5. Service Ticket ──→ Service          │
│  │    │                              │            │
│  │    │ ←── 6. Access Granted ───── Service        │
│  └────┘                                           │
│                                                    │
│  TGT: Ticket Granting Ticket (like a passport)     │
│  KDC: Key Distribution Center (domain controller)   │
│  Session Key: Temporary encryption key             │
│                                                    │
└──────────────────────────────────────────────────┘
```

### LDAP (Lightweight Directory Access Protocol)

LDAP is the protocol used to query and modify Active Directory.

```bash
# Query AD via LDAP (from Kali, lab environment)
ldapsearch -x -H ldap://192.168.56.30 -D "admin@company.local" -w password -b "DC=company,DC=local"

# Using ldap-utils
ldapsearch -x -H ldap://192.168.56.30 -s sub -b "DC=company,DC=local" "(objectClass=user)"

# Enumerate with enum4linux
enum4linux 192.168.56.30
```

### Common AD Security Issues

```
┌──────────────────────────────────────────────────┐
│       COMMON AD SECURITY WEAKNESSES               │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. Weak passwords                               │
│     → Especially service accounts                   │
│     → Kerberoasting targets service accounts        │
│                                                    │
│  2. Too many domain admins                        │
│     → More admins = more attack surface              │
│                                                    │
│  3. Over-privileged accounts                       │
│     → Users with more access than needed            │
│                                                    │
│  4. Unconstrained delegation                      │
│     → Allows impersonation of any user              │
│                                                    │
│  5. Stale accounts                                 │
│     → Old user and service accounts not removed     │
│                                                    │
│  6. Clear text passwords stored                    │
│     → In descriptions, scripts, GPO preferences     │
│                                                    │
│  7. Insecure LDAP                                  │
│     → LDAP without signing/channel binding           │
│                                                    │
│  8. PrintNightmare / similar exploits              │
│     → Print spooler service vulnerabilities          │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Defensive AD Hardening

```
┌──────────────────────────────────────────────────┐
│         AD SECURITY BEST PRACTICES                 │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. Implement Tiered Admin Model                    │
│     → Tier 0: Domain controllers                   │
│     → Tier 1: Servers                               │
│     → Tier 2: Workstations                          │
│     → Separate admin accounts                       │
│                                                    │
│  2. Minimize Domain Admins                         │
│     → Only essential accounts                       │
│     → Use Just Enough Administration (JEA)          │
│                                                    │
│  3. Secure service accounts                        │
│     → Group Managed Service Accounts (gMSA)        │
│     → Strong, long passwords                       │
│                                                    │
│  4. Enable LDAP signing                            │
│  5. Disable print spooler on DCs                   │
│  6. Implement LAPS for local admin passwords         │
│  7. Regular access reviews                          │
│  8. Monitor for Kerberoasting                       │
│  9. Enable audit logging                            │
│ 10. Patch regularly                                 │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

## Chapter Summary

- Active Directory manages users, computers, and policies in Windows networks
- Domain controllers handle authentication using Kerberos
- LDAP is the protocol for querying AD
- Kerberos uses tickets (TGT and service tickets) for authentication
- Common issues: weak passwords, too many admins, over-privileged accounts
- Defense: tiered model, minimal admins, secure service accounts, monitoring
- AD is the most targeted system in enterprise environments

## Key Terms

- **Active Directory** — Microsoft's directory service for domain networks
- **Domain Controller** — Server that authenticates users and stores AD
- **Kerberos** — Authentication protocol using tickets
- **LDAP** — Protocol for querying directory services
- **GPO** — Group Policy Object for central configuration
- **OU** — Organizational Unit for organizing AD objects
- **Kerberoasting** — Attack targeting service account tickets

## Knowledge Check

1. What is the role of a domain controller?
2. How does Kerberos authentication work?
3. What is LDAP used for?
4. Name three common AD security weaknesses
5. What is the tiered admin model?

## Defensive Takeaway

Active Directory is the heart of enterprise security. Compromising AD means compromising the entire organization. Defenders must implement least privilege, monitor for unusual activity, patch regularly, and audit access continuously.
