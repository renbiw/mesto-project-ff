import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, imageLiked } from "./components/card.js";
import {
  closeModal,
  openModal,
  handleEscKey,
  handleClickOverlay,
} from "./components/modal.js";
import { enableValidation, clearValidation} from "./components/validation.js";

// @todo: DOM узлы
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonClose = document.querySelectorAll(".popup__close");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const imageOpen = popupImage.querySelector(".popup__image");
const imageName = popupImage.querySelector(".popup__caption");

const profileName = document.querySelector(".profile__title");
const profileDescrip = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");


// @todo: Вывести карточки на страницу
const cardsList = document.querySelector(".places__list");
//initialCards.forEach((card) => {
 // cardsList.append(createCard(card, deleteCard, dataCardImg, imageLiked));
//});

function getCards() {
  fetch('https://nomoreparties.co/v1/wff-cohort-42/cards', {
    headers: {
      authorization: '4baeca36-0e67-4bf5-a839-8080e6cb541f'
    }
  })
    .then(res => res.json())
    .then((result) => {
      result.forEach((card)=>{
        cardsList.append(createCard(card, deleteCard, dataCardImg, imageLiked));
      })
    });
}

//открытие формы редактирования профиля, инпуты заполняются данными профиля
buttonEdit.addEventListener("click", function (evt) {
  document.forms.editprofile.name.value = profileName.textContent;
  document.forms.editprofile.description.value = profileDescrip.textContent;
  openModal(popupEdit);
  clearValidation(document.querySelector('.popup__form'),{
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
});

// попап фулвью заполняется данными изображения по клику, открытие попапа
function dataCardImg(img) {
  imageOpen.alt = img.alt;
  imageOpen.src = img.src;
  imageName.textContent = img.alt.slice(7);
  openModal(popupImage);
}

buttonAdd.addEventListener("click", function (evt) {
  openModal(popupNewCard);
});

buttonClose.forEach((button) => {
  button.addEventListener("click",  (evt) => {
    const popup = evt.target.closest(".popup");
    closeModal(popup);
  });
});

// обработчик закрытия форм по клику на оверлей
popupEdit.addEventListener("click", handleClickOverlay);
popupNewCard.addEventListener("click", handleClickOverlay);
popupImage.addEventListener("click", handleClickOverlay);

//submit формы редактирования
const formEdit = document
  .querySelector(".popup_type_edit")
  .querySelector(".popup__form");
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");

// редактирование профиля
function handleFormEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescrip.textContent = jobInput.value;
  patchUser();
  closeModal(popupEdit);
}

//прикрепляем обработчик к форме
formEdit.addEventListener("submit", handleFormEdit);

// submit формы создания
const formCard = document
  .querySelector(".popup_type_new-card")
  .querySelector(".popup__form");
const cardName = formCard.querySelector(".popup__input_type_card-name");
const cardLink = formCard.querySelector(".popup__input_type_url");
let cardForm = {};

// обработчик создания новых карточек
function handleNewCard(evt) {
  evt.preventDefault();
  cardForm.name = cardName.value;
  cardForm.link = cardLink.value;
  const cardModal = createCard(cardForm, deleteCard, dataCardImg, imageLiked);
  cardsList.prepend(cardModal);
  postCard();
  // Очистка инпутов
  formCard.reset();
  clearValidation(document.querySelector('.popup__form'),{
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  closeModal(popupNewCard);
}

// Прикрепляем обработчик к форме
formCard.addEventListener("submit", handleNewCard);


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 


// заполнение профиля данными из запроса
function getUser() {
fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me', {
  headers: {
    authorization: '4baeca36-0e67-4bf5-a839-8080e6cb541f'
  }
})
  .then(res => res.json())
  .then((result) => {
    profileName.textContent = result.name;
    profileDescrip.textContent = result.about;
    profileAvatar.style.backgroundImage = `url('${result.avatar}')`;
    console.log(result);
  });
}

function patchUser() {
  fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '4baeca36-0e67-4bf5-a839-8080e6cb541f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  });
}

function postCard() {
  fetch('https://nomoreparties.co/v1/wff-cohort-42/cards', {
    method: 'POST',
    headers: {
      authorization: '4baeca36-0e67-4bf5-a839-8080e6cb541f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName.value,
      link: cardLink.value
    })
  });
}


Promise.all([getUser(), getCards()]).then(([userData, cards]) => {
  
})