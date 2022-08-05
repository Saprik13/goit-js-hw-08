import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

populateTextArea();

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  // console.log(formData);

  // скидання форми після відправки
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextArea() {
  if (formData) {
    refs.form.elements.message.value = formData['message'] || '';
    refs.form.elements.email.value = formData['email'] || '';
  }
}
