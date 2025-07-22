import "./pages/index.css";
//import { initialCards } from "./scripts/cards.js";
import { createCard, toggleLike, deleteCard } from "./components/card.js";
import {
  closeModal,
  openModal,
  handleClickOverlay,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUserData,
  patchUser,
  deleteDataCard,
  likeCard,
  unlikeCard,
  postCard,
  changeAvatar,
} from "./components/api.js";

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
const cardsList = document.querySelector(".places__list");

let profileId = "";
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    //заполнение профиля данными
    profileName.textContent = userData.name;
    profileDescrip.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    profileId = userData._id;
    // выводим карточки на страницу
    initialCards.forEach((card) => {
      const cardElement = createCard(
        card,
        (cardId, delCard) => deleteCard(cardId, delCard, deleteDataCard),
        fillDataCard,
        profileId,
        (cardId, hasLike, likeButton, likeAmountElement) =>
          toggleLike(
            cardId,
            hasLike,
            likeButton,
            likeAmountElement,
            likeCard,
            unlikeCard
          )
      );
      cardsList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error("Ошибка при заполнении страницы:", err);
  });

enableValidation(config);

//открытие формы редактирования профиля, инпуты заполняются данными профиля
buttonEdit.addEventListener("click", function (evt) {
  document.forms.editprofile.name.value = profileName.textContent;
  document.forms.editprofile.description.value = profileDescrip.textContent;
  const form = popupEdit.querySelector(config.formSelector);
  if (form) {
    clearValidation(form, config);
  }
  openModal(popupEdit);
});

profileAvatar.addEventListener("click", function (evt) {
  const form = popupAvatar.querySelector(config.formSelector);
  if (form) {
    form.reset();
    clearValidation(form, config);
  }
  openModal(popupAvatar);
});

// попап фулвью заполняется данными изображения по клику, открытие попапа
function fillDataCard(img) {
  imageOpen.alt = img.alt;
  imageOpen.src = img.src;
  imageName.textContent = img.alt.slice(7);
  openModal(popupImage);
}

buttonAdd.addEventListener("click", function (evt) {
  const form = popupNewCard.querySelector(config.formSelector);
  if (form) {
    form.reset();
    clearValidation(form, config);
  }
  openModal(popupNewCard);
});

buttonClose.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closeModal(popup);
  });
});

// обработчик закрытия форм по клику на оверлей
[popupEdit, popupNewCard, popupImage, popupAvatar].forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    handleClickOverlay(evt);
  });
});

//submit формы аватара
const formAvatar = document
  .querySelector(".popup_type_avatar")
  .querySelector(".popup__form");
const avatarLinkInput = formAvatar.querySelector(
  ".popup__input_type_avatar-link"
);

// ввод ссылки на аватар
function handleFormAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  changeAvatar(avatarLinkInput.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url("${res.avatar}")`;
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
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
  renderLoading(true, evt.submitter);
  patchUser(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescrip.textContent = res.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.error("Ошибка данных профиля:", err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

//прикрепляем обработчик к форме
formEdit.addEventListener("submit", handleFormEdit);

// submit формы создания
const formCard = document
  .querySelector(".popup_type_new-card")
  .querySelector(".popup__form");
const inputNameFormAddNewCard = formCard.querySelector(
  ".popup__input_type_card-name"
);
const inputLinkFormAddNewCard = formCard.querySelector(
  ".popup__input_type_url"
);

// обработчик создания новых карточек
function handleNewCard(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  postCard(inputNameFormAddNewCard.value, inputLinkFormAddNewCard.value)
    .then((res) => {
      const cardModal = createCard(
        res,
        (cardId, delCard) => deleteCard(cardId, delCard, deleteDataCard),
        fillDataCard,
        profileId,
        (cardId, hasLike, likeButton, likeAmountElement) =>
          toggleLike(
            cardId,
            hasLike,
            likeButton,
            likeAmountElement,
            likeCard,
            unlikeCard
          )
      );
      cardsList.prepend(cardModal);

      formCard.reset();
      clearValidation(formCard, config);
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.error("Ошибка создания карточки:", err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

// Прикрепляем обработчик к форме
formCard.addEventListener("submit", handleNewCard);

function renderLoading(isLoading, submitButton) {
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = "Сохранить";
  }
}
