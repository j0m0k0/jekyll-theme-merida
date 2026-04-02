const themeIcons = {
  light: `
    <svg aria-hidden="true" class="size-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
  dark: `
    <svg aria-hidden="true" class="size-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
  system: `
    <svg aria-hidden="true" class="size-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
};

const themeOrder = ["system", "light", "dark"];
const themeNames = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

function normalizeTheme(theme) {
  if (theme === "default") {
    return "system";
  }

  if (themeOrder.includes(theme)) {
    return theme;
  }

  return "system";
}

function getStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Ignore storage failures and keep the in-memory state only.
  }
}

function getResolvedTheme(theme) {
  if (theme !== "system") {
    return theme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  const normalizedTheme = normalizeTheme(theme);
  const root = document.documentElement;
  const resolvedTheme = getResolvedTheme(normalizedTheme);

  root.dataset.theme = normalizedTheme;
  root.style.colorScheme = resolvedTheme;

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    const icon = button.querySelector(".theme-toggle-icon");

    if (icon) {
      icon.innerHTML = themeIcons[normalizedTheme];
    }

    button.setAttribute("aria-label", `${themeNames[normalizedTheme]} Theme`);
    button.setAttribute("title", `${themeNames[normalizedTheme]} Theme`);
  });

  return normalizedTheme;
}

const root = document.documentElement;
const initialTheme = normalizeTheme(getStoredTheme() || root.dataset.theme);

applyTheme(initialTheme);

function initThemeSwitch() {
  let currentTheme = normalizeTheme(root.dataset.theme);

  applyTheme(currentTheme);

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const currentIndex = themeOrder.indexOf(currentTheme);
      const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];

      currentTheme = applyTheme(nextTheme);
      setStoredTheme(currentTheme);
    });
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemThemeChange = () => {
    if (normalizeTheme(root.dataset.theme) === "system") {
      applyTheme("system");
    }
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleSystemThemeChange);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handleSystemThemeChange);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeSwitch);
} else {
  initThemeSwitch();
}
