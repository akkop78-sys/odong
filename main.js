const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-ask-form]");
const note = document.querySelector("[data-form-note]");
const PHONE = "01051354004";

function onScroll() {
  header.classList.toggle("is-stuck", window.scrollY > 8);
}

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const body = [
    "[오동도 자전거 문의]",
    `이름: ${data.get("name")}`,
    `인원: ${data.get("people")}`,
    `희망 시간: ${data.get("when")}`,
    `문의: ${data.get("message") || "-"}`,
  ].join("\n");
  note.textContent = "문자 앱으로 문의 내용을 엽니다. 창이 안 열리면 010-5135-4004로 전화해 주세요.";
  window.location.href = `sms:${PHONE}?body=${encodeURIComponent(body)}`;
});

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
