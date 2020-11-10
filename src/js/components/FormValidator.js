export class FormValidator {
  constructor(form) {
    this._form = form;
    this._button = this._form.querySelector('button');
    this._validate = this._validate.bind(this);
  }

  _checkInputValidity(input) {
    const error = input.parentNode.querySelector(`#${input.id}-error`);
    const errorMessages = {
      validationLength: 'Должно быть от 2 до 30 символов',
      requiredInput: 'Это обязательное поле',
    };

    if (input.validity.valueMissing) {
      error.classList.add('worldNews__error_active');
      input.setCustomValidity(errorMessages.requiredInput);
      error.textContent = input.validationMessage;
      return false;
    }
    if (input.validity.tooShort || input.validity.tooLong) {
      error.classList.add('worldNews__error_active');
      input.setCustomValidity(errorMessages.validationLength);
      error.textContent = input.validationMessage;
      return false;
    } else {
      error.classList.remove('worldNews__error_active');
      input.setCustomValidity('');
      return true;
    }
  }

  setEventListeners() {
    this._form.addEventListener('input', this._validate);
  }

  _validate(evt) {
    this._checkInputValidity(evt.target);
    this._setSubmitButtonState(this._form.checkValidity());
  }

  _setSubmitButtonState(isValidForm) {
    if (isValidForm) {
      this._button.removeAttribute('disabled');
    } else {
      this._button.setAttribute('disabled', true);
    }
  }
}
