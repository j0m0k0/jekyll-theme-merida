let pagefind;

// Helper: Load Pagefind
async function initPagefind() {
  const mod = await import("/pagefind/pagefind.js");
  await mod.init();
  return mod;
}

// Helper: Show Centered Message (Placeholder or No Results)
function showPlaceholder(container, message = "Start typing to search...") {
  container.classList.remove("space-y-4", "block");
  container.classList.add("flex", "items-center", "justify-center", "h-full");
  container.innerHTML = `<p class="text-sm text-gray-500 text-center">${message}</p>`;
}

// Helper: Render the Search Results
function renderResults(results, container) {
  container.innerHTML = "";

  if (results.length === 0) {
    showPlaceholder(container, "No results found.");
    return;
  }

  // Restore normal top-aligned layout
  container.classList.remove("flex", "items-center", "justify-center", "h-full");
  container.classList.add("space-y-4", "block");

  results.forEach(result => {
    const el = document.createElement("a");
    el.href = result.url;
    el.className = "block p-2 border-b-1 -mx-2 rounded-t hover:bg-[var(--search-row-hover)] transition-colors";
    el.innerHTML = `
      <h3 class="font-semibold">${result.meta.title || "Untitled"}</h3>
      <p class="text-sm text-[var(--text)]">${result.excerpt}</p>
    `;
    container.appendChild(el);
  });
}

// MAIN INITIALIZATION
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Grab all elements
  const modal = document.getElementById("search-modal");
  const openButtons = document.querySelectorAll(".search-open");
  const input = document.getElementById("search-input");
  const clearBtn = document.getElementById("search-clear");
  const resultsContainer = document.getElementById("search-results");

  // 2. Initialize Pagefind
  pagefind = await initPagefind();

  // 3. Modal Toggle Logic
  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      input.focus();
    });
  });

  const closeModal = () => modal.classList.add("hidden");

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // 4. Search & Clear Button Logic
  input.addEventListener("input", async (e) => {
    const query = e.target.value.trim();

    // Toggle "X" button visibility
    clearBtn.classList.toggle("hidden", query === "");

    if (!query) {
      showPlaceholder(resultsContainer);
      return;
    }

    // Perform Search
    const search = await pagefind.search(query);
    const results = await Promise.all(
      search.results.slice(0, 10).map(r => r.data())
    );

    renderResults(results, resultsContainer);
  });

  // 5. Clear Button Click
  clearBtn.addEventListener("click", () => {
    input.value = "";
    input.focus();
    clearBtn.classList.add("hidden");
    showPlaceholder(resultsContainer);
  });
});
