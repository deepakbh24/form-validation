$(document).ready(function () {
  $('#togglePassword').click(function () {
    let passInput = $('#password');
    let type = passInput.attr('type') === 'password' ? 'text' : 'password';
    passInput.attr('type', type);
    $(this).text(type === 'password' ? 'Show' : 'Hide');
  });

  $('#registrationForm').submit(function (e) {
    e.preventDefault();
    let name = $('#name').val().trim();
    let email = $('#email').val().trim();
    let phone = $('#phone').val().trim();
    let password = $('#password').val().trim();
    let messageBox = $('#messageBox');

    // Basic validation
    if (!name || !email || !phone || !password) {
      showMessage('All fields are required.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showMessage('Invalid email format.', 'error');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      showMessage('Phone number must be exactly 10 digits.', 'error');
      return;
    }

    if (!validatePassword(password)) {
      showMessage('Password must contain 1 uppercase, 1 lowercase, 1 number, and be 8+ characters.', 'error');
      return;
    }

    showMessage('Registration successful!', 'success');
  });

  function showMessage(message, type) {
    let box = $('#messageBox');
    box.removeClass().addClass('message ' + type).text(message).fadeIn();
    setTimeout(() => box.fadeOut(), 3000);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  }
});
