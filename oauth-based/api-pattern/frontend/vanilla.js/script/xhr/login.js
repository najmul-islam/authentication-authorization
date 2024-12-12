var login = document.getElementById("login");

login.addEventListener("submit", function (event) {
  event.preventDefault();

  var formData = new FormData(login);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/api/user/login", true);

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      // Assuming 200 for successful login
      alert("Login successful!");

      // Assuming the server responds with a token or user data in JSON
      const response = JSON.parse(xhr.responseText);

      // Optionally, save the token to localStorage or cookies
      // localStorage.setItem('authToken', response.token);

      // Redirect to the profile page
      window.location.href = "/profile.html"; // Adjust as needed
    } else {
      // Handle errors (e.g., invalid credentials)
      alert("Login failed: " + xhr.status);
      console.log("Error:", xhr.responseText);
    }
  };

  xhr.onerror = function () {
    alert("Request failed. Please try again.");
  };

  // Send the login credentials as JSON
  var loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  xhr.send(JSON.stringify(loginData));
});
