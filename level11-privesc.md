# Level 11 — PRIVILEGE ESCALATION

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- What privilege escalation is and why it matters
- Linux privilege escalation techniques
- Windows privilege escalation concepts
- How to identify and fix privilege escalation risks

---

## Chapter 26 — Linux & Windows Privilege Escalation

### What Is Privilege Escalation?

Privilege escalation is going from a lower-privilege account to a higher one. After initial exploitation, attackers often have limited access. They need root/admin to fully compromise a system.

```
┌──────────────────────────────────────────────────┐
│           PRIVILEGE ESCALATION                     │
├──────────────────────────────────────────────────┤
│                                                    │
│  VERTICAL:   Regular User → Root/Admin            │
│              Low privilege → High privilege        │
│                                                    │
│  HORIZONTAL: User A → User B (same level)         │
│              Gain access to another user's data    │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Linux Privilege Escalation

After getting initial access (low-privilege shell), enumerate the system to find escalation paths.

```bash
# === SYSTEM INFORMATION ===
whoami                  # Current user
id                      # User ID and groups
uname -a                # Kernel version
cat /etc/os-release     # OS version
hostname                # System hostname
arch                    # Architecture

# Check kernel version for known exploits
uname -r                # Kernel version
# Search: "Linux kernel X.X exploit"
```

```bash
# === USER INFORMATION ===
cat /etc/passwd         # All users
cat /etc/shadow         # Password hashes (needs root)
cat /etc/group          # Groups
groups                  # Current user's groups
sudo -l                 # What can current user run as sudo?

# === FIND SUDO ACCESS ===
sudo -l                 # List sudo permissions
# If you can run any binary as sudo, check GTFOBins
# https://gtfobins.github.io
```

```
┌──────────────────────────────────────────────────┐
│           COMMON LINUX PRIVESC PATHS              │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. Sudo misconfigurations                        │
│     → sudo -l shows what you can run               │
│     → Some binaries can escape to shell             │
│     → Example: sudo find . -exec /bin/sh \;       │
│                                                    │
│  2. SUID binaries                                 │
│     → Programs that run as root                     │
│     → find / -perm -4000 -type f 2>/dev/null     │
│     → Some SUID programs can be exploited           │
│                                                    │
│  3. Cron jobs                                       │
│     → Scripts running as root on schedule          │
│     → cat /etc/crontab                              │
│     → If the script is writable, modify it          │
│                                                    │
│  4. World-writable files                           │
│     → find / -writable -not -path "/proc/*" 2>/dev/null│
│     → Sensitive files shouldn't be writable         │
│                                                    │
│  5. Weak file permissions                          │
│     → /etc/passwd writable → add a root user        │
│     → /etc/shadow readable → crack hashes           │
│                                                    │
│  6. Kernel exploits                                │
│     → Old kernels have known exploits              │
│     → uname -r to check version                    │
│                                                    │
│  7. PATH hijacking                                 │
│     → If a script calls programs without full path  │
│     → Add your directory to PATH                   │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Practical Linux Privilege Escalation (Lab)

```bash
# After getting a low-privilege shell on Metasploitable:

# 1. Check sudo permissions
sudo -l
# If "User may run the following" appears, check each binary on GTFOBins

# 2. Find SUID binaries
find / -perm -4000 -type f 2>/dev/null
# Look for unusual SUID programs

# 3. Check cron jobs
cat /etc/crontab
ls -la /etc/cron.*

# 4. Check for writable sensitive files
find /etc -writable -type f 2>/dev/null

# 5. Check for interesting files
find / -name "*.conf" -writable 2>/dev/null
find / -name "*.sh" -writable 2>/dev/null

# 6. Check kernel version for exploits
uname -r
# Search exploit-db for the kernel version
```

### Automated Enumeration Tools

```bash
# LinPEASS - Linux Privilege Escalation Awesome Script
# Download and run (lab only):
# Transfer to the target and run:
chmod +x linpeas.sh
./linpeas.sh

# Linux Smart Enumeration
# Run on the target:
./lse.sh

# Linux Exploit Suggester
./les.sh
```

💡 TIP: These automated tools save time, but always understand what they're checking and why. Manual enumeration skills are essential.

### Windows Privilege Escalation (Concepts)

Windows privilege escalation uses different techniques but follows the same principle: find misconfigurations and weaknesses.

```
┌──────────────────────────────────────────────────┐
│         WINDOWS PRIVESC CONCEPTS                    │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. Unquoted Service Paths                        │
│     → Service path "C:\Program Files\My App\app.exe"│
│     → If unquoted, Windows runs "C:\Program.exe"   │
│     → Place malicious "Program.exe" in C:\          │
│                                                    │
│  2. Weak service permissions                        │
│     → Service executable is writable               │
│     → Replace with malicious executable            │
│                                                    │
│  3. Registry autorun                                 │
│     → Programs that run on startup                  │
│     → If the key is writable, modify it            │
│                                                    │
│  4. Stored credentials                              │
│     → Windows Credential Manager                   │
│     → Registry stored passwords                     │
│                                                    │
│  5. AlwaysInstallElevated                         │
│     → MSI packages installed as SYSTEM            │
│     → Create malicious MSI with msfvenom          │
│                                                    │
│  6. Token impersonation                             │
│     → Exploit SeImpersonate privilege              │
│     → PrintSpoofer, RoguePotato techniques          │
│                                                    │
└──────────────────────────────────────────────────┘
```

### How Defenders Prevent Privilege Escalation

```
┌──────────────────────────────────────────────────┐
│          DEFENSIVE MEASURES                        │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. Principle of Least Privilege                  │
│     → Users get only the access they need          │
│     → No unnecessary sudo permissions               │
│                                                    │
│  2. Regular updates                               │
│     → Patch kernel vulnerabilities                 │
│     → Update all software                           │
│                                                    │
│  3. Remove SUID bits                              │
│     → chmod u-s on programs that don't need it     │
│     → Audit SUID programs regularly                │
│                                                    │
│  4. Secure file permissions                        │
│     → /etc/shadow should be 640 root:root          │
│     → No world-writable system files                │
│                                                    │
│  5. Secure cron jobs                                │
│     → Scripts should not be writable by non-root    │
│                                                    │
│  6. Monitor sudo usage                            │
│     → Log all sudo commands                         │
│     → Alert on unusual sudo activity                │
│                                                    │
│  7. Use SELinux/AppArmor                          │
│     → Mandatory access control                     │
│     → Limits what compromised processes can do      │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

## LAB 9 — Privilege Escalation Lab 🔴

Objective: Practice privilege escalation on a lab target
Difficulty: Advanced
Environment: Kali + Metasploitable VM
Safety: Lab only, authorized

Step 1: Get a low-privilege shell (from Level 10 lab)

Step 2: Manual enumeration
```bash
whoami
id
uname -a
sudo -l
find / -perm -4000 -type f 2>/dev/null
cat /etc/crontab
```

Step 3: Analyze findings
- Any SUID binaries that shouldn't be there?
- Any sudo permissions that can be abused?
- Any writable system files?
- Any cron jobs with writable scripts?

Step 4: Attempt escalation
- Use findings to escalate to root
- Document each step

Step 5: Document
- What path worked?
- What was the vulnerability?
- How would you fix it?

Expected Result: Successful privilege escalation from regular user to root, with documented path and remediation.

Understanding Check:
1. What is the difference between vertical and horizontal privilege escalation?
2. What does `sudo -l` show?
3. How do you find SUID binaries?
4. How would a defender prevent the escalation you performed?

Defensive Lesson: Privilege escalation only works because of misconfigurations or unpatched software. Every escalation path you find is a configuration that needs to be fixed.

Cleanup: Revert VM snapshot.

---

## Chapter Summary

- Privilege escalation goes from low access to high access
- Linux: check sudo permissions, SUID binaries, cron jobs, file permissions
- Windows: check service paths, service permissions, registry, stored credentials
- GTFOBins documents how to abuse legitimate programs
- Automated tools (LinPEAS) speed up enumeration
- Manual enumeration is still essential — understand what you're looking for
- Defenders prevent escalation with least privilege, patching, and monitoring
- SELinux/AppArmor provide additional access control

## Key Terms

- **Privilege Escalation** — Gaining higher access than authorized
- **Vertical Escalation** — Moving from regular user to admin/root
- **Horizontal Escalation** — Accessing another user's account at same level
- **SUID** — Set User ID (program runs as file owner, often root)
- **GTFOBins** — Database of Unix binaries that can be abused
- **LinPEAS** — Linux Privilege Escalation enumeration script
- **Least Privilege** — Principle of giving only needed access

## Knowledge Check

1. What command lists sudo permissions for the current user?
2. How do you find SUID binaries on Linux?
3. What is PATH hijacking?
4. How does the principle of least privilege prevent escalation?
5. Name two Windows privilege escalation techniques

## Practical Challenge

🔴 Advanced

On Metasploitable:
1. Get a low-privilege shell
2. Enumerate the system for escalation paths
3. Document at least 3 potential escalation methods
4. Successfully escalate to root
5. Write a remediation report for each issue

## Common Mistakes

- Not running enumeration before attempting escalation
- Missing obvious misconfigurations
- Not checking GTFOBins for sudo-abusable binaries
- Forgetting to check cron jobs
- Not understanding how the escalation actually works

## Defensive Takeaway

Privilege escalation is the bridge between initial access and full compromise. Every escalation path is a misconfiguration that defenders must fix. Regular audits of sudo permissions, SUID binaries, file permissions, and service configurations are essential defensive activities.

## Next Chapter

Level 12 covers wireless security — Wi-Fi architecture and security.
