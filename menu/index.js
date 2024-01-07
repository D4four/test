function changeContent(contentId) {
    // Скрываем все элементы с классом "content"
    const contentElements = document.querySelectorAll('.content');
    contentElements.forEach(element => element.classList.remove('active'));

    // Отображаем элемент с указанным contentId
    const selectedContent = document.getElementById(contentId + '-content');
    selectedContent.classList.add('active');

    var menu = document.querySelector('.menu');
    menu.classList.remove('active');
}

function toggleMenu() {
    var menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}
