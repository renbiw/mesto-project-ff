import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard} from "./components/card.js";
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
const popupAvatar = document.querySelector(".popup_type_avatar");

const imageOpen = popupImage.querySelector(".popup__image");
const imageName = popupImage.querySelector(".popup__caption");

const profileName = document.querySelector(".profile__title");
const profileDescrip = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
let profileId = "";

// @todo: Вывести карточки на страницу
const cardsList = document.querySelector(".places__list");
function getCards() {
  fetch('https://nomoreparties.co/v1/wff-cohort-42/cards', {
    headers: {
      authorization: '4baeca36-0e67-4bf5-a839-8080e6cb541f'
    }
  })
    .then(res => res.json())
    .then((result) => {
      result.forEach((card)=>{
        let newCard = createCard(card, deleteCard, dataCardImg, profileId, deleteDataCard, toggleLike);
        cardsList.append(newCard);
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

profileAvatar.addEventListener("click", function(evt) {
  openModal(popupAvatar);
})

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
popupAvatar.addEventListener("click", handleClickOverlay);

//submit формы аватара
const formAvatar = document
  .querySelector(".popup_type_avatar")
  .querySelector(".popup__form");
const avatarLinkInput = formAvatar.querySelector(".popup__input_type_avatar-link");

// ввод ссылки на аватар
function handleFormAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, evt.target);
  changeAvatar(avatarLinkInput.value)
    .then(() => {
      profileAvatar.style.backgroundImage = `url("${avatarLinkInput.value}")`;
      formAvatar.reset();
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
    }).finally(()=> {renderLoading(false, evt.target)});
}

//прикрепляем обработчик к форме
formAvatar.addEventListener("submit", handleFormAvatar);

//submit формы редактирования
const formEdit = document
  .querySelector(".popup_type_edit")
  .querySelector(".popup__form");
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");

// редактирование профиля
function handleFormEdit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.target);
  patchUser(nameInput, jobInput).then(()=> {
    profileName.textContent = nameInput.value;
    profileDescrip.textContent = jobInput.value;
    closeModal(popupEdit);
  }).catch((err) => {
    console.error("Ошибка данных профиля:", err);
  }).finally(()=> {renderLoading(false, evt.target)});
}

//прикрепляем обработчик к форме
formEdit.addEventListener("submit", handleFormEdit);

// submit формы создания
const formCard = document
  .querySelector(".popup_type_new-card")
  .querySelector(".popup__form");
const cardName = formCard.querySelector(".popup__input_type_card-name");
const cardLink = formCard.querySelector(".popup__input_type_url");

// обработчик создания новых карточек
function handleNewCard(evt) {
  evt.preventDefault();
  renderLoading(true, evt.target);
  postCard(cardName, cardLink).then((res)=> {
    const cardModal = createCard(res, deleteCard, dataCardImg, profileId, deleteDataCard, toggleLike);
    cardsList.prepend(cardModal);
  }).catch((err) => {
    console.error("Ошибка данных профиля:", err);
  }).finally(()=> {renderLoading(false, evt.target)});

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
      profileId = result._id;
    });
  }

function patchUser(name, description) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '4baeca36-0e67-4bf5-a839-8080e6cb541f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      about: description.value
    })
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

function postCard(nameCard, linkCard) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/cards', {
    method: 'POST',
    headers: {
      authorization: '4baeca36-0e67-4bf5-a839-8080e6cb541f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameCard.value,
      link: linkCard.value
    })
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

// удалить карточку с сервера
function deleteDataCard(cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-42/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '4baeca36-0e67-4bf5-a839-8080e6cb541f',
      'Content-Type': 'application/json'
    }
  })
}

function likeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-42/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '4baeca36-0e67-4bf5-a839-8080e6cb541f',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) return Promise.reject(`Ошибка лайка: ${res.status}`);
    return res.json();
  });
}


function unlikeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-42/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '4baeca36-0e67-4bf5-a839-8080e6cb541f',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) return Promise.reject(`Ошибка дизлайка: ${res.status}`);
    return res.json();
  });
}

function toggleLike(cardId, hasLike, likeButton, likeAmountElement)  {
  let likeRequest;
  if (hasLike) {
    likeRequest = unlikeCard(cardId);
  } else {
    likeRequest = likeCard(cardId);
  }
  likeRequest
    .then(updatedCard => {
      likeAmountElement.textContent = updatedCard.likes.length;
      if (!hasLike) {
        likeButton.classList.add('card__like-button_is-active');
      } else {
        likeButton.classList.remove('card__like-button_is-active');
      }
      return updatedCard;
    })
    .catch(err => {
      console.error('Ошибка:', err);
    });
}

function changeAvatar(avatarUrl) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '4baeca36-0e67-4bf5-a839-8080e6cb541f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar: avatarUrl })
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

function renderLoading(isLoading, form) {
  if (isLoading) {
    form.querySelector('.popup__button').textContent = "Сохранение...";
  }
  else {
    form.querySelector('.popup__button').textContent = "Сохранить";
  }
}