function getLessonId() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("lesson") ?? 0);
  return Number.isInteger(id) ? id : 0;
}

function listItems(items = []) {
  return `<ul class="info-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function statusBadge(status) {
  const good = ["generated", "captured", "import-tested", "simulator-tested", "hardware-tested", "approved"];
  return `<span class="badge ${good.includes(status) ? "good" : "warn"}">${status}</span>`;
}

function fileName(path = "") {
  return path.split("/").pop() || path;
}

function canShowAsset(status) {
  return ["generated", "captured", "reviewed", "approved", "needs-recapture"].includes(status);
}

function renderAssetFigure(asset) {
  if (!canShowAsset(asset.status)) {
    return `
      <figure class="asset-figure">
        <div class="asset-empty">尚未放入實際 MakeCode 積木截圖<br><strong>${fileName(asset.path)}</strong></div>
        <figcaption>${asset.title}</figcaption>
      </figure>
    `;
  }

  return `
    <figure class="asset-figure ${asset.type === "game-preview" ? "is-preview" : "is-block"}">
      <a href="${asset.path}" target="_blank" rel="noopener" aria-label="放大檢視：${asset.title}">
        <img class="evidence-image" src="${asset.path}" alt="${asset.alt}">
      </a>
      <figcaption>
        ${asset.title}
        ${asset.status === "needs-recapture" ? `<span class="badge warn">需重截</span>` : ""}
      </figcaption>
    </figure>
  `;
}

function renderImageGroup(images = []) {
  if (!images.length) return "";
  return `<div class="asset-gallery">${images.map(renderAssetFigure).join("")}</div>`;
}

function renderMediaAssets(lesson) {
  const assets = lesson.mediaAssets || [];
  if (!assets.length) {
    return `<div class="asset-empty">尚未放入實際 MakeCode 積木截圖</div>`;
  }
  return renderImageGroup(assets);
}

function renderProjectDownloads(lesson, projects) {
  if (lesson.downloadMode === "none") {
    return `
      <section class="section card">
        <div class="card-body stack">
          <h2>專案下載</h2>
          <p>${lesson.downloadNote}</p>
        </div>
      </section>
    `;
  }

  const items = projects.filter((project) => project.lessonId === lesson.id);
  if (!items.length) {
    return `
      <section class="section card">
        <div class="card-body stack">
          <h2>專案下載</h2>
          <p>本任務尚未登錄可下載的 MakeCode 專案檔。</p>
        </div>
      </section>
    `;
  }

  return `
    <section class="section card">
      <div class="card-body stack">
        <h2>專案下載</h2>
        ${lesson.downloadNote ? `<p>${lesson.downloadNote}</p>` : ""}
        <div class="grid two">
          ${items.map((item) => `
            <article class="card">
              <div class="card-body stack">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="actions">
                  ${statusBadge(item.status)}
                  <span class="badge">${item.fileType}</span>
                  ${item.hardwareModel ? `<span class="badge">硬體：${item.hardwareModel}</span>` : ""}
                </div>
                <small>檔案大小：${item.exists ? `${item.fileSize} bytes` : "缺少檔案"}</small>
                <small>匯入：${item.importTested ? "已測試" : "未測試"}，模擬器：${item.simulatorTested ? "已測試" : "未測試"}，實機：${item.hardwareTested ? "已測試" : "未測試"}</small>
                ${item.exists ? `<a class="btn" href="${item.filePath}" download>下載檔案</a>` : `<button class="btn is-disabled" type="button" disabled>缺少檔案：${fileName(item.filePath)}</button>`}
                <p>${item.notes}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderCustomSections(lesson) {
  const sections = lesson.customSections || [];
  return sections.map((section) => `
    <section class="section card">
      <div class="card-body stack">
        <h2>${section.title}</h2>
        ${section.purpose ? `<p>${section.purpose}</p>` : ""}
        ${section.body ? `<p>${section.body}</p>` : ""}
        ${section.explanation?.map((paragraph) => `<p>${paragraph}</p>`).join("") || ""}
        ${section.steps?.length ? `<h3>操作步驟</h3>${listItems(section.steps)}` : ""}
        ${renderImageGroup(section.mediaAssets)}
      </div>
    </section>
  `).join("");
}

function renderComparison(comparison) {
  if (!comparison) return "";
  const items = comparison.items || comparison.methods || [];
  return `
    <section class="section card">
      <div class="card-body stack">
        <h2>${comparison.title}</h2>
        <div class="grid two">
          ${items.map((method) => `
            <article class="callout">
              <h3>${method.title}</h3>
              ${method.description ? `<p>${method.description}</p>` : ""}
              ${method.advantages?.length ? `<h4>優點</h4>${listItems(method.advantages)}` : ""}
              ${method.pros?.length ? `<h4>優點</h4>${listItems(method.pros)}` : ""}
              ${method.disadvantages?.length ? `<h4>缺點</h4>${listItems(method.disadvantages)}` : ""}
              ${method.cons?.length ? `<h4>缺點</h4>${listItems(method.cons)}` : ""}
              ${method.tag ? `<p><strong>${method.tag}</strong></p>` : ""}
            </article>
          `).join("")}
        </div>
        ${comparison.required ? `<p><strong>本營隊共同必做使用：</strong>${comparison.required}</p>` : ""}
        ${comparison.advanced ? `<p><strong>逐格設定積木列為：</strong>${comparison.advanced}</p>` : ""}
      </div>
    </section>
  `;
}

function renderQuestions(questions = []) {
  if (!questions.length) return "";
  return `
    <section class="section card">
      <div class="card-body stack">
        <h2>學生理解提問</h2>
        <div class="grid two">
          ${questions.map((item) => `
            <article class="callout">
              <h3>${item.question}</h3>
              <p><strong>正確答案：</strong>${item.answer}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderAdvancedSections(lesson) {
  const sections = lesson.advancedSections || [];
  return sections.map((section) => `
    <section class="section card">
      <div class="card-body stack">
        <h2>${section.title}</h2>
        ${section.body ? `<p>${section.body}</p>` : ""}
        ${section.description?.map((paragraph) => `<p>${paragraph}</p>`).join("") || ""}
        ${section.steps?.length ? `<h3>步驟</h3>${listItems(section.steps)}` : ""}
        ${renderImageGroup(section.mediaAssets)}
      </div>
    </section>
  `).join("");
}

function phaseStatusSection(lesson) {
  if (!lesson.phaseStatus) return "";
  return `
    <section class="section card">
      <div class="card-body stack">
        <h2>硬體驗證狀態</h2>
        <p>${lesson.phaseStatus.summary}</p>
        <div class="actions">
          <span class="badge good">passed</span>
          <span class="badge warn">pending</span>
          <span class="badge">硬體：${lesson.phaseStatus.hardwareTarget}</span>
        </div>
        <div class="grid two">
          ${(lesson.phaseStatus.images || []).map((path) => `<img class="evidence-image" src="${path}" alt="Phase 3 硬體驗證畫面">`).join("")}
        </div>
        <div class="grid two">
          <div>
            <h3>已通過</h3>
            ${listItems(lesson.phaseStatus.passed)}
          </div>
          <div>
            <h3>待測</h3>
            ${listItems(lesson.phaseStatus.pending)}
          </div>
        </div>
      </div>
    </section>
  `;
}

function attachImageFallbacks(root) {
  root.querySelectorAll("img.evidence-image").forEach((image) => {
    image.addEventListener("error", () => {
      const fallback = document.createElement("div");
      fallback.className = "asset-empty";
      fallback.textContent = "圖片讀取失敗，請通知老師確認教材檔案。";
      image.replaceWith(fallback);
    }, { once: true });
  });
}

async function initLessonPage() {
  const root = document.querySelector("[data-lesson-root]");
  if (!root) return;

  const [lessons, projects] = await Promise.all([
    loadJson("data/lessons.json"),
    loadJson("data/projects.json")
  ]);
  const lessonId = getLessonId();
  const lesson = lessons.find((item) => item.id === lessonId) || lessons[0];
  const complete = isLessonComplete(lesson.id);
  const prev = lessons.find((item) => item.id === lesson.id - 1);
  const next = lessons.find((item) => item.id === lesson.id + 1);
  writeProgress({ ...readProgress(), lastVisitedLesson: lesson.id });

  document.title = `${lesson.title} | 晶片勇者：校園冒險`;

  root.innerHTML = `
    <header class="page-header hero-panel">
      <span class="icon-tile" aria-hidden="true">${iconLabel(lesson.icon)}</span>
      <h1 class="page-title">${lesson.title}</h1>
      <p class="page-lede">${lesson.story}</p>
      <div class="actions">
        <span class="badge">${lesson.phase}</span>
        <span class="badge">${lesson.duration}</span>
        <span class="badge ${complete ? "good" : "warn"}" data-complete-badge>${complete ? "已完成" : "未完成"}</span>
      </div>
    </header>

    <div class="grid two">
      <section class="card"><div class="card-body"><h2>學習目標</h2>${listItems(lesson.goals)}</div></section>
      <section class="card"><div class="card-body"><h2>完成效果</h2><p>${lesson.result}</p></div></section>
      <section class="card"><div class="card-body"><h2>本關新增積木概念</h2>${listItems(lesson.concepts)}</div></section>
      <section class="card"><div class="card-body"><h2>使用的積木分類</h2>${listItems(lesson.categories)}</div></section>
    </div>

    <section class="section card">
      <div class="card-body">
        <h2>分段操作步驟</h2>
        ${listItems(lesson.steps)}
      </div>
    </section>

    ${renderCustomSections(lesson)}
    ${renderComparison(lesson.comparison)}
    ${renderQuestions(lesson.questions)}

    <section class="section grid two lesson-media-grid">
      <div class="card"><div class="card-body stack"><h2>積木參考圖</h2>${renderMediaAssets(lesson)}</div></div>
      <div class="card"><div class="card-body"><h2>測試方式</h2>${listItems(lesson.test)}</div></div>
    </section>

    <section class="section grid two">
      <div class="card">
        <div class="card-body">
          <h2>完成檢查表</h2>
          ${lesson.checklist.map((item, index) => `
            <label class="check-item">
              <input type="checkbox" data-check="${index}">
              <span>${item}</span>
            </label>
          `).join("")}
          <div class="actions">
            <button class="btn" type="button" data-mark-complete>${complete ? "標記為未完成" : "標記為完成"}</button>
          </div>
        </div>
      </div>
      <div class="card"><div class="card-body"><h2>常見錯誤</h2>${listItems(lesson.commonErrors)}<h2>卡關排除</h2>${listItems(lesson.rescue)}</div></div>
    </section>

    ${renderAdvancedSections(lesson)}
    ${renderProjectDownloads(lesson, projects)}

    <section class="section callout">
      <strong>實機測試提醒：</strong>
      <span>${lesson.hardwareReminder}</span>
    </section>

    ${phaseStatusSection(lesson)}

    <nav class="section actions" aria-label="任務導覽">
      ${prev ? `<a class="btn secondary" href="lesson.html?lesson=${prev.id}">上一關</a>` : ""}
      <a class="btn secondary" href="student.html">回任務總覽</a>
      ${next ? `<a class="btn" href="lesson.html?lesson=${next.id}">下一關</a>` : ""}
    </nav>
  `;

  attachImageFallbacks(root);

  root.querySelector("[data-mark-complete]").addEventListener("click", () => {
    const nextState = !isLessonComplete(lesson.id);
    setLessonComplete(lesson.id, nextState);
    window.location.reload();
  });
}

document.addEventListener("DOMContentLoaded", initLessonPage);
