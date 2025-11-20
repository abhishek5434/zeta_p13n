document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('userForm');
  const loginBtn = document.getElementById('loginBtn');

  // Utility: get all form data
  function getFormData() {
    return {
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value
    };
  }

  // Utility: clear form fields
  function clearForm() {
    form.reset();
    console.log('Form cleared!');
  }

  // Submit button handler
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = getFormData();
    console.log('Submit Payload:', formData);

    // Call Zeta P13N API
    bt('updateUser',
      {
        email: formData.email,
        contacts: [
          { type: 'email', value: formData.email },
          { type: 'phone', value: formData.phone }
        ],
        first_name: formData.first_name,
        last_name: formData.last_name
      },
      {
        onComplete: function () {
          console.log('User Update Completed!');
          bt('track', 'form_submitted', formData, {});
          clearForm(); // ✅ Clear form after successful submit
        }
      }
    );
  });

  // Login button handler
  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const formData = getFormData();
    console.log('User Login Data:', formData);

    bt('updateUser', { email: formData.email }, {
      onComplete: function () {
        console.log('User Login Update Completed!');
      }
    });

    bt('track', 'logged_in', formData, {});
    clearForm(); // ✅ Clear form after login
  });
});
