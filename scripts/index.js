// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(card) {
  const cardNew = cardTemplate.querySelector(".card").cloneNode(true);
  cardNew.querySelector(".card__image").src = card.link;
  cardNew.querySelector(".card__description").querySelector(".card__title").textContent = card.name;

  const buttonDelete = cardNew.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => deleteCard(cardNew));

  return cardNew;
}

// @todo: Функция удаления карточки
function deleteCard(delCard) {
  delCard.remove();
}

// @todo: Вывести карточки на страницу
const cardsList = document.querySelector(".places__list");
for (let i = 0; i < initialCards.length; i++) {
  cardsList.append(createCard(initialCards[i]));
}
