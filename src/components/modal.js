import '../pages/index.css';
const popupImage = document.querySelector('.popup_type_image');
// проверка, если нажатие по оверлею, то попап ищется по классу "открыт"
// если нажатие по кнопке, то попап - ближайший к кнопке - клику
//удаляем слушатель клавишы esc

export function closeForm(evt) {
  let popup;
  if (evt.target.classList.contains('page')) {
    popup = evt.target.querySelector('.popup_is-opened');
  } else {
    popup = evt.target.closest('.popup');
  }
  if (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKey);
  }
}

// открытие попапа 
export function openForm(openPop) {
  openPop.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKey);
}

// попап фулвью заполняется данными изображения по клику
export function openCardImg(evt){
  openForm(popupImage);
  let imageOpen = popupImage.querySelector('.popup__image');
  let imageName = popupImage.querySelector('.popup__caption');
  imageOpen.alt = evt.target.alt;
  imageOpen.src = evt.target.src;
  imageName.textContent = evt.target.alt.slice(7);
}

// обработчик закрытия форм по клавише esc 
export function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault(); 
    closeForm(evt);
  }
}