// Функция для удаления данных пользователя по его ID
async function deleteUserData(userId) {
    await fetch(`/api/admin/${userId}`, {method: 'DELETE'});
    // Отправка DELETE-запроса на сервер для удаления пользователя с указанным ID
}

// Получение элемента модального окна для удаления пользователя
const modalDelete = document.getElementById("deleteModal");

// Функция для заполнения модального окна данными пользователя
async function DeleteModalHandler() {
    await fillModal(modalDelete); // Заполнение модального окна
}

// Обработка события отправки формы удаления
const formDelete = document.getElementById("modalBodyDelete");
if (formDelete) {
    formDelete.addEventListener("submit", async function (event) {
        event.preventDefault();
        const userId = event.target.querySelector("#idDelete").value;
        await deleteUserData(userId);
        await fillTableOfAllUsers();

        console.log("Закрытие модального окна");
        $('#deleteModal').modal('hide');
    });
}