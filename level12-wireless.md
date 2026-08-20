# Level 12 — WIRELESS SECURITY

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- Wi-Fi architecture and security protocols
- WPA2 and WPA3 security
- Wireless threats and defenses
- How to secure a wireless network

---

## Chapter 27 — Wi-Fi Security Fundamentals

### Wi-Fi Architecture

```
┌──────────────────────────────────────────────────┐
│            WI-FI ARCHITECTURE                      │
├──────────────────────────────────────────────────┤
│                                                    │
│    ┌──────────┐                                    │
│    │ Clients  │  (laptop, phone, IoT devices)      │
│    └────┬─────┘                                    │
│         │ WiFi signal                               │
│    ┌────┴─────┐                                    │
│    │Access Pts│  (router, AP)                       │
│    └────┬─────┘                                    │
│         │ Cable                                    │
│    ┌────┴─────┐                                    │
│    │ Switch/  │  → Internet                         │
│    │ Router   │                                    │
│    └──────────┘                                    │
│                                                    │
│  SSID: Network name (e.g., "MyWiFi")               │
│  BSSID: AP's MAC address                            │
│  Channel: Frequency used (1-11 for 2.4GHz)         │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Wi-Fi Security Protocols

```
┌──────────────────────────────────────────────────┐
│          WI-FI SECURITY EVOLUTION                  │
├──────────────────────────────────────────────────┤
│                                                    │
│  WEP (1997):  ❌ Broken — never use                 │
│  → Cracked in minutes                              │
│  → Weak encryption (RC4)                            │
│                                                    │
│  WPA (2003):  ⚠️ Insecure — avoid                   │
│  → TKIP encryption (also broken)                    │
│  → Temporal Key Integrity Protocol                 │
│                                                    │
│  WPA2 (2004): ✅ Most common today                  │
│  → AES-CCMP encryption (strong)                     │
│  → Vulnerable to KRACK attack (patched)             │
│  → Vulnerable to offline cracking if weak PSK      │
│                                                    │
│  WPA3 (2018): ✅ Current best                        │
│  → SAE (Simultaneous Authentication of Equals)     │
│  → Protection against offline dictionary attacks    │
│  → Forward secrecy                                  │
│  → Individual data encryption                       │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Wireless Threats

```
┌──────────────────────────────────────────────────┐
│           WIRELESS THREATS                         │
├──────────────────────────────────────────────────┤
│                                                    │
│  Rogue AP:   Unauthorized access point              │
│              placed inside the network              │
│                                                    │
│  Evil Twin:  Fake AP that mimics legitimate one    │
│              to steal credentials                   │
│                                                    │
│  Deauth:     Forcing clients off legitimate AP     │
│              to capture handshakes                  │
│                                                    │
│  Wardriving: Driving around scanning for WiFi       │
│              networks to map them                    │
│                                                    │
│  MAC spoofing: Cloning an authorized MAC address  │
│                to bypass MAC filtering              │
│                                                    │
│  WiFi Pineapple: Tool that creates fake APs        │
│                   to intercept traffic              │
│                                                    │
└──────────────────────────────────────────────────┘
```

### Securing Wireless Networks

```
┌──────────────────────────────────────────────────┐
│          WIRELESS SECURITY BEST PRACTICES         │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. Use WPA3 (or WPA2 if WPA3 unavailable)       │
│                                                    │
│  2. Strong passphrase (16+ characters)            │
│     → Avoid dictionary words                       │
│     → Use a random passphrase                       │
│                                                    │
│  3. Disable WPS (Wi-Fi Protected Setup)            │
│     → WPS is vulnerable to brute force             │
│                                                    │
│  4. Change default admin credentials                │
│                                                    │
│  5. Disable remote management                       │
│                                                    │
│  6. Use a guest network for visitors                │
│                                                    │
│  7. Keep firmware updated                          │
│                                                    │
│  8. Disable SSID broadcasting (minor security gain)│
│                                                    │
│  9. Enable client isolation on guest networks      │
│                                                    │
│ 10. Monitor for rogue APs                          │
│                                                    │
└──────────────────────────────────────────────────┘
```

⚠️ ETHICS: Any wireless security testing must use a personally owned test access point or have explicit authorization. Never attack wireless networks you don't own.

---

## Chapter Summary

- Wi-Fi uses access points to connect clients to a network
- WEP and WPA are broken; WPA2 is common; WPA3 is best
- Wireless threats include rogue APs, evil twins, and deauth attacks
- Secure your WiFi with WPA3, strong passphrases, and disabled WPS
- All wireless testing must use your own lab equipment

## Key Terms

- **SSID** — Network name
- **WPA2/WPA3** — Wi-Fi security protocols
- **Rogue AP** — Unauthorized access point
- **Evil Twin** — Fake AP mimicking a real one
- **Deauth** — Disconnecting clients from an AP

## Knowledge Check

1. Which Wi-Fi security protocol should you use?
2. What is an evil twin attack?
3. Why should WPS be disabled?
4. What makes WPA3 better than WPA2?

## Defensive Takeaway

Wireless networks extend your network beyond physical walls. Securing them requires strong encryption, strong passphrases, disabled unnecessary features, and monitoring for rogue devices.
