$(document).ready(function() {
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize password toggle functionality
    initializePasswordToggle();
    
    // Real-time validation on input
    setupRealtimeValidation();
});

/**
 * Initialize form validation functionality
 */
function initializeFormValidation() {
    $('#registrationForm').on('submit', function(e) {
        e.preventDefault();
        
        // Clear previous messages
        hideMessage();
        
        // Validate all fields
        const isValid = validateForm();
        
        if (isValid) {
            showSuccessMessage('Registration successful! All fields are valid.');
            // Here you would typically send data to server
            console.log('Form submitted successfully');
        } else {
            showErrorMessage('Please correct the errors above and try again.');
        }
    });
}

/**
 * Setup real-time validation on input fields
 */
function setupRealtimeValidation() {
    // Validate on blur (when user leaves the field)
    $('#fullName').on('blur', function() {
        validateFullName();
    });

    $('#email').on('blur', function() {
        validateEmail();
    });

    $('#phone').on('input blur', function() {
        validatePhone();
    });

    $('#password').on('blur', function() {
        validatePassword();
    });

    $('#confirmPassword').on('blur', function() {
        validateConfirmPassword();
    });

    // Restrict phone input to numbers only
    $('#phone').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

/**
 * Initialize password show/hide functionality
 */
function initializePasswordToggle() {
    // Toggle password visibility
    $('#togglePassword').on('click', function() {
        togglePasswordVisibility('password', 'togglePassword');
    });

    $('#toggleConfirmPassword').on('click', function() {
        togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');
    });
}

/**
 * Toggle password field visibility
 * @param {string} fieldId - ID of the password field
 * @param {string} buttonId - ID of the toggle button
 */
function togglePasswordVisibility(fieldId, buttonId) {
    const passwordField = $('#' + fieldId);
    const toggleButton = $('#' + buttonId);
    
    if (passwordField.attr('type') === 'password') {
        passwordField.attr('type', 'text');
        toggleButton.text('Hide');
    } else {
        passwordField.attr('type', 'password');
        toggleButton.text('Show');
    }
}

/**
 * Validate entire form
 * @returns {boolean} - True if all validations pass
 */
function validateForm() {
    let isValid = true;
    
    // Clear all field styles
    clearFieldStyles();
    
    // Validate each field
    if (!validateFullName()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validatePhone()) isValid = false;
    if (!validatePassword()) isValid = false;
    if (!validateConfirmPassword()) isValid = false;
    
    return isValid;
}

/**
 * Validate full name field
 * @returns {boolean} - True if valid
 */
function validateFullName() {
    const fullName = $('#fullName').val().trim();
    const field = $('#fullName');
    
    if (fullName === '') {
        setFieldError(field);
        return false;
    } else if (fullName.length < 2) {
        setFieldError(field);
        return false;
    } else {
        setFieldSuccess(field);
        return true;
    }
}

/**
 * Validate email field using regex
 * @returns {boolean} - True if valid
 */
function validateEmail() {
    const email = $('#email').val().trim();
    const field = $('#email');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (email === '') {
        setFieldError(field);
        return false;
    } else if (!emailRegex.test(email)) {
        setFieldError(field);
        return false;
    } else {
        setFieldSuccess(field);
        return true;
    }
}

/**
 * Validate phone number (exactly 10 digits)
 * @returns {boolean} - True if valid
 */
function validatePhone() {
    const phone = $('#phone').val().trim();
    const field = $('#phone');
    const phoneRegex = /^[0-9]{10}$/;
    
    if (phone === '') {
        setFieldError(field);
        return false;
    } else if (!phoneRegex.test(phone)) {
        setFieldError(field);
        return false;
    } else {
        setFieldSuccess(field);
        return true;
    }
}

/**
 * Validate password with proper format requirements
 * @returns {boolean} - True if valid
 */
function validatePassword() {
    const password = $('#password').val();
    const field = $('#password');
    
    // Password requirements: minimum 8 characters, at least one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    
    if (password === '') {
        setFieldError(field);
        return false;
    } else if (!passwordRegex.test(password)) {
        setFieldError(field);
        return false;
    } else {
        setFieldSuccess(field);
        return true;
    }
}

/**
 * Validate confirm password field
 * @returns {boolean} - True if valid
 */
function validateConfirmPassword() {
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    const field = $('#confirmPassword');
    
    if (confirmPassword === '') {
        setFieldError(field);
        return false;
    } else if (password !== confirmPassword) {
        setFieldError(field);
        return false;
    } else {
        setFieldSuccess(field);
        return true;
    }
}

/**
 * Set field error state
 * @param {jQuery} field - jQuery field object
 */
function setFieldError(field) {
    field.removeClass('field-success').addClass('field-error');
}

/**
 * Set field success state
 * @param {jQuery} field - jQuery field object
 */
function setFieldSuccess(field) {
    field.removeClass('field-error').addClass('field-success');
}

/**
 * Clear all field styles
 */
function clearFieldStyles() {
    $('input').removeClass('field-error field-success');
}

/**
 * Show error message in red box
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    const messageBox = $('#messageBox');
    messageBox.removeClass('success-message')
             .addClass('error-message')
             .text(message)
             .show();
    
    // Scroll to top to show message
    $('html, body').animate({ scrollTop: 0 }, 300);
}

/**
 * Show success message in green box
 * @param {string} message - Success message to display
 */
function showSuccessMessage(message) {
    const messageBox = $('#messageBox');
    messageBox.removeClass('error-message')
             .addClass('success-message')
             .text(message)
             .show();
    
    // Scroll to top to show message
    $('html, body').animate({ scrollTop: 0 }, 300);
}

/**
 * Hide message box
 */
function hideMessage() {
    $('#messageBox').hide();
}
