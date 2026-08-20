# Appendix C — END-OF-BOOK PROJECTS

*Designed by Mukamyi Izere Arcange*

---

## Project 1 — Build a Security Laboratory 🟢

Objective: Create a complete isolated cybersecurity lab

Requirements: VirtualBox, Kali Linux, Metasploitable, DVWA

Tasks:
1. Install VirtualBox and create a Host-Only network
2. Install Kali Linux VM (4GB RAM, 2 CPUs)
3. Install Metasploitable VM
4. Install DVWA (or use the one on Metasploitable)
5. Install OWASP Juice Shop via Docker
6. Take snapshots of all VMs
7. Verify all machines can communicate
8. Document the network topology

Deliverables: Lab diagram, screenshot showing connectivity, IP address table

Evaluation: All VMs running, communicating, and isolated from internet

---

## Project 2 — Network Mapping 🟢

Objective: Map and document your isolated VirtualBox network

Tasks:
1. Use Nmap to discover all live hosts
2. Perform full port scan on each host
3. Identify services and versions
4. Map the network topology
5. Create a network diagram
6. Document all open ports per host

Deliverables: Nmap scan results, network diagram, service inventory table

Evaluation: Complete and accurate network map with all hosts and services

---

## Project 3 — Web Security Assessment 🟡

Objective: Assess OWASP Juice Shop in your local lab

Tasks:
1. Browse the application and understand its purpose
2. Use browser DevTools to inspect requests
3. Try SQL injection on the login page
4. Try XSS in the search field
5. Find hidden directories
6. Attempt to access the admin panel
7. Document all findings with screenshots

Deliverables: Web assessment report with findings, evidence, and remediation

Evaluation: At least 5 vulnerabilities identified with evidence and recommendations

---

## Project 4 — Vulnerability Assessment 🟡

Objective: Perform a controlled assessment of Metasploitable

Tasks:
1. Run Nmap comprehensive scan
2. Research software versions for CVEs
3. Use Nmap NSE vulnerability scripts
4. Document all findings by severity
5. Write a remediation plan for each finding

Deliverables: Vulnerability assessment report with severity ratings

Evaluation: All major vulnerabilities identified with accurate severity ratings

---

## Project 5 — Security Automation Tool 🟡

Objective: Create a Python security-analysis tool

Tasks:
1. Build a tool that:
   - Scans a target for open ports
   - Identifies service versions
   - Checks for common misconfigurations
   - Generates an HTML report
2. Run it against your lab target
3. Document the tool's capabilities

Deliverables: Python script, sample report, usage documentation

Evaluation: Tool works correctly, produces useful output, well-documented

---

## Project 6 — Blue Team Log Analysis 🔴

Objective: Analyze security logs and identify suspicious activity

Tasks:
1. Generate log data (failed logins, scans, etc.) on your lab
2. Write a Python script that:
   - Parses authentication logs
   - Identifies failed login patterns
   - Detects brute-force attempts
   - Flags unusual activity
   - Generates a summary report
3. Analyze the results

Deliverables: Analysis script, log analysis report, findings summary

Evaluation: Script correctly identifies suspicious patterns in logs

---

## Project 7 — Complete Penetration Test Simulation 🔴

Objective: Perform a complete authorized penetration-test simulation

Target: Metasploitable VM in your isolated lab

Tasks:
1. Write a scope document and rules of engagement
2. Perform reconnaissance and enumeration
3. Identify vulnerabilities
4. Exploit at least 3 different vulnerabilities
5. Escalate privileges to root
6. Document post-exploitation findings
7. Write a full penetration test report including:
   - Executive summary
   - Scope and methodology
   - Findings with evidence
   - Risk ratings
   - Remediation recommendations
8. Revert VM snapshot (cleanup)

Deliverables: Full penetration test report with evidence

Evaluation: Successful exploitation, proper documentation, clear remediation

---

## Report Template

```
PENETRATION TEST REPORT

Client: [Fictional Company Name]
Date: [Date]
Tester: [Your Name]

1. EXECUTIVE SUMMARY
   [Non-technical overview of findings and risk]

2. SCOPE
   Target: [IP/URL]
   Time period: [Dates]
   Authorization: [Reference to authorization document]

3. METHODOLOGY
   [Tools and techniques used]

4. FINDINGS

   Finding 1: [Title]
   Severity: [Critical/High/Medium/Low]
   Description: [What the vulnerability is]
   Evidence: [Screenshot/output]
   Impact: [What an attacker could do]
   Remediation: [How to fix it]

   [Repeat for each finding]

5. RISK SUMMARY
   Critical: [count]
   High: [count]
   Medium: [count]
   Low: [count]

6. RECOMMENDATIONS
   [Prioritized list of fixes]

7. APPENDICES
   [Raw scan data, tool configurations]
```
