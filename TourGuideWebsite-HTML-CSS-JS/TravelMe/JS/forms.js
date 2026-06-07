// ============================================
// Form Popup Notifications System
// ============================================

// Create and show a custom notification
function showNotification(title, message, type = 'success') {
    // Create notification container
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set content
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${getIcon(type)}</div>
            <div class="notification-text">
                <h3>${title}</h3>
                <p>${message}</p>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get icon based on notification type
function getIcon(type) {
    const icons = {
        'success': '✓',
        'error': '✕',
        'info': 'ℹ',
        'warning': '⚠'
    };
    return icons[type] || '✓';
}

// ============================================
// Subscribe Form Handler
// ============================================
function handleSubscribeForm(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('Error', 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Invalid Email', 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Show success notification
    showNotification(
        'Thank You!',
        `Successfully subscribed with ${email}. Check your inbox for exclusive travel deals!`,
        'success'
    );
    
    // Clear the form
    event.target.reset();
    
    // Here you can add code to send the email to your backend
    // Example: sendToBackend('/api/subscribe', { email: email });
}

// ============================================
// Contact Form Handler
// ============================================
function handleContactForm(event) {
    event.preventDefault();
    
    const name = event.target.querySelector('input[placeholder="Name"]')?.value || '';
    const email = event.target.querySelector('input[placeholder="Email"]')?.value || '';
    const lastName = event.target.querySelector('input[placeholder="Last Name"]')?.value || '';
    const phone = event.target.querySelector('input[placeholder="+92"]')?.value || '';
    const message = event.target.querySelector('textarea')?.value || '';
    
    // Validate required fields
    if (!name || !email || !message) {
        showNotification('Missing Information', 'Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Invalid Email', 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Show success notification
    showNotification(
        'Message Sent!',
        `Thank you ${name}. We have received your message and will get back to you shortly.`,
        'success'
    );
    
    // Clear the form
    event.target.reset();
    
    // Here you can add code to send the form data to your backend
    // Example: sendToBackend('/api/contact', { name, email, message });
}

// ============================================
// Hotel Search Form Handler
// ============================================
function handleHotelSearchForm(event) {
    event.preventDefault();
    
    const destination = event.target.querySelector('input#destination')?.value || '';
    const checkIn = event.target.querySelector('input#check-in')?.value || '';
    const checkOut = event.target.querySelector('input#check-out')?.value || '';
    const guests = event.target.querySelector('input#guests')?.value || '';
    
    // Validate required fields
    if (!destination || !checkIn || !checkOut || !guests) {
        showNotification('Missing Information', 'Please fill in all search fields.', 'error');
        return;
    }
    
    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkOutDate <= checkInDate) {
        showNotification('Invalid Dates', 'Check-out date must be after check-in date.', 'error');
        return;
    }
    
    // Show searching notification
    showNotification(
        'Searching Hotels',
        `Finding the best hotels in ${destination} for ${guests} guest(s)...`,
        'info'
    );
    
    // Here you can add code to fetch hotel data from your backend
    // Example: fetchHotels({ destination, checkIn, checkOut, guests });
}

// ============================================
// Flight Search Form Handler
// ============================================
function handleFlightSearchForm(event) {
    event.preventDefault();
    
    const from = event.target.querySelector('input#from')?.value || '';
    const to = event.target.querySelector('input#to')?.value || '';
    const depart = event.target.querySelector('input#depart')?.value || '';
    const adults = event.target.querySelector('input#adults')?.value || '';
    
    // Validate required fields
    if (!from || !to || !depart || !adults) {
        showNotification('Missing Information', 'Please fill in all search fields.', 'error');
        return;
    }
    
    if (from.toLowerCase() === to.toLowerCase()) {
        showNotification('Invalid Route', 'Departure and arrival cities cannot be the same.', 'error');
        return;
    }
    
    // Show searching notification
    showNotification(
        'Searching Flights',
        `Finding flights from ${from} to ${to} for ${adults} adult(s)...`,
        'info'
    );
    
    // Here you can add code to fetch flight data from your backend
    // Example: fetchFlights({ from, to, depart, adults });
}

// ============================================
// Booking Button Handler
// ============================================
function handleBooking(event, type = 'hotel') {
    event.preventDefault();
    
    const typeText = type === 'hotel' ? 'Hotel' : 'Flight';
    
    showNotification(
        'Booking Initiated',
        `Proceeding to ${typeText} booking. Please review your selection.`,
        'info'
    );
    
    // Here you can add code to redirect to a booking page or open a modal
    // Example: window.location.href = '/booking/' + type;
}

// ============================================
// Initialize Form Handlers
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Subscribe form
    const subscribeForms = document.querySelectorAll('.subscribe-form');
    subscribeForms.forEach(form => {
        form.addEventListener('submit', handleSubscribeForm);
    });
    
    // Contact form
    const contactForms = document.querySelectorAll('form[action=""]');
    contactForms.forEach(form => {
        // Check if it's a contact form by looking for textarea
        if (form.querySelector('textarea')) {
            form.addEventListener('submit', handleContactForm);
        }
    });
    
    // Hotel search form
    const hotelForms = document.querySelectorAll('input#destination')?.parentElement?.parentElement?.parentElement?.parentElement;
    if (hotelForms) {
        hotelForms.addEventListener('submit', handleHotelSearchForm);
    }
    
    // Flight search form
    const flightForms = document.querySelectorAll('input#from')?.parentElement?.parentElement?.parentElement?.parentElement;
    if (flightForms) {
        flightForms.addEventListener('submit', handleFlightSearchForm);
    }
    
    // Book buttons
    const bookButtons = document.querySelectorAll('.btn-book, .btn-book-flight');
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.classList.contains('btn-book-flight') ? 'flight' : 'hotel';
            handleBooking(e, type);
        });
    });
});

// ============================================
// Utility: Send data to backend
// ============================================
function sendToBackend(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
        showNotification('Error', 'Failed to process your request. Please try again.', 'error');
    });
}
