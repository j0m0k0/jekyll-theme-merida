const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const configPath = path.join(rootDir, "_config.yml");
const jekyllArgs = ["exec", "jekyll", "serve", "--livereload", "--force_polling"];

let child = null;
let restartTimer = null;
let restartRequested = false;
let shuttingDown = false;

function startJekyll() {
  child = spawn("bundle", jekyllArgs, {
    cwd: rootDir,
    stdio: "inherit",
  });

  child.on("exit", (code, signal) => {
    const shouldRestart = restartRequested && !shuttingDown;
    child = null;

    if (shouldRestart) {
      restartRequested = false;
      console.log("[jekyll] Restarting after _config.yml change...");
      startJekyll();
      return;
    }

    if (!shuttingDown) {
      process.exit(code ?? (signal ? 1 : 0));
    }
  });
}

function scheduleRestart() {
  if (restartTimer) {
    clearTimeout(restartTimer);
  }

  restartTimer = setTimeout(() => {
    restartTimer = null;

    if (shuttingDown) {
      return;
    }

    restartRequested = true;

    if (!child) {
      startJekyll();
      return;
    }

    console.log("[jekyll] Detected _config.yml change.");
    child.kill("SIGTERM");
  }, 150);
}

function shutdown(signal) {
  shuttingDown = true;

  if (restartTimer) {
    clearTimeout(restartTimer);
    restartTimer = null;
  }

  if (!child) {
    process.exit(0);
    return;
  }

  child.once("exit", () => process.exit(0));
  child.kill(signal);
}

fs.watch(configPath, scheduleRestart);

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startJekyll();
