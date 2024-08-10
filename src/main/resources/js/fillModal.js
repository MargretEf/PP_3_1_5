// Функция для получения данных пользователя по его ID
async function getUserDataById(userId) {
    const response = await fetch(`/api/admin/${userId}`); // Отправка запроса на сервер для получения данных пользователя по его ID
    return await response.json(); // Возвращение данных в формате JSON
}

// Функция для заполнения модального окна
async function fillModal(modal) {
    console.log("fillModal called");//++++++
    // Добавление обработчика события при показе модального окна
    modal.addEventListener("show.bs.modal", async function(event) {
        console.log("Modal show event triggered");

        const userId = event.relatedTarget.dataset.userId; // Получение ID пользователя из атрибута data-user-id
        console.log('User ID:', userId);
        const user = await getUserDataById(userId); // Получение данных пользователя по ID
        console.log('User data:', user);
        const modalBody = modal.querySelector(".modal-body"); // Поиск элемента модального окна с классом "modal-body"

        // Поиск и получение элементов формы внутри модального окна
        const idInput = modalBody.querySelector("input[data-user-id='id']");
        const nameInput = modalBody.querySelector("input[data-user-id='name']");
        const lastNameInput = modalBody.querySelector("input[data-user-id='lastName']");
        const ageInput = modalBody.querySelector("input[data-user-id='age']");
        const emailInput = modalBody.querySelector("input[data-user-id='email']");
        const passwordInput = modalBody.querySelector("input[data-user-id='password']");

        // Если поле пароля существует, заполнить его значением
        if (passwordInput !== null) {
            passwordInput.value = user.password;
        }

        // Заполнение полей формы данными пользователя
        idInput.value = user.id;
        nameInput.value = user.name;
        lastNameInput.value = user.lastname;
        ageInput.value = user.age;
        emailInput.value = user.email;

        let rolesSelect = HTMLSelectElement; // Объявление переменной для хранения элемента выбора ролей

        let rolesSelectDelete = modalBody.querySelector("select[data-user-id='rolesDelete']"); // Поиск элемента выбора ролей для удаления
        let rolesSelectEdit = modalBody.querySelector("select[data-user-id='rolesEdit']"); // Поиск элемента выбора ролей для редактирования
        let userRolesHTML = ""; // Переменная для хранения HTML-кода ролей

        if (rolesSelectDelete !== null) { // Если элемент выбора ролей для удаления существует
            rolesSelect = rolesSelectDelete; // Присвоить элемент выбора ролей переменной rolesSelect
            for (let i = 0; i < user.role.length; i++) { // Перебор списка ролей пользователя
                userRolesHTML +=
                    `<option value="${user.role[i].id}">${user.role[i].roleName}</option>`; // Формирование HTML-кода для каждой роли
            }
        } else if (rolesSelectEdit !== null) { // Если элемент выбора ролей для редактирования существует
            rolesSelect = rolesSelectEdit; // Присвоить элемент выбора ролей переменной rolesSelect
            userRolesHTML +=
                `<option value="ROLE_USER">USER</option>
                 <option value="ROLE_ADMIN">ADMIN</option>`; // Формирование HTML-кода для ролей USER и ADMIN
        }

        rolesSelect.innerHTML = userRolesHTML; // Вставка HTML-кода в элемент выбора ролей
    })
}




















// async function fillModal() {
//
//     const deleteModal = document.getElementById("deleteModal");
//     deleteModal.addEventListener("show.bs.modal", async function(event) {
//
//         const userId = event.relatedTarget.dataset.userId;
//         const user = await getUserDataById(userId);
//         console.log(userId);
//         console.log(user)
//
//         document.getElementById("idDelete").value = user.id;
//         document.getElementById("firstNameDelete").value = user.name;
//         document.getElementById("lastNameDelete").value = user.surname;
//         document.getElementById("ageDelete").value = user.age;
//         document.getElementById("emailDelete").value = user.email;
//
//         let userRoles = document.getElementById("rolesDelete")
//         let userRolesHTML = "";
//         for (let i = 0; i < user.roles.length; i++) {
//             userRolesHTML +=
//                 `<option>${user.roles[i].roleNameWithoutRole}</option>`;
//         }
//         userRoles.innerHTML = userRolesHTML;
//     })
// }
//