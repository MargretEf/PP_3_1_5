// Функция для получения данных пользователя по его ID
async function getUserDataById(userId) {
    const response = await fetch(`/api/admin/${userId}`); // Отправка запроса на сервер для получения данных пользователя по его ID
    return await response.json(); // Возвращение данных в формате JSON
}

// Функция для заполнения модального окна
async function fillModal(modal) {

    // Добавление обработчика события при показе модального окна
    $(modal).on("show.bs.modal", async function (event) {

        const userId = $(event.relatedTarget).data('user-id'); // Получение ID пользователя из атрибута data-user-id
        const user = await getUserDataById(userId); // Получение данных пользователя по ID

        const modalBody = $(this).find(".modal-body"); // Поиск элемента модального окна с классом "modal-body"

        // Поиск и получение элементов формы внутри модального окна с помощью find
        const idInput = modalBody.find("input[data-user-id='id']");
        const nameInput = modalBody.find("input[data-user-id='name']");
        const lastNameInput = modalBody.find("input[data-user-id='lastName']");
        const ageInput = modalBody.find("input[data-user-id='age']");
        const emailInput = modalBody.find("input[data-user-id='email']");
        const passwordInput = modalBody.find("input[data-user-id='password']");

        // Если поле пароля существует, заполнить его значением
        if (passwordInput.length) {
            passwordInput.val(user.password);
        }

        // Заполнение полей формы данными пользователя
        idInput.val(user.id);
        nameInput.val(user.name);
        lastNameInput.val(user.lastname);
        ageInput.val(user.age);
        emailInput.val(user.email);

        let rolesSelect; // Переменная для хранения элемента выбора ролей

        const rolesSelectDelete = modalBody.find("select[data-user-id='rolesDelete']"); // Поиск элемента выбора ролей для удаления
        const rolesSelectEdit = modalBody.find("select[data-user-id='rolesEdit']"); // Поиск элемента выбора ролей для редактирования
        let userRolesHTML = ""; // Переменная для хранения HTML-кода ролей

        if (rolesSelectDelete.length) { // Если элемент выбора ролей для удаления существует
            rolesSelect = rolesSelectDelete; // Присвоить элемент выбора ролей переменной rolesSelect
            user.role.forEach(role => { // Перебор списка ролей пользователя
                userRolesHTML += `<option value="${role.id}">${role.roleName}</option>`; // Формирование HTML-кода для каждой роли
            });
        } else if (rolesSelectEdit.length) { // Если элемент выбора ролей для редактирования существует
            rolesSelect = rolesSelectEdit; // Присвоить элемент выбора ролей переменной rolesSelect
            userRolesHTML += `
                <option value="ROLE_USER">USER</option>
                <option value="ROLE_ADMIN">ADMIN</option>`; // Формирование HTML-кода для ролей USER и ADMIN
        }

        rolesSelect.html(userRolesHTML); // Вставка HTML-кода в элемент выбора ролей
    });
}