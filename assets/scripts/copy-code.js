// Adds a copy button to code blocks.
// It finds the code blocks and adds a button with capibility to copy the code into clipboard.

window.addEventListener("DOMContentLoaded", () => {

  // Select all relevant code blocks
  document.querySelectorAll(
    "pre:has(table.rouge-table), figure.highlight > pre"
  ).forEach(pre => {
    // prevent duplicates
    if (pre.querySelector(":scope > .copy-button")) return;

    pre.classList.add("relative");

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Copy";
    button.className =
      "copy-button absolute top-2 right-2 px-2 py-1 text-xs " +
      "bg-gray-600 text-white border-white border-1 rounded hover:bg-gray-700 cursor-pointer";

    pre.appendChild(button);

    button.addEventListener("click", async () => {
      let text = "";

      // Case 1 & 2: table inside pre/code
      const table = pre.querySelector("table.rouge-table");
      if (table) {
        const codeCell = table.querySelector("td.code > pre, td.rouge-code > pre");
        if (codeCell) text = codeCell.textContent;
      }

      // Case 3: plain code inside pre > code
      if (!text) {
        const code = pre.querySelector("code");
        if (code) text = code.textContent;
      }

      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied!";
        setTimeout(() => (button.textContent = "Copy"), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    });
  });
});


window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".bibtex-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const container = button.closest(".bib-entry");
      if (!container) return;

      const details = container.querySelector(".bibtex-details");
      if (!details) return;

      details.open = !details.open;
    });
  });
});

// Adds a copy button to BibTeX pre blocks inside details
window.addEventListener("DOMContentLoaded", () => {

  // Select all pre blocks inside details (BibTeX)
  document.querySelectorAll("details > pre").forEach(pre => {

    // Prevent duplicates
    if (pre.querySelector(":scope > .copy-button")) return;

    pre.classList.add("relative");

    // Create button
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Copy";
    button.className =
      "copy-button absolute top-2 right-2 px-2 py-1 text-xs " +
      "bg-gray-600 text-white border-white border-1 rounded hover:bg-gray-700 cursor-pointer";

    pre.appendChild(button);

    // Copy event
    button.addEventListener("click", async () => {
      const text = pre.textContent; // grab all text inside pre
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied!";
        setTimeout(() => (button.textContent = "Copy"), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    });
  });

});
