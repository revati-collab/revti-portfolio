/**
 * REVATI RAMESHWAR RATHOD - PORTFOLIO INTERACTIVE SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year
  const yearElem = document.getElementById('currentYear');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

  // 2. Header Scroll Effect
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Mobile Navigation Drawer
  const menuToggle = document.getElementById('menuToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 4. ScrollSpy for Active Navigation Links
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function updateScrollSpy() {
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy);

  // 5. Toast Notification System
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message, duration = 3500) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // 6. Copy Email to Clipboard
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const displayEmail = document.getElementById('displayEmail');
  const copyTooltip = document.getElementById('copyTooltip');

  if (copyEmailBtn && displayEmail) {
    copyEmailBtn.addEventListener('click', () => {
      const email = displayEmail.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        if (copyTooltip) {
          copyTooltip.textContent = 'Copied!';
          copyTooltip.classList.add('show');
          setTimeout(() => {
            copyTooltip.textContent = 'Copy';
            copyTooltip.classList.remove('show');
          }, 2000);
        }
        showToast('Email copied to clipboard!');
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  }

  // 7. Certificate Lightbox Modal
  const certModal = document.getElementById('certModal');
  const certModalBackdrop = document.getElementById('certModalBackdrop');
  const certModalClose = document.getElementById('certModalClose');
  const modalCertImage = document.getElementById('modalCertImage');
  const modalCertTitle = document.getElementById('modalCertTitle');
  const modalCertOrg = document.getElementById('modalCertOrg');
  const modalCertDate = document.getElementById('modalCertDate');
  const modalCertDesc = document.getElementById('modalCertDesc');
  const modalCertId = document.getElementById('modalCertId');
  const modalCertDownload = document.getElementById('modalCertDownload');

  const viewCertBtns = document.querySelectorAll('.view-cert-btn');

  function openCertModal(btn) {
    const src = btn.getAttribute('data-cert-src');
    const title = btn.getAttribute('data-cert-title') || 'Certificate';
    const org = btn.getAttribute('data-cert-org') || 'Verified Institution';
    const date = btn.getAttribute('data-cert-date') || '';
    const idTag = btn.getAttribute('data-cert-id-tag') || 'Verified';
    const desc = btn.getAttribute('data-cert-desc') || '';

    modalCertImage.src = src;
    modalCertImage.alt = title;
    modalCertTitle.textContent = title;
    modalCertOrg.textContent = org;
    modalCertDate.textContent = date;
    modalCertDesc.textContent = desc;
    modalCertId.textContent = idTag;
    modalCertDownload.href = src;

    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  viewCertBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCertModal(btn);
    });
  });

  if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
  if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeCertModal);

  // 8. Resume Modal & Print
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');
  const resumeModalClose = document.getElementById('resumeModalClose');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  function openResume() {
    closeDrawer();
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  });

  if (resumeModalClose) resumeModalClose.addEventListener('click', closeResume);
  if (resumeModalBackdrop) resumeModalBackdrop.addEventListener('click', closeResume);

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Keyboard close for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (certModal && certModal.classList.contains('active')) closeCertModal();
      if (resumeModal && resumeModal.classList.contains('active')) closeResume();
      if (mobileDrawer && mobileDrawer.classList.contains('open')) closeDrawer();
    }
  });

  // 9. Interactive Contact Form Validation & Submission
  const contactForm = document.getElementById('portfolioContactForm');
  const formSuccessBanner = document.getElementById('formSuccessBanner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        nameInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        emailInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        subjectInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        messageInput.closest('.form-group').classList.remove('has-error');
      }

      if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.querySelector('.btn-text').textContent = 'Send Message';
          contactForm.reset();
          if (formSuccessBanner) {
            formSuccessBanner.classList.add('visible');
            setTimeout(() => {
              formSuccessBanner.classList.remove('visible');
            }, 6000);
          }
          showToast('Message sent successfully! Thank you for reaching out.');
        }, 800);
      }
    });

    // Clear error on input
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('has-error');
      });
    });
  }
});
