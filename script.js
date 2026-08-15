document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-package]").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.package || "sản phẩm";
      const toast = document.querySelector(".toast");
      if (toast) {
        toast.textContent = `Bạn đã chọn: ${name}. Hãy vào trang Đặt hàng để gửi yêu cầu.`;
        toast.style.display = "block";
        setTimeout(() => toast.style.display = "none", 3000);
      }
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  revealItems.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";
    observer.observe(el);
  });
});
