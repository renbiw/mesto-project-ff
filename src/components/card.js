import '../pages/index.css';
import {initialCards} from '../scripts/cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(card, deleteHandler, imageLiked, openCardImg) {
  const cardNew = cardTemplate.querySelector(".card").cloneNode(true);
  cardNew.querySelector(".card__image").src = card.link;
  cardNew.querySelector(".card__image").alt = `Пейзаж ${card.name}`;
  cardNew.querySelector(".card__description").querySelector(".card__title").textContent = card.name;

  const buttonDelete = cardNew.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => deleteHandler(cardNew));

  return cardNew;
}

// @todo: Функция удаления карточки
export function deleteCard(delCard) {
  delCard.remove();
}

//функция лайка
export function imageLiked(evt){
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}