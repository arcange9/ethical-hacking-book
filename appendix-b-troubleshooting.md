# Appendix B — TROUBLESHOOTING GUIDE

*Designed by Mukamyi Izere Arcange*

---

## Kali Cannot Connect to Internet

```
Problem: No internet on Kali VM
Solution 1: Check network adapter
  → VirtualBox → VM Settings → Network
  → Set to "NAT" for internet access
  → Set to "Host-Only" for isolated lab (no internet)

Solution 2: Restart network service
  sudo systemctl restart networking
  sudo systemctl restart NetworkManager

Solution 3: Check IP
  ip addr
  → If no IP: sudo dhclient eth0
```

## VirtualBox Network Problems

```
Problem: VMs cannot communicate
Solution:
  1. All VMs must use the same Host-Only adapter (vboxnet0)
  2. Check VM IPs are in the same range:
     ip addr  →  Should show 192.168.56.x
  3. Test connectivity:
     ping 192.168.56.20  (from Kali to target)
  4. Check VirtualBox Host Network Manager
     → vboxnet0 should exist and be enabled
  5. Disable DHCP on host-only if using static IPs
```

## VM Has No IP Address

```
Solution 1: Request DHCP lease
  sudo dhclient eth0

Solution 2: Set static IP
  sudo ip addr add 192.168.56.10/24 dev eth0
  sudo ip link set eth0 up

Solution 3: Check interface name
  ip link  →  may be eth0, enp0s3, etc.
```

## Kali Tools Missing

```
Solution 1: Install via apt
  sudo apt update
  sudo apt install <tool-name>

Solution 2: Install all Kali tools
  sudo apt install kali-linux-everything

Solution 3: Reinstall specific tool
  sudo apt install --reinstall nmap
```

## Permission Errors

```
Problem: "Permission denied"
Solution 1: Use sudo
  sudo <command>

Solution 2: Check file permissions
  ls -la <file>
  → Owner has rwx? Group? Others?

Solution 3: Change permissions
  chmod 755 <file>  →  executable
  chown kali:kali <file>  →  change owner
```

## Package Update Errors

```
Problem: apt update fails
Solution 1: Check internet connection (NAT mode)
Solution 2: Clear apt cache
  sudo apt clean
  sudo apt update

Solution 3: Fix broken packages
  sudo apt --fix-broken install
  sudo dpkg --configure -a
```

## Python Errors

```
Problem: Module not found
Solution: Install with pip
  pip3 install <module>
  sudo apt install python3-<module>

Problem: Wrong Python version
  python3 --version  →  check version
  python3 script.py  →  always use python3

Problem: Virtual environment issues
  python3 -m venv myenv
  source myenv/bin/activate
  pip install <module>
```

## Burp Suite Configuration Problems

```
Problem: HTTPS not working through Burp
Solution: Install CA certificate
  1. Firefox → http://burp/cert
  2. Save cacert.der
  3. Firefox → Preferences → Privacy → Certificates → View
  4. Import → Trust for websites

Problem: Browser not routing through Burp
Solution: Check proxy settings
  Firefox → Network Settings → Manual Proxy
  → HTTP Proxy: 127.0.0.1
  → Port: 8080
  → Check "Use for all protocols"
```

## Lab Machines Cannot Communicate

```
Checklist:
  1. Both VMs on same Host-Only network (vboxnet0)
  2. Both VMs have IP in 192.168.56.x range
  3. No firewall blocking traffic:
     sudo iptables -F  (flush rules, lab only)
  4. Test with ping:
     ping <target-IP>
  5. Check if target service is running:
     On target: sudo netstat -tlnp
```

## VM Performance Problems

```
Solution 1: Allocate more resources
  → RAM: at least 4GB per VM
  → CPU: at least 2 cores
  → Disk: use SSD, not HDD
  → Video memory: at least 128MB

Solution 2: Enable hardware virtualization
  → BIOS/UEFI → VT-x / AMD-V → Enable

Solution 3: Disable unnecessary services
  sudo systemctl stop bluetooth
  sudo systemctl stop cups

Solution 4: Use lightweight alternatives
  → Use LXDE instead of GNOME
  → Use tshark instead of Wireshark GUI
```
