/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const navElements = document.querySelectorAll('section')
const navList = document.getElementById('navbar__list')

/**
 * End Global Variables
 */

// Build a menu and iterate through the nav elements
navElements.forEach(el => {
  const navlistElement = `<li class='menu__link ${el.className}' data-link=${el.id}><a href="#${el.id}">${el.dataset.nav}</li>`
  navList.insertAdjacentHTML('beforeend', navlistElement)
})

// Scroll to specific section on link click
navList.addEventListener('click', e => {
  e.preventDefault()
  const parent = e.target.hasAttribute('data-link')
    ? e.target
    : e.target.parentElement
  const elementToScrollTo = document.getElementById(parent.dataset.link)
  elementToScrollTo.scrollIntoView({block: 'end', behavior: 'smooth'})
})

// Section and nav link become active using the IntersectionObserver pattern
const callback = entries => {
  entries.forEach(entry => {
    const navListElement = document.querySelector(
      `.menu__link[data-link='${entry.target.id}']`,
    )
    const section = document.getElementById(entry.target.id)

    if (entry && entry.isIntersecting) {
      navListElement.classList.add('active')
      section.classList.add('active')
    } else {
      if (navListElement.classList.contains('active')) {
        navListElement.classList.remove('active')
      }

      if (section.classList.contains('active')) {
        section.classList.remove('active')
      }
    }
  })
}

// Setting options for the observer where threshold is most important
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.6,
}

// Setting an observer with options and a callback that checks if the navelement is active
const observer = new IntersectionObserver(callback, options)
navElements.forEach(el => {
  observer.observe(document.getElementById(el.id))
})