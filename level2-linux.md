# Level 2 — LINUX & COMMAND LINE

*Designed by Mukamyi Izere Arcange*

---

## What You Will Learn
- Linux history and why it's the hacker's OS of choice
- Navigating the Kali Linux terminal
- File and directory management
- Permissions and ownership
- Process and service management
- Package management with apt
- Bash scripting basics

---

## Chapter 9 — Linux & Kali Linux Overview

Linux is an open-source operating system kernel created by Linus Torvalds in 1991. Unlike Windows, Linux is free, customizable, and runs most of the world's servers and security tools.

### Why Hackers Use Linux

```
┌──────────────────────────────────────────────────┐
│          WHY LINUX FOR CYBERSECURITY              │
├──────────────────────────────────────────────────┤
│                                                    │
│  Open Source: You can see and modify the code      │
│                                                    │
│  Tool Availability: 99% of security tools run     │
│  on Linux; many are Linux-only                     │
│                                                    │
│  Command Line: Powerful scripting and automation   │
│                                                    │
│  Control: You can see and control every process    │
│                                                    │
│  Free: No licensing costs                         │
│                                                    │
│  Network Stack: Full access to raw sockets,        │
│  packet crafting, and low-level networking        │
│                                                    │
└──────────────────────────────────────────────────┘
```

### What Is Kali Linux?

Kali Linux is a Debian-based Linux distribution specifically designed for penetration testing and cybersecurity. It comes pre-installed with 600+ security tools.

```
Kali Linux includes:
├── Information gathering tools (Nmap, Recon-ng)
├── Vulnerability scanners (Nikto, Nessus)
├── Web testing tools (Burp Suite, SQLMap)
├── Exploitation tools (Metasploit Framework)
├── Password cracking (John, Hashcat)
├── Wireless tools (Aircrack-ng)
├── Forensics tools (Autopsy, Volatility)
├── Social engineering (SET)
└── Post-exploitation (Empire, Mimikatz concepts)
```

### Linux Distributions Family

```
                    Linux Kernel
                        │
            ┌───────────┼───────────┐
            │           │           │
         Debian      Red Hat      Arch
         /    \      /    \       │
      Ubuntu  Kali  Fedora CentOS  Manjaro
      Mint        RHEL   Rocky
```

Kali is based on Debian, which means it uses `apt` for package management and `.deb` packages.

---

## Chapter 10 — The Terminal & Filesystem

The terminal (also called console, shell, or command line) is how you interact with Linux using text commands instead of a graphical interface.

### The Shell

The shell is the program that interprets your commands. The most common is **Bash** (Bourne Again Shell).

```bash
kali@kali:~$
```

Breaking this down:
```
kali  →  username
@kali →  hostname
:~    →  current directory (~ means home directory)
$     →  prompt (regular user; # means root/superuser)
```

### The Linux Filesystem

```
/ (root — top of the tree, NOT the same as /root)
├── bin/        Essential user binaries (ls, cp, cat)
├── boot/       Boot loader files (kernel, GRUB)
├── dev/        Device files (everything is a file in Linux)
├── etc/        System configuration files
├── home/       User home directories
│   └── kali/   Your personal space
├── lib/        Shared libraries
├── opt/        Optional/add-on software
├── proc/       Process and kernel info (virtual filesystem)
├── root/       Root user's home directory
├── sbin/       System binaries (for root)
├── tmp/        Temporary files
├── usr/        User programs and data
│   ├── bin/    Most programs
│   └── share/  Shared resources
├── var/        Variable data (logs, databases)
│   └── log/    System logs
└── tmp/        Temporary files
```

### Essential Commands

```bash
# Navigation
pwd                     # Print working directory (where am I?)
ls                      # List files in current directory
ls -la                  # List ALL files (including hidden) with details
ls -lh                  # List with human-readable file sizes
cd /etc                 # Change to /etc directory
cd ~                    # Go home
cd ..                   # Go up one directory
cd -                    # Go back to previous directory

# File operations
mkdir mydir             # Create a directory
mkdir -p a/b/c          # Create nested directories
touch myfile.txt        # Create an empty file
cp file.txt copy.txt    # Copy a file
cp -r dir/ dir_copy/    # Copy a directory recursively
mv old.txt new.txt      # Move/rename a file
rm file.txt             # Remove a file (NO trash can!)
rm -r mydir/            # Remove a directory recursively
rm -rf mydir/           # Force remove (CAREFUL!)

# Viewing file content
cat file.txt            # Display entire file
less file.txt          # View file page by page (q to quit)
head -20 file.txt      # Show first 20 lines
tail -20 file.txt      # Show last 20 lines
tail -f /var/log/syslog # Follow file in real-time
wc -l file.txt         # Count lines

# Searching
grep "password" file.txt  # Search for "password" in file
grep -r "config" /etc/    # Recursive search in directory
grep -i "error" log.txt   # Case-insensitive search
find / -name "*.conf"     # Find all .conf files
find / -name "*.log" -size +10M  # Find log files > 10MB
which nmap                # Find where nmap is installed
whereis python3           # Find binary, source, man page
```

💡 TIP: Almost every command has a manual. Type `man command` to read it. Press `q` to quit. Example: `man ls`

---

## Chapter 11 — File & Permission Management

Linux is a multi-user system. Permissions control who can read, write, or execute files.

### Permission Model

```
ls -la output:
-rwxr-xr-- 1 kali kali 4096 Aug 20 10:30 myfile

Breaking down the permissions:
- rwx    r-x    r--
  │      │      │
  │      │      └── Others: read, no write, no execute
  │      └── Group: read, execute, no write
  └── Owner: read, write, execute

r = read (4)
w = write (2)
x = execute (1)
```

```
┌────────────────────────────────────────┐
│         PERMISSION VALUES               │
├────────┬──────┬───────────────────────┤
│ Symbol │ Value │ Meaning              │
├────────┼──────┼───────────────────────┤
│ r      │ 4    │ Read                  │
│ w      │ 2    │ Write                 │
│ x      │ 1    │ Execute               │
│ -      │ 0    │ No permission         │
└────────┴──────┴───────────────────────┘

Common combinations:
7 = rwx (4+2+1) → full access
6 = rw- (4+2)   → read and write
5 = r-x (4+1)   → read and execute
4 = r-- (4)     → read only
0 = ---          → no access
```

### chmod — Change Permissions

```bash
# Symbolic notation
chmod u+x script.sh     # Add execute for owner
chmod g-w file.txt       # Remove write for group
chmod o=r file.txt       # Set others to read-only
chmod a+r file.txt       # Add read for all (a=all)
chmod u+rwx,g+rx,o+r file.txt  # Full control owner, others read+exec

# Numeric notation
chmod 755 script.sh      # rwxr-xr-x (owner full, others read+exec)
chmod 644 file.txt       # rw-r--r-- (owner read+write, others read)
chmod 600 secret.txt     # rw------- (owner only, very private)
chmod 777 public/        # rwxrwxrwx (everyone full access, RISKY)
```

⚠️ WARNING: Never use `chmod 777` on sensitive files or directories. It gives everyone full access, which is a security risk.

### chown — Change Ownership

```bash
chown alice file.txt          # Change owner to alice
chown alice:developers file.txt  # Change owner and group
chown -R alice:alice mydir/   # Recursive ownership change
```

### sudo — Run as Root

```bash
sudo apt update              # Run apt update as root
sudo su                      # Switch to root user
sudo -l                      # List what you can run as sudo
```

⚠️ WARNING: `sudo` gives you root powers. With great power comes great responsibility. Only use `sudo` when necessary.

🛡️ DEFENSIVE: Improper file permissions are one of the most common security issues. A world-readable password file, a world-writable system script, or an executable with wrong ownership can all be exploited. Auditing permissions is a key defensive practice.

---

## Chapter 12 — Processes, Services & Package Management

### Processes

A process is a running program. Linux gives each process a unique PID (Process ID).

```bash
# View processes
ps aux                    # List all processes
ps aux | grep nmap        # Find nmap process
top                       # Real-time process monitor (q to quit)
htop                      # Better top (if installed)
kill 1234                 # Kill process with PID 1234
kill -9 1234              # Force kill (SIGKILL)
killall firefox           # Kill all processes named firefox
```

### Services

Services (also called daemons) are background processes that run continuously.

```bash
# Systemd service management
sudo systemctl start ssh       # Start SSH service
sudo systemctl stop ssh        # Stop SSH service
sudo systemctl restart ssh     # Restart SSH service
sudo systemctl status ssh      # Check SSH service status
sudo systemctl enable ssh      # Start SSH on boot
sudo systemctl disable ssh     # Don't start on boot
```

### Package Management with apt

Kali (Debian-based) uses `apt` for package management.

```bash
# Update package list
sudo apt update                # Download list of available updates

# Upgrade installed packages
sudo apt full-upgrade          # Install all available updates

# Install a new package
sudo apt install nmap          # Install nmap
sudo apt install -y wireshark  # Install without confirmation

# Remove a package
sudo apt remove nmap           # Remove nmap (keep config)
sudo apt purge nmap            # Remove nmap + config

# Search for packages
apt search "port scanner"      # Search by name/description

# Clean up
sudo apt autoremove            # Remove unused dependencies
sudo apt clean                 # Clear downloaded package cache
```

📌 IMPORTANT: Always run `sudo apt update` before installing or upgrading. This refreshes the package list so you get the latest versions.

### Environment Variables

Environment variables are system-wide settings stored as key-value pairs.

```bash
echo $HOME              # Show home directory
echo $PATH              # Show directories searched for commands
echo $USER              # Current username
env                    # Show all environment variables
export MY_VAR="hello"  # Set a variable
```

### Pipes and Redirection

```bash
# Pipe: send output of one command as input to another
ls -la | grep ".txt"           # List files, filter for .txt
cat access.log | grep "404"    # Show log, filter for 404 errors
ps aux | grep python | wc -l   # Count python processes

# Redirection: save output to file
echo "hello" > file.txt        # Overwrite file with "hello"
echo "world" >> file.txt       # Append "world" to file
ls -la > listing.txt           # Save directory listing to file
command 2> errors.txt          # Save only errors to file
command > output.txt 2>&1      # Save both output and errors
```

---

## Chapter 13 — Bash Scripting Basics

Bash scripting lets you automate repetitive tasks — essential for a security professional.

### Your First Script

```bash
#!/bin/bash
# This is a comment
echo "Hello, $USER!"
echo "Today is $(date)"
echo "You are in $(pwd)"
```

Save as `hello.sh`, then:
```bash
chmod +x hello.sh    # Make executable
./hello.sh           # Run it
```

### Variables

```bash
#!/bin/bash
name="Kali"
version=2026.1
echo "Running $name version $version"

# Command substitution
current_date=$(date +%Y-%m-%d)
echo "Date: $current_date"

# User input
echo "Enter your name:"
read username
echo "Hello, $username!"
```

### Conditionals

```bash
#!/bin/bash
echo "Enter a number:"
read num

if [ "$num" -gt 10 ]; then
    echo "Number is greater than 10"
elif [ "$num" -eq 10 ]; then
    echo "Number is exactly 10"
else
    echo "Number is less than 10"
fi

# File test
if [ -f "/etc/passwd" ]; then
    echo "passwd file exists"
fi

# String comparison
if [ "$USER" = "root" ]; then
    echo "You are root!"
fi
```

### Loops

```bash
#!/bin/bash
# For loop
for ip in 192.168.1.1 192.168.1.2 192.168.1.3; do
    ping -c 1 $ip > /dev/null
    if [ $? -eq 0 ]; then
        echo "$ip is UP"
    else
        echo "$ip is DOWN"
    fi
done

# While loop
count=1
while [ $count -le 5 ]; do
    echo "Count: $count"
    count=$((count + 1))
done

# Loop through range
for i in {1..10}; do
    echo "Number: $i"
done
```

### Practical Security Script

```bash
#!/bin/bash
# Simple network scanner for lab use
# Scans a range of IPs on the lab network

echo "=== Lab Network Scanner ==="
echo "Scanning 192.168.56.0/24"
echo ""

for ip in 192.168.56.{1..254}; do
    ping -c 1 -W 1 $ip > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "[+] Host $ip is UP"
    fi
done

echo ""
echo "Scan complete."
```

---

## LAB 2 — Linux Command Practice 🟢

Objective: Practice essential Linux commands on Kali
Difficulty: Beginner
Environment: Kali Linux VM
Safety: Working on your own system, no network attacks

Step 1: Navigate the filesystem
```bash
pwd
ls /
ls /etc
ls /var/log
cd ~
```

Step 2: Create and manage files
```bash
mkdir lab2
cd lab2
touch notes.txt
echo "This is my lab" > notes.txt
cp notes.txt backup.txt
ls -la
```

Step 3: Practice permissions
```bash
chmod 644 notes.txt
ls -la notes.txt
chmod 600 notes.txt
ls -la notes.txt
```

Step 4: Work with processes
```bash
ps aux | head -20
top
```

Step 5: Write and run a script
```bash
cat > scan.sh << 'EOF'
#!/bin/bash
echo "Scanning for hosts..."
for i in {1..10}; do
    ping -c 1 -W 1 192.168.56.$i > /dev/null 2>&1
    [ $? -eq 0 ] && echo "192.168.56.$i is UP"
done
EOF
chmod +x scan.sh
./scan.sh
```

Expected Result: You should be able to navigate, create files, change permissions, view processes, and run a simple scan script.

Understanding Check:
1. What does `chmod 755` mean?
2. What is the difference between `>` and `>>`?
3. How do you find all files modified in the last 24 hours?

Defensive Lesson: Understanding file permissions and process management is crucial. Many security vulnerabilities come from misconfigured permissions or unnecessary running services.

Cleanup: `rm -rf ~/lab2`

---

## Chapter Summary

- Linux is the primary OS for cybersecurity because of its tools, control, and scripting power
- Kali Linux comes with 600+ pre-installed security tools
- The filesystem has a tree structure starting at / (root)
- Essential commands: ls, cd, cp, mv, rm, cat, grep, find, chmod, chown
- Permissions: r (read=4), w (write=2), x (execute=1)
- sudo gives temporary root access — use carefully
- Services are background processes managed with systemctl
- apt is the package manager for Kali/Debian
- Bash scripting automates repetitive security tasks

## Key Terms

- **Shell** — Program that interprets commands (Bash is most common)
- **Terminal** — Interface to the shell
- **PID** — Process ID, unique number for each running process
- **Daemon/Service** — Background process running continuously
- **sudo** — Execute a command as root (superuser)
- **chmod** — Change file permissions
- **chown** — Change file ownership
- **Pipe (|)** — Send output of one command as input to another
- **Environment Variable** — System setting stored as key-value pair

## Knowledge Check

1. What command shows all files including hidden ones?
2. What do the numbers 755 mean in chmod?
3. How do you check if SSH service is running?
4. What does `grep -i "error" /var/log/syslog` do?
5. Write a one-liner to find all .conf files in /etc/

## Practical Challenge

🟡 Intermediate

Write a Bash script that:
1. Checks if Nmap is installed (if not, installs it)
2. Scans your lab network for live hosts
3. Saves results to a file with a timestamp

## Common Mistakes

- Using `rm -rf` without double-checking the path
- Running everything as root when it's not needed
- Not using `man` to learn command options
- Forgetting to `chmod +x` scripts before running them
- Not quoting variables in Bash (`"$var"` not `$var`)

## Defensive Takeaway

Linux system administration skills are essential for both attackers and defenders. Attackers use these commands to navigate, escalate, and persist. Defenders use them to monitor, investigate, and harden systems.

## Next Chapter

Level 3 teaches Python for cybersecurity — the programming skills you need to write your own security tools.
