const toggles = document.querySelectorAll('.toggle')
const good = document.querySelector('#good')
const cheap = document.querySelector('#cheap')
const fast = document.querySelector('#fast')

let checkedCount = 0

toggles.forEach(toggle => toggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        checkedCount++
        if (checkedCount > 2) {
            e.target.checked = false
            checkedCount--
            alert('You can only choose two options!')
        }
    } else {
        checkedCount--
    }
}))

// Function to handle errors
function handleError(error) {
    console.error('Error:', error)
    alert('An error occurred. Please try again later.')
}