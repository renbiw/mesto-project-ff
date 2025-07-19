// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(card, deleteHandler, dataCardHandler, userID, deleteHandlerServer, likeHandler) {
  const cardNew = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardNew.querySelector(".card__image");
  const likeAmount = cardNew.querySelector(".card__like-amount");
  cardImg.src = card.link;
  cardImg.alt = `Пейзаж ${card.name}`;
  cardNew
    .querySelector(".card__description")
    .querySelector(".card__title").textContent = card.name;
  cardImg.addEventListener("click", () => dataCardHandler(cardImg));

  const buttonLike = cardNew.querySelector(".card__like-button");
  let hasLike = card.likes.some(like => like._id === userID);
  if (hasLike){
    buttonLike.classList.add('card__like-button_is-active');
  };
  likeAmount.textContent = card.likes.length;

  buttonLike.addEventListener("click", (evt)=> {
    hasLike = buttonLike.classList.contains('card__like-button_is-active');
    likeHandler(card._id, hasLike, buttonLike, likeAmount);
  });

  const buttonDelete = cardNew.querySelector(".card__delete-button");
  if (userID === card.owner._id) {
    buttonDelete.addEventListener("click", () => {
      deleteHandler(cardNew)
      deleteHandlerServer(card._id);
    });
  }
  else {
    buttonDelete.remove();
  }

  return cardNew;
}

// @todo: Функция удаления карточки
export function deleteCard(delCard) {
 delCard.remove();
}