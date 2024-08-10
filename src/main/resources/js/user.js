// Добавляем слушатель события, который будет выполнен, когда весь HTML-документ загружен и обработан
document.addEventListener('DOMContentLoaded', async function () {
    // Ждем выполнения функции showUserEmailOnNavbar, которая отображает email пользователя в навигационной панели
    await showUserEmailOnNavbar();
    // Ждем выполнения функции fillTableAboutUser, которая заполняет таблицу данными о текущем пользователе
    await fillTableAboutUser();
});

// Асинхронная функция для получения данных о текущем пользователе
async function dataAboutCurrentUser() {
    // Отправляем GET-запрос на сервер по адресу /api/user
    const response = await fetch("/api/admin/user");
    // Ждем ответа сервера и преобразуем его в JSON-объект
    return await response.json();
}

// Асинхронная функция для заполнения таблицы данными о текущем пользователе
async function fillTableAboutUser() {
    // Получаем элемент таблицы с id "currentUserTable"
    const currentUserTable1 = document.getElementById("currentUserTable");
    // Ждем данные о текущем пользователе из функции dataAboutCurrentUser
    const currentUser = await dataAboutCurrentUser();

    // Создаем HTML-код для строки таблицы с данными о текущем пользователе
    let currentUserTableHTML = "";
    currentUserTableHTML +=
        `<tr>
            <td>${currentUser.id}</td> <!-- Отображаем ID пользователя -->
            <td>${currentUser.name}</td> <!-- Отображаем имя пользователя -->
            <td>${currentUser.lastname}</td> <!-- Отображаем фамилию пользователя -->
            <td>${currentUser.age}</td> <!-- Отображаем возраст пользователя -->
            <td>${currentUser.email}</td> <!-- Отображаем email пользователя -->
            <td>${currentUser.role.map(role => role.roleName).join(' ')}</td> <!-- Отображаем список ролей пользователя, объединяя их в одну строку -->
        </tr>`;
    // Вставляем HTML-код в элемент таблицы
    currentUserTable1.innerHTML = currentUserTableHTML;
}

// Асинхронная функция для отображения email пользователя в навигационной панели
async function showUserEmailOnNavbar() {
    // Получаем элемент навигационной панели с id "currentUserEmailNavbar"
    const currentUserEmailNavbar = document.getElementById("currentUserEmailNavbar");
    // Ждем данные о текущем пользователе из функции dataAboutCurrentUser
    const currentUser = await dataAboutCurrentUser();
    // Создаем HTML-код для отображения email и ролей пользователя в навигационной панели
    currentUserEmailNavbar.innerHTML =
        `<strong>${currentUser.email}</strong> <!-- Отображаем email пользователя жирным шрифтом -->
                 with roles: 
                 ${currentUser.role.map(role => role.roleName).join(' ')}`; <!-- Отображаем список ролей пользователя, объединяя их в одну строку -->
}

