const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const failures = [];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function size(relativePath) {
  return fs.statSync(path.join(root, relativePath)).size;
}

function fail(message) {
  failures.push(message);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

const lessons = readJson("data/lessons.json");
const projects = readJson("data/projects.json");
const existingAssetStatuses = new Set(["generated", "captured", "reviewed", "approved", "needs-recapture"]);

for (const lesson of lessons) {
  for (const asset of lesson.mediaAssets || []) {
    if (existingAssetStatuses.has(asset.status) && !exists(asset.path)) {
      fail(`lessons.json lesson ${lesson.id} mediaAssets missing ${asset.status} file: ${asset.path}`);
    }
    if (!existingAssetStatuses.has(asset.status) && exists(asset.path)) {
      fail(`lessons.json lesson ${lesson.id} mediaAssets marked missing but file exists: ${asset.path}`);
    }
  }
}

for (const project of projects) {
  if (project.exists && !exists(project.filePath)) {
    fail(`projects.json ${project.title} exists=true but file missing: ${project.filePath}`);
  }
  if (!project.exists && project.status !== "missing" && exists(project.filePath)) {
    fail(`projects.json ${project.title} exists=false but file exists: ${project.filePath}`);
  }
  if (project.exists && fs.statSync(path.join(root, project.filePath)).isFile() && project.fileSize !== size(project.filePath)) {
    fail(`projects.json ${project.title} fileSize mismatch: ${project.filePath}`);
  }
}

for (const file of walk(root)) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const stat = fs.statSync(file);
  if (stat.size === 0) fail(`0 byte file: ${rel}`);
  if (/\.(html|js|json|md|css)$/i.test(file)) {
    const text = fs.readFileSync(file, "utf8");
    const emptyHref = "href=" + "\"#\"";
    const emptySrc = "src=" + "\"\"";
    if (text.includes(emptyHref)) fail(`empty href found in ${rel}`);
    if (text.includes(emptySrc)) fail(`empty src found in ${rel}`);
    const legacyTerms = [
      "place" + "holder",
      "Phase 1 " + "place" + "holder",
      "後續" + "階段" + "放置",
      "檔案" + "製作中",
      "尚未" + "提供",
      "待" + "產生",
      "TO" + "DO",
      "coming " + "soon"
    ];
    if (legacyTerms.some((term) => text.toLowerCase().includes(term.toLowerCase()))) {
      fail(`legacy incomplete-content wording found in ${rel}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("site asset check passed");
