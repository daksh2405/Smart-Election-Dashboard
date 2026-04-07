document.addEventListener("DOMContentLoaded", () => {

  const savedUser = JSON.parse(localStorage.getItem("userData"));

  if (savedUser) {
    document.getElementById("username").value = savedUser.username;
  }

  document.getElementById("go-register").addEventListener("click", () => {
    window.location.href = "register.html";
  });

  document.getElementById("login-btn").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (!storedUser) {
      alert("Please register first");
      return;
    }

    if (username === storedUser.username && password === storedUser.password) {
      localStorage.setItem("currentUser", JSON.stringify(storedUser));
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials");
    }
  });

});