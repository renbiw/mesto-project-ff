// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(card) {
  const cardNew = document.querySelector('#card-template').content;
  const cardTemplate = cardNew.querySelector('.card').cloneNode(true);
  cardTemplate.querySelector('.card__image').src = card.link;
  cardTemplate.querySelector('.card__description').querySelector('.card__title').textContent = card.name;

  const buttonDelete = cardTemplate.querySelector('.card__delete-button');
  buttonDelete.addEventListener('click', () => deleteCard(cardTemplate));

  return cardTemplate;
}

// @todo: Функция удаления карточки
function deleteCard(delcard) {
  delcard.remove();
}

// @todo: Вывести карточки на страницу
const massive = document.querySelector('.places__list');
for (let i=0; i < initialCards.length; i++) {
  massive.append(createCard(initialCards[i]));
}