const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');
const resetBtn = document.getElementById('reset');
const changeColorBtn = document.getElementById('change-color');

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

empties.forEach((empty) => {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
});

resetBtn.addEventListener('click', resetGame);
changeColorBtn.addEventListener('click', changeColor);

function dragStart() {
    this.className += ' hold';
    setTimeout(() => this.className = 'invisible', 0);
}

function dragEnd() {
    this.className = 'fill';
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
}

function dragLeave() {
    this.className = 'empty';
}

function dragDrop() {
    this.className = 'empty';
    this.append(fill);
}

function resetGame() {
    fill.className = 'fill';
    empties.forEach((empty) => {
        empty.className = 'empty';
    });
}

function changeColor() {
    const newColor = getRandomColor();
    document.body.style.backgroundColor = newColor;
    fill.style.backgroundImage = `url('https://source.unsplash.com/random/150x150?${newColor}')`;
}

function getRandomColor() {
    const colors = ['#FF69B4', '#33CC33', '#6666CC', '#CC6633'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Error handling
try {
    // Code to execute
} catch (error) {
    console.error('Error occurred:', error);
}