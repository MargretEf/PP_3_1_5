// Функция для отправки данных отредактированного пользователя на сервер
async function sendDataEditUser(user) {
    await fetch("/api/admin" ,
        {method: "PUT", headers: {'Content-type': 'application/json'}, body: JSON.stringify(user)} )
    // Отправка PUT-запроса на сервер с телом запроса в формате JSON, содержащим данные пользователя
}

// Получение элемента модального окна для редактирования пользователя
const modalEdit = document.getElementById("editModal");

// Функция для заполнения модального окна данными пользователя
async function EditModalHandler() {
    await fillModal(modalEdit); // Заполнение модального окна
}

// Добавление обработчика события на форму модального окна при отправке данных (submit)
modalEdit.addEventListener("submit", async function(event){
    event.preventDefault(); // Предотвращение стандартного поведения формы при отправке

    const rolesSelected = document.getElementById("rolesEdit"); // Получение элемента выбора ролей

    let roles = []; // Создание пустого массива для ролей
    for (let option of rolesSelected.selectedOptions) { // Перебор выбранных опций (ролей)
        if(option.value === ROLE_USER.role) { // Если выбранная роль равна роли пользователя (USER)
            roles.push(ROLE_USER); // Добавление роли USER в массив ролей
        } else if (option.value === ROLE_ADMIN.role) { // Если выбранная роль равна роли администратора (ADMIN)
            roles.push(ROLE_ADMIN); // Добавление роли ADMIN в массив ролей
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

    const modalBootstrap = bootstrap.Modal.getInstance(modalEdit); // Получение экземпляра модального окна Bootstrap
    modalBootstrap.hide(); // Скрытие модального окна после отправки данных
});

