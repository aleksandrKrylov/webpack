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

  const callbackImg = (url) => popupImge.open(url);
  const createCard = (data) =>  new Card(data, callbackImg).render();
  const callbackGetInfo = () => api.getInfoAboutUser();
  const callbackInitialCards = () => api.getInitialCards();

  const cardList = new CardList(placesList, createCard, callbackInitialCards);
  const formValidator = new FormValidator(form);
  const formEditValidator = new FormValidator(formEdit);
  const popupCard = new Popup(document.querySelector('.popup-card'), popupIsOpened);
  const popupEdit = new Popup(document.querySelector('.popup-edit'), popupIsOpened);
  const popupImge = new PopupImge(document.querySelector('.popup-image'), popupIsOpened);
  const userInfo = new UserInfo(userInfoName, userInfoJob, userName, userAboutMe, userInfoPhoto, callbackGetInfo);
  const api = new Api(infoTokenId);

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

/*
  Неплохая работа, данные с сервера приходят и профиль пользователя сохраняется
  Но есть несколько замечаний

  Надо исправить:
  - + все изменения на странице должны происходить, только после того, как
  сервер ответил подтверждением  - сохранение профиля на странице и закрытие попапа 
  делать только после ответа сервера

  Можно лучше:
  - + базовый адрес сервера так же лучше передавать как параметр 
  конструктора, а не хардкодить в методах

  - + проверка ответа сервера и преобразование из json
  дублируется во всех методах класса Api, лучше вынести всю её в отдельный метод

  - для загрузки начальный данных лучше применить Promise.all
    https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

    Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getInfoAboutUser(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ....................
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        ....................
      })

  - + переименовать skript.js в script.js
*/

/*
  Отлично, критические замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  
  Если у Вас будет свободное время попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/