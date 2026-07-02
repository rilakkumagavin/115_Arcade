const CAMP_STORAGE_KEY = "chipHeroCampProgress";

const navItems = [
  { href: "index.html", label: "首頁" },
  { href: "student.html", label: "學生任務" },
  { href: "playground.html", label: "完成版展示" },
  { href: "downloads.html", label: "下載中心" },
  { href: "hardware.html", label: "實機下載" },
  { href: "teacher.html", label: "教師專區" }
];

function getCurrentPage() {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
}

function renderChrome() {
  const header = document.querySelector("[data-site-header]");
  const footer = document.querySelector("[data-site-footer]");
  const current = getCurrentPage();

  if (header) {
    header.innerHTML = `
      <div class="pixel-strip" aria-hidden="true"></div>
      <div class="nav-wrap">
        <a class="brand" href="index.html">
          <span class="brand-mark" aria-hidden="true">C</span>
          <span>晶片勇者營隊</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">選單</button>
        <nav aria-label="主要導覽">
          <ul class="nav-list" id="site-nav">
            ${navItems.map((item) => `
              <li>
                <a class="nav-link" href="${item.href}" ${current === item.href ? 'aria-current="page"' : ""}>${item.label}</a>
              </li>
            `).join("")}
          </ul>
        </nav>
      </div>
    `;

    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".nav-list");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  if (footer) {
    footer.innerHTML = `
      <div class="footer-inner">
        <span>《晶片勇者：校園冒險》MakeCode Arcade 營隊教材網站</span>
        <span>任務0至任務4教材已整合；下載與測試狀態依實際進度標示。</span>
      </div>
    `;
  }
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`無法載入 ${path}`);
  }
  return response.json();
}

function readProgress() {
  const fallback = {
    version: 1,
    completedLessons: [],
    lastVisitedLesson: null,
    updatedAt: null
  };

  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(CAMP_STORAGE_KEY)) };
  } catch {
    return fallback;
  }
}

function writeProgress(progress) {
  const next = {
    ...progress,
    version: 1,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(CAMP_STORAGE_KEY, JSON.stringify(next));
  return next;
}

function isLessonComplete(id) {
  return readProgress().completedLessons.includes(Number(id));
}

function setLessonComplete(id, complete) {
  const progress = readProgress();
  const lessonId = Number(id);
  const set = new Set(progress.completedLessons);

  if (complete) {
    set.add(lessonId);
  } else {
    set.delete(lessonId);
  }

  return writeProgress({
    ...progress,
    lastVisitedLesson: lessonId,
    completedLessons: [...set].sort((a, b) => a - b)
  });
}

function clearProgress() {
  localStorage.removeItem(CAMP_STORAGE_KEY);
}

function iconLabel(icon) {
  const labels = {
    gamepad: "▶",
    hero: "人",
    arrows: "↔",
    map: "圖",
    jump: "↑",
    chip: "◆",
    bug: "!",
    portal: "◎",
    spark: "*",
    download: "↓"
  };
  return labels[icon] || "任";
}

function initHome() {
  const progress = readProgress();
  const continueLink = document.querySelector("[data-continue-link]");
  if (continueLink) {
    const lesson = Number.isInteger(progress.lastVisitedLesson) ? progress.lastVisitedLesson : 0;
    continueLink.href = `lesson.html?lesson=${lesson}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  initHome();
});
