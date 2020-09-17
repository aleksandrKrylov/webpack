export class CardList {
  constructor(container, createCard, callbackInitialCards) {
    this.container = container;
    this.createCard = createCard;
    this.callbackInitialCards = callbackInitialCards;
  }

  addCard(data) {
    this.container.append(this.createCard(data));
  }

  /*
    Можно лучше: не далать запрос к серверу здесь, а передавать
    в render данные
  */
  render() {
    this.callbackInitialCards()
      .then((initialCards) => {
        initialCards.forEach((data) => {
          this.addCard(data);
        });
      })
      .catch((err) => {
        alert(`Ошибка: ${err.message}`);
      });
  }
}
