
### Übung 1: Eine kleine Infrastruktur, praktisch, alternativ mit Docker

## Schritte

1. **Docker Installation prüfen:**
   ```bash
   docker --version
   ```

2. **Container starten:**
   ```bash
   docker compose up -d
   ```
   (Parameter `-d` für *detached*)

3. **Netzwerk untersuchen:**
   ```bash
   docker network ls
   docker network inspect bung1_small_internal_network
   ```

4. **Prozesse prüfen:**
   ```bash
   # Prozesse im Container
   docker exec container1 ps

   # Prozesse auf Host
   ps -ef
   ```

5. **Namespaces analysieren:**
   ```bash
   docker exec container1 lsns
   ```

6. **Netzwerk testen:**
   ```bash
   # Netzwerkschnittstellen anzeigen
   docker exec container1 ifconfig

   # Ping zwischen Containern
   docker exec container1 ping -c 3 10.0.0.11
   ```

7. **Interaktive Shell (optional):**
   ```bash
   docker exec -it container1 /bin/bash
   ```
   Verlassen mit `exit`

8. **Aufräumen:**
   ```bash
   docker compose down
   ```

## Wireshark Network Monitoring

Netzwerkverkehr zwischen Containern mit tcpdump erfassen und in Wireshark analysieren:

```bash
# 1. tcpdump in Container installieren
docker exec container1 apt-get update
docker exec container1 apt-get install -y tcpdump

# 2. Network Capture starten (im Hintergrund)
docker exec -d container1 tcpdump -i eth0 -w /tmp/capture.pcap

# 3. ping in container2 installieren (falls nötig)
docker exec container2 bash -c "apt-get update && apt-get install -y iputils-ping"

# 4. Traffic generieren
docker exec container1 ping -c 10 10.0.0.11
docker exec container2 ping -c 10 10.0.0.10

# 5. Capture stoppen und kopieren
docker exec container1 pkill tcpdump
docker cp container1:/tmp/capture.pcap ./container-traffic.pcap

# 6. In Wireshark öffnen
wireshark container-traffic.pcap
```