# Level 4 — CYBERSECURITY FUNDAMENTALS

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- The CIA Triad and core security principles
- Authentication, authorization, and accountability
- Cryptography fundamentals (symmetric, asymmetric, hashing)
- Password security and secure storage
- Digital signatures and certificates

---

## Chapter 16 — Security Principles (CIA Triad)

The CIA Triad is the foundation of all information security. Every security control, policy, and technology exists to protect one or more of these three properties.

### The CIA Triad

```
┌──────────────────────────────────────────────────┐
│                 THE CIA TRIAD                     │
├──────────────────────────────────────────────────┤
│                                                    │
│                    ┌──────────┐                    │
│                    │   CIA    │                    │
│                    └──┐  ┌──┘                    │
│              ┌────────┼──┼────────┐               │
│              ▼        ▼  ▼        ▼               │
│         ┌──────┐ ┌──────┐ ┌──────┐              │
│         │CONF. │ │INTEG.│ │AVAIL.│              │
│         │      │ │      │ │      │              │
│         │Keep  │ │Data  │ │System │              │
│         │secret │ │not   │ │works  │              │
│         │      │ │tamp- │ │when   │              │
│         │      │ │ered  │ │needed │              │
│         └──────┘ └──────┘ └──────┘              │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Confidentiality

Confidentiality means only authorized people can access information.

```
Analogy: A sealed letter
  → Only the intended recipient should be able to read it
  → If someone else opens it, confidentiality is broken

Examples:
  → Encryption protects data confidentiality
  → Passwords protect account confidentiality
  → Access controls protect file confidentiality
```

### Integrity

Integrity means data hasn't been tampered with. If someone changes data, you should be able to detect it.

```
Analogy: A wax seal on a letter
  → If the seal is broken, you know someone tampered with it
  → If the seal is intact, you trust the contents

Examples:
  → Hashing verifies file integrity
  → Checksums verify data wasn't corrupted
  → Digital signatures verify authenticity
```

### Availability

Availability means systems and data are accessible when needed.

```
Analogy: A bank that's always open
  → If the bank doors are locked during business hours,
    availability is broken
  → Customers can't get their money when they need it

Examples:
  → Denial-of-service attacks break availability
  → Backups restore availability after incidents
  → Redundancy ensures availability if one system fails
```

### Additional Security Principles

```
┌──────────────────────────────────────────────────┐
│            CORE SECURITY PRINCIPLES              │
├──────────────────────────────────────────────────┤
│                                                    │
│ Authentication  → Proving who you are             │
│                   (username + password)            │
│                                                    │
│ Authorization   → What you're allowed to do        │
│                   (permissions, roles)             │
│                                                    │
│ Accounting      → Tracking what happened           │
│                   (audit logs)                     │
│                                                    │
│ Least Privilege → Give only the access needed      │
│                   (no more than necessary)         │
│                                                    │
│ Defense in Depth → Multiple layers of security    │
│                   (firewall + IDS + AV + policy)    │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Threats, Vulnerabilities, and Risks

```
┌────────────────────────────────────────────────────┐
│           THREAT → VULNERABILITY → RISK             │
├────────────────────────────────────────────────────┤
│                                                    │
│  THREAT:        A potential danger                  │
│                 (hacker, malware, natural disaster) │
│                                                    │
│  VULNERABILITY: A weakness that could be exploited  │
│                 (unpatched software, weak password)│
│                                                    │
│  EXPLOIT:       A method to use the vulnerability  │
│                 (code, technique, tool)             │
│                                                    │
│  RISK:          The probability × impact            │
│                 (how likely + how bad)              │
│                                                    │
│  Attack Surface: All possible attack points        │
│                 (open ports, web forms, users)     │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Security Controls

```
┌────────────────────────────────────────────────┐
│         TYPES OF SECURITY CONTROLS             │
├──────────────────┬─────────────────────────────┤
│ Preventive       │ Stop attacks before they    │
│                  │ happen (firewall, passwords) │
├──────────────────┼─────────────────────────────┤
│ Detective        │ Identify attacks in progress│
│                  │ (IDS, SIEM, logs)            │
├──────────────────┼─────────────────────────────┤
│ Corrective       │ Fix after an attack         │
│                  │ (patches, backups)           │
├──────────────────┼─────────────────────────────┤
│ Deterrent        │ Discourage attackers        │
│                  │ (warnings, cameras)          │
├──────────────────┼─────────────────────────────┤
│ Compensating     │ Alternative when primary    │
│                  │ control isn't possible       │
└──────────────────┴─────────────────────────────┘
```

---

## Chapter 17 — Cryptography & Password Security

Cryptography is the science of keeping information secret and verifying its authenticity. It's the backbone of digital security.

### Encryption vs Hashing

```
┌──────────────────────────────────────────────────┐
│         ENCRYPTION vs HASHING                     │
├──────────────────────────────────────────────────┤
│                                                    │
│  ENCRYPTION:                                      │
│  → Two-way: you can decrypt back to original       │
│  → Used to protect data confidentiality             │
│  → Needs a key to encrypt and decrypt               │
│  → Example: AES, RSA                               │
│                                                    │
│  "Hello" --encrypt--> "Xk9$mL" --decrypt--> "Hello"│
│                                                    │
│  HASHING:                                          │
│  → One-way: you cannot reverse a hash              │
│  → Used to verify integrity                         │
│  → Same input always = same output                  │
│  → Example: SHA-256, MD5 (broken, don't use)       │
│                                                    │
│  "Hello" --hash--> "185f8db322..." (cannot reverse)│
│                                                    │
└──────────────────────────────────────────────────┘
```

### Symmetric Cryptography

Symmetric encryption uses the **same key** for both encryption and decryption.

```
┌─────────────────────────────────────────┐
│        SYMMETRIC ENCRYPTION              │
│                                          │
│  Alice        Shared Key      Bob        │
│  ┌───┐                        ┌───┐      │
│  │ A │ ── encrypt(key) ──→   │ A │      │
│  └───┘    "secret123"  ┌──┐  └───┘      │
│                        │██│             │
│           ┌────────────┘  │             │
│           │  Encrypted    │             │
│           │  data         │             │
│           └───────────────┘             │
│                                          │
│  Bob decrypts with same key "secret123"  │
└─────────────────────────────────────────┘
```

```
Pros: Fast, efficient for large data
Cons: Key distribution problem (how to share key safely?)
Common algorithms: AES-256, ChaCha20
```

### Asymmetric (Public-Key) Cryptography

Asymmetric encryption uses **two keys**: a public key (share with everyone) and a private key (keep secret).

```
┌──────────────────────────────────────────────┐
│       ASYMMETRIC ENCRYPTION                    │
├──────────────────────────────────────────────┤
│                                                │
│  Alice has:                                   │
│    Public Key  (shares with everyone)          │
│    Private Key (keeps secret)                  │
│                                                │
│  Bob wants to send Alice a secret:             │
│    1. Bob encrypts with Alice's PUBLIC key     │
│    2. Only Alice's PRIVATE key can decrypt it  │
│                                                │
│  "Hello" + Alice's Public Key → encrypted     │
│  Encrypted + Alice's Private Key → "Hello"   │
│                                                │
└──────────────────────────────────────────────┘
```

```
Pros: No key distribution problem
Cons: Slower than symmetric
Common algorithms: RSA, ECC, Ed25519
```

### Hashing

A hash function takes any input and produces a fixed-size output. The same input always produces the same output, but you cannot reverse the process.

```
┌──────────────────────────────────────────────────┐
│              HOW HASHING WORKS                    │
├──────────────────────────────────────────────────┤
│                                                    │
│  Input                SHA-256 Hash                  │
│  ─────                ──────────                   │
│  "hello"      → 2cf24dba... (64 chars)             │
│  "Hello"      → 185f8db3... (completely different!)│
│  "hello "     → 9d8f3bdc... (space changes it!)    │
│  "hello world"→ b94d27b9...                        │
│                                                    │
│  Properties:                                       │
│  1. Deterministic (same input = same output)      │
│  2. Fixed size (always 256 bits for SHA-256)       │
│  3. One-way (cannot reverse)                       │
│  4. Avalanche effect (tiny change = huge diff)     │
│  5. Collision resistant (hard to find 2 inputs     │
│     with same hash)                                │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Salting

A salt is random data added to a password before hashing. This prevents attackers from using pre-computed tables (rainbow tables) to crack passwords.

```
Without salt:
  password123  → SHA-256 → abc123...  (same for everyone)

With salt:
  password123 + random_salt_A → SHA-256 → xyz789...
  password123 + random_salt_B → SHA-256 → def456...
  
  Even though the password is the same, the hashes are different
  because the salt is different for each user.
```

🛡️ DEFENSIVE: Modern password storage uses bcrypt, scrypt, or Argon2 — these are hashing algorithms specifically designed for passwords. They're slow (by design) and include salting, making brute-force attacks expensive.

### Password Storage Methods (Worst to Best)

```
┌────────────────────────────────────────────────────┐
│         PASSWORD STORAGE (WORST → BEST)            │
├────────────────────────────────────────────────────┤
│                                                    │
│  ❌ WORST:   Plain text                            │
│     password123 stored as "password123"            │
│                                                    │
│  ❌ BAD:     MD5 hash (broken)                     │
│     "password123" → MD5 → 482c8111...              │
│                                                    │
│  ⚠️ OKAY:   SHA-256 (fast, can be brute-forced)    │
│     "password123" → SHA-256 → ef92b0...            │
│                                                    │
│  ✅ GOOD:   SHA-256 + salt                          │
│     "password123" + salt → SHA-256 → hash          │
│                                                    │
│  ✅ BEST:   bcrypt/scrypt/Argon2 (slow + salt)     │
│     "password123" + salt → bcrypt → hash            │
│     Designed to be slow, resists GPU cracking       │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Digital Signatures

Digital signatures prove that a message came from a specific person and wasn't tampered with.

```
┌──────────────────────────────────────────────────┐
│           HOW DIGITAL SIGNATURES WORK              │
├──────────────────────────────────────────────────┤
│                                                    │
│  Alice wants to sign a document:                  │
│                                                    │
│  1. Alice hashes the document:                    │
│     document → SHA-256 → hash                      │
│                                                    │
│  2. Alice encrypts the hash with her PRIVATE key: │
│     hash → encrypt(private_key) → signature       │
│                                                    │
│  3. Alice sends document + signature to Bob        │
│                                                    │
│  4. Bob verifies:                                  │
│     a. Hash the document himself                   │
│     b. Decrypt signature with Alice's PUBLIC key  │
│     c. Compare the two hashes                      │
│     d. If they match → signature is valid          │
│                                                    │
└──────────────────────────────────────────────────┘
```

### TLS/SSL (HTTPS)

TLS (Transport Layer Security) combines asymmetric and symmetric encryption for secure web communication.

```
┌────────────────────────────────────────────────────┐
│               HTTPS/TLS HANDSHAKE                    │
├────────────────────────────────────────────────────┤
│                                                      │
│  Browser                              Server         │
│  ┌─────┐                             ┌─────┐        │
│  │     │ ── "Hello" (supported ciphers) ──→ │        │
│  │     │ ←─ "Hello" (chosen cipher + cert) ── │        │
│  │     │                                    │        │
│  │     │ ←─ Server's certificate ────────── │        │
│  │     │    (contains public key)           │        │
│  │     │                                    │        │
│  │     │ Verify certificate with CA         │        │
│  │     │                                    │        │
│  │     │ ── Generate session key,           │        │
│  │     │    encrypt with server's public key │        │
│  │     │                                    │        │
│  │     │ ←─ Server decrypts with private key │       │
│  │     │                                    │        │
│  │     │ ←══ Encrypted communication ═══→   │        │
│  │     │    (using session key)              │        │
│  └─────┘                             └─────┘        │
│                                                      │
└────────────────────────────────────────────────────┘
```

---

## Chapter Summary

- The CIA Triad: Confidentiality, Integrity, Availability
- Authentication proves identity; Authorization grants access; Accounting tracks actions
- Least Privilege: give only the access needed; Defense in Depth: multiple layers
- Symmetric encryption uses one key (fast, key-sharing problem)
- Asymmetric encryption uses public/private key pair (slower, solves key-sharing)
- Hashing is one-way: same input always gives same output, cannot reverse
- Salting prevents rainbow table attacks on passwords
- bcrypt/Argon2 are best for password storage (slow by design)
- Digital signatures prove authenticity and integrity
- TLS/SSL combines asymmetric and symmetric encryption for HTTPS

## Key Terms

- **CIA Triad** — Confidentiality, Integrity, Availability
- **Authentication** — Proving who you are
- **Authorization** — What you're allowed to do
- **Encryption** — Two-way data protection with a key
- **Hashing** — One-way fingerprint of data
- **Salt** — Random data added before hashing
- **Symmetric** — Same key for encrypt and decrypt
- **Asymmetric** — Public key encrypts, private key decrypts
- **Digital Signature** — Proof of authenticity using private key
- **Certificate** — Public key + identity, signed by a CA

## Knowledge Check

1. What are the three parts of the CIA Triad?
2. What is the difference between encryption and hashing?
3. Why is salting important for password storage?
4. How does asymmetric encryption solve the key distribution problem?
5. What does a digital signature prove?

## Practical Challenge

🟢 Beginner

Using Python on your Kali VM:
```python
import hashlib
# Hash "password123" with SHA-256
print(hashlib.sha256(b"password123").hexdigest())
# Try hashing "Password123" (capital P) - see the difference
print(hashlib.sha256(b"Password123").hexdigest())
```

## Common Mistakes

- Confusing encryption with hashing
- Using MD5 or SHA-1 (both broken) for security
- Not salting passwords before hashing
- Storing passwords in plain text
- Using the same key for everything

## Defensive Takeaway

Cryptography is your shield. Every secure system relies on encryption, hashing, and digital signatures. Understanding how they work helps you both identify weaknesses in systems and implement proper security controls.

## Next Chapter

Level 5 covers the ethical hacking methodology — the professional penetration testing lifecycle.
