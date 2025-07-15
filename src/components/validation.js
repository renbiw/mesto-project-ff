// Валидация формы
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  const inputList = Array.from(formList.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement)=> {
    inputElement.addEventListener("input", isValid)
  })
}

// очистка формы
function clearValidation(profileForm, validationConfig){

}

//присвоить класс ошибки
function showInputError(elem) {
  elem.classList.add(config.inputErrorClass);
}

//скрыть класс ошибки
function hideInputError(elem) {
  elem.classList.remove(config.inputErrorClass);
}

function isValid(elem) {
  if (!elem.validity.valid) {
    showInputError(elem)
  }
  else {
    hideInputError(elem)
  }
}