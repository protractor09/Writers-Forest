document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const offScreenMenu = document.querySelector('.off_screen');
    const onScreenMenu = document.querySelector('.on_screen');

    // Initial state setup
    function adjustMenu() {
        if (window.innerWidth > 768) {
            offScreenMenu.style.display = 'none';
            onScreenMenu.style.display = 'block';
            menuIcon.style.display = 'none'; // Hide menu icon on larger screens
        } else {
            onScreenMenu.style.display = 'none';
            menuIcon.style.display = 'block'; // Show menu icon on smaller screens
            offScreenMenu.style.display = 'none'; // Keep off-screen menu hidden unless toggled
        }
    }

    adjustMenu();

    window.addEventListener('resize', adjustMenu);

    menuIcon.addEventListener('click', () => {
        if (offScreenMenu.style.display === 'none' || offScreenMenu.style.display === '') {
            offScreenMenu.style.display = 'block'; // Show the menu
        } else {
            offScreenMenu.style.display = 'none'; // Hide the menu
        }
    });
});
