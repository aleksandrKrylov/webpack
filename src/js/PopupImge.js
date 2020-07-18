class PopupImge extends Popup { // PopupImg
  open (url) {
    /**
     * + Можно лучше:
     * Сохранять "this.popup.querySelector('.popup__zoom')" в поле "this.<...> = ..." в конструкторе,
     * чтобы не вызывать querySelector при каждом открытии попапа
     */
    this.popupZoom.setAttribute('src', url);
    super.open()
  }
}
