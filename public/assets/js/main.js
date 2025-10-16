/**
* Template Name: iLanding
* Template URL: https://bootstrapmade.com/ilanding-bootstrap-landing-page-template/
* Updated: Nov 12 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

window.addEventListener('load', function() {
    const wrapper = document.querySelector('.phone-input-wrapper')
    const selectedCountryEl = document.querySelector('#selectedCountry')
    const countryDropdown = document.querySelector('#countryDropdown')
    const countryListEl = document.querySelector('#countryList')
    const countrySearch = document.querySelector('#countrySearch')
    const phoneInput = document.querySelector('#phoneInput')
  
    let countries = []
    let userNumber = ''
    let selectedDial = ''
    let currentMask = ''
  
    fetch('/assets/countries.json')
      .then(res => res.json())
      .then(data => {
        countries = data.sort((a,b) => a.name.localeCompare(b.name))
        renderCountryList(countries)
      })
      .catch(err => console.error(err))
  
    function renderCountryList(list) {
      countryListEl.innerHTML = ''
      list.forEach(c => {
        const li = document.createElement('li')
        li.textContent = `${c.name} (${c.dial_code || ''})`
        li.dataset.dial = c.dial_code || ''
        li.dataset.mask = c.mask || ''
        li.addEventListener('click', () => {
          selectedDial = c.dial_code || ''
          currentMask = li.dataset.mask || ''
          selectedCountryEl.textContent = selectedDial || '🌍'
          phoneInput.value = ''
          phoneInput.placeholder = formatMask(currentMask)
          countryDropdown.classList.add('hidden')
        })
        countryListEl.appendChild(li)
      })
    }
  
    selectedCountryEl.parentNode.addEventListener('click', () => {
      countryDropdown.classList.toggle('hidden')
      countrySearch.value = ''
      renderCountryList(countries)
      countrySearch.focus()
    })
  
    countrySearch.addEventListener('input', () => {
      const term = countrySearch.value.toLowerCase()
      const filtered = countries.filter(c => 
        c.name.toLowerCase().includes(term) || (c.dial_code || '').includes(term)
      )
      renderCountryList(filtered)
    })
  
    function formatMask(mask) {
      return mask ? mask.replace(/#/g, '0') : 'Введите номер телефона'
    }
  
    function applyMask(value, mask) {
      if (!mask) return value
      let i = 0
      return mask.replace(/#/g, () => value[i++] || '')
    }
  
    phoneInput.addEventListener('input', e => {
      userNumber = e.target.value.replace(/\D/g, '')
      e.target.value = applyMask(userNumber, currentMask)
    })
  
    document.addEventListener('click', e => {
      if (!wrapper.contains(e.target) && !countryDropdown.contains(e.target)) {
        countryDropdown.classList.add('hidden')
      }
    })
  
    // const form = document.querySelector('.modal-form')
    // form.addEventListener('submit', e => {
    //   e.preventDefault()
    //   const rawNumber = userNumber;
    //   const fullNumber = (selectedDial || '') + rawNumber
    //   console.log('Отправляем номер:', fullNumber)
    // })

    const forms = document.querySelectorAll('.php-email-form, .modal-form');
    if (!forms.length) return;
  
    const MIN_DELAY = 4000;
  
    const sanitize = (str) =>
      str.replace(/[<>]/g, c => ({ '<': '&lt;', '>': '&gt;' }[c]))
         .replace(/(script|onerror|onload|javascript:)/gi, '[blocked]');
  
    const validate = (data) => {
      if (!data.name || data.name.length < 2) throw 'Введите корректное имя.';
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        throw 'Введите корректный email.';
      if (data.phone && !/^[\d\s()+\-]{6,20}$/.test(data.phone))
        throw 'Введите корректный номер телефона.';
      if (!data.description || data.description.length < 5)
        throw 'Сообщение слишком короткое.';
    };
  
    forms.forEach(form => {
      const submitBtn = form.querySelector('button[type="submit"]');
      const loading = form.querySelector('.loading');
      const errorBox = form.querySelector('.error-message');
      const successBox = form.querySelector('.sent-message');
      const phoneInput = form.querySelector('#phoneInput');
      let lastSubmit = 0;
      let submitting = false;
  
      const honeypot = document.createElement('input');
      honeypot.type = 'text';
      honeypot.name = 'check_' + Math.random().toString(36).substring(2, 10);
      honeypot.style.display = 'none';
      form.appendChild(honeypot);
  
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (submitting) return;

        const rawNumber = userNumber;
        const fullNumber = (selectedDial || '') + rawNumber
  
        const now = Date.now();
        if (now - lastSubmit < MIN_DELAY) {
          alert('Слишком частые отправки. Попробуйте позже.');
          return;
        }
        lastSubmit = now;
        submitting = true;
        submitBtn.disabled = true;
  
        if (loading) loading.style.display = 'block';
        if (errorBox) errorBox.style.display = 'none';
        if (successBox) successBox.style.display = 'none';
  
        try {
          if (honeypot.value) throw 'Бот-активность обнаружена.';
  
          const data = {
            name: sanitize(form.querySelector('[name="name"]')?.value.trim() || ''),
            email: sanitize(form.querySelector('[name="email"]')?.value.trim() || ''),
            phone: sanitize(fullNumber.trim() || ''),
            description: sanitize(form.querySelector('[name="message"]')?.value.trim() || '')
          };
    
          validate(data);
    
          const response = await fetch('/api/submit-application', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
    
          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw errorData?.detail || 'Ошибка при отправке данных на сервер.';
          }

          if (successBox) successBox.style.display = 'block';
          form.reset();
        } catch (err) {
          console.warn(err);
          if (errorBox) {
            errorBox.textContent = typeof err === 'string' ? err : 'Ошибка при отправке.';
            errorBox.style.display = 'block';
          } else {
            alert(typeof err === 'string' ? err : 'Ошибка при отправке.');
          }
        } finally {
          if (loading) loading.style.display = 'none';
          submitBtn.disabled = false;
          submitting = false;
        }
      });
    });
  })