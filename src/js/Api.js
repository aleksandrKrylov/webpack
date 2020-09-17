export class Api {
  constructor(apiData) {
    this.token = apiData.headrs.authorization;
    this.urlId = apiData.url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  };

  getInfoAboutUser() {
    return fetch(`${this.urlId}/users/me`, {
      headers: {
        authorization: this.token,
      },
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCards() {
    return fetch(`${this.urlId}/cards`, {
      headers: {
        authorization: this.token,
      },
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }
  
  saveProfileData(textinputName, textInputAbout) {
    return fetch(`${this.urlId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: textinputName,
        about: textInputAbout,
      }),
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  addNewCard(textinputName, textInputLink) {
    return fetch(`${this.urlId}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: textinputName,
        link: textInputLink,
      }),
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  deleteCard(cardId) {
    return fetch(`${this.urlId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      }
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }
  
  toggleLike(methods, cardId) {     
    return fetch(`${this.urlId}/cards/like/${cardId}`, {
      method: methods,
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      }
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }

  updatingUsersAvatar(avatarLink) {
    return fetch(`${this.urlId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    })
  }
  
  showAlert(err) {
    alert(`Упс... ${err}`);
  }

}
