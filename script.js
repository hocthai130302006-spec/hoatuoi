
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const toast = document.querySelector('.toast');
function showToast(message){
  if(!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2800);
}

document.querySelectorAll('[data-package]').forEach(btn => {
  btn.addEventListener('click', () => {
    const pkg = btn.dataset.package;
    const select = document.querySelector('#package');
    if(select) select.value = pkg;
    if(select){
      document.querySelector('#order-form')?.scrollIntoView({behavior:'smooth'});
    }else{
      window.location.href = `dathang.html?goi=${encodeURIComponent(pkg)}`;
    }
  });
});

const form = document.querySelector('#order-form');
if(form){
  const params = new URLSearchParams(location.search);
  const pkg = params.get('goi');
  if(pkg){
    const select = form.querySelector('#package');
    if(select) select.value = pkg;
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#name')?.value.trim();
    const phone = form.querySelector('#phone')?.value.trim();
    if(!name || !phone){
      showToast('Vui lòng nhập Họ tên và SĐT nhé!');
      return;
    }
    showToast('Đã nhận yêu cầu! Bloomistry sẽ liên hệ bạn sớm.');
    form.reset();
  });
}
