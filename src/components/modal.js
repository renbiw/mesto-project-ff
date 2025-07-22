// закрытие модального окна
export function closeModal(closePop) {
  closePop.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKey);
}


// открытие модального окна
export function openModal(openPop) {
  document.addEventListener("keydown", handleEscKey);
  openPop.classList.add("popup_is-opened");
}

// обработчик закрытия форм по клавише esc
function handleEscKey(evt) {
  if (evt.key === "Escape") {
    evt.preventDefault();
    const popup = document.querySelector(".popup_is-opened"); 
    if (popup) {
      closeModal(popup); 
    }
  }
}

// обработчик клика на оверлей
export function handleClickOverlay(evt){
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}