class UserInfo { 
  constructor(name, job, userNameId, userAboutMeId, userInfoPhoto, callbackgetInfo){
    this.name = name;
    this.job = job; 
    this.userNameId = userNameId; 
    this.userAboutMeId = userAboutMeId; 
    this.userInfoPhoto = userInfoPhoto;
    this.callbackgetInfo = callbackgetInfo;
  };

   editingProfile() { 
    this.name.textContent = this.userNameId.value;
    this.job.textContent = this.userAboutMeId.value;
  }; 

  setUserInfo () { 
    this.callbackgetInfo()
    .then((objUser) => {
      this.name.textContent = objUser.name;
      this.job.textContent = objUser.about;
      this.userInfoPhoto.style.backgroundImage = `url(${objUser.avatar})`;
      objUser._id = "47bb72d3-cbf1-498a-9fe2-5d7f7327faa0";
    })
    .catch((err) => {
      console.log( `Ошибка: ${err}`);
    });
  } 
 
  textInput() { 
    this.userNameId.value = this.name.textContent;
    this.userAboutMeId.value = this.job.textContent;
  };
};
