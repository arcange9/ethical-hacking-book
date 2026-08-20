# Level 3 — PYTHON FOR CYBERSECURITY

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- Python fundamentals needed for security work
- Writing security automation scripts
- Working with networks, files, and HTTP in Python
- Building practical security tools

---

## Chapter 14 — Python Fundamentals

Python is the most popular programming language in cybersecurity. It's easy to learn, has powerful libraries for networking and security, and runs on every platform.

### Why Python for Cybersecurity

```
┌────────────────────────────────────────────────┐
│       WHY PYTHON FOR SECURITY                   │
├────────────────────────────────────────────────┤
│ Easy to learn and read                          │
│ Massive library ecosystem                        │
│ Great for network programming (sockets)          │
│ Excellent for automation and scripting           │
│ Cross-platform (runs anywhere)                  │
│ Used by tools like Scapy, Impacket, Nmap         │
│ Most security tools have Python APIs             │
└────────────────────────────────────────────────┘
```

### Variables and Data Types

```python
# Variables — no need to declare types
name = "Kali Linux"           # String
version = 2026.1              # Float
tools = 600                   # Integer
is_hacker = True              # Boolean

# Strings
tool = "nmap"
print(f"Using {tool} for scanning")

# Lists (ordered, mutable)
ports = [22, 80, 443, 8080]
ports.append(3306)            # Add item
print(ports[0])              # First item (22)
print(len(ports))            # Length (5)

# Tuples (ordered, immutable)
credentials = ("admin", "password123")
username = credentials[0]    # "admin"

# Dictionaries (key-value pairs)
host_info = {
    "ip": "192.168.1.10",
    "os": "Linux",
    "ports": [22, 80, 443]
}
print(host_info["ip"])       # "192.168.1.10"
print(host_info.get("os"))   # "Linux"

# Sets (unordered, unique)
unique_ips = {"10.0.0.1", "10.0.0.2", "10.0.0.1"}
print(unique_ips)  # Only one "10.0.0.1"
```

### Conditions and Loops

```python
# If/elif/else
port = 443

if port == 80:
    print("HTTP")
elif port == 443:
    print("HTTPS")
elif port == 22:
    print("SSH")
else:
    print(f"Unknown port: {port}")

# For loop
for port in [22, 80, 443]:
    print(f"Checking port {port}...")

# While loop
attempts = 0
while attempts < 3:
    print(f"Attempt {attempts + 1}")
    attempts += 1

# Iterate dictionary
for key, value in host_info.items():
    print(f"{key}: {value}")
```

### Functions

```python
# Define a function
def check_port(host, port):
    """Check if a port is open on a host."""
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(2)
    result = sock.connect_ex((host, port))
    sock.close()
    return result == 0  # True if open

# Use the function
if check_port("192.168.56.10", 80):
    print("Port 80 is OPEN")
else:
    print("Port 80 is CLOSED")
```

### Exception Handling

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

try:
    file = open("nonexistent.txt", "r")
except FileNotFoundError:
    print("File not found!")
except PermissionError:
    print("Permission denied!")
finally:
    print("This always runs")
```

### File I/O

```python
# Read a file
with open("/etc/passwd", "r") as f:
    content = f.read()
    print(content)

# Read line by line
with open("/var/log/auth.log", "r") as f:
    for line in f:
        if "Failed" in line:
            print(line.strip())

# Write to file
with open("scan_results.txt", "w") as f:
    f.write("Scan completed\n")
    f.write("Host: 192.168.56.10\n")

# Append to file
with open("scan_results.txt", "a") as f:
    f.write("Port 80: OPEN\n")
```

### Regular Expressions

```python
import re

# Find IP addresses in text
text = "Connecting to 192.168.1.1 and 10.0.0.5"
ip_pattern = r'\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b'
ips = re.findall(ip_pattern, text)
print(ips)  # ['192.168.1.1', '10.0.0.5']

# Validate email format
email = "user@example.com"
if re.match(r'^[\w.]+@[\w]+\.[\w]+$', email):
    print("Valid email format")

# Extract ports from log
log = "Connection on port 22 from port 80 response on port 443"
ports = re.findall(r'port (\d+)', log)
print(ports)  # ['22', '80', '443']
```

---

## Chapter 15 — Python for Security Automation

Now let's build practical security tools using Python.

### HTTP Requests

```python
import requests

# GET request
response = requests.get("http://192.168.56.10")
print(f"Status: {response.status_code}")
print(f"Headers: {dict(response.headers)}")
print(f"Body length: {len(response.text)}")

# Check security headers
security_headers = [
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Strict-Transport-Security",
    "Content-Security-Policy",
    "X-XSS-Protection"
]

for header in security_headers:
    if header in response.headers:
        print(f"[+] {header}: {response.headers[header]}")
    else:
        print(f"[-] {header}: MISSING")
```

### Working with JSON

```python
import json

# Parse JSON response
response = requests.get("http://192.168.56.10/api/users")
data = response.json()
print(json.dumps(data, indent=2))

# Write JSON to file
results = {
    "scan_date": "2026-08-20",
    "target": "192.168.56.10",
    "open_ports": [22, 80, 443],
    "os": "Linux"
}
with open("scan_results.json", "w") as f:
    json.dump(results, f, indent=2)
```

### Sockets for Network Programming

```python
import socket

# Port scanner for lab use
def scan_port(host, port):
    """Check if a port is open."""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((host, port))
        sock.close()
        return result == 0
    except:
        return False

def scan_host(host, ports):
    """Scan multiple ports on a host."""
    print(f"Scanning {host}...")
    open_ports = []
    for port in ports:
        if scan_port(host, port):
            open_ports.append(port)
            print(f"  [+] Port {port}: OPEN")
    return open_ports

# Scan common ports on a lab target
target = "192.168.56.20"  # Your lab target
common_ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 445, 3306, 3389, 8080]
open_ports = scan_host(target, common_ports)

print(f"\nOpen ports: {open_ports}")
```

### Project: Log Analyzer

```python
#!/usr/bin/env python3
"""
Log Analyzer - Detect suspicious login attempts
Analyzes auth logs for brute-force patterns
"""

import re
from collections import Counter
from datetime import datetime

def analyze_auth_log(logfile):
    """Analyze authentication log for suspicious activity."""
    failed_ips = []
    failed_users = []
    total_failed = 0

    with open(logfile, 'r') as f:
        for line in f:
            if "Failed password" in line:
                total_failed += 1
                # Extract IP address
                ip_match = re.search(r'from (\d+\.\d+\.\d+\.\d+)', line)
                if ip_match:
                    failed_ips.append(ip_match.group(1))
                # Extract username
                user_match = re.search(r'for (?:invalid user )?(\S+)', line)
                if user_match:
                    failed_users.append(user_match.group(1))

    print("=== AUTH LOG ANALYSIS ===")
    print(f"Total failed logins: {total_failed}")
    print(f"\nTop 5 source IPs:")
    for ip, count in Counter(failed_ips).most_common(5):
        print(f"  {ip}: {count} attempts")
    print(f"\nTop 5 targeted users:")
    for user, count in Counter(failed_users).most_common(5):
        print(f"  {user}: {count} attempts")

    # Flag potential brute-force
    for ip, count in Counter(failed_ips).items():
        if count > 10:
            print(f"\n[!] POTENTIAL BRUTE FORCE from {ip} ({count} attempts)")

# Run analysis
analyze_auth_log("/var/log/auth.log")
```

### Project: Password Strength Checker

```python
#!/usr/bin/env python3
"""
Password Strength Checker
Evaluates password security based on common criteria
"""

import re
import string

def check_password_strength(password):
    """Check password strength and return a score."""
    score = 0
    issues = []

    # Length check
    if len(password) >= 12:
        score += 2
    elif len(password) >= 8:
        score += 1
    else:
        issues.append("Too short (minimum 8 characters)")

    # Character variety
    if re.search(r'[a-z]', password):
        score += 1
    else:
        issues.append("No lowercase letters")

    if re.search(r'[A-Z]', password):
        score += 1
    else:
        issues.append("No uppercase letters")

    if re.search(r'\d', password):
        score += 1
    else:
        issues.append("No numbers")

    if re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        score += 1
    else:
        issues.append("No special characters")

    # Common password check
    common = ["password", "123456", "admin", "qwerty", "letmein"]
    if password.lower() in common:
        score = 0
        issues.append("This is a commonly used password!")

    # Strength rating
    if score >= 5:
        rating = "STRONG"
    elif score >= 3:
        rating = "MODERATE"
    else:
        rating = "WEAK"

    return score, rating, issues

# Test
passwords = ["password", "admin123", "MyStr0ng!Pass2026"]
for pwd in passwords:
    score, rating, issues = check_password_strength(pwd)
    print(f"\nPassword: {'*' * len(pwd)}")
    print(f"Score: {score}/6 - {rating}")
    if issues:
        print("Issues:")
        for issue in issues:
            print(f"  - {issue}")
```

### Project: File Integrity Checker

```python
#!/usr/bin/env python3
"""
File Integrity Checker
Monitors files for unauthorized changes using SHA-256 hashes
"""

import hashlib
import json
import os
from datetime import datetime

def calculate_hash(filepath):
    """Calculate SHA-256 hash of a file."""
    sha256 = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            sha256.update(chunk)
    return sha256.hexdigest()

def create_baseline(directory, output_file="hashes_baseline.json"):
    """Create a baseline of file hashes."""
    baseline = {}
    for root, dirs, files in os.walk(directory):
        for filename in files:
            filepath = os.path.join(root, filename)
            try:
                baseline[filepath] = calculate_hash(filepath)
            except Exception as e:
                print(f"Error: {filepath}: {e}")

    with open(output_file, 'w') as f:
        json.dump(baseline, f, indent=2)
    print(f"Baseline created: {len(baseline)} files")

def check_integrity(baseline_file="hashes_baseline.json"):
    """Check files against baseline."""
    with open(baseline_file, 'r') as f:
        baseline = json.load(f)

    print("=== Integrity Check ===")
    modified = 0
    new_files = 0
    missing = 0

    # Check existing files
    for filepath, original_hash in baseline.items():
        if os.path.exists(filepath):
            current_hash = calculate_hash(filepath)
            if current_hash != original_hash:
                print(f"[!] MODIFIED: {filepath}")
                modified += 1
        else:
            print(f"[!] MISSING: {filepath}")
            missing += 1

    print(f"\nSummary: {modified} modified, {missing} missing")

# Usage
# create_baseline("/etc")  # Create baseline
# check_integrity()         # Check for changes
```

---

## LAB 3 — Port Scanner Tool 🟡

Objective: Build a Python port scanner for your lab
Difficulty: Intermediate
Environment: Kali Linux VM + lab target (Metasploitable)
Safety: Only scan your isolated lab machines

Prerequisites: Python 3 installed, lab target running

Step 1: Create the scanner
```python
#!/usr/bin/env python3
"""Lab Port Scanner - For educational use on authorized targets only"""

import socket
import sys
from datetime import datetime

def scan(target, port_range):
    """Scan target for open ports."""
    print(f"Scanning {target}")
    print(f"Time started: {datetime.now()}")
    print("-" * 40)

    try:
        for port in range(port_range[0], port_range[1] + 1):
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(0.5)
            result = sock.connect_ex((target, port))
            if result == 0:
                try:
                    service = socket.getservbyport(port)
                except:
                    service = "unknown"
                print(f"Port {port}: OPEN ({service})")
            sock.close()
    except KeyboardInterrupt:
        print("\nScan interrupted")
    except socket.gaierror:
        print("Hostname could not be resolved")
    except socket.error:
        print("Could not connect")

    print("-" * 40)
    print(f"Scan completed: {datetime.now()}")

# Only use on your lab targets
if __name__ == "__main__":
    target = "192.168.56.20"  # YOUR LAB TARGET
    scan(target, (1, 1024))
```

Step 2: Run it
```bash
python3 port_scanner.py
```

Step 3: Observe the output — you should see which ports are open on your lab target

Expected Result: List of open ports with service names on your lab machine

Understanding Check:
1. What does `connect_ex` return when a port is open?
2. Why do we set a timeout?
3. How would you modify this to scan specific ports?

Defensive Lesson: This is exactly how attackers discover services. Defenders use similar scanning to audit their own networks and close unnecessary ports.

Cleanup: Delete the script when done: `rm port_scanner.py`

---

## Chapter Summary

- Python is the go-to language for cybersecurity automation
- Core concepts: variables, lists, dicts, conditions, loops, functions
- File I/O and exception handling are essential for log analysis
- Regular expressions extract patterns from text (IPs, ports, users)
- Sockets enable network programming (port scanners, tools)
- HTTP requests let you interact with web applications programmatically
- Practical tools: log analyzer, password checker, file integrity monitor

## Key Terms

- **Variable** — Named storage for data
- **List** — Ordered, mutable collection
- **Dictionary** — Key-value pair collection
- **Function** — Reusable block of code
- **Exception** — Error that can be caught and handled
- **Socket** — Programming interface for network communication
- **Regex** — Regular expression for pattern matching
- **Hash** — Fixed-size fingerprint of data (SHA-256)

## Knowledge Check

1. What's the difference between a list and a dictionary?
2. How do you handle a file that doesn't exist?
3. Write a function that checks if port 80 is open
4. What regex would extract all email addresses from text?
5. How does the file integrity checker detect changes?

## Practical Challenge

🟡 Intermediate

Build a Python script that:
1. Takes a URL as input
2. Fetches it with requests
3. Checks for security headers
4. Reports which ones are present/missing
5. Saves results to JSON

## Common Mistakes

- Not handling exceptions (program crashes on errors)
- Not setting socket timeouts (program hangs)
- Hardcoding targets instead of using arguments
- Not closing sockets (resource leak)

## Defensive Takeaway

Python automation is powerful for both attack and defense. Defenders use Python for log analysis, integrity monitoring, and security auditing. Attackers use it for scanning and exploitation. Mastering Python gives you tools for both sides.

## Next Chapter

Level 4 covers cybersecurity fundamentals — the CIA Triad, cryptography, and security principles.
