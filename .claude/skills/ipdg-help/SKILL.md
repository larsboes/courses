---
description: "IPDG-Klausurvorbereitung: Findet schnell Content, Quellen und Diagrams zu IPDG-Themen. Nutze bei allen Fragen zu ERP, SAP, CRM, BI, Big Data, Change Management."
argument-hint: "[topic]"
allowed-tools:
  - Read
  - Grep
  - Glob
---

# IPDG Content Navigator

Schnelle Orientierung fuer IPDG-Klausurvorbereitung. Finde Content, stelle Quiz-Fragen, oder gib Zusammenfassungen.

Detaillierte Content-Map: siehe `content-map.md` in diesem Skill-Ordner.

## Bei Aufruf mit Argument

Wenn der User `/ipdg-help <topic>` aufruft (z.B. `/ipdg-help CRM`):
1. Finde das Topic in der Content-Map
2. Lies die relevante Topic-Datei und/oder Markdown-Quelle
3. Fasse die Kernpunkte zusammen
4. Biete an: Quiz-Fragen, Deep-Dive, oder Schwachstellen-Check

Argument: $ARGUMENTS

## Bei Aufruf ohne Argument

Zeige eine Uebersicht aller verfuegbaren IPDG-Topics mit kurzer Beschreibung und frage den User, womit er anfangen will.

## Aktionen

Wenn der User nach einem bestimmten Thema fragt:
1. Zeige die relevanten Dateipfade aus der Content-Map
2. Lies den entsprechenden Content und fasse die Kernpunkte zusammen
3. Biete an: Quiz-Fragen stellen, Zusammenfassung, oder Deep-Dive

Wenn der User allgemein fragt "wo finde ich X":
1. Durchsuche die Topic-Dateien und Markdown-Quellen via Grep
2. Gib konkrete Dateipfade und Zeilennummern
