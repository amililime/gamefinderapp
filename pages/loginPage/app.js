document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginButton").addEventListener("click", handleLogin);
});

async function handleLogin() {
  const emailInput = document.querySelector('input[name="Email"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const errorContainer = document.getElementById("errorContainer");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Registration successful, redirect to the homepage
      window.location.replace("../homepage/str.html");
    } else {
      const data = await response.json();
      errorContainer.textContent = data.message || "invalid email or password";
    }
  } catch (error) {
    console.error(error);
  }
}
