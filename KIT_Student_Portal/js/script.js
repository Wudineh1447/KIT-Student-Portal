// KIT Student Portal - JavaScript

// 1. Dark / light theme (saved in localStorage)
const root = document.documentElement;
root.setAttribute("data-theme", localStorage.getItem("theme") || "light");
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

// 2. Mobile menu
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
}

// 3. Course data + search/filter (courses.html)
const courses = [
  { code: "INSY3061", name: "Internet Programming I", year: 3, credit: 5, dept: "Information System" },
  { code: "INSY3032", name: "Database Systems", year: 3, credit: 5, dept: "Information System" },
  { code: "INSY3043", name: "Systems Analysis and Design", year: 3, credit: 4, dept: "Information System" },
  { code: "INSY2021", name: "Data Structures and Algorithms", year: 2, credit: 5, dept: "Information System" },
  { code: "INSY2052", name: "Object Oriented Programming", year: 2, credit: 5, dept: "Information System" },
  { code: "INSY1011", name: "Fundamentals of Programming", year: 1, credit: 5, dept: "Information System" },
  { code: "MATH1041", name: "Applied Mathematics", year: 1, credit: 5, dept: "Common" }
];
const tbody = document.getElementById("courseBody");
if (tbody) {
  const search = document.getElementById("search");
  const yearSel = document.getElementById("yearFilter");
  const count = document.getElementById("count");
  function render() {
    const q = search.value.trim().toLowerCase();
    const y = yearSel.value;
    const list = courses.filter(c =>
      (c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)) &&
      (y === "all" || c.year === Number(y)));
    tbody.innerHTML = list.length
      ? list.map(c => `<tr><td>${c.code}</td><td>${c.name}</td><td>Year ${c.year}</td><td>${c.credit}</td><td>${c.dept}</td></tr>`).join("")
      : `<tr><td colspan="5">No course found. Try a different word or year.</td></tr>`;
    count.textContent = `${list.length} course(s) shown`;
  }
  search.addEventListener("input", render);
  yearSel.addEventListener("change", render);
  render();
}

// 4. Contact form validation (contact.html)
const form = document.getElementById("contactForm");
if (form) {
  const setErr = (id, msg) => { document.getElementById(id + "Err").textContent = msg; return !msg; };
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const id = form.studentId.value.trim();
    const msg = form.message.value.trim();
    const ok = [
      setErr("name", name.length < 3 ? "Enter your full name (at least 3 letters)." : ""),
      setErr("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Enter a valid email, e.g. name@example.com."),
      setErr("studentId", /^[A-Za-z]{3}\/\d{4}\/\d{2}$/.test(id) ? "" : "Use the format KIT/1234/15."),
      setErr("message", msg.length < 10 ? "Write at least 10 characters." : "")
    ].every(Boolean);
    if (ok) {
      const saved = JSON.parse(localStorage.getItem("feedback") || "[]");
      saved.push({ name, email, id, msg, date: new Date().toLocaleString() });
      localStorage.setItem("feedback", JSON.stringify(saved));
      document.getElementById("result").innerHTML = `<p class="ok">Thank you, ${name.replace(/</g, "&lt;")}. Your message was sent.</p>`;
      form.reset();
    }
  });
}
