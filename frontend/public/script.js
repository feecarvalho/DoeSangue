const headButtonEl = document.querySelector('header button');
const formEl = document.querySelector('.form');

headButtonEl.addEventListener('click', () => {
    formEl.classList.toggle('hide');
})