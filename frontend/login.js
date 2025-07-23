const form = document.getElementById('loginForm');
const errorDiv = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorDiv.textContent = data.error || 'Login failed.';
      return;
    }

    // ✅ Store token in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // ✅ Redirect to feed page
    window.location.href = 'index.html';
  } catch (err) {
    console.error(err);
    errorDiv.textContent = 'An error occurred. Please try again.';
  }
});
