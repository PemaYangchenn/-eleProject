function validateForm() {
    // Reset styles and error messages
    resetValidation();

    // Get form inputs
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var passwordConfirmInput = document.getElementById('passwordConfirm');

    // Validate Name
    var nameRegex = /^[A-Za-z\s]{1,30}$/;
    if (!nameRegex.test(nameInput.value)) {
        setInvalid(nameInput);
        return false;
    }

    // Validate Email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        setInvalid(emailInput);
        return false;
    }

    // Validate Password (Assuming a strong password should be at least 8 characters)
    if (passwordInput.value.length < 8) {
        setInvalid(passwordInput);
        return false;
    }

    // Validate Password Confirmation
    if (passwordInput.value !== passwordConfirmInput.value) {
        setInvalid(passwordConfirmInput);
        return false;
    }

    // If all validations pass, the form will be submitted
    return true;
}

function setInvalid(element) {
    // Set border color to red for invalid input
    element.style.borderColor = 'red';
}

function resetValidation() {
    // Reset border color and clear error messages
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style.borderColor = '';
    }
}
