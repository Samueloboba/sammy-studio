const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');

if (menu && nav) {
menu.addEventListener('click', () => {
const open = nav.classList.toggle('open');
menu.setAttribute('aria-expanded', String(open));
menu.textContent = open ? '×' : '☰';
});

nav.querySelectorAll('a').forEach(a => {
a.addEventListener('click', () => {
nav.classList.remove('open');
menu.setAttribute('aria-expanded', 'false');
menu.textContent = '☰';
});
});
}

// Sammy Studio Contact Form
const contactForm = document.querySelector('.contact-form');
const submitButton = contactForm?.querySelector('button[type="submit"]');

if (contactForm && submitButton) {
contactForm.addEventListener('submit', async (event) => {
event.preventDefault();

if (!contactForm.reportValidity()) return;

const originalText = submitButton.innerHTML;

submitButton.disabled = true;
submitButton.textContent = 'Sending message...';

let status = contactForm.querySelector('.form-status');

if (!status) {
  status = document.createElement('p');
  status.className = 'form-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  contactForm.appendChild(status);
}

status.textContent = '';

try {
  const response = await fetch(contactForm.action, {
    method: 'POST',
    body: new FormData(contactForm),
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Message submission failed');
  }

  status.textContent =
    '✓ Message sent successfully! Thank you for contacting Sammy Studio.';

  status.classList.add('success');
  contactForm.reset();

} catch (error) {
  status.textContent =
    'Sorry, your message could not be sent. Please try again or email samueloboba06@gmail.com.';

  status.classList.add('error');

} finally {
  submitButton.disabled = false;
  submitButton.innerHTML = originalText;
}

});
  }
