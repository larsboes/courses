/* Kubernetes Learning Platform - Main JavaScript */

// Kubernetes Glossary for Tooltips
const glossary = {
  "Pod": "Die kleinste deploybare Einheit in Kubernetes - eine Gruppe von Containern, die zusammen laufen",
  "Service": "Stabile Netzwerkadresse fuer Pods mit automatischem Load Balancing",
  "Deployment": "Verwaltet Pods mit Self-Healing, Rolling Updates und Skalierung",
  "ConfigMap": "Speichert nicht-sensible Konfigurationsdaten als Key-Value Paare",
  "Secret": "Speichert sensible Daten wie Passwoerter (base64 kodiert, nicht verschluesselt!)",
  "PVC": "PersistentVolumeClaim - Anfrage fuer persistenten Speicher",
  "PV": "PersistentVolume - Tatsaechlicher Speicher im Cluster",
  "Namespace": "Logische Trennung von Ressourcen innerhalb eines Clusters",
  "Label": "Key-Value Paar zur Identifikation und Gruppierung von Ressourcen",
  "Selector": "Filterkriterium um Ressourcen anhand ihrer Labels zu finden",
  "ClusterIP": "Interner Service-Typ, nur innerhalb des Clusters erreichbar",
  "NodePort": "Service-Typ mit externem Port (30000-32767) auf jedem Node",
  "LoadBalancer": "Service-Typ mit Cloud Load Balancer (AWS, GCP, Azure)",
  "containerPort": "Port auf dem die App im Container lauscht",
  "targetPort": "Port an den der Service Traffic weiterleitet",
  "Replica": "Eine Kopie eines Pods, verwaltet durch ein Deployment",
  "kubectl": "Kommandozeilen-Tool zur Interaktion mit Kubernetes",
  "Minikube": "Lokale Kubernetes-Umgebung fuer Entwicklung und Tests",
  "Kustomize": "Tool zum Anpassen von Kubernetes YAML ohne Templates",
  "Manifest": "YAML-Datei die Kubernetes-Ressourcen beschreibt"
};

// Navigation structure for sidebar
const navigation = [
  {
    title: "Start",
    icon: "bi-house",
    items: [
      { name: "Lernpfad", href: "index.html" },
      { name: "Aufgaben", href: "tasks.html" }
    ]
  },
  {
    title: "1. Basics",
    icon: "bi-1-circle",
    items: [
      { name: "Was ist K8s?", href: "basics/what-is-kubernetes.html" },
      { name: "Pods", href: "basics/pods.html" },
      { name: "Deployments", href: "basics/deployments.html" }
    ]
  },
  {
    title: "2. Networking",
    icon: "bi-2-circle",
    items: [
      { name: "Services", href: "networking/services.html" },
      { name: "Ports", href: "networking/ports.html" },
      { name: "DNS", href: "networking/dns.html" }
    ]
  },
  {
    title: "3. Storage",
    icon: "bi-3-circle",
    items: [
      { name: "Volumes", href: "storage/volumes.html" }
    ]
  },
  {
    title: "4. Configuration",
    icon: "bi-4-circle",
    items: [
      { name: "ConfigMaps", href: "config/configmaps.html" },
      { name: "Secrets", href: "config/secrets.html" },
      { name: "Kustomize", href: "config/kustomize.html" }
    ]
  },
  {
    title: "5. Meta Playlist",
    icon: "bi-5-circle",
    items: [
      { name: "Architektur", href: "meta-playlist/architecture.html" },
      { name: "Manifests", href: "meta-playlist/manifests.html" }
    ]
  }
];

// Page order for prev/next navigation
const pageOrder = [
  "index.html",
  "basics/what-is-kubernetes.html",
  "basics/pods.html",
  "basics/deployments.html",
  "networking/services.html",
  "networking/ports.html",
  "networking/dns.html",
  "storage/volumes.html",
  "config/configmaps.html",
  "config/secrets.html",
  "config/kustomize.html",
  "meta-playlist/architecture.html",
  "meta-playlist/manifests.html",
  "tasks.html"
];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initializeSidebar();
  initializeAccordions();
  initializeCodeBlocks();
  initializeTooltips();
  initializeQuizzes();
  initializeProgress();
  highlightCode();
  initializeMermaid();
});

// Sidebar functions
function initializeSidebar() {
  const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
  if (!sidebarPlaceholder) return;

  const currentPage = getCurrentPage();
  const basePath = getBasePath();

  let sidebarHTML = `
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <svg class="sidebar-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2L3 9v14l13 7 13-7V9L16 2z" fill="#326CE5"/>
          <path d="M16 6l-9 5v10l9 5 9-5V11l-9-5z" fill="#fff"/>
          <circle cx="16" cy="16" r="3" fill="#326CE5"/>
        </svg>
        <h5>K8s Lernpfad</h5>
      </div>
      <ul class="sidebar-nav">
  `;

  navigation.forEach(section => {
    sidebarHTML += `
      <li class="nav-section">
        <span class="section-title">
          <i class="bi ${section.icon}"></i> ${section.title}
        </span>
        <ul class="nav-items">
    `;
    section.items.forEach(item => {
      const href = basePath + item.href;
      const isActive = currentPage === item.href;
      sidebarHTML += `
        <li>
          <a href="${href}" class="nav-link${isActive ? ' active' : ''}">${item.name}</a>
        </li>
      `;
    });
    sidebarHTML += `</ul></li>`;
  });

  sidebarHTML += `
      </ul>
      <div class="progress-tracker">
        <div class="progress">
          <div class="progress-bar" id="progress-bar" style="width: 0%"></div>
        </div>
        <span id="progress-text">0/12 Themen</span>
      </div>
    </nav>
    <div class="sidebar-backdrop" id="sidebar-backdrop"></div>
  `;

  sidebarPlaceholder.innerHTML = sidebarHTML;

  // Mobile sidebar toggle
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      backdrop.classList.toggle('show');
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('show');
      backdrop.classList.remove('show');
    });
  }

  updateProgressDisplay();
}

function getCurrentPage() {
  const path = window.location.pathname;
  const parts = path.split('/');
  const htmlIndex = parts.findIndex(p => p === 'html');
  if (htmlIndex !== -1) {
    return parts.slice(htmlIndex + 1).join('/');
  }
  return parts[parts.length - 1] || 'index.html';
}

function getBasePath() {
  const page = getCurrentPage();
  const depth = (page.match(/\//g) || []).length;
  return '../'.repeat(depth);
}

// Accordion functions
function initializeAccordions() {
  document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.querySelector(button.dataset.bsTarget);
      const isExpanded = target.classList.contains('show');

      // Close all in same accordion
      const accordion = button.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.accordion-collapse').forEach(collapse => {
          collapse.classList.remove('show');
        });
        accordion.querySelectorAll('.accordion-button').forEach(btn => {
          btn.classList.add('collapsed');
        });
      }

      // Toggle current
      if (!isExpanded) {
        target.classList.add('show');
        button.classList.remove('collapsed');
      }
    });
  });
}

// Code block functions
function initializeCodeBlocks() {
  document.querySelectorAll('.code-block__copy').forEach(button => {
    button.addEventListener('click', async () => {
      const codeBlock = button.closest('.code-block');
      const code = codeBlock.querySelector('code').textContent;

      try {
        await navigator.clipboard.writeText(code);
        button.classList.add('copied');
        button.innerHTML = '<i class="bi bi-check"></i>';
        setTimeout(() => {
          button.classList.remove('copied');
          button.innerHTML = '<i class="bi bi-clipboard"></i>';
        }, 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });
  });
}

// Syntax highlighting
function highlightCode() {
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightElement(block);
    });
  }
}

// Mermaid diagrams
function initializeMermaid() {
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#326CE5',
        primaryTextColor: '#fff',
        primaryBorderColor: '#4a87f0',
        lineColor: '#a0a0a0',
        secondaryColor: '#16213e',
        tertiaryColor: '#1a1a2e'
      }
    });
  }
}

// Tooltip functions
function initializeTooltips() {
  document.querySelectorAll('.k8s-term').forEach(el => {
    const term = el.dataset.term || el.textContent;
    if (glossary[term]) {
      el.title = glossary[term];
      el.addEventListener('mouseenter', showTooltip);
      el.addEventListener('mouseleave', hideTooltip);
    }
  });
}

function showTooltip(e) {
  const term = e.target.dataset.term || e.target.textContent;
  if (!glossary[term]) return;

  const tooltip = document.createElement('div');
  tooltip.className = 'k8s-tooltip';
  tooltip.textContent = glossary[term];
  tooltip.style.cssText = `
    position: absolute;
    background: #1a1a2e;
    color: #e6e6e6;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
    max-width: 300px;
    z-index: 1000;
    border: 1px solid #2d3748;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;

  document.body.appendChild(tooltip);

  const rect = e.target.getBoundingClientRect();
  tooltip.style.left = rect.left + 'px';
  tooltip.style.top = (rect.bottom + 8) + 'px';

  e.target._tooltip = tooltip;
}

function hideTooltip(e) {
  if (e.target._tooltip) {
    e.target._tooltip.remove();
    e.target._tooltip = null;
  }
}

// Quiz functions
function initializeQuizzes() {
  document.querySelectorAll('.quiz-container').forEach(container => {
    new Quiz(container);
  });
}

class Quiz {
  constructor(container) {
    this.container = container;
    this.questions = JSON.parse(container.dataset.questions || '[]');
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;

    if (this.questions.length > 0) {
      this.render();
      this.attachEvents();
    }
  }

  render() {
    this.updateProgress();
    this.renderQuestion();
  }

  updateProgress() {
    const progressEl = this.container.querySelector('.quiz-progress');
    if (progressEl) {
      progressEl.textContent = `Frage ${this.currentIndex + 1} von ${this.questions.length}`;
    }
  }

  renderQuestion() {
    const q = this.questions[this.currentIndex];
    const questionEl = this.container.querySelector('.quiz-question');
    if (!questionEl) return;

    questionEl.querySelector('.question-text').textContent = q.question;

    const optionsEl = questionEl.querySelector('.options');
    optionsEl.innerHTML = q.options.map((opt, i) => `
      <label class="option">
        <input type="radio" name="quiz-answer" value="${i}">
        <span class="option-text">${opt}</span>
      </label>
    `).join('');

    this.container.querySelector('.question-feedback').classList.add('hidden');
    this.container.querySelector('#check-answer').disabled = false;
    this.container.querySelector('#next-question').disabled = true;
    this.answered = false;
  }

  attachEvents() {
    const checkBtn = this.container.querySelector('#check-answer');
    const nextBtn = this.container.querySelector('#next-question');
    const retryBtn = this.container.querySelector('#retry-quiz');
    const optionsEl = this.container.querySelector('.options');

    if (optionsEl) {
      optionsEl.addEventListener('change', () => {
        checkBtn.disabled = false;
      });
    }

    if (checkBtn) {
      checkBtn.addEventListener('click', () => this.checkAnswer());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextQuestion());
    }

    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.retry());
    }
  }

  checkAnswer() {
    if (this.answered) return;
    this.answered = true;

    const q = this.questions[this.currentIndex];
    const selected = this.container.querySelector('input[name="quiz-answer"]:checked');
    if (!selected) return;

    const selectedIndex = parseInt(selected.value);
    const isCorrect = selectedIndex === q.correct;

    if (isCorrect) {
      this.score++;
      selected.closest('.option').classList.add('correct');
    } else {
      selected.closest('.option').classList.add('incorrect');
      this.container.querySelectorAll('.option')[q.correct].classList.add('correct');
    }

    // Show feedback
    const feedback = this.container.querySelector('.question-feedback');
    feedback.querySelector('.feedback-text').textContent = q.explanation;
    feedback.classList.remove('hidden');

    this.container.querySelector('#check-answer').disabled = true;
    this.container.querySelector('#next-question').disabled = false;
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      this.showResults();
    } else {
      this.updateProgress();
      this.renderQuestion();
    }
  }

  showResults() {
    this.container.querySelector('.quiz-question').style.display = 'none';
    this.container.querySelector('.quiz-actions').style.display = 'none';

    const results = this.container.querySelector('.quiz-results');
    results.querySelector('.score-number').textContent = this.score;
    results.querySelector('.score-total').textContent = this.questions.length;

    const percentage = (this.score / this.questions.length) * 100;
    let message = '';
    if (percentage === 100) {
      message = 'Perfekt! Du beherrschst das Thema!';
    } else if (percentage >= 66) {
      message = 'Gut gemacht! Die Grundlagen sitzen.';
    } else {
      message = 'Lies das Kapitel nochmal und versuche es erneut.';
    }
    results.querySelector('.results-message').textContent = message;
    results.classList.remove('hidden');

    // Save progress
    this.saveProgress();
  }

  saveProgress() {
    const quizId = this.container.dataset.quizId;
    const progress = JSON.parse(localStorage.getItem('k8s-quiz-progress') || '{}');
    progress[quizId] = {
      score: this.score,
      total: this.questions.length,
      completed: true,
      date: new Date().toISOString()
    };
    localStorage.setItem('k8s-quiz-progress', JSON.stringify(progress));
    updateProgressDisplay();
  }

  retry() {
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;

    this.container.querySelector('.quiz-question').style.display = 'block';
    this.container.querySelector('.quiz-actions').style.display = 'flex';
    this.container.querySelector('.quiz-results').classList.add('hidden');

    this.render();
  }
}

// Progress tracking
function initializeProgress() {
  // Mark current page as visited
  const visited = JSON.parse(localStorage.getItem('k8s-visited-pages') || '[]');
  const currentPage = getCurrentPage();
  if (!visited.includes(currentPage)) {
    visited.push(currentPage);
    localStorage.setItem('k8s-visited-pages', JSON.stringify(visited));
  }
  updateProgressDisplay();
}

function updateProgressDisplay() {
  const visited = JSON.parse(localStorage.getItem('k8s-visited-pages') || '[]');
  const totalPages = 12; // Main content pages (excluding index and tasks)
  const contentPages = pageOrder.filter(p => p !== 'index.html' && p !== 'tasks.html');
  const visitedContent = visited.filter(p => contentPages.includes(p)).length;

  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');

  if (progressBar) {
    progressBar.style.width = `${(visitedContent / totalPages) * 100}%`;
  }
  if (progressText) {
    progressText.textContent = `${visitedContent}/${totalPages} Themen`;
  }
}

// Utility functions
function getPageTitle(href) {
  const titles = {
    'index.html': 'Lernpfad',
    'tasks.html': 'Aufgaben',
    'basics/what-is-kubernetes.html': 'Was ist Kubernetes?',
    'basics/pods.html': 'Pods',
    'basics/deployments.html': 'Deployments',
    'networking/services.html': 'Services',
    'networking/ports.html': 'Ports',
    'networking/dns.html': 'DNS',
    'storage/volumes.html': 'Volumes',
    'config/configmaps.html': 'ConfigMaps',
    'config/secrets.html': 'Secrets',
    'config/kustomize.html': 'Kustomize',
    'meta-playlist/architecture.html': 'Architektur',
    'meta-playlist/manifests.html': 'Manifests'
  };
  return titles[href] || href;
}
