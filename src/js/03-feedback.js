import throttle from 'lodash/throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');
const submitButton = feedbackForm.querySelector('button[type="submit"]');

const updateLocalStorage = throttle(function () {
  const feedbackState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackState));
}, 500);

emailInput.addEventListener('input', updateLocalStorage);
messageTextarea.addEventListener('input', updateLocalStorage);

const storedFeedbackState = JSON.parse(
  localStorage.getItem('feedback-form-state')
);

if (storedFeedbackState) {
  emailInput.value = storedFeedbackState.email;
  messageTextarea.value = storedFeedbackState.message;
}

feedbackForm.addEventListener('submit', function (e) {
  e.preventDefault();

  localStorage.removeItem('feedback-form-state');

  const feedbackData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(feedbackData);

  emailInput.value = '';
  messageTextarea.value = '';
});
