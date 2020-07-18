class Popup{
  constructor(popup, classOpen){
    this.popup = popup;
    this.classOpen = classOpen;
    this.popupZoom = this.popup.querySelector('.popup__zoom');
    this.addListener();
  }

  open() {
    this.popup.classList.add(this.classOpen);  
  };
  
  close = () => {
     this.popup.classList.remove(this.classOpen);
  };

  addListener() {
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  };
};


