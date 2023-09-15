const navigationIcon = document.querySelector('.nav-icon');
const navigation = document.querySelector('nav');

navigationIcon.addEventListener('click', () => {
    navigationIcon.classList.toggle('active');
    // Wenn Menü offen ist, wird display: flex der Navigation hinzugefügt
    navigationIcon.classList.contains('active') ? navigation.classList.add('d-flex') : navigation.classList.remove('d-flex');
});