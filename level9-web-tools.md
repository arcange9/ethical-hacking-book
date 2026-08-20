# Level 9 — WEB SECURITY TOOLS

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- Burp Suite Community Edition interface and features
- OWASP ZAP for web application testing
- Browser Developer Tools for security analysis
- curl and wget for web testing
- Practical exercises on lab web applications

---

## Chapter 24 — Burp Suite, ZAP & Browser DevTools

### Burp Suite Community Edition

Burp Suite is the most widely used web application testing tool. The Community Edition is free and included in Kali Linux.

```
┌──────────────────────────────────────────────────┐
│           BURP SUITE MAIN COMPONENTS              │
├──────────────────────────────────────────────────┤
│                                                    │
│  Proxy:        Intercepts and inspects traffic    │
│                between browser and web server    │
│                                                    │
│  Repeater:     Modify and resend requests         │
│                Test inputs manually                │
│                                                    │
│  Intruder:     Automated attacks                   │
│                Brute force, fuzzing (Pro only)    │
│                                                    │
│  Decoder:      Encode/decode base64, URL, hex     │
│                                                    │
│  Comparer:     Compare two responses              │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Setting Up Burp Suite (Lab)

```bash
# Launch Burp Suite
burpsuite

# Or from terminal:
java -jar /usr/bin/burpsuite &
```

Setup steps:
1. Open Burp Suite → Temporary project → Use Burp defaults
2. Go to Proxy → Options
3. Verify proxy is running on 127.0.0.1:8080
4. Configure your browser to use the proxy:
   - Firefox: Preferences → Network Settings → Manual Proxy
   - Set HTTP Proxy: 127.0.0.1, Port: 8080
5. Install Burp's CA certificate in Firefox:
   - Navigate to http://burp/cert
   - Save and import as certificate authority
6. Enable Proxy → Intercept → "Intercept is on"

### Using Burp Proxy

```
┌──────────────────────────────────────────────────┐
│             BURP PROXY WORKFLOW                    │
├──────────────────────────────────────────────────┤
│                                                    │
│  Browser ──→ Burp Proxy ──→ Web Server           │
│             │                  │                    │
│             │ ←── Response ←─── │                    │
│             │                                      │
│             ↓                                      │
│         You can:                                    │
│         → View the request                          │
│         → Modify it                                 │
│         → Forward it                                │
│         → Drop it                                   │
│         → Send to Repeater                          │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Using Burp Repeater

Repeater lets you modify and resend individual requests — essential for testing vulnerabilities.

```
1. Intercept a request in Proxy
2. Right-click → Send to Repeater
3. Go to Repeater tab
4. Modify the request (change parameters, add payloads)
5. Click Send
6. Analyze the response
7. Repeat with different payloads
```

### OWASP ZAP

ZAP (ZED Attack Proxy) is a free, open-source alternative to Burp Suite.

```bash
# Launch ZAP
zaproxy

# Quick scan a target:
zap-cli quick-scan http://192.168.56.20

# Active scan:
zap-cli active-scan http://192.168.56.20

# Spider (crawl the site):
zap-cli spider http://192.168.56.20
```

### Browser Developer Tools

Browser DevTools (F12 or Ctrl+Shift+I) are essential for web security testing.

```
Key tabs:
┌──────────────────────────────────────────────────┐
│             BROWSER DEVTOOLS                      │
├──────────────────────────────────────────────────┤
│                                                    │
│  Elements:   View and modify HTML/CSS              │
│              See the DOM structure                  │
│                                                    │
│  Console:   Run JavaScript                         │
│              See error messages                     │
│                                                    │
│  Network:   See all HTTP requests/responses        │
│              Inspect headers, cookies, payloads    │
│                                                    │
│  Application: View cookies, local storage,         │
│              session storage, databases             │
│                                                    │
│  Security:  View certificate info                   │
│                                                    │
└──────────────────────────────────────────────────┘
```

### curl for Web Testing

```bash
# Basic GET request
curl http://192.168.56.20

# Get headers only
curl -I http://192.168.56.20

# POST with data
curl -X POST http://192.168.56.20/login \
  -d "username=admin&password=secret"

# Send JSON data
curl -X POST http://192.168.56.20/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"test","email":"test@test.com"}'

# Include cookies
curl -b "PHPSESSID=abc123" http://192.168.56.20/dashboard

# Save cookies from login
curl -c cookies.txt -X POST http://192.168.56.20/login \
  -d "username=admin&password=password"

# Use saved cookies
curl -b cookies.txt http://192.168.56.20/dashboard

# Follow redirects
curl -L http://192.168.56.20

# Set custom headers
curl -H "X-Forwarded-For: 127.0.0.1" http://192.168.56.20

# Verbose output (shows full request/response)
curl -v http://192.168.56.20
```

### wget for Web Testing

```bash
# Download a page
wget http://192.168.56.20

# Mirror a website
wget -m http://192.168.56.20

# Download with recursive (up to depth 2)
wget -r -l 2 http://192.168.56.20

# Save with specific filename
wget -O response.html http://192.168.56.20

# Send POST data
wget --post-data "username=admin&password=secret" \
  http://192.168.56.20/login
```

---

## LAB 7 — Web Testing with Burp Suite 🟡

Objective: Use Burp Suite to test DVWA
Difficulty: Intermediate
Environment: Kali + DVWA
Safety: Lab only, authorized

Step 1: Configure Burp
```bash
burpsuite
# Set up proxy on 127.0.0.1:8080
# Configure Firefox proxy
# Install Burp CA certificate
```

Step 2: Intercept a login request
- Navigate to DVWA login page through proxy
- Intercept the POST request
- Observe: username, password, CSRF token in the request

Step 3: Send to Repeater
- Right-click the intercepted request
- Send to Repeater
- Modify the username to: `admin' OR '1'='1`
- Send and observe the response

Step 4: Test with different payloads
- Try: `admin' --`
- Try: `' UNION SELECT user, password FROM users --`
- Observe how the response changes

Step 5: Use Decoder
- Find a base64-encoded value in a response
- Copy it to Decoder
- Decode it to see the plaintext

Expected Result: You can intercept, modify, and analyze web requests using Burp Suite.

Understanding Check:
1. What is the difference between Proxy and Repeater?
2. Why do you need to install Burp's CA certificate?
3. How would you test SQL injection with Repeater?

Defensive Lesson: Burp Suite shows exactly what the server receives. Developers should test their own applications with these tools to find vulnerabilities before attackers do.

Cleanup: Disable Firefox proxy settings when done.

---

## Chapter Summary

- Burp Suite intercepts and analyzes web traffic between browser and server
- Proxy captures requests; Repeater modifies and resends them
- OWASP ZAP is a free alternative with similar features
- Browser DevTools (F12) reveal HTML, JavaScript, network traffic, and cookies
- curl sends HTTP requests from the command line
- wget downloads and mirrors web content
- These tools are used to test web applications for vulnerabilities safely

## Key Terms

- **Proxy** — Intermediary that intercepts and inspects traffic
- **Repeater** — Burp feature to modify and resend requests
- **Intruder** — Burp feature for automated attacks
- **CSRF Token** — Anti-CSRF protection value
- **Base64** — Encoding scheme (not encryption)
- **DevTools** — Browser developer tools (F12)

## Knowledge Check

1. What does Burp Suite Proxy do?
2. How do you send a request from Proxy to Repeater?
3. What curl flag sends a POST request?
4. What browser shortcut opens Developer Tools?
5. Why is OWASP ZAP useful as an alternative to Burp?

## Practical Challenge

🟡 Intermediate

Using Burp Suite on DVWA:
1. Intercept the SQL Injection page request
2. Send it to Repeater
3. Test 5 different SQL injection payloads
4. Document which ones work and why
5. Switch DVWA to Medium security and try to bypass the filters

## Common Mistakes

- Forgetting to install Burp's CA certificate (HTTPS won't work)
- Not disabling proxy when finished browsing
- Not understanding intercepted requests before forwarding
- Relying only on automated tools without manual verification
- Testing on production instead of lab

## Defensive Takeaway

Web security tools show exactly what an attacker sees. Developers should use these tools to test their own applications. If you can find a vulnerability with Burp, an attacker can too — fix it before they find it.

## Next Chapter

Level 10 covers exploitation concepts — understanding how vulnerabilities become exploits.
