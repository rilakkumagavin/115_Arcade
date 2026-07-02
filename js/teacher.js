async function initTeacherPage() {
  const scheduleRoot = document.querySelector("[data-schedule]");
  if (!scheduleRoot) return;

  const schedule = await loadJson("data/schedule.json");
  scheduleRoot.innerHTML = schedule.sessions.map((session) => `
    <section class="card">
      <div class="card-body">
        <h2>${session.name}</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>時間</th><th>章節</th><th>網站入口</th></tr></thead>
            <tbody>
              ${session.items.map((item) => `
                <tr>
                  <td>${item.time}</td>
                  <td>${item.title}</td>
                  <td>${item.lessonId === null ? "教師現場引導" : `<a href="lesson.html?lesson=${item.lessonId}">任務 ${item.lessonId}</a>`}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `).join("");
}

document.addEventListener("DOMContentLoaded", initTeacherPage);
