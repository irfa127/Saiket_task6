// CTA Button Interaction
const ctaBtn = document.getElementById('cta-btn');
ctaBtn.addEventListener('click', () => {
    alert('Thank you for your interest! Please fill out the contact form below.');
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    messageError.style.display = 'none';

    // Validate Name
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        nameError.style.display = 'block';
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.display = 'block';
        isValid = false;
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required';
        messageError.style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
        contactForm.reset();
    }
});
