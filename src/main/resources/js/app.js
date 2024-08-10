// Добавление обработчика события, который запускается, когда DOM полностью загружен
document.addEventListener('DOMContentLoaded', async function () {
    await showUserEmailOnNavbar(); // Показать email текущего пользователя в навбаре
    await fillTableOfAllUsers();   // Заполнить таблицу всех пользователей
    await fillTableAboutCurrentUser(); // Заполнить таблицу текущего пользователя
    await addNewUserForm(); // Обработчик для добавления нового пользователя
    await DeleteModalHandler(); // Обработчик для удаления пользователя
    await EditModalHandler(); // Обработчик для редактирования пользователя
});

// Объявление констант для ролей пользователя
const ROLE_USER = {id: 1, role: "ROLE_USER"}; // Роль "пользователь"
const ROLE_ADMIN = {id: 2, role: "ROLE_ADMIN"}; // Роль "администратор"

// Функция для отображения email текущего пользователя в навбаре
async function showUserEmailOnNavbar() {
    // Получение элемента навбара, где будет отображаться email
    const currentUserEmailNavbar = document.getElementById("currentUserEmailNavbar");

    // Получение данных о текущем пользователе
    const currentUser = await dataAboutCurrentUser();

    // Заполнение HTML-контента элементом с email и ролями текущего пользователя
    currentUserEmailNavbar.innerHTML =
        `<strong>${currentUser.email}</strong>
         with roles: 
         ${currentUser.role.map(role => role.roleName).join(' ')}`;
}
