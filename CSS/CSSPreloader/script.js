const preloader = document.querySelector('.preloader');

gasp.animate({
    elements: '.loader svg',
    properties: {
        rotate: 360
    },
    duration: 2000,
    easing: 'linear',
    repeat: Infinity
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        preloader.classList.add('hide');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 2000);
});