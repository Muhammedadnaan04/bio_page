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

// 1. Weather Widget Logic 
const LATITUDE = 19.0728; 
const LONGITUDE = 72.8826; 


const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;


async function fetchWeather() {
    const locationElement = document.getElementById('weather-location');
    const infoElement = document.getElementById('weather-info');
    
    // Display the coordinates being used
    locationElement.textContent = `Lat: ${LATITUDE.toFixed(2)}, Lon: ${LONGITUDE.toFixed(2)}`;
    infoElement.textContent = 'Fetching data...';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            console.error(`[Weather API Error] HTTP Status: ${response.status}`);
            infoElement.textContent = 'API Connection Error.';
            return; 
        }
        
        const data = await response.json();
        
        
        const temp = data.current.temperature_2m; 
        const displayTemp = temp.toFixed(0); 
        const windSpeed = data.current.wind_speed_10m.toFixed(1);
        
        // --- Custom Temperature-Based Icon Logic ---
        let icon = '❓'; // Default

        if (temp > 25) {
            icon = '☀️'; // Sun (Your condition: > 25)
        } else if (temp >= 18 && temp <= 25) {
            icon = '🌧️'; // Rain/Cloud (Your condition: 18 - 25)
        } else if (temp < 18) {
            icon = '❄️'; // Snow (Your condition: < 18)
        }
        
        // Update the widget display
        infoElement.innerHTML = `${icon} ${displayTemp}°C, ${windSpeed} km/h`;
        
    } catch (error) {
        // Catch generic network errors or parsing errors (like if 'data.current' is missing)
        console.error("Failed to fetch or process weather data:", error);
        infoElement.textContent = 'Processing Error.';
    }
}
// Fetch weather data on page load
window.onload = function() {
    fetchWeather();
};