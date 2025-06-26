const popupImage = document.querySelector(".popup_type_image");

// попап фулвью заполняется данными изображения по клику
export function DataCardImg(evt) {
  let imageOpen = popupImage.querySelector(".popup__image");
  let imageName = popupImage.querySelector(".popup__caption");
  imageOpen.alt = evt.target.alt;
  imageOpen.src = evt.target.src;
  imageName.textContent = evt.target.alt.slice(7);
}
