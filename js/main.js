`use strict`;

const aboutContactsButtonElement = document.querySelector(`.about-contacts-button`);
const writeUsElement = document.querySelector(`.write-us`);
const emailElement = writeUsElement.querySelector(`#email`);
const nameElement = writeUsElement.querySelector(`#name`);
const messageElement = writeUsElement.querySelector(`#message`);
const writeUsForm = writeUsElement.querySelector(`.write-us-form`);
const mapPreviewElement = document.querySelector(`.map-preview`);
const contactsMapElement = document.querySelector(`.contacts-map`);

let isStorageSupport = true;
let storage = {};

try {
  storage.name = localStorage.getItem(`name`);
  storage.email = localStorage.getItem(`email`);
} catch (err) {
  isStorageSupport = false;
}

let onPopupCloseClick = (evt) => {
  evt.preventDefault();
  let popup = evt.target.closest(`.popup`);
  popup.classList.remove(`modal-show`);

  evt.target.removeEventListener(`click`, onPopupCloseClick);
};

let findPopupCloseElement = (popup) => {
  return popup.querySelector(`.popup-close`);
};

let focusForm = () => {
  if (storage.name) {
    nameElement.value = storage.name;
  } else {
    nameElement.focus();
    return;
  }

  if (storage.email) {
    emailElement.value = storage.email;
    messageElement.focus();
  } else {
    emailElement.focus();
  }
}

let onAboutContactsButtonElementClick = (evt) => {
  evt.preventDefault();
  writeUsElement.classList.add(`modal-show`);

  focusForm();

  let popupCloseElement = findPopupCloseElement(writeUsElement);
  popupCloseElement.addEventListener(`click`, onPopupCloseClick);

  popupCloseElement.addEventListener(`click`, onPopupCloseClick);
};

let onMapPreviewElementClick = (evt) => {
  evt.preventDefault();
  contactsMapElement.classList.add(`modal-show`);

  let popupCloseElement = findPopupCloseElement(contactsMapElement);
  popupCloseElement.addEventListener(`click`, onPopupCloseClick);

  popupCloseElement.addEventListener(`click`, onPopupCloseClick);
}

let onWriteUsFormSubmit = () => {
  if (emailElement.value) {
    localStorage.setItem(`email`, emailElement.value);
  }
  if (nameElement.value) {
    localStorage.setItem(`name`, nameElement.value);
  }
};

let onDocumentKeyDown = (evt) => {
  if (evt.keyCode === 27) {
    writeUsElement.classList.remove(`modal-show`);
    contactsMapElement.classList.remove(`modal-show`);
    evt.preventDefault();
  }
};

let addHandlers = () => {
  aboutContactsButtonElement.addEventListener(`click`, onAboutContactsButtonElementClick);
  writeUsForm.addEventListener(`submit`, onWriteUsFormSubmit);
  mapPreviewElement.addEventListener(`click`, onMapPreviewElementClick);
  document.addEventListener(`keydown`, onDocumentKeyDown);
};

addHandlers();
