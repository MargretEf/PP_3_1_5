// Функция для удаления данных пользователя по ID
async function deleteUserData(userId) {
    await fetch(`/api/admin/${userId}`, { method: 'DELETE' });
}

// Инициализация модального окна для удаления
const modalDelete = document.getElementById("deleteModal");
if (modalDelete) {
    await fillModal(modalDelete);
}

// Обработка события отправки формы удаления
const formDelete = document.getElementById("modalBodyDelete");
if (formDelete) {
    formDelete.addEventListener("submit", async function(event) {
        event.preventDefault();
        const userId = event.target.querySelector("#idDelete").value;
        await deleteUserData(userId);
        await fillTableOfAllUsers();

        const modalBootstrap = bootstrap.Modal.getInstance(modalDelete);
        modalBootstrap.hide();
    });
}