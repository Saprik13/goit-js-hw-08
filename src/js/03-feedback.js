import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('input'),
};
refs.form.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('submit', onFormSubmit);
filledTextArea();
const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  const formElements = e.currentTarget.elements;
  if (formElements.email.value === '' || formElements.message.value === '') {
    return alert('Всі поля повинні бути заповнені!');
  }
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function filledTextArea() {
  const parsedsavedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (parsedsavedMessage) {
    refs.textarea.value = parsedsavedMessage['message'] || '';
    refs.email.value = parsedsavedMessage['email'] || '';
  }
}
