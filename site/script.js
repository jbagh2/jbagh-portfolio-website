// Keeps the footer year current.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Links with data-download open in a new tab (via target="_blank") and also save a copy
// under the given filename, since a single link can't do both on its own.
// Browsers ignore the download attribute for file:// pages, so this only runs once the site is served.
document.querySelectorAll("a[data-download]").forEach((link) => {
  link.addEventListener("click", () => {
    if (!location.protocol.startsWith("http")) return;
    const save = document.createElement("a");
    save.href = link.href;
    save.download = link.dataset.download;
    document.body.append(save);
    save.click();
    save.remove();
  });
});
