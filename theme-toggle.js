const toggleBtn = document.getElementById("themeToggle");
const icon = toggleBtn.querySelector("i");

// load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  icon.classList.remove("fa-moon");
  icon.classList.add("fa-sun");
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});