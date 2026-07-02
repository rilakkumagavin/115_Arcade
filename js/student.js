async function initStudentPage() {
  const list = document.querySelector("[data-lessons-list]");
  const progressSummary = document.querySelector("[data-progress-summary]");
  if (!list) return;

  const lessons = await loadJson("data/lessons.json");
  const progress = readProgress();
  const completed = new Set(progress.completedLessons);
  const percent = Math.round((completed.size / lessons.length) * 100);

  if (progressSummary) {
    progressSummary.innerHTML = `
      <div class="card">
        <div class="card-body stack">
          <strong>目前完成 ${completed.size} / ${lessons.length} 個任務</strong>
          <div class="progress-bar" aria-label="任務完成進度"><span style="width:${percent}%"></span></div>
          <div class="actions">
            <a class="btn" href="lesson.html?lesson=${progress.lastVisitedLesson ?? 0}">繼續上次進度</a>
            <button class="btn secondary" type="button" data-clear-progress>清除本機進度</button>
          </div>
        </div>
      </div>
    `;
  }

  list.innerHTML = lessons.map((lesson) => {
    const done = completed.has(lesson.id);
    return `
      <article class="card mission-card">
        <div class="card-body stack">
          <span class="icon-tile" aria-hidden="true">${iconLabel(lesson.icon)}</span>
          <div>
            <h2>${lesson.title}</h2>
            <p>${lesson.story}</p>
          </div>
          <div class="actions">
            <span class="badge ${done ? "good" : "warn"}">${done ? "已完成" : "未完成"}</span>
            <span class="badge">${lesson.phase}</span>
            <span class="badge">${lesson.duration}</span>
          </div>
          <a class="btn" href="lesson.html?lesson=${lesson.id}">進入任務</a>
        </div>
      </article>
    `;
  }).join("");

  document.querySelector("[data-clear-progress]")?.addEventListener("click", () => {
    clearProgress();
    window.location.reload();
  });
}

document.addEventListener("DOMContentLoaded", initStudentPage);
