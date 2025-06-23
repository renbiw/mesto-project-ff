import './pages/index.css';
import {initialCards} from './scripts/cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonClose = document.querySelectorAll('.popup__close');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const overlay = document.querySelector('.page__content');

const profileName = document.querySelector('.profile__title');
const profileDescrip = document.querySelector('.profile__description');


// @todo: Функция создания карточки
function createCard(card, deleteHandler, imageLiked, openCardImg) {
  const cardNew = cardTemplate.querySelector(".card").cloneNode(true);
  cardNew.querySelector(".card__image").src = card.link;
  cardNew.querySelector(".card__image").alt = `Пейзаж ${card.name}`;
  cardNew.querySelector(".card__description").querySelector(".card__title").textContent = card.name;

  const buttonDelete = cardNew.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => deleteHandler(cardNew));

  return cardNew;
}

// @todo: Функция удаления карточки
function deleteCard(delCard) {
  delCard.remove();
}

// @todo: Вывести карточки на страницу
const cardsList = document.querySelector(".places__list");
for (let i = 0; i < initialCards.length; i++) {
  cardsList.append(createCard(initialCards[i], deleteCard));
}

// проверка, если нажатие по оверлею, то попап ищется по классу "открыт"
// если нажатие по кнопке, то попап - ближайший к кнопке - клику
//удаляем слушатель клавишы esc
function closeForm(evt) {
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

function openForm(openPop) {
  openPop.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKey);
}

cardsList.addEventListener('click', imageLiked)
//функция лайка
function imageLiked(evt){
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
  
}

// попап фулвью заполняется данными изображения по клику
function openCardImg(evt){
  openForm(popupImage);
  let imageOpen = popupImage.querySelector('.popup__image');
  let imageName = popupImage.querySelector('.popup__caption');
  imageOpen.alt = evt.target.alt;
  imageOpen.src = evt.target.src;
  imageName.textContent = evt.target.alt;
}

//открытие формы редактирования профиля, инпуты заполняются данными профиля
buttonEdit.addEventListener('click', function(evt){
  document.forms.editprofile.name.value = profileName.innerText;
  document.forms.editprofile.description.value = profileDescrip.innerText;
  openForm(popupEdit);
});

buttonAdd.addEventListener('click', function(evt){
  openForm(popupNewCard);
});

// цикл чтобы закрепить за каждой картой обработчик "фулвьюв"
const cardImage = document.querySelectorAll('.card__image');
cardImage.forEach(img => {
  img.addEventListener('click', openCardImg);
});

buttonClose.forEach(button => {
  button.addEventListener('click', closeForm);
});

// обработчик закрытия форм по клику на оверлей
overlay.addEventListener('click', function(evt){
  if (!evt.target.classList.contains('popap')){
    closeForm;
  }
});

// обработчик закрытия форм по клавише esc 
function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault(); 
    closeForm(evt);
  }
}
 

const formElement = document.querySelector('.popup_type_edit').querySelector('.popup__form'); 
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// редактирование профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescrip.textContent = jobInput.value;
  closeForm(evt);
}

//прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);


const formCard = document.querySelector('.popup_type_new-card').querySelector('.popup__form'); 
let cardForm = {};

// обработчик создания новых карточек 
function handleNewCard(evt) {
  evt.preventDefault(); 
  cardForm.name = formCard.querySelector('.popup__input_type_card-name').value;
  cardForm.link = formCard.querySelector('.popup__input_type_url').value;
  cardsList.prepend(createCard(cardForm, deleteCard));
  cardsList.querySelector('.card__image').addEventListener('click', openCardImg); //слушатель чтобы добавленные картинки открывались
  // Очистка инпутов
  formCard.querySelector('.popup__input_type_card-name').value = '';
  formCard.querySelector('.popup__input_type_url').value = '';
  closeForm(evt);
}

// Прикрепляем обработчик к форме
formCard.addEventListener('submit', handleNewCard);
