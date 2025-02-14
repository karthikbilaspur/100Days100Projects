const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')

btn.addEventListener('click', () => {
    search.classList.toggle('active')
    input.focus()
})

// Add event listener to input to listen for enter key press
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        // Do something when enter key is pressed
        console.log('Enter key pressed')
    }
})

// Function to handle errors
function handleError(error) {
    console.error('Error:', error)
    alert('An error occurred. Please try again later.')
}