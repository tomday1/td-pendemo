if (sessionStorage.getItem('username') === null) {
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
  const username = sessionStorage.getItem('username');

  if (username) {
      document.getElementById('usernameDisplay').textContent = username;
  }
});

document.getElementById('logoutImage').addEventListener('click', function() {
  sessionStorage.clear();
  window.location.href = 'login.html';
});