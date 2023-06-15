let header = document.querySelector("header");
let height = 0;
window.addEventListener('scroll', () => {
    if (window.scrollY > height) {
        header.style.cssText = 'transform: translateY(-100%);';
    } else if (window.scrollY < height) {
        header.style.cssText = 'transform: translateY(0%);';
    }
    height = window.scrollY;
    
});