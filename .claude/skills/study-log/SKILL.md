---
description: "Dokumentiert Lernsession-Fortschritt am Ende einer Study-Session. Pflicht nach jeder Lernsession."
disable-model-invocation: true
allowed-tools:
  - Read
  - Edit
  - Write
---

# Study Session Log

Du MUSST am Ende jeder Lernsession diesen Skill ausfuehren. Das ist PFLICHT, nicht optional.

## Bisherige Sessions

```yaml
!`cat exam-trainer/logs/sessions.yaml 2>/dev/null || echo "Noch keine Sessions"`
```

## Ablauf

1. **Analysiere die aktuelle Session** - was wurde in dieser Konversation gemacht:
   - Welcher Kurs (ipdg / web-technologies)?
   - Welche Topics behandelt?
   - Quiz-Ergebnisse / Scores falls vorhanden
   - Was lief gut, was war schwach?
   - Wie lange ca. (schaetz anhand der Konversation)
2. **Schreibe einen neuen Session-Block** ans Ende von `exam-trainer/logs/sessions.yaml` im YAML-Format (siehe `template.yaml` in diesem Skill-Ordner fuer das Format)
3. **Update MEMORY.md** (`~/.claude/projects/-Users-larsboes-Developer-courses/memory/MEMORY.md`) mit aktuellen Schwachstellen und Fortschritt falls relevant
4. **Gib eine kurze Zusammenfassung** an den User: Was lief gut, was muss noch geuebt werden, Empfehlung fuer naechste Session

## Regeln

- Sei EHRLICH bei den Scores - keine Schoenmalerei
- Schwachstellen konkret benennen, nicht vage ("SAP SD Belegfluss" statt "SAP")
- Wenn der User Topics uebersprungen oder nur "." getippt hat -> als nicht bearbeitet markieren
- Immer `next_steps` mit konkreten Empfehlungen
- Score-Skala: 0.0 (nichts gewusst) bis 1.0 (perfekt)
