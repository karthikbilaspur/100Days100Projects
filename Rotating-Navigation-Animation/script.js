const open = document.getElementById('open')
const close = document.getElementById('close')
const container = document.querySelector('.container')
const navLinks = document.querySelectorAll('nav ul li')

open.addEventListener('click', () => {
    container.classList.add('show-nav')
    navLinks.forEach((link, index) => {
        link.style.transitionDelay = `${index * 0.1}s`
    })
})

close.addEventListener('click', () => {
    container.classList.remove('show-nav')
    navLinks.forEach((link) => {
        link.style.transitionDelay = '0s'
    })
})

// Accessibility feature: warning for motion sensitivity
const accessibilityWarning = document.createElement('div')
accessibilityWarning.classList.add('accessibility-warning')
accessibilityWarning.innerHTML = 'This website contains motion effects that may cause discomfort for users with motion sensitivity. <a href="#" id="dismiss-warning">Dismiss</a>'
document.body.appendChild(accessibilityWarning)

const dismissWarning = document.getElementById('dismiss-warning')
dismissWarning.addEventListener('click', () => {
    accessibilityWarning.remove()
})