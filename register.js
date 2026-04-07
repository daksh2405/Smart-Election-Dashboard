document.addEventListener("DOMContentLoaded", () => {

  let isVerified = false;

  const verifyBtn = document.getElementById("verify-btn");
  const aadhaarInput = document.getElementById("aadhaar");
  const statusText = document.getElementById("aadhaar-status");
  const stateInput = document.getElementById("state");

  verifyBtn.addEventListener("click", () => {
    const aadhaar = aadhaarInput.value.replace(/\s+/g, "");

    if (aadhaar.length === 12 && !isNaN(aadhaar)) {
      statusText.innerText = "Verified ✔";
      statusText.style.color = "green";
      isVerified = true;
      stateInput.disabled = false;
    } else {
      statusText.innerText = "Invalid Aadhaar";
      statusText.style.color = "red";
      isVerified = false;
    }
  });

  document.getElementById("register-btn").addEventListener("click", () => {
    const user = {
      username: document.getElementById("username").value.trim(),
      password: document.getElementById("password").value.trim(),
      name: document.getElementById("name").value.trim(),
      age: document.getElementById("age").value.trim(),
      mobile: document.getElementById("mobile").value.trim(),
      aadhaar: aadhaarInput.value.trim(),
      state: stateInput.value.trim()
    };

    if (!user.username || !user.password || !user.name || !user.age || !user.mobile || !user.aadhaar) {
      alert("Fill all fields");
      return;
    }

    if (!isVerified) {
      alert("Verify Aadhaar first");
      return;
    }

    if (!user.state) {
      alert("Select state");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(user));
    alert("Registered successfully!");
    window.location.href = "index.html";
  });

});