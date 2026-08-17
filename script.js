// script.js - Srivardhan Telangana SCERT Class 8 Chapter 1-10 Interactive Learning Engine

// --- DYNAMIC DATABASE MAPPING ---
let topicsData = [];
let finalTestQuestions = [];

// --- APP STATE ENGINE ---
class LearningApp {
  constructor() {
    this.activeChapter = 0;
    this.activeTopic = 0;
    this.flowStep = "read";
    this.theme = "light";
    
    // Animations & Canvas contexts
    this.watchCanvas = null;
    this.watchCtx = null;
    this.watchAnimId = null;
    this.watchPlaying = false;
    this.watchFrame = 0;

    this.exploreCanvas = null;
    this.exploreCtx = null;
    this.exploreState = {};
    
    // Flashcards status
    this.flashcardIndex = 0;
    this.flashcardFlipped = false;

    // Mini Quiz status
    this.activeMiniQuizQ = 0;
    this.miniQuizAnswers = [];
    
    // Final test status
    this.testActive = false;
    this.testAnswers = Array(20).fill(null);
    this.testTime = 0;
    this.testTimerId = null;

    // Init App
    window.addEventListener("DOMContentLoaded", () => this.init());
  }

  init() {
    // Hide loader
    setTimeout(() => {
      const loader = document.getElementById("loading-screen");
      if (loader) {
        loader.style.opacity = 0;
        setTimeout(() => loader.style.display = "none", 500);
      }
    }, 1000);

    // Setup theme
    this.theme = localStorage.getItem("theme") || "light";
    this.applyTheme();

    // Setup DOM elements
    this.watchCanvas = document.getElementById("watch-canvas");
    if (this.watchCanvas) this.watchCtx = this.watchCanvas.getContext("2d");

    this.exploreCanvas = document.getElementById("explore-canvas");
    if (this.exploreCanvas) {
      this.exploreCtx = this.exploreCanvas.getContext("2d");
      this.setupExploreListeners();
    }

    // Set default chapter (this triggers renderSidebar and loadTopic)
    this.changeChapter(this.activeChapter);

    // Start background live wallpaper
    this.initBackgroundWallpaper();
  }

  changeChapter(chapterIndex) {
    this.activeChapter = chapterIndex;
    topicsData = syllabusData[chapterIndex].topics;
    finalTestQuestions = syllabusData[chapterIndex].finalTest;

    const totalTopicsEl = document.getElementById("total-topics-num");
    if (totalTopicsEl) totalTopicsEl.innerText = topicsData.length;

    const selector = document.getElementById("chapter-select");
    if (selector) selector.value = chapterIndex;

    this.renderSidebar();
    this.loadTopic(0);
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", this.theme);
    this.applyTheme();
  }

  applyTheme() {
    const htmlEl = document.documentElement;
    const sunIcon = document.getElementById("theme-icon-sun");
    const moonIcon = document.getElementById("theme-icon-moon");

    if (this.theme === "dark") {
      htmlEl.classList.add("dark-theme");
      if (sunIcon) sunIcon.style.display = "block";
      if (moonIcon) moonIcon.style.display = "none";
    } else {
      htmlEl.classList.remove("dark-theme");
      if (sunIcon) sunIcon.style.display = "none";
      if (moonIcon) moonIcon.style.display = "block";
    }
  }

  initBackgroundWallpaper() {
    const bgCanvas = document.getElementById("background-wallpaper");
    if (!bgCanvas) return;
    const bgCtx = bgCanvas.getContext("2d");
    let t = 0;

    // Generate starry cosmos/floating coordinate dots data once
    const stars = [];
    for (let i = 0; i < 110; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: 0.4 + Math.random() * 1.5,
        twinkleSpeed: 0.005 + Math.random() * 0.012,
        alpha: Math.random()
      });
    }

    const resize = () => {
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      const w = bgCanvas.width;
      const h = bgCanvas.height;

      // 1. Theme-adapted Linear Gradient
      const spaceGrad = bgCtx.createLinearGradient(0, 0, 0, h);
      if (this.theme === "dark") {
        spaceGrad.addColorStop(0, "#040712");   // Absolute dark
        spaceGrad.addColorStop(0.5, "#0b1122"); // Deep space navy
        spaceGrad.addColorStop(1, "#170c2a");   // Soft cosmic violet
      } else {
        spaceGrad.addColorStop(0, "#faf8f4");   // Warm parchment light
        spaceGrad.addColorStop(0.5, "#f6eedf"); // Deeper parchment
        spaceGrad.addColorStop(1, "#ebdcb9");   // Celestial golden cream
      }
      bgCtx.fillStyle = spaceGrad;
      bgCtx.fillRect(0, 0, w, h);

      // 2. Cosmic Nebula Clouds (in dark) or Golden Coordinate Clouds (in light)
      const drawNebula = (cx, cy, r, color1, color2) => {
        const grad = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, color1);
        grad.addColorStop(1, color2);
        bgCtx.fillStyle = grad;
        bgCtx.fillRect(cx - r, cy - r, r * 2, r * 2);
      };
      
      const nebRadius = Math.min(w, h) * 0.6;
      if (this.theme === "dark") {
        drawNebula(w * 0.2, h * 0.4, nebRadius, "rgba(22, 60, 71, 0.18)", "rgba(22, 60, 71, 0)");
        drawNebula(w * 0.8, h * 0.3, nebRadius * 0.8, "rgba(117, 72, 33, 0.12)", "rgba(117, 72, 33, 0)");
      } else {
        drawNebula(w * 0.2, h * 0.4, nebRadius, "rgba(176, 129, 63, 0.05)", "rgba(176, 129, 63, 0)");
        drawNebula(w * 0.8, h * 0.3, nebRadius * 0.8, "rgba(176, 129, 63, 0.03)", "rgba(176, 129, 63, 0)");
      }

      // 3. Twinkling Stars (dark mode) or Floating coordinates dots (light mode)
      stars.forEach(s => {
        s.alpha += s.twinkleSpeed;
        if (s.alpha > 1 || s.alpha < 0.1) {
          s.twinkleSpeed = -s.twinkleSpeed;
        }
        const currentAlpha = Math.max(0.1, Math.min(1, s.alpha));
        if (this.theme === "dark") {
          bgCtx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.8})`;
        } else {
          bgCtx.fillStyle = `rgba(176, 129, 63, ${currentAlpha * 0.25})`;
        }
        bgCtx.beginPath();
        bgCtx.arc(s.x * w, s.y * h, s.size, 0, 2 * Math.PI);
        bgCtx.fill();
      });

      // 4. Rotating Planet Earth (Top-Right)
      const ex = w - 160;
      const ey = 220;
      const er = 65;

      if (w > 768) { // Only draw detailed Earth on desktop/tablet to avoid overlapping text
        // Earth coordinate orbital ring
        bgCtx.strokeStyle = this.theme === "dark" ? "rgba(135, 206, 250, 0.08)" : "rgba(176, 129, 63, 0.1)";
        bgCtx.lineWidth = 1;
        bgCtx.beginPath();
        bgCtx.arc(ex, ey, er * 1.35, 0, 2 * Math.PI);
        bgCtx.stroke();
        bgCtx.setLineDash([2, 6]);
        bgCtx.beginPath();
        bgCtx.ellipse(ex, ey, er * 1.7, er * 0.45, 0.25, 0, 2 * Math.PI);
        bgCtx.stroke();
        bgCtx.setLineDash([]);

        // Earth ocean sphere base
        const oceanGrad = bgCtx.createRadialGradient(ex - er * 0.4, ey - er * 0.4, er * 0.1, ex, ey, er);
        if (this.theme === "dark") {
          oceanGrad.addColorStop(0, "#2b6cb0");  // Sunlit ocean
          oceanGrad.addColorStop(0.5, "#1a365d"); // Deep blue
          oceanGrad.addColorStop(1, "#0a1122");   // Abyssal edge
        } else {
          oceanGrad.addColorStop(0, "#4299e1");
          oceanGrad.addColorStop(0.6, "#2b6cb0");
          oceanGrad.addColorStop(1, "#1a539b");
        }
        bgCtx.fillStyle = oceanGrad;
        bgCtx.beginPath();
        bgCtx.arc(ex, ey, er, 0, 2 * Math.PI);
        bgCtx.fill();

        // Draw spinning continents (clipped within sphere bounds)
        bgCtx.save();
        bgCtx.beginPath();
        bgCtx.arc(ex, ey, er, 0, 2 * Math.PI);
        bgCtx.clip();

        const mapWidth = er * 5.2; // total map width scroll cycle
        const spinOffset = (t * 0.14) % mapWidth;

        const drawLand = (offsetX) => {
          // Antarctica
          bgCtx.fillStyle = this.theme === "dark" ? "#64748b" : "#e2e8f0"; // icy glacier white
          bgCtx.beginPath();
          bgCtx.rect(offsetX - mapWidth, ey + er * 0.78, mapWidth * 2, er * 0.22);
          bgCtx.fill();

          // Green vegetation base
          bgCtx.fillStyle = this.theme === "dark" ? "#1e4d2b" : "#3b8e51";

          // Americas
          bgCtx.beginPath();
          bgCtx.moveTo(offsetX + er * 0.1, ey - er * 0.7);
          bgCtx.lineTo(offsetX + er * 0.4, ey - er * 0.7);
          bgCtx.quadraticCurveTo(offsetX + er * 0.55, ey - er * 0.55, offsetX + er * 0.6, ey - er * 0.4);
          bgCtx.lineTo(offsetX + er * 0.75, ey - er * 0.2);
          bgCtx.lineTo(offsetX + er * 0.6, ey - er * 0.1);
          bgCtx.lineTo(offsetX + er * 0.35, ey - er * 0.05);
          bgCtx.lineTo(offsetX + er * 0.4, ey + er * 0.1);
          bgCtx.lineTo(offsetX + er * 0.65, ey + er * 0.35);
          bgCtx.lineTo(offsetX + er * 0.58, ey + er * 0.65);
          bgCtx.lineTo(offsetX + er * 0.38, ey + er * 0.78);
          bgCtx.lineTo(offsetX + er * 0.28, ey + er * 0.4);
          bgCtx.lineTo(offsetX + er * 0.15, ey + er * 0.1);
          bgCtx.closePath();
          bgCtx.fill();

          // Land details (desert/sand mountain details)
          bgCtx.fillStyle = this.theme === "dark" ? "#5c4015" : "#c49a55";
          bgCtx.beginPath();
          bgCtx.moveTo(offsetX + er * 0.25, ey - er * 0.5);
          bgCtx.lineTo(offsetX + er * 0.45, ey - er * 0.4);
          bgCtx.lineTo(offsetX + er * 0.3, ey - er * 0.1);
          bgCtx.closePath();
          bgCtx.fill();

          // Africa, Europe & Asia
          bgCtx.fillStyle = this.theme === "dark" ? "#1b4425" : "#429f5b";
          bgCtx.beginPath();
          bgCtx.moveTo(offsetX + er * 1.8, ey - er * 0.78);
          bgCtx.lineTo(offsetX + er * 3.7, ey - er * 0.78);
          bgCtx.lineTo(offsetX + er * 3.85, ey - er * 0.5);
          bgCtx.lineTo(offsetX + er * 3.55, ey - er * 0.15); // India
          bgCtx.lineTo(offsetX + er * 3.2, ey - er * 0.1);
          bgCtx.lineTo(offsetX + er * 2.8, ey - er * 0.3); // Arabia
          bgCtx.lineTo(offsetX + er * 2.6, ey - er * 0.1);
          bgCtx.lineTo(offsetX + er * 2.85, ey + er * 0.05); // Somalia
          bgCtx.lineTo(offsetX + er * 2.75, ey + er * 0.4);
          bgCtx.lineTo(offsetX + er * 2.45, ey + er * 0.75); // South Africa
          bgCtx.lineTo(offsetX + er * 2.2, ey + er * 0.5);
          bgCtx.lineTo(offsetX + er * 1.95, ey + er * 0.1); // West Africa
          bgCtx.lineTo(offsetX + er * 1.9, ey - er * 0.35); // Spain/Med
          bgCtx.closePath();
          bgCtx.fill();

          // Sahara/Gobi Desert details
          bgCtx.fillStyle = this.theme === "dark" ? "#6b501f" : "#d8b26f";
          bgCtx.beginPath();
          bgCtx.moveTo(offsetX + er * 2.1, ey - er * 0.3);
          bgCtx.lineTo(offsetX + er * 2.7, ey - er * 0.25);
          bgCtx.lineTo(offsetX + er * 2.6, ey + er * 0.1);
          bgCtx.lineTo(offsetX + er * 2.1, ey + er * 0.05);
          bgCtx.closePath();
          bgCtx.fill();

          // Australia
          bgCtx.fillStyle = this.theme === "dark" ? "#1e4d2b" : "#429f5b";
          bgCtx.beginPath();
          bgCtx.arc(offsetX + er * 4.15, ey + er * 0.38, er * 0.19, 0, 2 * Math.PI);
          bgCtx.fill();

          // Outback Desert detail
          bgCtx.fillStyle = this.theme === "dark" ? "#6b501f" : "#d8b26f";
          bgCtx.beginPath();
          bgCtx.arc(offsetX + er * 4.15, ey + er * 0.38, er * 0.12, 0, 2 * Math.PI);
          bgCtx.fill();
        };

        drawLand(ex - spinOffset);
        drawLand(ex - spinOffset + mapWidth);
        drawLand(ex - spinOffset - mapWidth);

        // Draw 3D rotating clouds layer (parallax)
        const cloudOffset = (t * 0.22) % mapWidth;
        const drawClouds = (offsetX) => {
          bgCtx.fillStyle = "rgba(255, 255, 255, 0.4)";
          // Cloud system 1: Northern swirl
          bgCtx.beginPath();
          bgCtx.arc(offsetX + er * 0.8, ey - er * 0.4, er * 0.18, 0, 2 * Math.PI);
          bgCtx.arc(offsetX + er * 1.0, ey - er * 0.45, er * 0.15, 0, 2 * Math.PI);
          bgCtx.fill();

          // Cloud system 2: Equatorial belt
          bgCtx.beginPath();
          bgCtx.rect(offsetX + er * 1.5, ey - er * 0.08, er * 0.8, er * 0.16);
          bgCtx.rect(offsetX + er * 3.6, ey + er * 0.05, er * 0.7, er * 0.14);
          bgCtx.fill();

          // Cloud system 3: Southern swirl
          bgCtx.beginPath();
          bgCtx.arc(offsetX + er * 0.4, ey + er * 0.4, er * 0.18, 0, 2 * Math.PI);
          bgCtx.arc(offsetX + er * 2.8, ey + er * 0.45, er * 0.15, 0, 2 * Math.PI);
          bgCtx.fill();
        };
        drawClouds(ex - cloudOffset);
        drawClouds(ex - cloudOffset + mapWidth);
        drawClouds(ex - cloudOffset - mapWidth);

        // Draw 3D rotating latitude/longitude grid lines overlay (subtle)
        bgCtx.strokeStyle = this.theme === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.07)";
        bgCtx.lineWidth = 0.8;
        
        // Latitudes
        for (let lat = -60; lat <= 60; lat += 30) {
          const latY = ey + Math.sin(lat * Math.PI / 180) * er;
          const latW = Math.cos(lat * Math.PI / 180) * er;
          bgCtx.beginPath();
          bgCtx.moveTo(ex - latW, latY);
          bgCtx.lineTo(ex + latW, latY);
          bgCtx.stroke();
        }

        // Longitudes
        for (let lon = 0; lon < 180; lon += 45) {
          const angle = ((lon + t * 0.25) % 180) * Math.PI / 180;
          const latW = Math.sin(angle) * er;
          bgCtx.beginPath();
          bgCtx.ellipse(ex, ey, Math.abs(latW), er, 0, 0, 2 * Math.PI);
          bgCtx.stroke();
        }

        // 3D Spherical Shadow overlay (creates high quality realistic 3D orb depth)
        const shadowGrad = bgCtx.createRadialGradient(ex - er * 0.4, ey - er * 0.4, er * 0.2, ex, ey, er);
        shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
        shadowGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.35)");
        shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0.88)");
        bgCtx.fillStyle = shadowGrad;
        bgCtx.beginPath();
        bgCtx.arc(ex, ey, er, 0, 2 * Math.PI);
        bgCtx.fill();

        bgCtx.restore();

        // Atmosphere outer limb glow
        const atmGrad = bgCtx.createRadialGradient(ex, ey, er - 2, ex, ey, er * 1.25);
        if (this.theme === "dark") {
          atmGrad.addColorStop(0, "rgba(100, 190, 255, 0.35)");
          atmGrad.addColorStop(0.2, "rgba(100, 190, 255, 0.15)");
          atmGrad.addColorStop(1, "rgba(100, 190, 255, 0)");
        } else {
          atmGrad.addColorStop(0, "rgba(74, 144, 226, 0.25)");
          atmGrad.addColorStop(0.3, "rgba(74, 144, 226, 0.15)");
          atmGrad.addColorStop(1, "rgba(74, 144, 226, 0)");
        }
        bgCtx.fillStyle = atmGrad;
        bgCtx.beginPath();
        bgCtx.arc(ex, ey, er * 1.25, 0, 2 * Math.PI);
        bgCtx.fill();
      }

      // 5. Draw Small Orange Mars-Like Planet (Bottom-Left)
      if (w > 992) {
        const px = 140;
        const py = h - 160;
        const pr = 35;

        const pGrad = bgCtx.createRadialGradient(px - pr * 0.2, py - pr * 0.2, 2, px, py, pr);
        if (this.theme === "dark") {
          pGrad.addColorStop(0, "#be523c");
          pGrad.addColorStop(1, "#49130d");
        } else {
          pGrad.addColorStop(0, "#df7c67");
          pGrad.addColorStop(1, "#8e3523");
        }
        bgCtx.fillStyle = pGrad;
        bgCtx.beginPath();
        bgCtx.arc(px, py, pr, 0, 2 * Math.PI);
        bgCtx.fill();

        const pShadow = bgCtx.createLinearGradient(px - pr, py, px + pr, py);
        pShadow.addColorStop(0, "rgba(0, 0, 0, 0)");
        pShadow.addColorStop(1, this.theme === "dark" ? "rgba(0, 0, 0, 0.72)" : "rgba(0, 0, 0, 0.28)");
        bgCtx.fillStyle = pShadow;
        bgCtx.beginPath();
        bgCtx.arc(px, py, pr, 0, 2 * Math.PI);
        bgCtx.fill();
      }

      t++;
      requestAnimationFrame(draw);
    };

    draw();
  }

  renderSidebar() {
    const container = document.getElementById("topic-sidebar-menu");
    if (!container) return;
    container.innerHTML = "";
    
    topicsData.forEach((t, index) => {
      const li = document.createElement("li");
      li.className = "topic-item";
      li.innerHTML = `
        <button class="topic-btn ${index === this.activeTopic ? 'active' : ''}" onclick="app.loadTopic(${index})">
          <span class="badge">${index + 1}</span>
          ${t.title}
        </button>
      `;
      container.appendChild(li);
    });
  }

  loadTopic(index) {
    // Stop any running animations
    this.stopWatchAnimation();
    
    this.activeTopic = index;
    this.flowStep = "read";
    
    // Reset indicators
    this.flashcardIndex = 0;
    this.flashcardFlipped = false;
    this.activeMiniQuizQ = 0;
    this.miniQuizAnswers = [];
    
    // Update sidebar layout
    this.renderSidebar();

    // Toggle main viewport view
    document.getElementById("topic-section").style.display = "block";
    document.getElementById("final-test-section").style.display = "none";
    document.getElementById("sidebar-final-test-btn").classList.remove("active");

    // Populate metadata
    document.getElementById("topic-meta-display").innerText = `Topic ${index + 1} of ${topicsData.length}`;
    document.getElementById("topic-title-display").innerText = topicsData[index].title;
    document.getElementById("current-active-topic-num").innerText = index + 1;

    // Load content views
    this.renderReadTab();
    this.renderReviseTab();
    
    // Set tab active
    this.setFlowStep("read");
  }

  setFlowStep(step) {
    this.stopWatchAnimation();
    this.flowStep = step;

    // Highlight active tab
    const tabs = ["read", "watch", "explore", "practice", "revise"];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-${t}`);
      const view = document.getElementById(`view-${t}`);
      if (btn) btn.classList.remove("active");
      if (view) view.classList.remove("active");
    });

    const activeBtn = document.getElementById(`tab-${step}`);
    const activeView = document.getElementById(`view-${step}`);
    if (activeBtn) activeBtn.classList.add("active");
    if (activeView) activeView.classList.add("active");

    // Load visual specific parameters
    if (step === "watch") {
      this.initWatchAnimation();
    } else if (step === "explore") {
      this.initExploreSimulation();
    } else if (step === "practice") {
      this.initMiniQuiz();
    } else if (step === "revise") {
      this.renderFlashcard();
    }

    // Update bottom CTA banner text
    const ctaTitle = document.getElementById("next-step-title-display");
    const ctaBtn = document.getElementById("next-step-action-btn");
    
    if (step === "read") {
      ctaTitle.innerText = "Proceed to Watch Animation";
      ctaBtn.innerText = "Next: Watch";
    } else if (step === "watch") {
      ctaTitle.innerText = "Proceed to Interactive Sandbox";
      ctaBtn.innerText = "Next: Explore";
    } else if (step === "explore") {
      ctaTitle.innerText = "Proceed to Mini Quiz Practice";
      ctaBtn.innerText = "Next: Practice";
    } else if (step === "practice") {
      ctaTitle.innerText = "Proceed to Topic Revision";
      ctaBtn.innerText = "Next: Revise";
    } else if (step === "revise") {
      if (this.activeTopic < topicsData.length - 1) {
        ctaTitle.innerText = "Proceed to Next Topic Lesson";
        ctaBtn.innerText = "Next Lesson";
      } else {
        ctaTitle.innerText = "Congratulations! Take the Final Test";
        ctaBtn.innerText = "Start Final Test";
      }
    }
  }

  advanceFlowStep() {
    if (this.flowStep === "read") this.setFlowStep("watch");
    else if (this.flowStep === "watch") this.setFlowStep("explore");
    else if (this.flowStep === "explore") this.setFlowStep("practice");
    else if (this.flowStep === "practice") this.setFlowStep("revise");
    else if (this.flowStep === "revise") {
      if (this.activeTopic < topicsData.length - 1) {
        this.loadTopic(this.activeTopic + 1);
      } else {
        this.showFinalTestIntro();
      }
    }
  }

  // --- TAB 1: READ RENDERING ---
  renderReadTab() {
    const data = topicsData[this.activeTopic];
    document.getElementById("read-text-container").innerHTML = data.readText;
    document.getElementById("remember-text").innerText = data.remember;
    document.getElementById("fun-fact-text").innerText = data.funFact;
    document.getElementById("real-life-text").innerText = data.realLife;

    const vocabContainer = document.getElementById("vocab-container");
    vocabContainer.innerHTML = "";
    data.vocab.forEach(v => {
      const card = document.createElement("div");
      card.className = "vocab-card";
      card.innerHTML = `
        <div class="vocab-word">${v.word}</div>
        <div class="vocab-definition">${v.definition}</div>
      `;
      vocabContainer.appendChild(card);
    });
  }

  // --- TAB 2: WATCH ANIMATIONS (CANVAS LOGIC) ---
  initWatchAnimation() {
    this.watchFrame = 0;
    this.watchPlaying = true;
    this.animateWatch();
  }

  toggleWatchAnimation() {
    this.watchPlaying = !this.watchPlaying;
    if (this.watchPlaying) this.animateWatch();
  }

  resetWatchAnimation() {
    this.watchFrame = 0;
    if (!this.watchPlaying) {
      this.watchPlaying = true;
      this.animateWatch();
    }
  }

  stopWatchAnimation() {
    this.watchPlaying = false;
    if (this.watchAnimId) {
      cancelAnimationFrame(this.watchAnimId);
      this.watchAnimId = null;
    }
  }

  animateWatch() {
    if (!this.watchPlaying) return;
    this.renderWatchFrame();
    this.watchFrame++;
    this.watchAnimId = requestAnimationFrame(() => this.animateWatch());
  }

  renderWatchFrame() {
    const ctx = this.watchCtx;
    const w = this.watchCanvas.width;
    const h = this.watchCanvas.height;
    ctx.clearRect(0, 0, w, h);

    // Theme-adapted background
    ctx.fillStyle = this.theme === "dark" ? "#0c121e" : "#fbf9f4";
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    
    // Grid overlay background
    ctx.strokeStyle = this.theme === "dark" ? "rgba(176, 129, 63, 0.05)" : "rgba(176, 129, 63, 0.12)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Add Srivardhan branding text in canvas background
    ctx.fillStyle = this.theme === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(176, 129, 63, 0.06)";
    ctx.font = "italic 700 36px 'Cormorant Garamond'";
    ctx.textAlign = "center";
    ctx.fillText("SRIVARDHAN", w / 2, h - 30);

    // Delegate rendering to multi-chapter routing method
    this.drawWatchContent(this.activeChapter, this.activeTopic, ctx, w, h);

    ctx.restore();
  }

  drawTopic1Watch(ctx, w, h) {
    // Topic 1: Globe to Flat Map Projection animation
    const cx = w / 2;
    const cy = h / 2;
    const r = 100;
    
    const progress = (this.watchFrame % 300) / 300; // loop animation
    
    ctx.lineWidth = 2;

    if (progress < 0.4) {
      // Phase 1: Spinning 3D Globe
      const rotateAngle = progress * 10 * Math.PI;

      // Draw sphere shadow outline
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.fillStyle = "#162237";
      ctx.fill();
      ctx.strokeStyle = "#b0813f";
      ctx.stroke();

      // Latitudes
      for (let offset = -80; offset <= 80; offset += 30) {
        const rad = Math.asin(offset / r);
        const ellipseH = r * Math.cos(rad);
        ctx.strokeStyle = "rgba(176, 129, 63, 0.3)";
        ctx.beginPath();
        ctx.ellipse(cx, cy + offset, r * Math.cos(rad), 5, 0, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Longitudes (spinning)
      for (let i = 0; i < 6; i++) {
        const angleOffset = (i * Math.PI / 3) + rotateAngle;
        const width = r * Math.cos(angleOffset);
        if (Math.sin(angleOffset) > 0) {
          ctx.strokeStyle = "rgba(176, 129, 63, 0.4)";
          ctx.beginPath();
          ctx.ellipse(cx, cy, Math.abs(width), r, 0, -Math.PI/2, Math.PI/2);
          ctx.stroke();
        }
      }

      // Title tag
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Spherical Earth (3D Globe)", cx, cy + r + 30);
    } 
    else if (progress >= 0.4 && progress < 0.8) {
      // Phase 2: Stretching / Unwrapping
      const transition = (progress - 0.4) / 0.4; // 0 to 1

      const mapWidth = r * Math.PI * 2 * transition;
      const mapHeight = r * 2;
      const startX = cx - mapWidth / 2;
      const startY = cy - mapHeight / 2;

      // Cylindrical projection wrapping animation
      ctx.strokeStyle = "#b0813f";
      ctx.fillStyle = "#162237";
      ctx.beginPath();
      ctx.rect(startX, startY, mapWidth, mapHeight);
      ctx.fill();
      ctx.stroke();

      // Grid lines drawing gradually
      ctx.strokeStyle = "rgba(176, 129, 63, 0.4)";
      const linesCount = 8;
      for (let i = 0; i <= linesCount; i++) {
        const lx = startX + (mapWidth * i / linesCount);
        ctx.beginPath();
        ctx.moveTo(lx, startY);
        ctx.lineTo(lx, startY + mapHeight);
        ctx.stroke();
      }

      // Horizontal lines
      const hLines = 6;
      for (let j = 0; j <= hLines; j++) {
        const ly = startY + (mapHeight * j / hLines);
        ctx.beginPath();
        ctx.moveTo(startX, ly);
        ctx.lineTo(startX + mapWidth, ly);
        ctx.stroke();
      }

      // Title tag
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Projecting Curved Grids to Flat Plane...", cx, cy + r + 30);
    } 
    else {
      // Phase 3: Flat Map showing distortion (Greenland vs Africa size distortion demo)
      const startX = cx - 180;
      const startY = cy - 90;
      const mw = 360;
      const mh = 180;

      // Draw flat map background
      ctx.fillStyle = "#162237";
      ctx.fillRect(startX, startY, mw, mh);
      ctx.strokeStyle = "#b0813f";
      ctx.strokeRect(startX, startY, mw, mh);

      // Draw grid
      ctx.strokeStyle = "rgba(176, 129, 63, 0.15)";
      for (let i = 0; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(startX + (mw * i / 10), startY);
        ctx.lineTo(startX + (mw * i / 10), startY + mh);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(startX, startY + (mh * i / 10));
        ctx.lineTo(startX + mw, startY + (mh * i / 10));
        ctx.stroke();
      }

      // Illustrate Greenland (top) and Africa (equator) size distortion
      // Greenland (stetched large)
      ctx.fillStyle = "rgba(192, 92, 70, 0.7)";
      ctx.beginPath();
      ctx.moveTo(startX + mw * 0.35, startY + 20);
      ctx.lineTo(startX + mw * 0.45, startY + 15);
      ctx.lineTo(startX + mw * 0.48, startY + 45);
      ctx.lineTo(startX + mw * 0.38, startY + 50);
      ctx.closePath();
      ctx.fill();
      
      // Africa (realistic smaller comparative scale)
      ctx.fillStyle = "rgba(47, 86, 71, 0.7)";
      ctx.beginPath();
      ctx.moveTo(startX + mw * 0.48, startY + 80);
      ctx.lineTo(startX + mw * 0.58, startY + 82);
      ctx.lineTo(startX + mw * 0.56, startY + 120);
      ctx.lineTo(startX + mw * 0.52, startY + 140);
      ctx.lineTo(startX + mw * 0.49, startY + 105);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "11px 'Plus Jakarta Sans'";
      ctx.textAlign = "left";
      ctx.fillText("Greenland (Looks large due to stretching)", startX + 10, startY + 30);
      ctx.fillText("Africa (Actually 14x larger in reality!)", startX + 10, startY + mh - 20);

      // Title tag
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Completed Flat Mercator Map (Distortion at Poles)", cx, cy + r + 30);
    }
  }

  drawTopic2Watch(ctx, w, h) {
    // Topic 2: Antique map scroll history
    const progress = (this.watchFrame % 450) / 450;
    const cx = w / 2;
    const cy = h / 2;

    if (progress < 0.33) {
      // Sumerian Clay Map view
      ctx.strokeStyle = "#c48f43";
      ctx.lineWidth = 3;
      
      // Clay outline
      ctx.fillStyle = "#8a6635";
      ctx.beginPath();
      ctx.moveTo(cx - 120, cy - 80);
      ctx.quadraticCurveTo(cx - 130, cy + 10, cx - 110, cy + 90);
      ctx.quadraticCurveTo(cx + 20, cy + 100, cx + 110, cy + 80);
      ctx.quadraticCurveTo(cx + 120, cy - 30, cx + 100, cy - 90);
      ctx.quadraticCurveTo(cx - 50, cy - 100, cx - 120, cy - 80);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Incised boundaries
      ctx.strokeStyle = "#4d3618";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 80, cy - 30);
      ctx.lineTo(cx + 80, cy - 30);
      ctx.moveTo(cx - 40, cy + 40);
      ctx.lineTo(cx + 60, cy + 40);
      ctx.moveTo(cx, cy - 70);
      ctx.lineTo(cx, cy + 70);
      ctx.stroke();

      // Cuneiform markings
      ctx.fillStyle = "#2c1c08";
      ctx.font = "14px monospace";
      ctx.fillText("▼▼ ◀▶ ▼", cx - 50, cy - 50);
      ctx.fillText("◀◀ ▼▼", cx + 20, cy + 20);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Ancient Sumerian Clay Tablet (Tax Records, 2000 BC)", cx, cy + 130);
    } 
    else if (progress >= 0.33 && progress < 0.66) {
      // Al-Idrisi Circular Map (South at top)
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#c48f43";
      
      // Circular map border
      ctx.beginPath();
      ctx.arc(cx, cy - 10, 90, 0, 2*Math.PI);
      ctx.fillStyle = "#1d293d";
      ctx.fill();
      ctx.stroke();

      // Outer Ocean Ring
      ctx.beginPath();
      ctx.arc(cx, cy - 10, 100, 0, 2*Math.PI);
      ctx.stroke();

      // Sketchy shapes of continents (inverted: Africa at top right, India/Asia top left)
      ctx.fillStyle = "#3e5229";
      ctx.beginPath();
      ctx.arc(cx + 30, cy - 40, 40, 0, Math.PI * 1.5); // Africa
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#2f5647";
      ctx.beginPath();
      ctx.moveTo(cx - 60, cy - 20);
      ctx.quadraticCurveTo(cx - 20, cy + 30, cx - 10, cy - 30);
      ctx.closePath();
      ctx.fill();

      // Labels in Arabic/Latin simulation style
      ctx.fillStyle = "#c48f43";
      ctx.font = "bold 12px serif";
      ctx.fillText("SOUTH (TOP)", cx, cy - 115);
      ctx.fillText("NORTH (BOTTOM)", cx, cy + 110);
      ctx.fillStyle = "#fff";
      ctx.fillText("AFRICA", cx + 20, cy - 40);
      ctx.fillText("EUROPE", cx - 40, cy + 20);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Al-Idrisi's World Map (South Oriented, 1154 AD)", cx, cy + 130);
    } 
    else {
      // Mercator Navigation map grid
      ctx.strokeStyle = "#b0813f";
      ctx.strokeRect(cx - 150, cy - 90, 300, 180);
      ctx.fillStyle = "#162237";
      ctx.fillRect(cx - 150, cy - 90, 300, 180);

      // Grid intersections are at exactly 90 degrees
      ctx.strokeStyle = "rgba(176, 129, 63, 0.3)";
      for (let x = cx - 120; x < cx + 150; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, cy - 90);
        ctx.lineTo(x, cy + 90);
        ctx.stroke();
      }
      for (let y = cy - 70; y < cy + 90; y += 28) {
        ctx.beginPath();
        ctx.moveTo(cx - 150, y);
        ctx.lineTo(cx + 150, y);
        ctx.stroke();
      }

      // Compass Rose
      ctx.fillStyle = "#b0813f";
      ctx.beginPath();
      ctx.arc(cx + 90, cy + 30, 20, 0, 2 * Math.PI);
      ctx.stroke();
      // directional pointer
      ctx.beginPath();
      ctx.moveTo(cx + 90, cy + 15);
      ctx.lineTo(cx + 95, cy + 30);
      ctx.lineTo(cx + 90, cy + 25);
      ctx.lineTo(cx + 85, cy + 30);
      ctx.closePath();
      ctx.fill();

      // Navigation line (straight line crossing grid lines at equal angles)
      ctx.strokeStyle = "#c05c46";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 110, cy + 40);
      ctx.lineTo(cx + 40, cy - 50);
      ctx.stroke();
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "italic 11px 'Plus Jakarta Sans'";
      ctx.fillText("Straight Rhumb Line (Constant Angle)", cx - 110, cy + 60);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Gerardus Mercator's Navigation Grid (1569 AD)", cx, cy + 130);
    }
  }

  drawTopic3Watch(ctx, w, h) {
    // Topic 3: Triangulation measurement animation
    const progress = (this.watchFrame % 300) / 300;
    const cx = w / 2;
    const cy = h / 2 + 20;

    // Define 3 triangulation towers
    const tA = { x: cx - 150, y: cy + 40, name: "St. Thomas Mount (Madras)" };
    const tB = { x: cx + 150, y: cy + 40, name: "Base Station B" };
    const tC = { x: cx, y: cy - 90, name: "Himalayan Peak Survey" };

    // Draw terrain hills under towers
    ctx.fillStyle = "#1b2a3a";
    ctx.beginPath();
    ctx.moveTo(tA.x - 50, tA.y + 40);
    ctx.lineTo(tA.x, tA.y - 10);
    ctx.lineTo(tA.x + 50, tA.y + 40);
    
    ctx.moveTo(tB.x - 50, tB.y + 40);
    ctx.lineTo(tB.x, tB.y - 10);
    ctx.lineTo(tB.x + 50, tB.y + 40);
    
    ctx.moveTo(tC.x - 80, tC.y + 170);
    ctx.lineTo(tC.x, tC.y - 15);
    ctx.lineTo(tC.x + 80, tC.y + 170);
    ctx.fill();

    // Draw little tower shapes on hills
    [tA, tB, tC].forEach((t, index) => {
      ctx.strokeStyle = "#c48f43";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(t.x - 8, t.y);
      ctx.lineTo(t.x + 8, t.y);
      ctx.lineTo(t.x, t.y - 25);
      ctx.closePath();
      ctx.stroke();

      // Flashlight indicator beacon
      ctx.fillStyle = (progress * 5 % 1 > 0.5) ? "#ff3333" : "#771111";
      ctx.beginPath();
      ctx.arc(t.x, t.y - 27, 3, 0, 2*Math.PI);
      ctx.fill();
    });

    // Draw step-by-step surveying line connections
    ctx.lineWidth = 3;
    if (progress > 0.1) {
      // Draw Baseline A -> B
      ctx.strokeStyle = "#2f5647";
      ctx.beginPath();
      ctx.moveTo(tA.x, tA.y - 25);
      ctx.lineTo(tB.x, tB.y - 25);
      ctx.stroke();
      ctx.fillStyle = "#2f5647";
      ctx.font = "bold 11px 'Plus Jakarta Sans'";
      ctx.fillText("1. Measured Baseline", cx, cy + 60);
    }
    if (progress > 0.4) {
      // Draw Line A -> C
      ctx.strokeStyle = "#b0813f";
      ctx.beginPath();
      ctx.moveTo(tA.x, tA.y - 25);
      ctx.lineTo(tC.x, tC.y - 25);
      ctx.stroke();
      
      // Draw angle arc at A
      ctx.strokeStyle = "#ff9900";
      ctx.beginPath();
      ctx.arc(tA.x, tA.y - 25, 20, -0.4, 0);
      ctx.stroke();
      ctx.fillText("2. Angle A", tA.x + 30, tA.y - 20);
    }
    if (progress > 0.7) {
      // Draw Line B -> C
      ctx.strokeStyle = "#b0813f";
      ctx.beginPath();
      ctx.moveTo(tB.x, tB.y - 25);
      ctx.lineTo(tC.x, tC.y - 25);
      ctx.stroke();

      // Draw angle arc at B
      ctx.strokeStyle = "#ff9900";
      ctx.beginPath();
      ctx.arc(tB.x, tB.y - 25, 20, Math.PI, Math.PI + 0.4);
      ctx.stroke();
      ctx.fillText("3. Angle B", tB.x - 60, tB.y - 20);

      // Fill calculated triangle
      ctx.fillStyle = "rgba(176, 129, 63, 0.15)";
      ctx.beginPath();
      ctx.moveTo(tA.x, tA.y - 25);
      ctx.lineTo(tB.x, tB.y - 25);
      ctx.lineTo(tC.x, tC.y - 25);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px 'Plus Jakarta Sans'";
      ctx.fillText("4. Peak Position Calculated!", tC.x, tC.y - 45);
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px 'Plus Jakarta Sans'";
    ctx.textAlign = "center";
    ctx.fillText("The Great Trigonometrical Triangulation Method", cx, cy - 120);
  }

  drawTopic4Watch(ctx, w, h) {
    // Topic 4: Thematic layers sliding down animation
    const progress = (this.watchFrame % 300) / 300;
    const cx = w / 2;
    const cy = h / 2 - 20;

    // We render isometric layers stacking
    // Layer parameters
    const layerW = 220;
    const layerH = 100;
    
    // Renders 3 layers: 
    // 0: Base outline Map (bottom)
    // 1: Relief colors (middle)
    // 2: Rainfall overlay (top)

    const drawLayerOutline = (x, y, color, titleText) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = "rgba(22, 34, 55, 0.85)";
      ctx.lineWidth = 2;
      
      // Isometric diamond outline
      ctx.beginPath();
      ctx.moveTo(x, y - layerH / 2);
      ctx.lineTo(x + layerW / 2, y);
      ctx.lineTo(x, y + layerH / 2);
      ctx.lineTo(x - layerW / 2, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.font = "bold 11px 'Plus Jakarta Sans'";
      ctx.fillText(titleText, x + layerW/2 + 20, y + 5);
    };

    // Calculate vertical positions based on progress
    // Layer 1 (Base Map) - Fixed at bottom
    drawLayerOutline(cx, cy + 70, "#5c6b80", "1. Base Political Boundary");
    
    // Layer 2 (Relief) - slides down
    let offset2 = 140 - (140 * Math.min(progress * 1.5, 1));
    drawLayerOutline(cx, cy + 70 - offset2, "#b0813f", "2. Physical Relief Shading");

    // Layer 3 (Rainfall) - slides down later
    let offset3 = 280 - (280 * Math.min(Math.max(progress - 0.3, 0) * 1.5, 1));
    drawLayerOutline(cx, cy + 70 - offset3, "#2f5647", "3. Rainfall Thematic Grid");

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px 'Plus Jakarta Sans'";
    ctx.textAlign = "center";
    ctx.fillText("How Thematic Maps Separate Data Layers", cx, cy - 100);
  }

  drawTopic5Watch(ctx, w, h) {
    // Topic 5: Contour Line profile slicing animation
    const progress = (this.watchFrame % 300) / 300;
    const cx = w / 2;
    const cy = h / 2 - 30;

    // Draw 3D Hill shape (front profile)
    ctx.strokeStyle = "#5c6b80";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 150, cy + 100);
    ctx.quadraticCurveTo(cx - 80, cy + 100, cx - 40, cy - 10); // steep left slope
    ctx.quadraticCurveTo(cx, cy - 80, cx + 20, cy - 80); // flat peak
    ctx.quadraticCurveTo(cx + 80, cy - 80, cx + 150, cy + 100); // gentle right slope
    ctx.stroke();

    // Slicing planes at specific heights
    const slices = [
      { y: cy + 60, heightText: "100 meters" },
      { y: cy + 10, heightText: "200 meters" },
      { y: cy - 40, heightText: "300 meters" }
    ];

    slices.forEach((slice, index) => {
      // Glow slicing line if animation progress is active
      const isActive = progress > (index * 0.3);
      ctx.strokeStyle = isActive ? "#c48f43" : "rgba(92, 107, 128, 0.3)";
      ctx.lineWidth = isActive ? 2 : 1;

      // Draw horizontal slicing plane
      ctx.beginPath();
      ctx.moveTo(cx - 160, slice.y);
      ctx.lineTo(cx + 160, slice.y);
      ctx.stroke();

      ctx.fillStyle = isActive ? "#c48f43" : "rgba(92, 107, 128, 0.4)";
      ctx.font = "10px monospace";
      ctx.fillText(slice.heightText, cx + 170, slice.y + 3);

      if (isActive) {
        // Project contour markers downward onto baseline
        ctx.strokeStyle = "rgba(192, 92, 70, 0.4)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        // Left intersection point (approximate)
        let leftX = cx - 110 + (index * 25);
        ctx.beginPath();
        ctx.moveTo(leftX, slice.y);
        ctx.lineTo(leftX, cy + 130);
        ctx.stroke();

        // Right intersection point (approximate)
        let rightX = cx + 115 - (index * 30);
        ctx.beginPath();
        ctx.moveTo(rightX, slice.y);
        ctx.lineTo(rightX, cy + 130);
        ctx.stroke();
        
        ctx.setLineDash([]); // reset

        // Draw 2D projected contour circles at baseline
        ctx.strokeStyle = "#c05c46";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy + 130, (rightX - leftX)/2, 8, 0, 0, 2*Math.PI);
        ctx.stroke();
      }
    });

    // Draw baseline
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 170, cy + 130);
    ctx.lineTo(cx + 170, cy + 130);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px 'Plus Jakarta Sans'";
    ctx.textAlign = "center";
    ctx.fillText("Slicing a Hill to Project 2D Contour Rings", cx, cy - 100);
    ctx.font = "11px 'Plus Jakarta Sans'";
    ctx.fillText("2D Contour Map Projection (Bottom)", cx, cy + 160);
  }

  // --- TAB 3: EXPLORE SIMULATIONS (CANVAS SANDBOXES) ---
  initExploreSimulation() {
    const container = document.getElementById("sandbox-controls-container");
    container.innerHTML = "";
    
    // Clear state
    this.exploreState = {
      topic: this.activeTopic,
      canvas: this.exploreCanvas,
      ctx: this.exploreCtx
    };

    const statusMsg = document.getElementById("explore-status-msg");
    statusMsg.innerText = "";

    // Set layout and render controls depending on active topic
    switch (this.activeTopic) {
      case 0:
        // Topic 1 Slider: Satellite vs Map
        this.exploreState.sliderX = this.exploreCanvas.width / 2;
        this.exploreState.dragging = false;
        container.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <p style="font-size:0.85rem; color:var(--text-secondary);">
              <strong>Drag the slider</strong> across the screen to contrast the realistic satellite photograph (left) with the simplified cartographic map (right). Hover over points of interest to explore symbol logic.
            </p>
          </div>
        `;
        break;
      case 1:
        // Topic 2: Antique Map Viewer
        this.exploreState.activeMap = 0; // 0 = Babylonian, 1 = Al-Idrisi, 2 = Mercator
        container.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom: 0.5rem;">
              <strong>Choose a historical map</strong> from the options below to study its cartographic layout, orientation, and social context:
            </p>
            <div style="display:flex; gap:0.5rem;">
              <button class="watch-btn" onclick="app.setExploreMap(0)">Babylonian Tablet (600 BC)</button>
              <button class="watch-btn" onclick="app.setExploreMap(1)">Al-Idrisi Map (1154 AD)</button>
              <button class="watch-btn" onclick="app.setExploreMap(2)">Mercator Navigation (1569 AD)</button>
            </div>
          </div>
        `;
        break;
      case 2:
        // Topic 3: Triangulation survey
        this.exploreState.surveyStep = 0; // 0=Madras baseline, 1=Bangalore, 2=Hyderabad, 3=Nagpur, 4=Completed
        this.exploreState.dialVal = 0;
        this.exploreState.triangles = [];
        this.exploreState.measuredPoints = [];
        this.renderTriangulationControls(container);
        break;
      case 3:
        // Topic 4: Thematic Layers
        this.exploreState.layers = {
          relief: true,
          rainfall: false,
          population: false
        };
        container.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom: 0.5rem;">
              <strong>Toggle thematic layers</strong> below to see spatial patterns on the Telangana map. Hover over districts to analyze local SCERT statistics.
            </p>
            <div style="display:flex; gap:1.5rem; flex-wrap: wrap;">
              <label style="font-weight:600; font-size:0.9rem; cursor:pointer;">
                <input type="checkbox" checked onchange="app.toggleThematicLayer('relief', this.checked)"> 🏔️ Physical Relief
              </label>
              <label style="font-weight:600; font-size:0.9rem; cursor:pointer;">
                <input type="checkbox" onchange="app.toggleThematicLayer('rainfall', this.checked)"> 🌧️ Annual Rainfall
              </label>
              <label style="font-weight:600; font-size:0.9rem; cursor:pointer;">
                <input type="checkbox" onchange="app.toggleThematicLayer('population', this.checked)"> 👥 Population Density
              </label>
            </div>
          </div>
        `;
        break;
      case 4:
        // Topic 5: Contour Lines Heights
        this.exploreState.heightVal = 120;
        this.exploreState.profile = "gentle"; // steep, gentle, cliff
        container.innerHTML = `
          <div style="display:flex; align-items:center; gap:2rem; flex-wrap: wrap;">
            <div style="display:flex; flex-direction:column; gap:0.25rem;">
              <label style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">Peak Height (meters): <span id="height-lbl">120m</span></label>
              <input type="range" min="50" max="200" value="120" style="accent-color:var(--accent-primary);" oninput="app.setContourHeight(this.value)">
            </div>
            <div style="display:flex; flex-direction:column; gap:0.25rem;">
              <label style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">Slope Profile Shape:</label>
              <select onchange="app.setContourProfile(this.value)" style="padding:0.4rem 0.8rem; border-radius:6px; border:1px solid var(--border-color); font-family:var(--font-sans); outline:none;">
                <option value="gentle">Gentle Uniform Slope</option>
                <option value="steep">Steep Uniform Slope</option>
                <option value="cliff">Steep Cliff (West Side)</option>
              </select>
            </div>
            <p style="font-size:0.8rem; color:var(--text-secondary); max-width: 320px;">
              Changing peak height adds/removes lines. Different slope shapes bunch contour lines closer or spread them further apart!
            </p>
          </div>
        `;
        break;
    }

    this.renderExploreSandbox();
  }

  setupExploreListeners() {
    const canvas = this.exploreCanvas;
    
    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const my = (e.clientY - rect.top) * (canvas.height / rect.height);

      if (this.activeTopic === 0) {
        // Check if mouse is on the slider bar
        const sliderX = this.exploreState.sliderX;
        if (Math.abs(mx - sliderX) < 15) {
          this.exploreState.dragging = true;
        }
      }
    });

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const my = (e.clientY - rect.top) * (canvas.height / rect.height);

      this.exploreState.mouseX = mx;
      this.exploreState.mouseY = my;

      if (this.activeTopic === 0 && this.exploreState.dragging) {
        // Drag slider
        this.exploreState.sliderX = Math.max(10, Math.min(canvas.width - 10, mx));
        this.renderExploreSandbox();
      } else if (this.activeTopic === 0 || this.activeTopic === 1 || this.activeTopic === 3) {
        // Hover updates
        this.renderExploreSandbox();
      }
    });

    window.addEventListener("mouseup", () => {
      if (this.activeTopic === 0) {
        this.exploreState.dragging = false;
      }
    });
  }

  renderExploreSandbox() {
    const ctx = this.exploreCtx;
    const w = this.exploreCanvas.width;
    const h = this.exploreCanvas.height;
    
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = this.theme === "dark" ? "#1e293b" : "#faf8f5";
    ctx.fillRect(0, 0, w, h);

    // Grid details
    ctx.strokeStyle = this.theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Delegate rendering to multi-chapter routing method
    this.drawExploreContent(this.activeChapter, this.activeTopic, ctx, w, h);
  }

  // --- TOPIC 1 SIMULATION: SPLIT SLIDER ---
  drawTopic1Sandbox(ctx, w, h) {
    const sliderX = this.exploreState.sliderX;

    // Define landscape features
    const lake = [
      { x: 300, y: 150 }, { x: 450, y: 120 }, { x: 500, y: 190 }, 
      { x: 400, y: 260 }, { x: 320, y: 220 }
    ];
    const park = { x: 120, y: 280, r: 70 };
    const roadNodes = [
      { x: 50, y: 180 }, { x: 220, y: 190 }, { x: 320, y: 130 },
      { x: 520, y: 220 }, { x: 700, y: 200 }
    ];

    // Landmark: Buddha Statue at Hussain Sagar
    const buddha = { x: 410, y: 180 };

    // --- DRAW LEFT SIDE: Satellite view ---
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, sliderX, h);
    ctx.clip();

    // Satellite land textures
    ctx.fillStyle = "#2d3e24"; // Forest dark green
    ctx.fillRect(0, 0, w, h);

    // Build organic fields
    ctx.fillStyle = "#3b5230";
    ctx.fillRect(50, 40, 200, 120);
    ctx.fillStyle = "#273620";
    ctx.fillRect(500, 280, 200, 180);

    // Draw detailed water body
    ctx.fillStyle = "#16283d";
    ctx.beginPath();
    ctx.moveTo(lake[0].x, lake[0].y);
    lake.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.fill();
    // detailed shoreline sand
    ctx.strokeStyle = "#80705a";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw tree assets on park
    ctx.fillStyle = "#1d5218";
    ctx.beginPath();
    ctx.arc(park.x, park.y, park.r, 0, 2*Math.PI);
    ctx.fill();
    // small circles representing individual tree crowns
    ctx.fillStyle = "#0f360c";
    for(let i=0; i<8; i++) {
      ctx.beginPath();
      ctx.arc(park.x - 30 + (i*10), park.y - 20 + (Math.sin(i)*15), 12, 0, 2*Math.PI);
      ctx.fill();
    }

    // Draw realistic gray roads
    ctx.strokeStyle = "#555555";
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(roadNodes[0].x, roadNodes[0].y);
    roadNodes.forEach(rn => ctx.lineTo(rn.x, rn.y));
    ctx.stroke();
    // Road center dashes
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 8]);
    ctx.beginPath();
    ctx.moveTo(roadNodes[0].x, roadNodes[0].y);
    roadNodes.forEach(rn => ctx.lineTo(rn.x, rn.y));
    ctx.stroke();
    ctx.setLineDash([]); // clear

    // Draw realistic Buddha Statue
    ctx.fillStyle = "#b0c4de"; // stone blue-grey
    ctx.beginPath();
    ctx.arc(buddha.x, buddha.y, 8, 0, 2*Math.PI);
    ctx.fill();
    // shadow
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.beginPath();
    ctx.ellipse(buddha.x + 4, buddha.y + 4, 8, 4, 0, 0, 2*Math.PI);
    ctx.fill();

    // Draw tiny buildings blocks
    ctx.fillStyle = "#b05c46";
    ctx.fillRect(100, 80, 20, 15);
    ctx.fillRect(130, 75, 18, 20);
    ctx.fillStyle = "#e0a96d";
    ctx.fillRect(200, 380, 30, 25);
    ctx.fillRect(240, 370, 25, 25);

    ctx.restore();

    // --- DRAW RIGHT SIDE: Cartographic Map view ---
    ctx.save();
    ctx.beginPath();
    ctx.rect(sliderX, 0, w - sliderX, h);
    ctx.clip();

    // Parchment base map
    ctx.fillStyle = "#fcfaf6";
    ctx.fillRect(0, 0, w, h);

    // Simplified agricultural block (colored zone)
    ctx.fillStyle = "#e6eedc";
    ctx.strokeStyle = "#c8dcb3";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(50, 40, 200, 120);
    ctx.fill();
    ctx.stroke();

    // Map rivers/water (Hussain Sagar lake)
    ctx.fillStyle = "#8dc1e9";
    ctx.strokeStyle = "#5ca5d8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lake[0].x, lake[0].y);
    lake.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Simplified road lines (cartographic standard: double orange lines)
    ctx.strokeStyle = "#c48f43";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(roadNodes[0].x, roadNodes[0].y);
    roadNodes.forEach(rn => ctx.lineTo(rn.x, rn.y));
    ctx.stroke();
    
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(roadNodes[0].x, roadNodes[0].y);
    roadNodes.forEach(rn => ctx.lineTo(rn.x, rn.y));
    ctx.stroke();

    // Simplified Park boundary (Green block with small tree symbols)
    ctx.fillStyle = "#cae8c8";
    ctx.strokeStyle = "#9ccf98";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(park.x, park.y, park.r, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
    // Tree Symbol icon
    ctx.fillStyle = "#2f5647";
    ctx.font = "16px sans-serif";
    ctx.fillText("🌳", park.x - 20, park.y);
    ctx.fillText("🌳", park.x + 20, park.y + 10);

    // Buddha Statue Symbol (Red dot inside circle standard landmark symbol)
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(buddha.x, buddha.y, 6, 0, 2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(buddha.x, buddha.y, 2, 0, 2*Math.PI);
    ctx.fill();

    // Cartographic Labels
    ctx.fillStyle = "#121c2c";
    ctx.font = "italic bold 12px 'Cormorant Garamond'";
    ctx.textAlign = "center";
    ctx.fillText("Hussain Sagar Lake", buddha.x, buddha.y + 35);
    ctx.fillText("Necklace Road", roadNodes[1].x + 40, roadNodes[1].y - 12);
    ctx.fillText("Sanjivaiah Park", park.x, park.y + 5);

    // Map Details (Compass and scale)
    ctx.fillStyle = "#121c2c";
    ctx.font = "bold 10px 'Plus Jakarta Sans'";
    ctx.textAlign = "right";
    ctx.fillText("N ↑", w - 30, 40);
    ctx.fillText("Scale: 1 cm = 100 meters", w - 30, h - 30);

    ctx.restore();

    // --- DRAW SLIDER DRAGGABLE BAR ---
    ctx.strokeStyle = "var(--accent-primary)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sliderX, 0);
    ctx.lineTo(sliderX, h);
    ctx.stroke();
    
    // Slider handle circle
    ctx.fillStyle = "var(--bg-card)";
    ctx.strokeStyle = "var(--accent-primary)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(sliderX, h / 2, 16, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
    // slider arrows
    ctx.fillStyle = "var(--accent-primary)";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("◀▶", sliderX, h / 2);

    // --- INTERACTIVE TOOLTIP ON HOVER ---
    const mx = this.exploreState.mouseX || 0;
    const my = this.exploreState.mouseY || 0;

    let distBuddha = Math.hypot(mx - buddha.x, my - buddha.y);
    let distPark = Math.hypot(mx - park.x, my - park.y);

    if (distBuddha < 25) {
      this.drawTooltip(ctx, mx, my, "Buddha Statue", 
        "Map: Red point symbol. Photo: Grey granite monolith sculpture standing in Hussain Sagar lake.");
    } else if (distPark < park.r) {
      this.drawTooltip(ctx, mx, my, "Sanjivaiah Park", 
        "Map: Standard green zone. Photo: Dense canopy of green tree crowns, footpaths, and gardens.");
    }
  }

  // --- TOPIC 2 SIMULATION: HISTORICAL MAP EXPLORER ---
  setExploreMap(mapIndex) {
    this.exploreState.activeMap = mapIndex;
    this.renderExploreSandbox();
  }

  drawTopic2Sandbox(ctx, w, h) {
    const activeMap = this.exploreState.activeMap;
    const mx = this.exploreState.mouseX || 0;
    const my = this.exploreState.mouseY || 0;

    if (activeMap === 0) {
      // Babylonian World Map
      ctx.fillStyle = "#faf3e3";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw clay tablet texture
      ctx.fillStyle = "#cfab7e";
      ctx.strokeStyle = "#80582d";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(cx - 160, cy - 180, 320, 330, 20);
      ctx.fill();
      ctx.stroke();

      // Outer Ocean Rings (Bitter River)
      ctx.strokeStyle = "#543714";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy - 20, 110, 0, 2*Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy - 20, 130, 0, 2*Math.PI);
      ctx.stroke();

      // Cities representation (rectangles/hubs)
      ctx.fillStyle = "#ad8253";
      ctx.strokeStyle = "#543714";
      ctx.lineWidth = 2;
      
      const cities = [
        { x: cx - 20, y: cy - 50, w: 25, h: 40, name: "Babylon", desc: "Located at the absolute center of the world disk." },
        { x: cx - 70, y: cy - 70, w: 15, h: 15, name: "Urartu (Armenia)", desc: "Represented near the upper channels of rivers." },
        { x: cx + 45, y: cy - 10, w: 18, h: 18, name: "Bit-Yakin", desc: "A southern marshland region near the river mouth." }
      ];

      cities.forEach(c => {
        ctx.fillRect(c.x, c.y, c.w, c.h);
        ctx.strokeRect(c.x, c.y, c.w, c.h);
      });

      // River lines
      ctx.beginPath();
      ctx.moveTo(cx - 30, cy - 100);
      ctx.quadraticCurveTo(cx - 10, cy - 50, cx - 10, cy + 20); // Euphrates
      ctx.stroke();

      // Outside triangles (outer regions/islands)
      const triangles = [
        { x1: cx - 120, y1: cy - 90, x2: cx - 140, y2: cy - 130, x3: cx - 90, y3: cy - 110, name: "Outer Region 1", desc: "An island beyond the Bitter River where the sun is not seen." },
        { x1: cx + 120, y1: cy - 90, x2: cx + 140, y2: cy - 130, x3: cx + 90, y3: cy - 110, name: "Outer Region 2", desc: "Legendary region with giant birds and beasts." }
      ];

      triangles.forEach(t => {
        ctx.beginPath();
        ctx.moveTo(t.x1, t.y1);
        ctx.lineTo(t.x2, t.y2);
        ctx.lineTo(t.x3, t.y3);
        ctx.closePath();
        ctx.stroke();
      });

      // Labels
      ctx.fillStyle = "#543714";
      ctx.font = "italic bold 11px serif";
      ctx.fillText("BITTER RIVER (MARRATU)", cx - 80, cy + 105);
      
      // Interactive points check
      cities.forEach(c => {
        if (mx > c.x && mx < c.x + c.w && my > c.y && my < c.y + c.h) {
          this.drawTooltip(ctx, mx, my, c.name, c.desc);
        }
      });
      triangles.forEach(t => {
        // approximate bounding box checking
        if (Math.hypot(mx - t.x2, my - t.y2) < 25) {
          this.drawTooltip(ctx, mx, my, t.name, t.desc);
        }
      });

    } 
    else if (activeMap === 1) {
      // Al-Idrisi Map (South up)
      ctx.fillStyle = "#fcf8ee";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw map circle
      ctx.strokeStyle = "#b0813f";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, 2*Math.PI);
      ctx.fillStyle = "#0c1724";
      ctx.fill();
      ctx.stroke();

      // Outer ocean ring
      ctx.beginPath();
      ctx.arc(cx, cy, 195, 0, 2*Math.PI);
      ctx.stroke();

      // Continental shapes in gold-brown (Africa top-right, Europe bottom)
      ctx.fillStyle = "#8c6b3f";
      ctx.beginPath();
      // Africa
      ctx.arc(cx + 60, cy - 60, 90, 0, Math.PI * 1.6);
      ctx.closePath();
      ctx.fill();

      // Arabia & India
      ctx.beginPath();
      ctx.moveTo(cx - 100, cy - 50);
      ctx.quadraticCurveTo(cx - 30, cy + 30, cx - 10, cy - 70);
      ctx.lineTo(cx - 50, cy - 100);
      ctx.closePath();
      ctx.fill();

      // Europe
      ctx.fillStyle = "#5c6b80";
      ctx.beginPath();
      ctx.arc(cx - 50, cy + 60, 60, 0, Math.PI);
      ctx.closePath();
      ctx.fill();

      // Orientation tags
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("SOUTH (AL-JANUB) AT TOP", cx, cy - 210);
      ctx.fillText("NORTH (AL-SHAMAL) AT BOTTOM", cx, cy + 225);

      // Markers
      const markers = [
        { x: cx - 20, y: cy - 40, name: "Arabian Peninsula", desc: "Placed centrally. Contains Mecca, the holy hub." },
        { x: cx + 80, y: cy - 80, name: "Africa (Al-Sudan)", desc: "Mapped extensively along the upper hemisphere." },
        { x: cx - 80, y: cy + 50, name: "Mediterranean Sea", desc: "Drawn as a narrow channel splitting Europe and Africa." }
      ];

      markers.forEach(m => {
        ctx.fillStyle = "#ffcc00";
        ctx.beginPath();
        ctx.arc(m.x, m.y, 5, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        if (Math.hypot(mx - m.x, my - m.y) < 15) {
          this.drawTooltip(ctx, mx, my, m.name, m.desc);
        }
      });
    } 
    else {
      // Mercator Map with drag path
      ctx.fillStyle = "#111827";
      ctx.fillRect(0, 0, w, h);

      // Grid projection
      ctx.strokeStyle = "rgba(176, 129, 63, 0.2)";
      ctx.lineWidth = 1;
      for (let x = 60; x < w; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 50; y < h; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Drawing simple maps outlines
      ctx.fillStyle = "#1e293b";
      ctx.strokeStyle = "#b0813f";
      
      // Americas outline
      ctx.beginPath();
      ctx.rect(60, 80, 80, 300);
      ctx.fill(); ctx.stroke();
      
      // Africa / Europe
      ctx.beginPath();
      ctx.rect(300, 100, 120, 240);
      ctx.fill(); ctx.stroke();

      // Greenland (stetched giant at top)
      ctx.fillStyle = "#334155";
      ctx.beginPath();
      ctx.rect(180, 20, 140, 60);
      ctx.fill(); ctx.stroke();

      // Navigation line indicator
      ctx.strokeStyle = "#c05c46";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(100, 320); // America
      ctx.lineTo(340, 150); // Europe
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px 'Plus Jakarta Sans'";
      ctx.fillText("Constant Rhumb Line navigation direction (keeps angles identical)", 110, 340);

      // Interactive pins
      const pins = [
        { x: 250, y: 50, name: "Exaggerated Greenland", desc: "In Mercator projection, objects near poles stretch outward, making Greenland look as large as Africa." },
        { x: 360, y: 220, name: "Africa Continent", desc: "Drawn near equator. Size is accurate, but looks smaller compared to stretched polar zones." },
        { x: 220, y: 235, name: "Straight Compass Course", options: "Helps navigators sail continuously in a single compass bearing without adjusting steering angle." }
      ];

      pins.forEach(p => {
        ctx.fillStyle = "#ff5555";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        if (Math.hypot(mx - p.x, my - p.y) < 15) {
          this.drawTooltip(ctx, mx, my, p.name, p.desc);
        }
      });
    }
  }

  // --- TOPIC 3 SIMULATION: TRIANGULATION SURVEY GAME ---
  renderTriangulationControls(container) {
    const step = this.exploreState.surveyStep;
    const dial = this.exploreState.dialVal;
    
    let targetMsg = "";
    let targetAngle = 0;

    if (step === 0) {
      targetMsg = "Align Theodolite from **Madras Base** to **Bangalore Tower** (Target Angle: **268°**)";
      targetAngle = 268;
    } else if (step === 1) {
      targetMsg = "Align Theodolite from **Bangalore** to **Hyderabad Tower** (Target Angle: **42°**)";
      targetAngle = 42;
    } else if (step === 2) {
      targetMsg = "Align Theodolite from **Hyderabad** to **Nagpur Tower** (Target Angle: **78°**)";
      targetAngle = 78;
    } else if (step === 3) {
      targetMsg = "Align Theodolite from **Nagpur** to **Delhi Tower** (Target Angle: **312°**)";
      targetAngle = 312;
    }

    if (step < 4) {
      container.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:0.8rem;">
          <p style="font-size:0.88rem; color:var(--text-primary); font-weight:700;">
            🎯 ${targetMsg}
          </p>
          <div style="display:flex; align-items:center; gap:2rem;">
            <div style="display:flex; flex-direction:column; gap:0.25rem; flex: 1;">
              <label style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">Theodolite Scope Angle: <span id="dial-val-lbl" style="color:var(--accent-primary); font-weight:700;">${dial}°</span></label>
              <input type="range" min="0" max="360" value="${dial}" style="accent-color:var(--accent-secondary);" oninput="app.setSurveyDial(this.value)">
            </div>
            <button class="primary-btn" onclick="app.lockSurveyMeasurement(${targetAngle})">Lock Angle & Measure</button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div style="text-align:center; padding:0.5rem 0;">
          <h4 style="color:var(--accent-secondary); margin-bottom:0.25rem;">🎉 Trigonometrical Mapping Successful!</h4>
          <p style="font-size:0.85rem; color:var(--text-secondary);">
            Excellent! You have connected St. Thomas Mount (Madras) up to Delhi, measuring the Earth's curvature and mapping the mountains exactly like William Lambton and George Everest.
          </p>
        </div>
      `;
    }
  }

  setSurveyDial(val) {
    this.exploreState.dialVal = parseInt(val);
    const lbl = document.getElementById("dial-val-lbl");
    if (lbl) lbl.innerText = `${val}°`;
    this.renderExploreSandbox();
  }

  lockSurveyMeasurement(target) {
    const dial = this.exploreState.dialVal;
    const diff = Math.abs(dial - target);
    const statusMsg = document.getElementById("explore-status-msg");

    if (diff <= 2) {
      statusMsg.style.color = "var(--accent-secondary)";
      statusMsg.innerText = "✓ Angle Lock Successful!";
      
      // Save completed step line details to trace
      this.exploreState.triangles.push(this.exploreState.surveyStep);
      this.exploreState.surveyStep++;
      this.exploreState.dialVal = 0; // reset dial

      setTimeout(() => {
        statusMsg.innerText = "";
        this.renderTriangulationControls(document.getElementById("sandbox-controls-container"));
        this.renderExploreSandbox();
      }, 1000);
    } else {
      statusMsg.style.color = "var(--text-primary)";
      statusMsg.innerText = "❌ Angle inaccurate! Look through scope dials closely.";
      setTimeout(() => statusMsg.innerText = "", 1500);
    }
  }

  drawTopic3Sandbox(ctx, w, h) {
    const step = this.exploreState.surveyStep;
    const dial = this.exploreState.dialVal;

    // Define 5 coordinates of cities (scaled to canvas size)
    const stations = [
      { name: "Madras", x: 420, y: 400 },
      { name: "Bangalore", x: 260, y: 380 },
      { name: "Hyderabad", x: 320, y: 280 },
      { name: "Nagpur", x: 430, y: 220 },
      { name: "Delhi", x: 280, y: 90 }
    ];

    // Draw background outline map of India (simplified)
    ctx.strokeStyle = "rgba(47, 86, 71, 0.15)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(350, 40); // north
    ctx.lineTo(400, 90);
    ctx.lineTo(440, 150);
    ctx.lineTo(490, 180);
    ctx.lineTo(480, 240);
    ctx.lineTo(450, 310);
    ctx.lineTo(420, 420); // cape comorin
    ctx.lineTo(340, 420);
    ctx.lineTo(260, 360);
    ctx.lineTo(210, 300);
    ctx.lineTo(200, 240);
    ctx.lineTo(160, 180);
    ctx.lineTo(220, 120);
    ctx.lineTo(280, 40);
    ctx.closePath();
    ctx.stroke();

    // Draw locks triangles
    this.exploreState.triangles.forEach(tIndex => {
      ctx.fillStyle = "rgba(47, 86, 71, 0.12)";
      ctx.strokeStyle = "rgba(47, 86, 71, 0.7)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      
      if (tIndex === 0) {
        ctx.moveTo(stations[0].x, stations[0].y);
        ctx.lineTo(stations[1].x, stations[1].y);
        ctx.lineTo(stations[2].x, stations[2].y);
      } else if (tIndex === 1) {
        ctx.moveTo(stations[1].x, stations[1].y);
        ctx.lineTo(stations[2].x, stations[2].y);
        ctx.lineTo(stations[3].x, stations[3].y);
      } else if (tIndex === 2) {
        ctx.moveTo(stations[2].x, stations[2].y);
        ctx.lineTo(stations[3].x, stations[3].y);
        ctx.lineTo(stations[4].x, stations[4].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });

    // Draw active alignment line dynamically based on slider dial angle
    if (step < 4) {
      const activeStation = stations[step];
      const angleRad = (dial - 90) * Math.PI / 180; // 0 degree points North
      const length = 200;

      ctx.strokeStyle = "rgba(192, 92, 70, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(activeStation.x, activeStation.y);
      ctx.lineTo(activeStation.x + Math.cos(angleRad) * length, activeStation.y + Math.sin(angleRad) * length);
      ctx.stroke();
      ctx.setLineDash([]); // clear
    }

    // Draw survey tower circles
    stations.forEach((s, idx) => {
      const isActive = idx === step;
      
      // Draw tower block
      ctx.fillStyle = isActive ? "#ff0000" : "#2f5647";
      ctx.beginPath();
      ctx.arc(s.x, s.y, 6, 0, 2*Math.PI);
      ctx.fill();
      
      // outer ring
      ctx.strokeStyle = isActive ? "rgba(255,0,0,0.4)" : "rgba(47, 86, 71, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 12, 0, 2*Math.PI);
      ctx.stroke();

      // text label
      ctx.fillStyle = "#121c2c";
      ctx.font = "bold 10px 'Plus Jakarta Sans'";
      ctx.fillText(s.name, s.x + 12, s.y + 3);
    });

    // If survey is fully completed, overlay grid triangulation lines all over India map
    if (step === 4) {
      ctx.strokeStyle = "rgba(176, 129, 63, 0.25)";
      ctx.lineWidth = 1;
      for (let i = 0; i < stations.length; i++) {
        for (let j = i + 1; j < stations.length; j++) {
          ctx.beginPath();
          ctx.moveTo(stations[i].x, stations[i].y);
          ctx.lineTo(stations[j].x, stations[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // --- TOPIC 4 SIMULATION: THEMATIC LAYERS SANDBOX ---
  toggleThematicLayer(layerName, isChecked) {
    this.exploreState.layers[layerName] = isChecked;
    this.renderExploreSandbox();
  }

  drawTopic4Sandbox(ctx, w, h) {
    const layers = this.exploreState.layers;
    const mx = this.exploreState.mouseX || 0;
    const my = this.exploreState.mouseY || 0;

    // Define mock circular boundaries for TS districts (X, Y, Radius)
    const districts = [
      { name: "Adilabad (North)", cx: 370, cy: 90, r: 40, relief: 480, rain: 1050, density: 140 },
      { name: "Nizamabad", cx: 280, cy: 170, r: 35, relief: 380, rain: 950, density: 230 },
      { name: "Karimnagar", cx: 390, cy: 160, r: 35, relief: 300, rain: 980, density: 290 },
      { name: "Medak (Central)", cx: 290, cy: 240, r: 35, relief: 440, rain: 880, density: 210 },
      { name: "Warangal", cx: 430, cy: 220, r: 40, relief: 280, rain: 1020, density: 320 },
      { name: "Khammam (East)", cx: 520, cy: 300, r: 45, relief: 120, rain: 1120, density: 190 },
      { name: "Hyderabad Capital", cx: 320, cy: 300, r: 20, relief: 540, rain: 780, density: 18000 },
      { name: "Nalgonda", cx: 420, cy: 320, r: 40, relief: 220, rain: 720, density: 240 },
      { name: "Mahabubnagar (South)", cx: 250, cy: 360, r: 45, relief: 500, rain: 650, density: 180 }
    ];

    // base outline render
    ctx.strokeStyle = "#e5dec9";
    ctx.lineWidth = 2;

    districts.forEach(d => {
      // Calculate color mixes depending on toggled layer switches
      let fillStyle = "#faf8f5"; // neutral cream default

      if (layers.relief && !layers.rainfall && !layers.population) {
        // Physical Relief colors (green plains to yellow plateaus to brown hills)
        if (d.relief < 150) fillStyle = "#c5e1a5"; // low plains green
        else if (d.relief >= 150 && d.relief < 450) fillStyle = "#ffe082"; // table plateau yellow
        else fillStyle = "#d7ccc8"; // higher plateau grey-brown
      } 
      else if (!layers.relief && layers.rainfall && !layers.population) {
        // Rainfall overlay shades of blue
        if (d.rain < 750) fillStyle = "#e3f2fd";
        else if (d.rain >= 750 && d.rain < 1000) fillStyle = "#90caf9";
        else fillStyle = "#1e88e5";
      } 
      else if (!layers.relief && !layers.rainfall && layers.population) {
        // Population choropleth gradient
        if (d.density < 200) fillStyle = "#ffebee";
        else if (d.density >= 200 && d.density < 1000) fillStyle = "#ef9a9a";
        else fillStyle = "#c62828"; // Hyderabad dense red
      } 
      else if (layers.relief || layers.rainfall || layers.population) {
        // Combined blend layers
        fillStyle = "#eceff1";
      }

      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      ctx.arc(d.cx, d.cy, d.r, 0, 2*Math.PI);
      ctx.fill();
      ctx.stroke();

      // name text anchor inside district
      ctx.fillStyle = "rgba(18, 28, 44, 0.4)";
      ctx.font = "bold 9px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText(d.name.split(" ")[0], d.cx, d.cy + 3);
    });

    // Check hover bounds
    districts.forEach(d => {
      if (Math.hypot(mx - d.cx, my - d.cy) < d.r) {
        // Highlight active hovered circle
        ctx.strokeStyle = "var(--accent-primary)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(d.cx, d.cy, d.r, 0, 2*Math.PI);
        ctx.stroke();

        // Renders statistics details card tooltip
        this.drawTooltip(ctx, mx, my, d.name, 
          `Elevation: ${d.relief}m (Relief)\n` +
          `Avg Rainfall: ${d.rain} mm/year\n` +
          `Population Density: ${d.density} people/sq.km`
        );
      }
    });
  }

  // --- TOPIC 5 SIMULATION: 3D AND 2D CONTOUR SANDBOX ---
  setContourHeight(val) {
    this.exploreState.heightVal = parseInt(val);
    document.getElementById("height-lbl").innerText = `${val}m`;
    this.renderExploreSandbox();
  }

  setContourProfile(val) {
    this.exploreState.profile = val;
    this.renderExploreSandbox();
  }

  drawTopic5Sandbox(ctx, w, h) {
    const height = this.exploreState.heightVal;
    const profile = this.exploreState.profile;

    const midX = w / 2;
    
    // Split screens divider
    ctx.strokeStyle = "#e5dec9";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(midX, 0);
    ctx.lineTo(midX, h);
    ctx.stroke();

    // --- DRAW LEFT SIDE: 3D perspective hill mesh ---
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, midX, h);
    ctx.clip();

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, midX, h);
    
    ctx.fillStyle = "rgba(47, 86, 71, 0.05)";
    ctx.font = "bold 11px 'Plus Jakarta Sans'";
    ctx.fillText("3D Profile View", 15, 30);

    const cx3d = midX / 2;
    const cy3d = h / 2 + 50;

    // Draw ground base line
    ctx.strokeStyle = "#5c6b80";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx3d - 140, cy3d);
    ctx.lineTo(cx3d + 140, cy3d);
    ctx.stroke();

    // Draw hill shape depending on profile slope selection
    ctx.fillStyle = "#2f5647";
    ctx.strokeStyle = "#1e372e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx3d - 140, cy3d);
    
    if (profile === "gentle") {
      ctx.quadraticCurveTo(cx3d - 60, cy3d - height, cx3d, cy3d - height);
      ctx.quadraticCurveTo(cx3d + 60, cy3d - height, cx3d + 140, cy3d);
    } else if (profile === "steep") {
      ctx.quadraticCurveTo(cx3d - 30, cy3d - height, cx3d, cy3d - height);
      ctx.quadraticCurveTo(cx3d + 30, cy3d - height, cx3d + 140, cy3d);
    } else if (profile === "cliff") {
      // West (left) side is vertical/steep cliff
      ctx.lineTo(cx3d - 40, cy3d);
      ctx.lineTo(cx3d - 35, cy3d - height);
      ctx.quadraticCurveTo(cx3d + 50, cy3d - height, cx3d + 140, cy3d);
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // draw parallel slices showing heights increments
    ctx.strokeStyle = "rgba(176, 129, 63, 0.6)";
    ctx.lineWidth = 1.5;
    for (let step = 30; step < height; step += 30) {
      const sliceY = cy3d - step;
      ctx.beginPath();
      ctx.moveTo(cx3d - 120, sliceY);
      ctx.lineTo(cx3d + 120, sliceY);
      ctx.stroke();
    }

    ctx.restore();

    // --- DRAW RIGHT SIDE: 2D Contour ring map ---
    ctx.save();
    ctx.beginPath();
    ctx.rect(midX, 0, midX, h);
    ctx.clip();

    ctx.fillStyle = "#fcfaf6";
    ctx.fillRect(midX, 0, midX, h);
    
    ctx.fillStyle = "rgba(176, 129, 63, 0.4)";
    ctx.font = "bold 11px 'Plus Jakarta Sans'";
    ctx.fillText("2D Map Contour Lines Projection", midX + 15, 30);

    const cx2d = midX + midX / 2;
    const cy2d = h / 2;

    // Draw concentric ring lines
    const ringCount = Math.floor(height / 30);
    ctx.lineWidth = 2.5;

    for (let i = 1; i <= ringCount; i++) {
      const rStep = i * 20;
      ctx.strokeStyle = "rgba(192, 92, 70, 0.85)";
      ctx.beginPath();

      if (profile === "gentle") {
        // uniform concentric ellipses
        ctx.ellipse(cx2d, cy2d, rStep * 1.5, rStep, 0, 0, 2*Math.PI);
      } else if (profile === "steep") {
        // tight circles closer center
        ctx.ellipse(cx2d, cy2d, rStep * 0.8, rStep * 0.6, 0, 0, 2*Math.PI);
      } else if (profile === "cliff") {
        // offset centers (West side lines bunch together)
        const xOffset = -rStep * 0.6;
        ctx.ellipse(cx2d + xOffset, cy2d, rStep * 1.2, rStep * 0.9, 0, 0, 2*Math.PI);
      }
      ctx.stroke();

      // Contour elevation height labels printed on rings
      ctx.fillStyle = "#121c2c";
      ctx.font = "9px monospace";
      ctx.fillText(`${i * 50}m`, cx2d, cy2d - (i * 12));
    }

    ctx.restore();
  }

  // Common Tooltip utility
  drawTooltip(ctx, x, y, title, bodyText) {
    ctx.save();
    const padding = 10;
    const boxW = 240;
    
    // split bodies into lines
    const lines = bodyText.split("\n");
    const boxH = 25 + (lines.length * 15);
    
    let boxX = x + 15;
    let boxY = y + 15;

    // keep within boundaries
    if (boxX + boxW > ctx.canvas.width) boxX = x - boxW - 15;
    if (boxY + boxH > ctx.canvas.height) boxY = y - boxH - 15;

    ctx.fillStyle = "rgba(18, 28, 44, 0.95)";
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    ctx.fill();

    ctx.fillStyle = "var(--accent-primary)";
    ctx.font = "bold 11px 'Plus Jakarta Sans'";
    ctx.fillText(title, boxX + padding, boxY + 18);

    ctx.fillStyle = "#ffffff";
    ctx.font = "10px 'Plus Jakarta Sans'";
    lines.forEach((l, idx) => {
      ctx.fillText(l, boxX + padding, boxY + 33 + (idx * 15));
    });

    ctx.restore();
  }

  // --- TAB 4: PRACTICE MINI QUIZZES ---
  initMiniQuiz() {
    const data = topicsData[this.activeTopic].quiz;
    this.miniQuizAnswers = Array(data.length).fill(null);
    this.activeMiniQuizQ = 0;
    this.renderMiniQuizCard();
  }

  renderMiniQuizCard() {
    const container = document.getElementById("mini-quiz-card-container");
    if (!container) return;
    
    const quiz = topicsData[this.activeTopic].quiz;
    const currentQIndex = this.activeMiniQuizQ;
    const q = quiz[currentQIndex];
    const userAnswer = this.miniQuizAnswers[currentQIndex];

    container.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-progress">Question ${currentQIndex + 1} of ${quiz.length}</div>
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">
          ${q.options.map((opt, oIdx) => {
            let stateClass = "";
            let isDisabled = userAnswer !== null ? "disabled" : "";

            if (userAnswer !== null) {
              if (oIdx === q.answerIndex) stateClass = "correct";
              else if (oIdx === userAnswer) stateClass = "wrong";
            }

            return `
              <button class="quiz-option ${stateClass}" ${isDisabled} onclick="app.submitMiniQuizAnswer(${oIdx})">
                ${opt}
              </button>
            `;
          }).join("")}
        </div>

        <div class="quiz-feedback ${userAnswer !== null ? (userAnswer === q.answerIndex ? 'correct' : 'wrong') : ''}" id="mini-quiz-feedback-box">
          <div class="quiz-feedback-title">
            ${userAnswer !== null ? (userAnswer === q.answerIndex ? '✓ Correct Answer!' : '❌ Incorrect Answer') : ''}
          </div>
          <div style="font-size:0.85rem;">${q.explanation}</div>
        </div>

        ${userAnswer !== null ? `
          <div class="quiz-nav-row">
            <button class="quiz-next-btn" onclick="app.nextMiniQuizQ()">
              ${currentQIndex < quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  submitMiniQuizAnswer(selectedIdx) {
    this.miniQuizAnswers[this.activeMiniQuizQ] = selectedIdx;
    this.renderMiniQuizCard();
  }

  nextMiniQuizQ() {
    const quiz = topicsData[this.activeTopic].quiz;
    if (this.activeMiniQuizQ < quiz.length - 1) {
      this.activeMiniQuizQ++;
      this.renderMiniQuizCard();
    } else {
      // Calculate score
      let score = 0;
      this.miniQuizAnswers.forEach((ans, idx) => {
        if (ans === quiz[idx].answerIndex) score++;
      });

      // Complete topic progress
      const container = document.getElementById("mini-quiz-card-container");
      container.innerHTML = `
        <div class="quiz-card" style="text-align:center;">
          <h3 style="color:var(--accent-secondary); margin-bottom: 0.5rem;">🎉 Practice Quiz Completed!</h3>
          <p style="font-size:1.1rem; font-weight:700; margin-bottom:1rem;">Your score is: ${score} / ${quiz.length}</p>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1.5rem;">
            Excellent practice session! Now proceed to the Revision stage to memorize terms and review key points.
          </p>
          <button class="primary-btn" onclick="app.advanceFlowStep()">Go to Revision</button>
        </div>
      `;
    }
  }

  // --- TAB 5: REVISE SECTION (FLASHCARDS) ---
  renderReviseTab() {
    const data = topicsData[this.activeTopic];
    const pointsContainer = document.getElementById("summary-points-container");
    pointsContainer.innerHTML = "";
    data.summary.forEach(pt => {
      const li = document.createElement("li");
      li.innerText = pt;
      pointsContainer.appendChild(li);
    });
  }

  renderFlashcard() {
    const flashcards = topicsData[this.activeTopic].flashcards;
    const fc = flashcards[this.flashcardIndex];
    document.getElementById("flashcard-word-display").innerText = fc.word;
    document.getElementById("flashcard-def-display").innerText = fc.definition;
    document.getElementById("flashcard-indicator-display").innerText = `${this.flashcardIndex + 1} / ${flashcards.length}`;
    
    // reset flip
    this.flashcardFlipped = false;
    document.getElementById("vocab-flashcard").classList.remove("flipped");
  }

  flipFlashcard() {
    this.flashcardFlipped = !this.flashcardFlipped;
    const card = document.getElementById("vocab-flashcard");
    if (this.flashcardFlipped) card.classList.add("flipped");
    else card.classList.remove("flipped");
  }

  nextFlashcard() {
    const len = topicsData[this.activeTopic].flashcards.length;
    this.flashcardIndex = (this.flashcardIndex + 1) % len;
    this.renderFlashcard();
  }

  prevFlashcard() {
    const len = topicsData[this.activeTopic].flashcards.length;
    this.flashcardIndex = (this.flashcardIndex - 1 + len) % len;
    this.renderFlashcard();
  }

  // --- FINAL CERTIFICATION TEST ---
  showFinalTestIntro() {
    // Hide lessons, show final exam board
    document.getElementById("topic-section").style.display = "none";
    document.getElementById("final-test-section").style.display = "block";
    document.getElementById("sidebar-final-test-btn").classList.add("active");
    
    // Reset views
    document.getElementById("test-intro-panel").style.display = "block";
    document.getElementById("test-questions-panel").style.display = "none";
    document.getElementById("test-results-panel").style.display = "none";
  }

  startFinalTest() {
    this.testActive = true;
    this.testAnswers = Array(finalTestQuestions.length).fill(null);
    this.testTime = 0;

    // Show sheets
    document.getElementById("test-intro-panel").style.display = "none";
    document.getElementById("test-questions-panel").style.display = "block";
    document.getElementById("test-results-panel").style.display = "none";

    // Run Timer
    clearInterval(this.testTimerId);
    this.testTimerId = setInterval(() => {
      this.testTime++;
      const min = String(Math.floor(this.testTime / 60)).padStart(2, "0");
      const sec = String(this.testTime % 60).padStart(2, "0");
      document.getElementById("test-timer").innerText = `Time Elapsed: ${min}:${sec}`;
    }, 1000);

    // Build question list
    const container = document.getElementById("test-questions-container");
    container.innerHTML = "";

    finalTestQuestions.forEach((q, idx) => {
      const card = document.createElement("div");
      card.className = "test-q-card";
      card.innerHTML = `
        <div class="test-q-title">${idx + 1}. ${q.question}</div>
        <div class="test-options">
          ${q.options.map((opt, oIdx) => `
            <label class="test-option-label" id="lbl-q${idx}-o${oIdx}">
              <input type="radio" name="test-q-${idx}" value="${oIdx}" onclick="app.setTestAnswer(${idx}, ${oIdx})">
              ${opt}
            </label>
          `).join("")}
        </div>
      `;
      container.appendChild(card);
    });
  }

  setTestAnswer(qIdx, selectedIdx) {
    this.testAnswers[qIdx] = selectedIdx;
    
    // Highlight selected label visually
    for(let i=0; i<4; i++) {
      const lbl = document.getElementById(`lbl-q${qIdx}-o${i}`);
      if (lbl) {
        if (i === selectedIdx) lbl.style.backgroundColor = "var(--bg-secondary)";
        else lbl.style.backgroundColor = "transparent";
      }
    }
  }

  submitFinalTest() {
    // Check if all questions are answered
    const unanswered = this.testAnswers.filter(ans => ans === null).length;
    if (unanswered > 0) {
      alert(`Please answer all questions before submitting! (${unanswered} questions left)`);
      return;
    }

    clearInterval(this.testTimerId);
    this.testActive = false;

    // Calculate score
    let correctCount = 0;
    finalTestQuestions.forEach((q, idx) => {
      if (this.testAnswers[idx] === q.answerIndex) correctCount++;
    });

    const percent = Math.round((correctCount / finalTestQuestions.length) * 100);

    // Update results panel
    document.getElementById("results-score").innerText = `${correctCount} / ${finalTestQuestions.length}`;
    document.getElementById("results-percentage").innerText = `Score: ${percent}%`;

    const verdict = document.getElementById("results-verdict");
    const summaryText = document.getElementById("results-summary-text");
    const certBox = document.getElementById("cert-unlock-container");

    const passThreshold = Math.ceil(finalTestQuestions.length * 0.8);

    if (percent >= 80) {
      verdict.innerText = "Outstanding Accomplishment!";
      verdict.style.color = "var(--accent-secondary)";
      summaryText.innerText = `Sensational score! You have proven a strong command over Telangana SCERT Class 8 Social Studies Chapter ${this.activeChapter + 1}. The custom SRIVARDHAN honours certificate has been successfully unlocked!`;
      certBox.style.display = "block";
    } else {
      verdict.innerText = "Exam Completed!";
      verdict.style.color = "var(--accent-primary)";
      summaryText.innerText = `You scored ${percent}%. You need at least 80% (${passThreshold}/${finalTestQuestions.length} correct) to earn the printable SRIVARDHAN certificate. Please study the lessons and try again!`;
      certBox.style.display = "none";
    }

    // Load review board
    const reviewContainer = document.getElementById("test-review-container");
    reviewContainer.innerHTML = "";

    finalTestQuestions.forEach((q, idx) => {
      const userAnsIdx = this.testAnswers[idx];
      const isCorrect = userAnsIdx === q.answerIndex;

      const card = document.createElement("div");
      card.className = `review-card ${isCorrect ? 'correct' : 'wrong'}`;
      card.innerHTML = `
        <div class="review-question">${idx + 1}. ${q.question}</div>
        <div class="review-user-ans">Your Answer: <span style="color:${isCorrect ? '#385723' : '#c00000'};">${q.options[userAnsIdx]}</span></div>
        ${!isCorrect ? `<div class="review-correct-ans">Correct Answer: <span style="color:#385723;">${q.options[q.answerIndex]}</span></div>` : ''}
        <div class="review-explanation">${q.explanation}</div>
      `;
      reviewContainer.appendChild(card);
    });

    // Display results panel
    document.getElementById("test-questions-panel").style.display = "none";
    document.getElementById("test-results-panel").style.display = "block";
  }

  resetFinalTest() {
    this.showFinalTestIntro();
  }

  generateAndPrintCertificate() {
    const studentName = document.getElementById("student-name-input").value.trim();
    if (!studentName) {
      alert("Please enter your name to personalize the certificate.");
      return;
    }

    let correctCount = 0;
    this.testAnswers.forEach((ans, idx) => {
      if (ans === finalTestQuestions[idx].answerIndex) correctCount++;
    });
    const percent = Math.round((correctCount / finalTestQuestions.length) * 100);

    // Populate Print template details
    document.getElementById("cert-recipient-name").innerText = studentName;
    document.getElementById("cert-score-display").innerText = `${correctCount} / ${finalTestQuestions.length}`;
    document.getElementById("cert-percent-display").innerText = `${percent}%`;

    const chapterName = document.getElementById("chapter-select").options[this.activeChapter].text;
    document.getElementById("cert-chapter-name").innerText = chapterName;
    
    // Set current date formatted nicely
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      year: "numeric", month: "long", day: "numeric"
    });
    document.getElementById("cert-date-display").innerText = `Date: ${formattedDate}`;

    // Print
    window.print();
  }

  // --- DYNAMIC MULTI-CHAPTER WATCH RENDERING ---
  drawWatchContent(chapter, topic, ctx, w, h) {
    const cx = w / 2;
    const cy = h / 2;
    const t = this.watchFrame;
    const progress = (t % 300) / 300;

    // Direct Chapter 1 drawing to the legacy draw methods
    if (chapter === 0) {
      if (topic === 0) this.drawTopic1Watch(ctx, w, h);
      else if (topic === 1) this.drawTopic2Watch(ctx, w, h);
      else if (topic === 2) this.drawTopic3Watch(ctx, w, h);
      else if (topic === 3) this.drawTopic4Watch(ctx, w, h);
      else if (topic === 4) this.drawTopic5Watch(ctx, w, h);
      return;
    }

    // Colors
    const primaryColor = this.theme === "dark" ? "#f59e0b" : "#b0813f";
    const secondaryColor = this.theme === "dark" ? "#10b981" : "#2f5647";
    const textColor = this.theme === "dark" ? "#f1f5f9" : "#121c2c";
    const mutedColor = this.theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

    ctx.save();
    ctx.lineWidth = 2;

    if (chapter === 1) {
      // Ch 2: Energy from the Sun
      if (topic === 0) {
        // Solar radiation and insolation
        ctx.fillStyle = textColor;
        ctx.font = "bold 13px 'Plus Jakarta Sans'";
        ctx.fillText("Solar Radiation and Insolation", 20, 30);

        // Draw Sun (Left)
        ctx.fillStyle = "#ffaa00";
        ctx.beginPath();
        ctx.arc(80, cy, 50, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#ff5500";
        ctx.stroke();

        // Draw curved Earth (Right)
        ctx.fillStyle = "#2a539b";
        ctx.beginPath();
        ctx.arc(w + 100, cy, 280, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#5da56e";
        ctx.stroke();

        // Draw rays
        ctx.strokeStyle = "rgba(255,170,0,0.6)";
        // Equatorial straight ray
        ctx.beginPath();
        ctx.moveTo(130, cy);
        ctx.lineTo(w - 180, cy);
        ctx.stroke();
        ctx.fillStyle = "#ff3300";
        ctx.fillText("Vertical Rays (Concentrated)", w - 310, cy - 10);

        // Polar slanted ray
        ctx.beginPath();
        ctx.moveTo(120, cy - 30);
        ctx.lineTo(w - 200, cy - 130);
        ctx.stroke();
        ctx.fillStyle = "#00aaff";
        ctx.fillText("Slanted Rays (Spread Out)", w - 340, cy - 145);
      } else if (topic === 1) {
        // Temperature zones
        ctx.fillStyle = textColor;
        ctx.font = "bold 13px 'Plus Jakarta Sans'";
        ctx.fillText("Earth Temperature Zones", 20, 30);

        // Draw Earth sphere
        ctx.strokeStyle = primaryColor;
        ctx.beginPath();
        ctx.arc(cx, cy, 110, 0, 2*Math.PI);
        ctx.stroke();

        // Torrid Zone
        ctx.fillStyle = "rgba(255, 69, 0, 0.2)";
        ctx.beginPath();
        ctx.arc(cx, cy, 110, -Math.PI/6, Math.PI/6);
        ctx.lineTo(cx, cy);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#ff4500";
        ctx.fillText("TORRID ZONE (Tropics)", cx + 130, cy + 5);

        // Temperate Zone
        ctx.fillStyle = "rgba(46, 139, 87, 0.2)";
        ctx.beginPath();
        ctx.arc(cx, cy, 110, -Math.PI*0.35, -Math.PI/6);
        ctx.lineTo(cx, cy);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#2e8b57";
        ctx.fillText("TEMPERATE ZONE", cx + 70, cy - 75);

        // Frigid Zone
        ctx.fillStyle = "rgba(30, 144, 255, 0.2)";
        ctx.beginPath();
        ctx.arc(cx, cy, 110, -Math.PI/2, -Math.PI*0.35);
        ctx.lineTo(cx, cy);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#1e90ff";
        ctx.fillText("FRIGID ZONE (Polar)", cx - 30, cy - 130);
      } else if (topic === 2) {
        // Land vs Water heating
        ctx.fillStyle = textColor;
        ctx.font = "bold 13px 'Plus Jakarta Sans'";
        ctx.fillText("Land vs. Water Differential Heating", 20, 30);

        // Land (Left)
        ctx.fillStyle = "#8b5a2b";
        ctx.fillRect(cx - 160, cy - 40, 140, 100);
        ctx.fillStyle = textColor;
        ctx.fillText("LAND (Heats Fast)", cx - 160, cy + 85);
        
        // Water (Right)
        ctx.fillStyle = "#1e90ff";
        ctx.fillRect(cx + 20, cy - 40, 140, 100);
        ctx.fillStyle = textColor;
        ctx.fillText("WATER (Heats Slow)", cx + 20, cy + 85);

        // Heat waves
        const waveY = cy - 40 - Math.abs(Math.sin(t * 0.05)) * 15;
        ctx.strokeStyle = "#ff0000";
        ctx.beginPath();
        ctx.moveTo(cx - 120, cy);
        ctx.quadraticCurveTo(cx - 100, waveY, cx - 80, cy);
        ctx.stroke();

        ctx.strokeStyle = "#4a90e2";
        ctx.beginPath();
        ctx.moveTo(cx + 60, cy);
        ctx.quadraticCurveTo(cx + 80, cy - 40 - Math.abs(Math.sin(t * 0.02)) * 8, cx + 100, cy);
        ctx.stroke();
      }
    } else if (chapter === 2) {
      // Ch 3: Earth Movements and Seasons
      if (topic === 0) {
        // Rotation
        ctx.fillStyle = textColor;
        ctx.font = "bold 13px 'Plus Jakarta Sans'";
        ctx.fillText("Earth Axis Rotation", 20, 30);

        // Tilted axis line
        ctx.strokeStyle = primaryColor;
        ctx.beginPath();
        ctx.moveTo(cx - 50, cy - 140);
        ctx.lineTo(cx + 50, cy + 140);
        ctx.stroke();

        // Earth globe
        ctx.fillStyle = "rgba(47, 86, 71, 0.15)";
        ctx.beginPath();
        ctx.arc(cx, cy, 100, 0, 2*Math.PI);
        ctx.fill();

        // Circle of illumination (vertical split)
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.arc(cx, cy, 100, -Math.PI/2, Math.PI/2);
        ctx.fill();

        // Rotation arrow
        ctx.strokeStyle = "#ffaa00";
        ctx.beginPath();
        ctx.arc(cx, cy, 120, -0.2, 0.2);
        ctx.stroke();
        ctx.fillStyle = "#ffaa00";
        ctx.fillText("Rotation (West to East)", cx - 60, cy - 110);
      } else if (topic === 1) {
        // Revolution and Seasons
        ctx.fillStyle = textColor;
        ctx.font = "bold 13px 'Plus Jakarta Sans'";
        ctx.fillText("Earth Revolution Orbit", 20, 30);

        // Draw Sun (center)
        ctx.fillStyle = "#ffaa00";
        ctx.beginPath();
        ctx.arc(cx, cy, 25, 0, 2*Math.PI);
        ctx.fill();

        // Orbit ellipse
        ctx.strokeStyle = "rgba(176,129,63,0.2)";
        ctx.beginPath();
        ctx.ellipse(cx, cy, 180, 80, 0, 0, 2*Math.PI);
        ctx.stroke();

        // Earth positions
        const ex = cx + Math.cos(progress * 2 * Math.PI) * 180;
        const ey = cy + Math.sin(progress * 2 * Math.PI) * 80;
        ctx.fillStyle = "#4a90e2";
        ctx.beginPath();
        ctx.arc(ex, ey, 12, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();
      } else if (topic === 2) {
        // Solstices and equinoxes
        ctx.fillStyle = textColor;
        ctx.font = "bold 13px 'Plus Jakarta Sans'";
        ctx.fillText("Solstices & Equinoxes Position", 20, 30);

        // Central Sun
        ctx.fillStyle = "#ffaa00";
        ctx.beginPath();
        ctx.arc(cx, cy, 20, 0, 2*Math.PI);
        ctx.fill();

        // June Solstice (Left)
        ctx.fillStyle = "#4a90e2";
        ctx.beginPath();
        ctx.arc(cx - 160, cy, 15, 0, 2*Math.PI);
        ctx.fill();
        ctx.fillStyle = textColor;
        ctx.fillText("June 21 (Summer Solstice)", cx - 240, cy + 35);

        // Dec Solstice (Right)
        ctx.beginPath();
        ctx.arc(cx + 160, cy, 15, 0, 2*Math.PI);
        ctx.fill();
        ctx.fillText("Dec 22 (Winter Solstice)", cx + 80, cy + 35);

        // Equinoxes
        ctx.beginPath();
        ctx.arc(cx, cy - 60, 15, 0, 2*Math.PI);
        ctx.fill();
        ctx.fillText("March 21 (Equinox)", cx - 50, cy - 85);
      }
    } else if (chapter === 3) {
      // Ch 4: Polar Regions
      if (topic === 0) {
        // Tundra and permafrost
        ctx.fillStyle = textColor;
        ctx.font = "bold 13px 'Plus Jakarta Sans'";
        ctx.fillText("Tundra Soil layers (Permafrost)", 20, 30);

        // Soil layers
        ctx.fillStyle = "#8a6d4e"; // thawed active layer
        ctx.fillRect(cx - 180, cy - 40, 360, 40);
        ctx.fillStyle = "#5c6b80"; // permafrost ice-soil
        ctx.fillRect(cx - 180, cy, 360, 100);

        ctx.fillStyle = "#ffffff";
        ctx.fillText("Thawed top layer (Summer vegetation)", cx - 170, cy - 15);
        ctx.fillText("Permanently Frozen Subsoil (PERMAFROST)", cx - 170, cy + 50);
      } else if (topic === 1) {
        // Polar wildlife
        ctx.fillStyle = textColor;
        ctx.font = "bold 13px 'Plus Jakarta Sans'";
        ctx.fillText("Polar Wildlife blubber insulation", 20, 30);

        // Whale blubber diagram
        ctx.fillStyle = "rgba(47, 86, 71, 0.1)";
        ctx.fillRect(cx - 160, cy - 60, 320, 120);
        ctx.strokeStyle = primaryColor;
        ctx.strokeRect(cx - 160, cy - 60, 320, 120);

        ctx.fillStyle = "#8c6b3f"; // muscle
        ctx.fillRect(cx - 120, cy - 40, 240, 80);
        ctx.fillStyle = "#fcfaf6"; // blubber layer
        ctx.strokeRect(cx - 120, cy - 40, 240, 80);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "rgba(240,240,240,0.8)";
        ctx.strokeRect(cx - 120, cy - 40, 240, 80);
        ctx.lineWidth = 2; // reset

        ctx.fillStyle = textColor;
        ctx.fillText("Insulating Blubber layer (Fat)", cx - 80, cy - 45);
        ctx.fillText("Core Muscles (Warm)", cx - 60, cy + 5);
      } else if (topic === 2) {
        // Inuit Igloo
        ctx.fillStyle = textColor;
        ctx.font = "bold 13px 'Plus Jakarta Sans'";
        ctx.fillText("Inuit Igloo Thermal Dynamics", 20, 30);

        // Igloo outline
        ctx.strokeStyle = primaryColor;
        ctx.beginPath();
        ctx.arc(cx, cy + 50, 80, Math.PI, 2*Math.PI);
        ctx.stroke();
        // floor
        ctx.beginPath();
        ctx.moveTo(cx - 80, cy + 50);
        ctx.lineTo(cx + 80, cy + 50);
        ctx.stroke();

        ctx.fillStyle = "#ffaa00";
        ctx.fillText("Inside: Warm (+15°C)", cx - 50, cy + 10);
        ctx.fillStyle = "#00aaff";
        ctx.fillText("Outside: Freezing (-30°C)", cx - 200, cy - 20);
      }
    } else {
      // General fallbacks for Chapters 5-10
      ctx.fillStyle = textColor;
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText(`Chapter ${chapter + 1} Visual Lecture`, cx, cy - 40);
      ctx.font = "12px 'Plus Jakarta Sans'";
      ctx.fillText(`Topic ${topic + 1}: ${topicsData[topic].title}`, cx, cy - 10);
      
      // Animated chalkboard loader circle
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy + 40, 30, 0, progress * 2 * Math.PI);
      ctx.stroke();
    }

    ctx.restore();
  }

  // --- DYNAMIC MULTI-CHAPTER EXPLORE SIMULATIONS ---
  initExploreSimulation() {
    const container = document.getElementById("sandbox-controls-container");
    container.innerHTML = "";
    
    // Clear state
    this.exploreState = {
      topic: this.activeTopic,
      canvas: this.exploreCanvas,
      ctx: this.exploreCtx
    };

    const statusMsg = document.getElementById("explore-status-msg");
    if (statusMsg) statusMsg.innerText = "";

    // Set custom configurations for all chapters
    const ch = this.activeChapter;
    const tp = this.activeTopic;

    if (ch === 0) {
      // Legacy Chapter 1 sliders setup
      if (tp === 0) {
        this.exploreState.sliderX = this.exploreCanvas.width / 2;
        this.exploreState.dragging = false;
        container.innerHTML = `<p style="font-size:0.85rem; color:var(--text-secondary);"><strong>Drag the split slider</strong> to compare satellite photograph vs simplified map.</p>`;
      } else if (tp === 1) {
        this.exploreState.activeMap = 0;
        container.innerHTML = `
          <div style="display:flex; gap:0.5rem;">
            <button class="watch-btn" onclick="app.setExploreMap(0)">Babylonian Tablet</button>
            <button class="watch-btn" onclick="app.setExploreMap(1)">Al-Idrisi Map</button>
            <button class="watch-btn" onclick="app.setExploreMap(2)">Mercator Grid</button>
          </div>
        `;
      } else if (tp === 2) {
        this.exploreState.surveyStep = 0;
        this.exploreState.dialVal = 0;
        this.exploreState.triangles = [];
        this.renderTriangulationControls(container);
      } else if (tp === 3) {
        this.exploreState.layers = { relief: true, rainfall: false, population: false };
        container.innerHTML = `
          <div style="display:flex; gap:1.5rem; flex-wrap: wrap;">
            <label><input type="checkbox" checked onchange="app.toggleThematicLayer('relief', this.checked)"> 🏔️ Relief</label>
            <label><input type="checkbox" onchange="app.toggleThematicLayer('rainfall', this.checked)"> 🌧️ Rainfall</label>
            <label><input type="checkbox" onchange="app.toggleThematicLayer('population', this.checked)"> 👥 Population</label>
          </div>
        `;
      } else if (tp === 4) {
        this.exploreState.heightVal = 120;
        this.exploreState.profile = "gentle";
        container.innerHTML = `
          <div style="display:flex; gap:2rem; flex-wrap:wrap; align-items:center;">
            <label>Height: <span id="height-lbl">120m</span> <input type="range" min="50" max="200" value="120" oninput="app.setContourHeight(this.value)"></label>
            <select onchange="app.setContourProfile(this.value)">
              <option value="gentle">Gentle Slope</option>
              <option value="steep">Steep Slope</option>
              <option value="cliff">Cliff</option>
            </select>
          </div>
        `;
      }
    } else if (ch === 1) {
      // Ch 2: Sun Energy
      if (tp === 0 || tp === 1) {
        this.exploreState.latitude = 0;
        container.innerHTML = `
          <div style="display:flex; align-items:center; gap:1rem;">
            <label style="font-weight:700; color:var(--text-primary);">Select Latitude: <span id="lat-lbl" style="color:var(--accent-primary);">0° (Equator)</span></label>
            <input type="range" min="-90" max="90" value="0" style="accent-color:var(--accent-primary);" oninput="app.updateLatitude(this.value)">
          </div>
        `;
      } else if (tp === 2) {
        this.exploreState.heatingTime = 0;
        this.exploreState.landTemp = 28;
        this.exploreState.waterTemp = 28;
        container.innerHTML = `
          <div style="display:flex; gap:1rem; align-items:center;">
            <button class="primary-btn" onclick="app.triggerDifferentialHeating()">Heat Up Elements (10s)</button>
            <span style="font-size:0.85rem; color:var(--text-secondary);" id="heating-stats">Initial State: Balanced at 28°C</span>
          </div>
        `;
      }
    } else if (ch === 2) {
      // Ch 3: Seasons
      this.exploreState.month = 0;
      container.innerHTML = `
        <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap; width:100%;">
          <label style="font-weight:700; color:var(--text-primary);">Orbit Month: <span id="month-lbl" style="color:var(--accent-primary);">January</span></label>
          <input type="range" min="0" max="11" value="0" style="width:220px; accent-color:var(--accent-primary);" oninput="app.updateMonthOrbit(this.value)">
        </div>
      `;
    } else if (ch === 3) {
      // Ch 4: Polar Regions
      this.exploreState.winterSeason = true;
      container.innerHTML = `
        <div style="display:flex; gap:1rem; align-items:center;">
          <label style="font-weight:700; color:var(--text-primary);">Toggle Season:</label>
          <button class="watch-btn" onclick="app.togglePolarSeason(true)">Polar Winter (Darkness)</button>
          <button class="watch-btn" onclick="app.togglePolarSeason(false)">Polar Summer (24h Day)</button>
        </div>
      `;
    } else if (ch === 4) {
      // Ch 5: Forests
      this.exploreState.loggingRate = 20;
      this.exploreState.reforestOn = true;
      container.innerHTML = `
        <div style="display:flex; gap:2rem; align-items:center; flex-wrap:wrap;">
          <label style="font-weight:700; color:var(--text-primary);">Logging Speed: <span id="log-lbl" style="color:var(--accent-primary);">20%</span> <input type="range" min="0" max="100" value="20" oninput="app.updateLogging(this.value)"></label>
          <label style="font-weight:700; color:var(--text-primary); cursor:pointer;"><input type="checkbox" checked onchange="app.updateReforest(this.checked)"> Active Reforestation</label>
        </div>
      `;
    } else if (ch === 5) {
      // Ch 6: Mining
      this.exploreState.miningMethod = "open";
      this.exploreState.mineDepth = 15;
      container.innerHTML = `
        <div style="display:flex; gap:2rem; align-items:center; flex-wrap:wrap;">
          <label style="font-weight:700; color:var(--text-primary);">Mining Depth: <span id="depth-lbl" style="color:var(--accent-primary);">15m</span> <input type="range" min="10" max="180" value="15" oninput="app.updateMineDepth(this.value)"></label>
          <select onchange="app.updateMiningMethod(this.value)" style="padding:0.4rem 0.8rem; border-radius:6px; border:1px solid var(--border-color); font-family:var(--font-sans); outline:none;">
            <option value="open">Open-Cast Pit Mining</option>
            <option value="under">Underground Shaft Mining</option>
          </select>
        </div>
      `;
    } else if (ch === 6) {
      // Ch 7: Banking
      this.exploreState.reserveRatio = 10;
      container.innerHTML = `
        <div style="display:flex; align-items:center; gap:1rem;">
          <label style="font-weight:700; color:var(--text-primary);">Reserve Ratio: <span id="reserve-lbl" style="color:var(--accent-primary);">10%</span></label>
          <input type="range" min="5" max="50" value="10" style="accent-color:var(--accent-primary);" oninput="app.updateReserveRatio(this.value)">
        </div>
      `;
    } else if (ch === 7) {
      // Ch 8: Technology
      this.exploreState.automationRate = 20;
      container.innerHTML = `
        <div style="display:flex; align-items:center; gap:1rem;">
          <label style="font-weight:700; color:var(--text-primary);">Factory Automation: <span id="auto-lbl" style="color:var(--accent-primary);">20%</span></label>
          <input type="range" min="0" max="100" value="20" style="accent-color:var(--accent-primary);" oninput="app.updateAutomation(this.value)">
        </div>
      `;
    } else if (ch === 8) {
      // Ch 9: Public Health
      this.exploreState.healthBudget = 30; // public clinics percentage
      container.innerHTML = `
        <div style="display:flex; align-items:center; gap:1rem;">
          <label style="font-weight:700; color:var(--text-primary);">State Health Budget for PHCs: <span id="budget-lbl" style="color:var(--accent-primary);">30%</span></label>
          <input type="range" min="10" max="90" value="30" style="accent-color:var(--accent-primary);" oninput="app.updateHealthBudget(this.value)">
        </div>
      `;
    } else if (ch === 9) {
      // Ch 10: Landlords
      this.exploreState.landlordTax = 40;
      container.innerHTML = `
        <div style="display:flex; align-items:center; gap:1rem;">
          <label style="font-weight:700; color:var(--text-primary);">Feudal Rent Rate: <span id="rent-lbl" style="color:var(--accent-primary);">40%</span></label>
          <input type="range" min="10" max="95" value="40" style="accent-color:var(--accent-primary);" oninput="app.updateLandlordTax(this.value)">
        </div>
      `;
    }

    this.renderExploreSandbox();
  }

  // --- DYNAMIC CONTROL UPDATES ENGINE ---
  updateLatitude(val) {
    this.exploreState.latitude = parseInt(val);
    const lbl = document.getElementById("lat-lbl");
    if (lbl) lbl.innerText = `${val}° ${val == 0 ? "(Equator)" : val > 0 ? "N" : "S"}`;
    this.renderExploreSandbox();
  }

  triggerDifferentialHeating() {
    let seconds = 0;
    const statsEl = document.getElementById("heating-stats");
    this.exploreState.landTemp = 28;
    this.exploreState.waterTemp = 28;

    const timer = setInterval(() => {
      seconds++;
      this.exploreState.landTemp += 2.8; // heats up fast
      this.exploreState.waterTemp += 0.8; // heats up slow
      
      if (statsEl) {
        statsEl.innerText = `Heating: ${seconds}s | Land: ${this.exploreState.landTemp.toFixed(1)}°C | Water: ${this.exploreState.waterTemp.toFixed(1)}°C`;
      }
      this.renderExploreSandbox();

      if (seconds >= 10) clearInterval(timer);
    }, 200);
  }

  updateMonthOrbit(val) {
    const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.exploreState.month = parseInt(val);
    const lbl = document.getElementById("month-lbl");
    if (lbl) lbl.innerText = monthsList[val];
    this.renderExploreSandbox();
  }

  togglePolarSeason(isWinter) {
    this.exploreState.winterSeason = isWinter;
    this.renderExploreSandbox();
  }

  updateLogging(val) {
    this.exploreState.loggingRate = parseInt(val);
    const lbl = document.getElementById("log-lbl");
    if (lbl) lbl.innerText = `${val}%`;
    this.renderExploreSandbox();
  }

  updateReforest(checked) {
    this.exploreState.reforestOn = checked;
    this.renderExploreSandbox();
  }

  updateMineDepth(val) {
    this.exploreState.mineDepth = parseInt(val);
    const lbl = document.getElementById("depth-lbl");
    if (lbl) lbl.innerText = `${val} meters`;
    this.renderExploreSandbox();
  }

  updateMiningMethod(val) {
    this.exploreState.miningMethod = val;
    this.renderExploreSandbox();
  }

  updateReserveRatio(val) {
    this.exploreState.reserveRatio = parseInt(val);
    const lbl = document.getElementById("reserve-lbl");
    if (lbl) lbl.innerText = `${val}%`;
    this.renderExploreSandbox();
  }

  updateAutomation(val) {
    this.exploreState.automationRate = parseInt(val);
    const lbl = document.getElementById("auto-lbl");
    if (lbl) lbl.innerText = `${val}%`;
    this.renderExploreSandbox();
  }

  updateHealthBudget(val) {
    this.exploreState.healthBudget = parseInt(val);
    const lbl = document.getElementById("budget-lbl");
    if (lbl) lbl.innerText = `${val}%`;
    this.renderExploreSandbox();
  }

  updateLandlordTax(val) {
    this.exploreState.landlordTax = parseInt(val);
    const lbl = document.getElementById("rent-lbl");
    if (lbl) lbl.innerText = `${val}%`;
    this.renderExploreSandbox();
  }

  // --- DYNAMIC MULTI-CHAPTER EXPLORE DRAWINGS ---
  drawExploreContent(chapter, topic, ctx, w, h) {
    // If Chapter 1, delegate to existing sandboxes
    if (chapter === 0) {
      if (topic === 0) this.drawTopic1Sandbox(ctx, w, h);
      else if (topic === 1) this.drawTopic2Sandbox(ctx, w, h);
      else if (topic === 2) this.drawTopic3Sandbox(ctx, w, h);
      else if (topic === 3) this.drawTopic4Sandbox(ctx, w, h);
      else if (topic === 4) this.drawTopic5Sandbox(ctx, w, h);
      return;
    }

    const primaryColor = this.theme === "dark" ? "#f59e0b" : "#b0813f";
    const secondaryColor = this.theme === "dark" ? "#10b981" : "#2f5647";
    const textColor = this.theme === "dark" ? "#f1f5f9" : "#121c2c";
    const boxBg = this.theme === "dark" ? "#1b2138" : "#ffffff";

    ctx.save();
    ctx.lineWidth = 2;

    if (chapter === 1) {
      // Ch 2: Sun Energy
      if (topic === 0 || topic === 1) {
        // Insolation angle simulator
        const lat = this.exploreState.latitude || 0;
        const rad = lat * Math.PI / 180;

        // Draw Earth arc
        ctx.strokeStyle = primaryColor;
        ctx.beginPath();
        ctx.arc(w/2, h + 100, 200, Math.PI, 2*Math.PI);
        ctx.stroke();

        // Ray angle calculation
        ctx.strokeStyle = "#ff9900";
        ctx.lineWidth = 3;
        const targetX = w/2 + Math.sin(rad) * 200;
        const targetY = h + 100 - Math.cos(rad) * 200;

        ctx.beginPath();
        ctx.moveTo(targetX, targetY - 140);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();

        // Draw normal vector at intersection
        ctx.strokeStyle = "#ff0000";
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.lineTo(targetX + Math.sin(rad)*40, targetY - Math.cos(rad)*40);
        ctx.stroke();

        // Stats Box
        ctx.fillStyle = boxBg;
        ctx.fillRect(30, 40, 240, 100);
        ctx.strokeStyle = primaryColor;
        ctx.strokeRect(30, 40, 240, 100);

        ctx.fillStyle = textColor;
        ctx.font = "12px sans-serif";
        ctx.fillText(`Latitude: ${lat}°`, 45, 65);
        ctx.fillText(`Ray Strike Angle: ${90 - Math.abs(lat)}°`, 45, 85);
        ctx.fillText(`Heat Intensity: ${Math.round(Math.cos(rad) * 100)}%`, 45, 105);
      } else if (topic === 2) {
        // Land vs Water temp values
        const lT = this.exploreState.landTemp || 28;
        const wT = this.exploreState.waterTemp || 28;

        // Render thermometer bars
        ctx.fillStyle = "#8c6b3f";
        ctx.fillRect(100, h - 50 - lT * 3, 50, lT * 3);
        ctx.fillStyle = "#4a90e2";
        ctx.fillRect(w - 150, h - 50 - wT * 3, 50, wT * 3);

        ctx.fillStyle = textColor;
        ctx.font = "bold 14px sans-serif";
        ctx.fillText(`Land: ${lT.toFixed(1)}°C`, 90, h - 60 - lT * 3);
        ctx.fillText(`Water: ${wT.toFixed(1)}°C`, w - 165, h - 60 - wT * 3);
      }
    } else if (chapter === 2) {
      // Ch 3: Seasons Orbit Sandbox
      const monthIdx = this.exploreState.month || 0;
      const angle = (monthIdx * 30) * Math.PI / 180;

      // Draw orbit path
      ctx.strokeStyle = "rgba(176,129,63,0.15)";
      ctx.beginPath();
      ctx.ellipse(w/2, h/2, 220, 110, 0, 0, 2*Math.PI);
      ctx.stroke();

      // Central Sun
      ctx.fillStyle = "#ffaa00";
      ctx.beginPath();
      ctx.arc(w/2, h/2, 30, 0, 2*Math.PI);
      ctx.fill();

      // Earth position
      const ex = w/2 + Math.cos(angle) * 220;
      const ey = h/2 + Math.sin(angle) * 110;

      // Earth body
      ctx.fillStyle = "#3b5998";
      ctx.beginPath();
      ctx.arc(ex, ey, 18, 0, 2*Math.PI);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.stroke();

      // Tilted axis line on Earth
      ctx.strokeStyle = "#ff0000";
      ctx.beginPath();
      ctx.moveTo(ex - 8, ey - 22);
      ctx.lineTo(ex + 8, ey + 22);
      ctx.stroke();

      // Stats card
      ctx.fillStyle = boxBg;
      ctx.fillRect(w - 280, 40, 240, 100);
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(w - 280, 40, 240, 100);

      ctx.fillStyle = textColor;
      ctx.font = "12px sans-serif";
      const seasons = ["Winter", "Winter", "Spring Equinox", "Summer", "Summer", "Summer Solstice", "Monsoon", "Autumn", "Autumn Equinox", "Winter", "Winter", "Winter"];
      ctx.fillText(`Month: ${monthIdx + 1}`, w - 265, 65);
      ctx.fillText(`Season: ${seasons[monthIdx]}`, w - 265, 85);
      ctx.fillText(`Hemi Tilt: ${monthIdx >= 3 && monthIdx <= 8 ? "North Leaning" : "South Leaning"}`, w - 265, 105);
    } else if (chapter === 3) {
      // Ch 4: Polar Regions Sandbox
      const isWinter = this.exploreState.winterSeason;

      // Draw polar background
      ctx.fillStyle = isWinter ? "#0b0f19" : "#e6f2ff";
      ctx.fillRect(0, 0, w, h);

      // Ice layer
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, h - 80, w, 80);

      // Inuit Igloo (if winter) or skin tent (if summer)
      if (isWinter) {
        ctx.strokeStyle = "#a0b0c0";
        ctx.beginPath();
        ctx.arc(w/2, h - 80, 60, Math.PI, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.fillStyle = "#ffaa00";
        ctx.font = "bold 13px sans-serif";
        ctx.fillText("Igloo (Traps Heat)", w/2 - 50, h - 110);
      } else {
        // Tent
        ctx.strokeStyle = "#8b5a2b";
        ctx.beginPath();
        ctx.moveTo(w/2 - 50, h - 80);
        ctx.lineTo(w/2, h - 160);
        ctx.lineTo(w/2 + 50, h - 80);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "#e0a96d";
        ctx.fill();
        ctx.fillStyle = textColor;
        ctx.fillText("Skin Tent (Summer)", w/2 - 50, h - 90);
      }

      ctx.fillStyle = textColor;
      ctx.font = "bold 12px sans-serif";
      ctx.fillText(isWinter ? "Polar Night (24h Darkness)" : "Midnight Sun (24h Daylight)", 30, 40);
    } else if (chapter === 4) {
      // Ch 5: Forests logging
      const logRate = this.exploreState.loggingRate || 20;
      const ref = this.exploreState.reforestOn;

      const health = Math.max(0, Math.min(100, 100 - logRate + (ref ? 30 : 0)));

      // Draw forests trees (represented by green stalks)
      const count = Math.round(health * 0.15);
      for (let i = 0; i < count; i++) {
        const tx = 50 + (i * 45) % (w - 100);
        const ty = h - 60 - (i * 10) % 80;
        
        ctx.fillStyle = "#8b5a2b";
        ctx.fillRect(tx - 3, ty, 6, h - ty);
        
        ctx.fillStyle = "rgba(46, 139, 87, 0.8)";
        ctx.beginPath();
        ctx.arc(tx, ty, 15, 0, 2*Math.PI);
        ctx.fill();
      }

      // Stats HUD
      ctx.fillStyle = boxBg;
      ctx.fillRect(30, 40, 240, 100);
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(30, 40, 240, 100);

      ctx.fillStyle = textColor;
      ctx.font = "12px sans-serif";
      ctx.fillText(`Logging Rate: ${logRate}%`, 45, 65);
      ctx.fillText(`Reforestation: ${ref ? "ON" : "OFF"}`, 45, 85);
      ctx.fillText(`Forest Health Index: ${health}%`, 45, 105);
    } else if (chapter === 5) {
      // Ch 6: Mining depth sandbox
      const method = this.exploreState.miningMethod;
      const depth = this.exploreState.mineDepth;

      // Draw surface layer
      ctx.fillStyle = "#8b5a2b";
      ctx.fillRect(0, h - 120, w, 120);

      if (method === "open") {
        // Open-cast terraced pit
        ctx.fillStyle = this.theme === "dark" ? "#0a0f1d" : "#faf8f5";
        ctx.beginPath();
        ctx.moveTo(w/2 - 120, h - 120);
        ctx.lineTo(w/2 - 60, h - 120 + depth/2);
        ctx.lineTo(w/2 + 60, h - 120 + depth/2);
        ctx.lineTo(w/2 + 120, h - 120);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = primaryColor;
        ctx.stroke();

        ctx.fillStyle = textColor;
        ctx.fillText("Open-Cast Pit Terrace", w/2 - 60, h - 100);
      } else {
        // Underground shaft
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(w/2 - 20, h - 120);
        ctx.lineTo(w/2 - 20, h - 120 + depth);
        ctx.lineTo(w/2 + 20, h - 120 + depth);
        ctx.lineTo(w/2 + 20, h - 120);
        ctx.stroke();

        // Elevator lift
        ctx.fillStyle = primaryColor;
        ctx.fillRect(w/2 - 15, h - 120 + depth - 20, 30, 20);

        ctx.fillStyle = "#ff0000";
        ctx.fillText("Underground Tunnel", w/2 - 50, h - 120 + depth + 20);
      }
    } else if (chapter === 6) {
      // Ch 7: Credit creation table
      const reserve = this.exploreState.reserveRatio || 10;
      const multiplier = (100 / reserve).toFixed(1);

      ctx.fillStyle = boxBg;
      ctx.fillRect(w/2 - 200, h/2 - 140, 400, 240);
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(w/2 - 200, h/2 - 140, 400, 240);

      ctx.fillStyle = textColor;
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("Credit Multiplier Ledger", w/2 - 90, h/2 - 110);
      ctx.font = "12px monospace";
      ctx.fillText(`Initial Deposit: Rs 10,000`, w/2 - 170, h/2 - 70);
      ctx.fillText(`Reserve Ratio:   ${reserve}%`, w/2 - 170, h/2 - 40);
      ctx.fillText(`Multiplier:      ${multiplier}x`, w/2 - 170, h/2 - 10);
      
      const totalCredit = (10000 * multiplier).toLocaleString("en-IN");
      ctx.fillStyle = secondaryColor;
      ctx.fillText(`Total Money Supply: Rs ${totalCredit}`, w/2 - 170, h/2 + 40);
    } else if (chapter === 7) {
      // Ch 8: Industrial automation
      const autoRate = this.exploreState.automationRate || 20;
      
      const output = Math.round(100 + autoRate * 8);
      const jobs = Math.max(5, Math.round(100 - autoRate * 0.95));

      // Draw stats indicators
      ctx.fillStyle = boxBg;
      ctx.fillRect(50, 40, w - 100, 160);
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(50, 40, w - 100, 160);

      ctx.fillStyle = textColor;
      ctx.font = "bold 15px sans-serif";
      ctx.fillText("Automation & Workforce Indicators", 70, 70);
      
      ctx.font = "13px sans-serif";
      ctx.fillText(`Automation Rate: ${autoRate}%`, 75, 110);
      ctx.fillText(`Production Output: ${output} rolls/day (+${autoRate * 8}%)`, 75, 140);
      ctx.fillText(`Workforce Employed: ${jobs} Artisans (-${autoRate}%)`, 75, 170);
    } else if (chapter === 8) {
      // Ch 9: Public health budget allocation
      const budget = this.exploreState.healthBudget || 30;
      const deathRate = Math.max(5, 75 - budget * 0.7);

      ctx.fillStyle = boxBg;
      ctx.fillRect(50, 40, w - 100, 160);
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(50, 40, w - 100, 160);

      ctx.fillStyle = textColor;
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("Healthcare Budget Allocation Impact", 70, 70);
      ctx.font = "13px sans-serif";
      ctx.fillText(`Budget Allocated to local PHCs: ${budget}%`, 75, 110);
      ctx.fillText(`Access to Safe Drinking Water: ${Math.min(100, 40 + budget * 0.6)}%`, 75, 140);
      ctx.fillText(`Infant Mortality Rate (per 1k): ${deathRate.toFixed(1)} deaths`, 75, 170);
    } else if (chapter === 9) {
      // Ch 10: Landlords taxes
      const tax = this.exploreState.landlordTax || 40;
      const defaultRisk = Math.round(tax * 0.95);
      const peasantRevolt = tax > 70 ? "EXTREME DANGER" : tax > 50 ? "HIGH RISK" : "STABLE";

      ctx.fillStyle = boxBg;
      ctx.fillRect(50, 40, w - 100, 160);
      ctx.strokeStyle = primaryColor;
      ctx.strokeRect(50, 40, w - 100, 160);

      ctx.fillStyle = textColor;
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("Landlord Feudal Revenue Simulator", 70, 70);
      ctx.font = "13px sans-serif";
      ctx.fillText(`Land Rent Rate: ${tax}% of harvest`, 75, 110);
      ctx.fillText(`Peasant Tax Default Risk: ${defaultRisk}%`, 75, 140);
      ctx.fillText(`Peasant Rebellion Risk: ${peasantRevolt}`, 75, 170);
    }

    ctx.restore();
  }
}

// Instantiate global app engine
const app = new LearningApp();
