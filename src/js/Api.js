class Api {
  constructor(infoTokenId) {
    this.token = infoTokenId.token;
    this.urlId = infoTokenId.urlId;
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
}
