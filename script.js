const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav__links')

const tabContainer = document.querySelector('.operations__tab-container')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContent = document.querySelectorAll('.operations__content')
const navContainer = document.querySelector('.nav')

const allSections = document.querySelectorAll('.section')
const images = document.querySelectorAll('img[data-src]')

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnNext = document.querySelector('.slider__btn--right');
const btnPrev = document.querySelector('.slider__btn--left');
const dotsContainser = document.querySelector('.dots')

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScroll.addEventListener('click', () => {
  addSmoothScrolling(section1)
})

function addSmoothScrolling(sectionToScroll) {
  sectionToScroll.scrollIntoView({ behavior: 'smooth' })
}

nav.addEventListener('click', function (e) {
  e.preventDefault()

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    addSmoothScrolling(document.querySelector(id))
  }
})

tabContainer.addEventListener('click', function (e) {
  e.preventDefault()

  const clicked = e.target.closest('.operations__tab')
  if (!clicked) return

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  tabsContent.forEach(content => content.classList.remove('operations__content--active'))

  const currentContent = document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  currentContent.classList.add('operations__content--active')
})

function addHoverEffect(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    siblings.forEach(element => {
      if (element !== link) {
        element.style.opacity = this
      }
    })
    logo.style.opacity = this
  }
}

nav.addEventListener('mouseover', addHoverEffect.bind(0.5))
nav.addEventListener('mouseout', addHoverEffect.bind(1))

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navContainer.classList.add('sticky')
    } else {
      navContainer.classList.remove('sticky')
    }
  })
}, {
  rootMargin: '-90px',
  threshold: 0,
})
navObserver.observe(document.querySelector('.header'))


const sectionObserver = new IntersectionObserver((entries, observer) => {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove('section--hidden')
    observer.unobserve(entries[0].target)
  }
}, {
  threshold: 0.15,
})

allSections.forEach(section => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

const imgObserver = new IntersectionObserver((entries, observer) => {
  if (!entries[0].isIntersecting) return

  entries[0].target.src = entries[0].target.dataset.src
  entries[0].target.addEventListener('load', () => {
    entries[0].target.classList.remove('lazy-img')
  })
  observer.unobserve(entries[0].target)
}, {
  threshold: 0.15,
})

images.forEach(image => {
  imgObserver.observe(image)
})

let currentSlide = 0
let maxLengthSlide = slides.length

function createDots() {
  slides.forEach((s, i) => {
    dotsContainser.insertAdjacentHTML('beforeend', `
      <button class="dots__dot" data-slide="${i}"></button>
    `)
  })
}

createDots()

function showToSlide(slide) {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${100 * (index - slide)}%)`
  })
}

function activeDots(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active')
  })
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}

showToSlide(0)
activeDots(0)

function showNextSlide() {
  if (currentSlide === maxLengthSlide - 1) currentSlide = 0
  else currentSlide++
  showToSlide(currentSlide)
  activeDots(currentSlide)
}

function showPrevSlide() {
  if (currentSlide === 0) currentSlide = maxLengthSlide - 1
  else currentSlide--
  showToSlide(currentSlide)
  activeDots(currentSlide)
}

btnNext.addEventListener('click', showNextSlide)
btnPrev.addEventListener('click', showPrevSlide)

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showPrevSlide()
  if (e.key === 'ArrowRight') showNextSlide()
})

dotsContainser.addEventListener('click', (e) => {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide
    showToSlide(slide)
    activeDots(slide)
  }
})

document.addEventListener('DOMContentLoaded', () => {
  console.log(123);
})