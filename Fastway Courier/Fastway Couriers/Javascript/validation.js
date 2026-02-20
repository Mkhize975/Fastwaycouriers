// Form Validation for Enquiry Page
function validateEnquiryForm(event) {
    event.preventDefault(); // Prevent form submission
    
    // Clear previous error messages
    clearErrors();
    
    let isValid = true;
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate Name
    if (name === '') {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError('name', 'Name can only contain letters and spaces');
        isValid = false;
    }
    
    // Validate Email
    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Message
    if (message === '') {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    // If all validations pass
    if (isValid) {
        showSuccessMessage();
        document.querySelector('.enquiry-form').reset();
    }
    
    return isValid;
}

// Email validation regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.9em';
    errorDiv.style.marginTop = '5px';
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
    field.style.borderColor = 'red';
}

// Clear all error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => input.style.borderColor = '');
}

// Show success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = 'Thank you! Your enquiry has been submitted successfully.';
    successDiv.style.backgroundColor = '#4CAF50';
    successDiv.style.color = 'white';
    successDiv.style.padding = '15px';
    successDiv.style.marginTop = '20px';
    successDiv.style.borderRadius = '5px';
    successDiv.style.textAlign = 'center';
    
    const form = document.querySelector('.enquiry-form');
    form.appendChild(successDiv);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Real-time validation feedback
function addRealTimeValidation() {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    nameField.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            if (this.value.length < 2) {
                this.style.borderColor = 'red';
            } else if (!/^[a-zA-Z\s]+$/.test(this.value)) {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = 'green';
            }
        }
    });
    
    emailField.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            if (isValidEmail(this.value)) {
                this.style.borderColor = 'green';
            } else {
                this.style.borderColor = 'red';
            }
        }
    });
    
    messageField.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            if (this.value.length >= 10) {
                this.style.borderColor = 'green';
            } else {
                this.style.borderColor = 'red';
            }
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.enquiry-form');
    if (form) {
        form.addEventListener('submit', validateEnquiryForm);
        addRealTimeValidation();
    }
});