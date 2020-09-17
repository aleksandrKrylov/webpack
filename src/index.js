import {Api} from './js/Api.js';
import {Card} from './js/Card.js';
import {CardList} from './js/CardList.js';
import {FormValidator} from './js/FormValidator.js';
import {Popup} from './js/Popup.js';
import {UserInfo} from './js/UserInfo.js';
import "./pages/index.css";


(function() {
  const userPhoto = document.querySelector('.user-info__photo');
  const userInfoName = document.querySelector('.user-info__name');
  const userInfoJob = document.querySelector('.user-info__job');
  const linkAvatar = document.querySelector('#linkAvatar');

  const newPlaceButton = document.querySelector('.user-info__button');
  const title = document.querySelector('#title');
  const linkImage = document.querySelector('#linkImage');
  const newPlaceForm = document.querySelector('#form');

  const userInfoButtonEdit = document.querySelector('.user-info__button-edit')
  const userName = document.querySelector('#userName');
  const userAboutMe = document.querySelector('#aboutMe'); 
  const userInfoFormEdit = document.querySelector('#formEdit'); 
  const formAvatar = document.querySelector('#formAvatar');

  const placesList = document.querySelector('.places-list');
  const buttonDelete = document.querySelector('.popup__button-delete');
  const popupButtonSave = document.querySelector('.popup__button-save');
  const popupButtonCard = document.querySelector('.popup__button');
  const popupIsOpened = 'popup_is-opened';
  const apiUrl = NODE_ENV === 'production' ? 'https://nomoreparties.co/cohort11' : 'http://nomoreparties.co/cohort11';
  const apiData = {
  url: apiUrl,
  headrs: {
    authorization: '47bb72d3-cbf1-498a-9fe2-5d7f7327faa0',
    'Content-Type': 'application/json'
  }
  }

  const createCard = (data) =>  new Card(data, callbackImg, callbackDeleteCard, popupDelete, buttonDelete, callbackToggleLike).render();
  const callbackImg = (url) => popupImge.openImg(url);
  const callbackGetInfo = () => api.getInfoAboutUser();
  const callbackInitialCards = () => api.getInitialCards();
  const callbackDeleteCard = (cardId) => api.deleteCard(cardId);
  const callbackToggleLike = (method, cardId) => api.toggleLike(method, cardId);

  const cardList = new CardList(placesList, createCard, callbackInitialCards);
  const formValidator = new FormValidator(form);
  const formEditValidator = new FormValidator(formEdit);
  const formAvatarValidator = new FormValidator(formAvatar);
  const popupCard = new Popup(document.querySelector('.popup-card'), popupIsOpened);
  const popupEdit = new Popup(document.querySelector('.popup-edit'), popupIsOpened);
  const popupImge = new Popup(document.querySelector('.popup-image'), popupIsOpened);
  const popupDelete = new Popup(document.querySelector('.popup-delete'), popupIsOpened);
  const popupAvatar = new Popup(document.querySelector('.popup-avatar'), popupIsOpened);
  const userInfo = new UserInfo(userInfoName, userInfoJob, userName, userAboutMe, userPhoto, callbackGetInfo);
  const api = new Api(apiData);

  cardList.render();
  userInfo.setUserInfo();


  newPlaceButton.addEventListener('click', function() { 
    popupCard.open();
    formValidator.resetError();
    title.value = '';
    linkImage.value = '';
    formValidator.setSubmitButtonState(); 
  });

  newPlaceForm.addEventListener('submit', function(event) {
    popupButtonCard.classList.add('popup__button_text-size');  
    popupButtonCard.textContent = 'Загрузка...';
    event.preventDefault();
    api.addNewCard(title.value, linkImage.value)
    .then((res) => {
      cardList.addCard(res);
      popupCard.close();
      popupButtonCard.textContent = '+';
      popupButtonCard.classList.remove('popup__button_text-size');  
    })
    .catch((err) => {
      popupButtonCard.textContent = 'Ошибка';
      alert( `Ошибка: ${err.message}`);
    });   
  });


  userInfoButtonEdit.addEventListener('click', function() { 
    popupEdit.open();
    userInfo.textInput();
    formEditValidator.resetError();
    formEditValidator.setSubmitButtonState();
  });

  userInfoFormEdit.addEventListener('submit', function(event) {   
    popupButtonSave.textContent = 'Загрузка...'
    event.preventDefault();
    const textinputName = userName.value;
    const textInputAbout = userAboutMe.value;
    api.saveProfileData(textinputName, textInputAbout)
    .then(() => {
      userInfo.editingProfile();
      popupEdit.close();
      popupButtonSave.textContent = 'Сохранить'
    })
    .catch((err) => {
      popupButtonSave.textContent = 'Ошибка'
      alert( `Ошибка: ${err.message}`);
    });  
  });

  
  userPhoto.addEventListener('click', function() { 
    popupAvatar.open();
    formAvatarValidator.resetError();
    linkAvatar.value = '';
    formAvatarValidator.setSubmitButtonState(); 
  });

  formAvatar.addEventListener('submit', function(event) { 
    event.preventDefault();
    api.updatingUsersAvatar(linkAvatar.value)
    .then((res) => {
      userPhoto.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
      alert( `Ошибка: ${err.message}`);
    });  
    popupAvatar.close();
  }); 

})(); 