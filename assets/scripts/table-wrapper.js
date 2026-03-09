// Wrap tables in a scrollable container to fix right-side gap
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".main table:not(.highlight table)").forEach(table => {
    // skip if already wrapped
    if (table.parentElement.classList.contains("table-wrapper")) return;

    // create wrapper div
    const wrapper = document.createElement("div");
    wrapper.className = "table-wrapper overflow-x-auto mb-4";

    // insert wrapper before the table and move table inside
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
});
