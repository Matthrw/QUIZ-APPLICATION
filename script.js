// Function to handle user login form submission
document.getElementById('userLoginForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission

  // Fetch API call to send form data to Node.js backend
  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: event.target.email.value,
      password: event.target.password.value
    })
  });

  // Handle response from backend
  if (response.ok) {
    // Success: Redirect to user dashboard page or show success message
    console.log('User login successful');
    window.location.href = '/index.html'; // Replace with the URL of the user dashboard page
  } else {
    // Error: Handle error response or show error message
    console.error('User login failed');
  }
});

// Function to handle admin login form submission
document.getElementById('adminLoginForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission

  // Fetch API call to send form data to Node.js backend
  const response = await fetch('/admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: event.target.email.value,
      password: event.target.password.value
    })
  });

  // Handle response from backend
  if (response.ok) {
    // Success: Redirect to admin dashboard page or show success message
    console.log('Admin login successful');
    window.location.href = '/admin-dashboard.html'; // Replace with the URL of the admin dashboard page
  } else {
    // Error: Handle error response or show error message
    console.error('Admin login failed');
  }
});
