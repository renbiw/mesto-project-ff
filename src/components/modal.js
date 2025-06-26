// проверка, если нажатие по оверлею, то попап ищется по классу "открыт"
// если нажатие по кнопке, то попап - ближайший к кнопке - клику
//удаляем слушатель клавишы esc
export function closeModal(evt) {
  let popup;
  if (evt.target.classList.contains("page")) {
    popup = evt.target.querySelector(".popup_is-opened");
  } else {
    popup = evt.target.closest(".popup");
  }
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscKey);
  }
}

// открытие попапа
export function openModal(openPop) {
  openPop.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKey);
}

// обработчик закрытия форм по клавише esc
export function handleEscKey(evt) {
  if (evt.key === "Escape") {
    evt.preventDefault();
    closeModal(evt);
  }
}

// обработчик клика на оверлей
export function handleClickOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt);
  }
}
