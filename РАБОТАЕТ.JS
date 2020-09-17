export class Card {
  constructor(data, callbackImg, callbackdeleteCard, popupDelete, buttonDelete) {
    this.data = data;
    this.callbackImg = callbackImg;
    this.callbackdeleteCard = callbackdeleteCard;
    this.popupDelete = popupDelete;
    this.buttonDelete = buttonDelete;
  }

  create() {
    const template = `<div class="place-card">
     <div class="place-card__image">
       <button class="place-card__delete-icon"></button>
     </div>
     <div class="place-card__description">
       <h3 class="place-card__name"></h3>
       <div class="place-card__like-container">
        <button class="place-card__like-icon"></button>
        <p class="place-card__namder-likes">0</p>
       </div>
     </div>
   </div>`;

    const element = document.createElement("div");
    element.insertAdjacentHTML("beforeend", template.trim());
    return element.firstChild;
  };

  render() {
    this.card = this.create();
    this.card.querySelector('.place-card__image').style.backgroundImage = `url(${this.data.link})`;
    this.card.querySelector('.place-card__name').textContent = this.data.name;
    this.card.querySelector('.place-card__namder-likes').textContent = this.data.likes.length;
    if(this.data.owner._id == "0c72f20bd2147a9a08a88775") {
      this.card.querySelector('.place-card__delete-icon').style.display = 'block';
    }
    this.addListener();
    return this.card;
  };

  like = () => {
    this.card.querySelector('.place-card__like-icon').classList.toggle("place-card__like-icon_liked");
  };

  remove = () => {
    if(this.cardId !== undefined) {  
      this.removeListener();
      this.card.remove();
      this.callbackdeleteCard(this.cardId);
    }
  }; 

  img = (element) => {
    if (element.target.classList.contains('place-card__image')) {
      this.callbackImg(this.data.link);
    }
  };

  addListener() {
    this.card.querySelector(".place-card__like-icon").addEventListener("click", this.like);
    this.card.querySelector(".place-card__image").addEventListener("click", this.img);
    this.card.querySelector('.place-card__delete-icon').addEventListener('click', () => {
      this.popupDelete.open();
      this.cardId = this.data._id;
    });
    this.buttonDelete.addEventListener('click', this.remove);
    
  };
  
  removeListener() {
    this.card.querySelector(".place-card__like-icon").removeEventListener("click", this.like);
    this.card.querySelector(".place-card__image").removeEventListener("click", this.img);
    this.card.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
  };
};
