import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, imageLiked} from './components/card.js';
import {closeForm, openForm, openCardImg, handleEscKey} from './components/modal.js';

// @todo: DOM узлы
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonClose = document.querySelectorAll('.popup__close');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const overlay = document.querySelector('.page__content');

const profileName = document.querySelector('.profile__title');
const profileDescrip = document.querySelector('.profile__description');

// @todo: Вывести карточки на страницу
const cardsList = document.querySelector(".places__list");
for (let i = 0; i < initialCards.length; i++) {
  cardsList.append(createCard(initialCards[i], deleteCard));
}

//слушатель списку изображений на кнопку лайк
cardsList.addEventListener('click', imageLiked)


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
   closeForm(evt);
 }
});


//submit формы редактирования
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


// submit формы создания 
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
