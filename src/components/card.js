// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(card, deleteHandler, openCardHandler, likeHandler) {
  const cardNew = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardNew.querySelector(".card__image");
  cardImg.src = card.link;
  cardImg.alt = `Пейзаж ${card.name}`;
  cardNew
    .querySelector(".card__description")
    .querySelector(".card__title").textContent = card.name;

  cardImg.addEventListener("click", openCardHandler);

  const buttonLike = cardNew.querySelector(".card__like-button");
  buttonLike.addEventListener("click", likeHandler);

  const buttonDelete = cardNew.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => deleteHandler(cardNew));

  return cardNew;
}

// @todo: Функция удаления карточки
export function deleteCard(delCard) {
  delCard.remove();
}

//функция лайка
export function imageLiked(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
