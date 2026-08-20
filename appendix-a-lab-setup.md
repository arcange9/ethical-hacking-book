# Appendix A — LAB SETUP GUIDE (Kali + VirtualBox)

*Designed by Mukamyi Izere Arcange*

---

## Step 1: Install VirtualBox

1. Download VirtualBox from https://www.virtualbox.org/
2. Install with default settings
3. Restart your computer

## Step 2: Download Kali Linux

1. Go to https://www.kali.org/get-kali/
2. Download "Kali Linux VirtualBox" image (pre-built VM)
3. OR download the "Installer Image" (ISO) if you want to install manually

## Step 3: Set Up Kali VM (Pre-built Image)

1. Open VirtualBox
2. File → Import Appliance
3. Select the downloaded Kali .ova file
4. Click Continue, then Import
5. Select the imported Kali VM
6. Settings → System → allocate at least 4GB RAM
7. Settings → Processors → at least 2 CPUs
8. Settings → Network → set to "NAT" (for updates) initially

Default credentials: kali / kali

## Step 4: Update Kali

```bash
sudo apt update
sudo apt full-upgrade -y
sudo apt autoremove -y
```

## Step 5: Create Isolated Lab Network

1. VirtualBox → File → Host Network Manager → Create
2. Create "vboxnet0" (Host-Only network) with:
   - IPv4 Address: 192.168.56.1
   - Network Mask: 255.255.255.0
   - DHCP Server: Enabled
3. Set Kali VM network to "Host-Only Adapter" → vboxnet0
4. Set target VMs (Metasploitable, DVWA) to same network

## Step 6: Download and Install Lab Targets

### Metasploitable 2

1. Download from: https://sourceforge.net/projects/metasploitable/
2. Extract the zip file
3. VirtualBox → New → Use existing virtual disk
4. Select the .vmdk file
5. Set network to Host-Only (vboxnet0)
6. Default credentials: msfadmin / msfadmin

### DVWA (Damn Vulnerable Web Application)

Option 1: Install on Kali
```bash
sudo apt install dvwa
sudo service apache2 start
sudo service mysql start
# Access: http://localhost/dvwa/
```

Option 2: Use Metasploitable (DVWA is pre-installed)
```bash
# Access: http://192.168.56.20/dvwa/
# Login: admin / password
```

### OWASP Juice Shop

```bash
# Install via Docker on Kali
sudo apt install docker.io
sudo docker run -d -p 3000:3000 bkimminich/juice-shop
# Access: http://localhost:3000
```

## Step 7: Take Snapshots

⚠️ IMPORTANT: Take a snapshot of each VM BEFORE making changes!

1. VirtualBox → select VM → Snapshots → Take Snapshot
2. Name: "Clean Install"
3. This lets you revert if something goes wrong

## Lab Network Diagram

```
┌─────────────────────────────────────────────────────┐
│              ISOLATED VIRTUALBOX LAB                  │
│                                                       │
│   ┌─────────┐                                         │
│   │  Kali   │──┐                                      │
│   │ (Attacker│  │                                      │
│   └─────────┘  │                                      │
│                │  VirtualBox Host-Only Network        │
│                │  (vboxnet0 / 192.168.56.0/24)       │
│   ┌─────────┐  │                                      │
│   │Metasploit│  │                                      │
│   │  (Target) │──┤                                      │
│   └─────────┘  │                                      │
│                │     ┌─────────────┐                   │
│                ├─────│  DVWA       │                   │
│                │     │ (Web Target)│                   │
│                │     └─────────────┘                   │
│   ┌─────────┐  │                                      │
│   │  Juice  │──┘                                      │
│   │  Shop   │                                         │
│   └─────────┘                                         │
│                                                       │
│   NO INTERNET ACCESS (fully isolated)                 │
└─────────────────────────────────────────────────────┘
```
