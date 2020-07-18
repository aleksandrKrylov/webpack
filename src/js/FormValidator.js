class FormValidator {
  constructor(form) {
    this.form = form;
    this.submit = this.form.querySelector('.popup__button');
    this.setEventListeners()
  }

  checkInputValidity(element) {   
    if (element.validity.valueMissing) {
      element.setCustomValidity('Это поле должно быть заполнено');
    } else if (element.validity.tooShort) {
      element.setCustomValidity('Должно быть от 2 до 30 символов');
    } else if (element.validity.typeMismatch) {
      element.setCustomValidity('Здесь должна быть ссылка');
    } else {
      element.setCustomValidity('');
    }
    this.errorElement = this.form.querySelector(`#error-${element.id}`);
    this.errorElement.textContent = element.validationMessage;
  };

  setSubmitButtonState() { 
    if (!this.form.checkValidity()) {
      this.submit.setAttribute('disabled', true);
      this.submit.classList.remove('popup__button_valid');
    } else {
      this.submit.removeAttribute('disabled');
      this.submit.classList.add('popup__button_valid');
    }
  };

  setEventListeners() {
    this.form.addEventListener('input', (event) => {
      this.checkInputValidity(event.target);
      this.setSubmitButtonState(this.submit);
    });
  };

  resetError() {  
    const error = this.form.querySelectorAll('.error-message');
    error.forEach((el) => {
      el.textContent = "";
    });
  };
}
