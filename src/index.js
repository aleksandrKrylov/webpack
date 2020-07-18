import {Api} from './js/Api.js';
import {Card} from './js/Card.js';
import {CardList} from './js/CardList.js';
import {FormValidator} from './js/FormValidator.js';
import {Popup} from './js/Popup.js';
import {UserInfo} from './js/UserInfo.js';
import "./pages/index.css";

(function() {
  const infoTokenId =  { token: '47bb72d3-cbf1-498a-9fe2-5d7f7327faa0', urlId: 'https://praktikum.tk/cohort11' };
  const userInfoPhoto = document.querySelector('.user-info__photo')
  const placesList = document.querySelector('.places-list');
  const userInfoName = document.querySelector('.user-info__name');
  const userInfoJob = document.querySelector('.user-info__job');
  const userName = document.querySelector('#userName');
  const userAboutMe = document.querySelector('#aboutMe'); 
  const form = document.querySelector('#form');
  const formEdit = document.querySelector('#formEdit');
  const title = document.querySelector('#title');
  const linkImage = document.querySelector('#linkImage');
  const popupIsOpened = 'popup_is-opened';
  const apiUrl = NODE_ENV === 'production' ? 'https://praktikum.tk/cohort11' : 'http://praktikum.tk/cohort11';
  
  const apiData = {
  url: apiUrl,
  headrs: {
    authorization: '47bb72d3-cbf1-498a-9fe2-5d7f7327faa0',
    'Content-Type': 'application/json'
  }
  }

  const callbackImg = (url) => popupImge.openImg(url);
  const createCard = (data) =>  new Card(data, callbackImg).render();
  const callbackGetInfo = () => api.getInfoAboutUser();
  const callbackInitialCards = () => api.getInitialCards();

  const cardList = new CardList(placesList, createCard, callbackInitialCards);
  const formValidator = new FormValidator(form);
  const formEditValidator = new FormValidator(formEdit);
  const popupCard = new Popup(document.querySelector('.popup-card'), popupIsOpened);
  const popupEdit = new Popup(document.querySelector('.popup-edit'), popupIsOpened);
  const popupImge = new Popup(document.querySelector('.popup-image'), popupIsOpened);
  const userInfo = new UserInfo(userInfoName, userInfoJob, userName, userAboutMe, userInfoPhoto, callbackGetInfo);
  const api = new Api(apiData);

  cardList.render();
  userInfo.setUserInfo();

  
  document.querySelector('.user-info__button').addEventListener('click', function() { 
    popupCard.open();
    formValidator.resetError();
    title.value = '';
    linkImage.value = '';
    formValidator.setSubmitButtonState(); 
  });

  document.querySelector('.user-info__button-edit').addEventListener('click', function() { 
    popupEdit.open();
    userInfo.textInput();
    formEditValidator.resetError();
    formEditValidator.setSubmitButtonState();
  });

  document.querySelector('#form').addEventListener('submit', function(event) { 
    event.preventDefault();
    cardList.addCard({name: title.value, link: linkImage.value});
    popupCard.close();
  });
  
  document.querySelector('#formEdit').addEventListener('submit', function(event) { 
    event.preventDefault();
    const textinputName = userName.value;
    const textInputAbout = userAboutMe.value;

    api.saveProfileData(textinputName, textInputAbout)
    .then(() => {
      userInfo.editingProfile();
      popupEdit.close();
    })
    .catch((err) => {
      console.log( `Ошибка: ${err}`);
    });  
  });
})(); 
