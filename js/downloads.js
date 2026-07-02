function shortName(path = "") {
  return path.split("/").pop() || path;
}

async function initDownloadsPage() {
  const root = document.querySelector("[data-downloads-table]");
  if (!root) return;

  const downloads = await loadJson("data/projects.json");
  root.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>說明</th>
            <th>狀態</th>
            <th>下載</th>
          </tr>
        </thead>
        <tbody>
          ${downloads.map((item) => `
            <tr>
              <td><strong>${item.title}</strong><br><small>${item.fileType}</small></td>
              <td>${item.description}</td>
              <td>
                <span class="badge ${item.status === "missing" ? "warn" : "good"}">${item.status}</span><br>
                <small>匯入：${item.importTested ? "已測" : "未測"}，模擬器：${item.simulatorTested ? "已測" : "未測"}，實機：${item.hardwareTested ? "已測" : "未測"}</small><br>
                <small>${item.hardwareModel ? `硬體：${item.hardwareModel}` : ""}</small>
              </td>
              <td>
                ${item.exists ? `<a class="btn" href="${item.filePath}" download>下載</a>` : `<button class="btn is-disabled" type="button" disabled>缺少檔案：${shortName(item.filePath)}</button>`}
                <br><small>${item.notes}</small>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", initDownloadsPage);
