const sections = document.querySelectorAll('.section')
const scrollIndicator = document.querySelector('.scroll-indicator')
const customScrollbar = document.querySelector('.custom-scrollbar')
const lazyLoadButtons = document.querySelectorAll('.lazy-load-button')

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY
    const scrollHeight = document.body.offsetHeight - window.innerHeight

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop - window.innerHeight * 0.5 && scrollPosition < sectionTop + sectionHeight - window.innerHeight * 0.5) {
            section.classList.add('active')
        } else {
            section.classList.remove('active')
        }
    })

    scrollIndicator.style.width = `${(scrollPosition / scrollHeight) * 100}%`

    customScrollbar.style.top = `${scrollPosition}px`
})

lazyLoadButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const section = button.parentNode
        section.style.backgroundImage = 'url(https://picsum.photos/2000/1000)'
    })
})

// Add event listener for keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
        const activeSection = document.querySelector('.section.active')
        const nextSection = activeSection.nextElementSibling

        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' })
        }
    } else if (event.key === 'ArrowUp') {
        const activeSection = document.querySelector('.section.active')
        const prevSection = activeSection.previousElementSibling

        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' })
        }
    }
})

// Add ARIA attributes for accessibility
sections.forEach((section) => {
    section.setAttribute('aria-label', `Section ${section.id}`)
    section.setAttribute('role', 'region')
})

// Add event listener for click on section
sections.forEach((section) => {
    section.addEventListener('click', () => {
        section.classList.toggle('active')
    })
})

// Create a timeline animation
const timeline = [
    { section: sections[0], delay: 0 },
    { section: sections[1], delay: 1000 },
    { section: sections[2], delay: 2000 },
]

timeline.forEach((item) => {
    setTimeout(() => {
        item.section.classList.add('active')
    }, item.delay)
})