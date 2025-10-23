// 1. Get references to the HTML elements
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// 2. Define your Email.js Keys (REPLACE THESE WITH YOUR ACTUAL KEYS)
const serviceID = 'service_4c2plri';  
const templateID = 'template_ounocf8'; 

// 3. Add the event listener to handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the page from reloading on submit

        // Display "Sending..." status
        formStatus.textContent = 'Sending message... Please wait.';
        formStatus.style.color = 'gray';


        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // SUCCESS
                formStatus.textContent = '✅ Message sent successfully! I will be in touch soon.';
                formStatus.style.color = 'green';
                contactForm.reset(); // Clear the form fields after success
            }, (error) => {
                // ERROR
                console.error('Email sending failed:', error);
                formStatus.textContent = `❌ Failed to send message. Please try again later. (Error: ${error.status || error.text})`;
                formStatus.style.color = 'red';
            });
    });
} else {
    console.error("Error: The form with ID 'contact-form' was not found in the HTML.");
}