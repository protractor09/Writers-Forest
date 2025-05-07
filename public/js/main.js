document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const offScreenMenu = document.querySelector('.off_screen');
    const onScreenMenu = document.querySelector('.on_screen');

    // Initial state setup
    function adjustMenu() {
        if (window.innerWidth > 768) {
            offScreenMenu.style.display = 'none';
            onScreenMenu.style.display = 'block';
            menuIcon.style.display = 'none';
        } else {
            onScreenMenu.style.display = 'none';
            menuIcon.style.display = 'block';
            offScreenMenu.style.display = 'none'; // keep it hidden unless clicked
        }
    }

    adjustMenu();

    window.addEventListener('resize', adjustMenu);

    menuIcon.addEventListener('click', () => {
        if (offScreenMenu.style.display === 'none') {
            offScreenMenu.style.display = 'block';
        } else {
            offScreenMenu.style.display = 'none';
        }
    });
});
