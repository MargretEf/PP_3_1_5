// Функция для получения данных обо всех пользователях
async function dataAboutAllUsers() {
    const response = await fetch("/api/admin");
    return await response.json();
}

// Функция для получения данных о текущем пользователе
async function dataAboutCurrentUser() {
    const response = await fetch("/api/admin/user");
    return await response.json();
}

// Функция для заполнения таблицы всех пользователей в админ панели
async function fillTableOfAllUsers() {
    const usersTable = document.getElementById("usersTable"); // Получение элемента таблицы по ID
    const users = await dataAboutAllUsers(); // Получение данных обо всех пользователях

    let usersTableHTML = "";
    for (let user of users) {
        // Формирование HTML-кода для каждой строки таблицы
        usersTableHTML +=
            `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.lastname}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.role.map(role => role.roleName).join(' ')}</td>
                <td>
                    <button class="btn btn-info btn-sm text-white"
                            data-toggle="modal"
                            data-target="#editModal"
                            data-user-id="${user.id}">
                        Edit</button>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm btn-delete"
                            data-toggle="modal"
                            data-target="#deleteModal"
                            data-user-id="${user.id}">                     
                        Delete</button>
                </td>
            </tr>`;
    }
    usersTable.innerHTML = usersTableHTML; // Вставка сформированного HTML-кода в таблицу
}

// Функция для заполнения таблицы текущего пользователя
async function fillTableAboutCurrentUser() {
    const currentUserTable = document.getElementById("currentUserTable"); // Получение элемента таблицы по ID
    const currentUser = await dataAboutCurrentUser(); // Получение данных о текущем пользователе

    let currentUserTableHTML = "";
    // Формирование HTML-кода для строки с данными текущего пользователя
    currentUserTableHTML +=
        `<tr>
            <td>${currentUser.id}</td>
            <td>${currentUser.name}</td>
            <td>${currentUser.lastname}</td>
            <td>${currentUser.age}</td>
            <td>${currentUser.email}</td>
            <td>${currentUser.role.map(role => role.roleName).join(' ')}</td>
        </tr>`;
    currentUserTable.innerHTML = currentUserTableHTML; // Вставка сформированного HTML-кода в таблицу
}