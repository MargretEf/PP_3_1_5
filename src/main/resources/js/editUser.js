// Функция для отправки данных отредактированного пользователя на сервер
async function sendDataEditUser(user) {
    await fetch("/api/admin",
        {method: "PUT", headers: {'Content-type': 'application/json'}, body: JSON.stringify(user)})
    // Отправка PUT-запроса на сервер с телом запроса в формате JSON, содержащим данные пользователя
}

// Получение элемента модального окна для редактирования пользователя
const modalEdit = document.getElementById("editModal");

// Функция для заполнения модального окна данными пользователя
async function EditModalHandler() {
    await fillModal(modalEdit); // Заполнение модального окна
}

// Добавление обработчика события на форму модального окна при отправке данных (submit)
modalEdit.addEventListener("submit", async function (event) {
    event.preventDefault(); // Предотвращение стандартного поведения формы при отправке

    const rolesSelected = document.getElementById("rolesEdit"); // Получение элемента выбора ролей

    let roles = [];
    for (let option of rolesSelected.selectedOptions) {
        if (option.value === "ROLE_USER") {
            roles.push({id: 1, roleName: "ROLE_USER"}); // Здесь id 1 - пример, вам нужно использовать правильные id
        } else if (option.value === "ROLE_ADMIN") {
            roles.push({id: 2, roleName: "ROLE_ADMIN"}); // Здесь id 2 - пример, вам нужно использовать правильные id
        }
    }

    // Создание объекта пользователя с данными из формы
    let user = {
        id: document.getElementById("idEdit").value, // Получение значения поля ID
        name: document.getElementById("firstNameEdit").value, // Получение значения поля имени
        lastname: document.getElementById("lastNameEdit").value, // Получение значения поля фамилии
        age: document.getElementById("ageEdit").value, // Получение значения поля возраста
        email: document.getElementById("emailEdit").value, // Получение значения поля email
        password: document.getElementById("passwordEdit").value, // Получение значения поля пароля
        role: roles // Добавление массива ролей в объект пользователя
    }

    await sendDataEditUser(user); // Отправка данных отредактированного пользователя на сервер
    await fillTableOfAllUsers(); // Обновление таблицы всех пользователей

    $('#editModal').modal('hide');
});

