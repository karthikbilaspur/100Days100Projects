const counters = document.querySelectorAll('.counter')

counters.forEach(counter => {
    counter.innerText = '0'

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target')
        const c = +counter.innerText

        const increment = target / 200

        if(c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`
            requestAnimationFrame(updateCounter)
        } else {
            counter.innerText = target
        }
    }

    updateCounter()
})

// Function to handle errors
function handleError(error) {
    console.error('Error:', error)
    alert('An error occurred. Please try again later.')
}

// Add event listener to window to handle errors
window.addEventListener('error', handleError)