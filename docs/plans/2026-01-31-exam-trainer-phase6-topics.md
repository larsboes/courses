# Exam Trainer Phase 6: Additional Topics

> **For Claude:** Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Add remaining course topics with content, diagrams, and quizzes.

**Prerequisites:** Phase 1-5 complete (MVP working with HTTP topic)

**Architecture Reference:** `docs/plans/2026-01-30-exam-trainer-design.md`

---

## Topics to Implement

Each topic needs:
1. Topic file in `src/content/web-technologies/topics/{topic}.tsx`
2. Any required diagrams in `src/content/web-technologies/diagrams/`
3. Update course manifest in `src/content/web-technologies/index.ts`

---

## Task 6.1: JSON Topic

**Files:**
- Create: `src/content/web-technologies/topics/json.tsx`

**Sections:**
1. **Überblick** - What is JSON, why use it
2. **Syntax** - Objects, arrays, strings, numbers, booleans, null
3. **Beispiele** - Valid vs invalid JSON examples

**Quiz questions (3):**
- Data types in JSON
- Valid/invalid syntax identification
- JSON vs JavaScript object literal differences

**No diagram needed** - use code examples in content.

---

## Task 6.2: HTML Topic

**Files:**
- Create: `src/content/web-technologies/topics/html.tsx`
- Create: `src/content/web-technologies/diagrams/HtmlStructureExplorer.tsx` (explorable)

**Sections:**
1. **Überblick** - HTML purpose, document structure
2. **Grundstruktur** - DOCTYPE, html, head, body (with explorable diagram)
3. **Wichtige Elemente** - Semantic elements, forms, links
4. **Attribute** - id, class, data-*, common attributes

**Quiz questions (3):**
- Semantic HTML elements
- Document structure
- Form elements

---

## Task 6.3: CSS Topic

**Files:**
- Create: `src/content/web-technologies/topics/css.tsx`
- Create: `src/content/web-technologies/diagrams/CssSpecificityDiagram.tsx` (animated)

**Sections:**
1. **Überblick** - CSS purpose, syntax (selector { property: value })
2. **Selektoren** - Element, class, id, combinators
3. **Spezifität** - Specificity calculation (with animated diagram)
4. **Box Model** - margin, border, padding, content

**Quiz questions (3):**
- Selector specificity
- Box model properties
- CSS units

---

## Task 6.4: JavaScript DOM Topic

**Files:**
- Create: `src/content/web-technologies/topics/javascript-dom.tsx`
- Create: `src/content/web-technologies/diagrams/DomTreeDiagram.tsx` (explorable)

**Sections:**
1. **Überblick** - What is the DOM
2. **DOM Baum** - Tree structure (with explorable diagram)
3. **Selektion** - querySelector, getElementById, etc.
4. **Manipulation** - createElement, appendChild, innerHTML

**Quiz questions (3):**
- DOM selection methods
- Event handling
- DOM manipulation

---

## Task 6.5: REST Topic

**Files:**
- Create: `src/content/web-technologies/topics/rest.tsx`
- Create: `src/content/web-technologies/diagrams/RestEndpointsDiagram.tsx` (explorable)

**Sections:**
1. **Überblick** - REST principles, statelessness
2. **Ressourcen** - URI design, collections vs items
3. **CRUD Mapping** - HTTP methods to operations (with diagram)
4. **Best Practices** - Naming, versioning, pagination

**Quiz questions (3):**
- REST principles
- HTTP method mapping
- URI design

---

## Task 6.6: Kubernetes Begriffe Topic

**Files:**
- Create: `src/content/web-technologies/topics/kubernetes-begriffe.tsx`
- Create: `src/content/web-technologies/diagrams/K8sComponentsDiagram.tsx` (explorable)

**Sections:**
1. **Überblick** - What is Kubernetes, why use it
2. **Kernkonzepte** - Pod, Node, Cluster (with explorable diagram)
3. **Workloads** - Deployment, ReplicaSet, StatefulSet
4. **Konfiguration** - ConfigMap, Secret

**Quiz questions (3):**
- Pod vs Container
- Deployment purpose
- ConfigMap vs Secret

---

## Task 6.7: Kubernetes Manifests Topic

**Files:**
- Create: `src/content/web-technologies/topics/kubernetes-manifests.tsx`
- Create: `src/content/web-technologies/diagrams/K8sManifestExplorer.tsx` (explorable)

**Sections:**
1. **Überblick** - YAML manifests, declarative config
2. **Struktur** - apiVersion, kind, metadata, spec (with explorable diagram)
3. **Deployment Manifest** - Example with explanation
4. **Service Manifest** - Example with explanation

**Quiz questions (3):**
- Required manifest fields
- Deployment vs Service
- Label selectors

---

## Task 6.8: Kubernetes Netzwerk Topic

**Files:**
- Create: `src/content/web-technologies/topics/kubernetes-netzwerk.tsx`
- Create: `src/content/web-technologies/diagrams/K8sNetworkDiagram.tsx` (animated)

**Sections:**
1. **Überblick** - K8s networking model
2. **Services** - ClusterIP, NodePort, LoadBalancer (with animated diagram)
3. **Ingress** - External access, routing rules
4. **DNS** - Service discovery, CoreDNS

**Quiz questions (3):**
- Service types
- Ingress purpose
- Pod-to-Pod communication

---

## Task 6.9: DNS/TLS Topic

**Files:**
- Create: `src/content/web-technologies/topics/dns-tls.tsx`
- Create: `src/content/web-technologies/diagrams/DnsResolutionDiagram.tsx` (animated)
- Create: `src/content/web-technologies/diagrams/TlsHandshakeDiagram.tsx` (animated)

**Sections:**
1. **DNS Überblick** - What is DNS, why needed
2. **DNS Auflösung** - Resolution process (with animated diagram)
3. **TLS Überblick** - What is TLS, HTTPS
4. **TLS Handshake** - Handshake steps (with animated diagram)

**Quiz questions (4):**
- DNS record types
- DNS resolution steps
- TLS purpose
- Certificate chain

---

## Task 6.10: Playlist App Topic (Exam Project)

**Files:**
- Create: `src/content/web-technologies/topics/playlist-app.tsx`

**Sections:**
1. **Überblick** - The exam project requirements
2. **Frontend** - HTML/CSS/JS structure
3. **Backend** - REST API design
4. **Deployment** - Kubernetes manifests

**Quiz questions (3):**
- API endpoints for playlist CRUD
- Frontend-Backend communication
- K8s deployment strategy

**No new diagrams** - reference existing diagrams from other topics.

---

## After All Tasks

1. Update course manifest with all topics
2. Test full flow through all topics
3. Verify all quizzes work
4. Commit: "feat(exam-trainer): add all web technologies topics"
