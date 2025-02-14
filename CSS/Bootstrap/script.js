$(document).ready(function() {
    $('#change-color').click(function() {
        var randomColor = getRandomColor();
        $('#bg-color').css('background-color', randomColor);
    });

    // Initial random background color
    $('#bg-color').css('background-color', getRandomColor());
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}