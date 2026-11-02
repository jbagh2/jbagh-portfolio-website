// Skills page: adds a proficiency meter that pops up over each skill on hover, focus, or tap.
// Levels come from the data-level attribute (1-5) on each skill in skills.html.
const LEVELS = ["Familiar", "Working knowledge", "Proficient", "Advanced", "Expert"];

document.querySelectorAll(".skills li[data-level]").forEach((skill) => {
  const level = Math.min(5, Math.max(1, Number(skill.dataset.level) || 1));
  const name = skill.textContent.trim();

  const pop = document.createElement("span");
  pop.className = "meter-pop";

  const label = document.createElement("span");
  label.className = "meter-label";
  label.textContent = LEVELS[level - 1];

  const gems = document.createElement("span");
  gems.className = "meter-gems";
  gems.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 5; i++) {
    const gem = document.createElement("span");
    gem.className = i < level ? "gem on" : "gem";
    gem.style.setProperty("--i", i);
    gems.append(gem);
  }

  pop.append(label, gems);
  pop.setAttribute("aria-hidden", "true");
  skill.append(pop);
  skill.classList.add("skill");
  skill.tabIndex = 0;
  skill.setAttribute("aria-label", `${name}, ${LEVELS[level - 1]} (${level} of 5)`);

  // On narrow screens, flip the meter to open leftward if it would run off the right edge.
  const place = () => {
    pop.classList.remove("flip");
    if (pop.getBoundingClientRect().right > document.documentElement.clientWidth - 8) pop.classList.add("flip");
  };
  skill.addEventListener("pointerenter", place);
  skill.addEventListener("focus", place);
  skill.addEventListener("click", place);
});

// Touch: tapping a skill opens its meter; tapping anywhere else closes it.
document.addEventListener("click", (e) => {
  const hit = e.target.closest(".skill");
  document.querySelectorAll(".skill.open").forEach((s) => s !== hit && s.classList.remove("open"));
  if (hit && e.pointerType !== "mouse") hit.classList.toggle("open");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".skill.open").forEach((s) => s.classList.remove("open"));
    if (document.activeElement?.classList.contains("skill")) document.activeElement.blur();
  }
});
