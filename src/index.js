import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, imageLiked } from "./components/card.js";
import {
  closeModal,
  openModal,
  handleEscKey,
  handleClickOverlay,
} from "./components/modal.js";

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

// @todo: Вывести карточки на страницу
const cardsList = document.querySelector(".places__list");
initialCards.forEach((card) => {
  cardsList.append(createCard(card, deleteCard, dataCardImg, imageLiked));
});

//открытие формы редактирования профиля, инпуты заполняются данными профиля
buttonEdit.addEventListener("click", function (evt) {
  document.forms.editprofile.name.value = profileName.textContent;
  document.forms.editprofile.description.value = profileDescrip.textContent;
  openModal(popupEdit);
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
  closeModal(popupEdit);
}

//прикрепляем обработчик к форме
formEdit.addEventListener("submit", handleFormEdit);

// submit формы создания
const formCard = document
  .querySelector(".popup_type_new-card")
  .querySelector(".popup__form");
let cardForm = {};

// обработчик создания новых карточек
function handleNewCard(evt) {
  evt.preventDefault();
  cardForm.name = formCard.querySelector(".popup__input_type_card-name").value;
  cardForm.link = formCard.querySelector(".popup__input_type_url").value;
  const cardModal = createCard(cardForm, deleteCard, dataCardImg, imageLiked);
  cardsList.prepend(cardModal);
  // Очистка инпутов
  formCard.reset();
  closeModal(popupNewCard);
}

// Прикрепляем обработчик к форме
formCard.addEventListener("submit", handleNewCard);
