document.querySelector('.menu-icon').addEventListener('click', function() {
    const menu = document.querySelector('.off_screen');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});


window.addEventListener('resize', function() {
    const menu = document.querySelector('.off_screen');
    const onScreenMenu = document.querySelector('.on_screen');
    const menuIcon = document.querySelector('.menu-icon');

    if (window.innerWidth > 768) {
        // If the window is wider than 768px, hide the off-screen menu and show the on-screen menu
        menu.classList.remove('show');
        menu.style.display = 'none';
        onScreenMenu.style.display = 'block';
        menuIcon.style.display = 'none';
    } else {
        // If the window is 768px or narrower, hide the on-screen menu and show the menu icon
        onScreenMenu.style.display = 'none';
        menuIcon.style.display = 'block';
    }
});


