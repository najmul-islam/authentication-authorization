// Get the registration form
var register = document.getElementById("register");

// Add a submit event listener
register.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Gather form data
  var formData = new FormData(register);

  // Create the data object to send as JSON
  var data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  console.log("data", data);

  // Create an XMLHttpRequest instance
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/api/user/register", true);

  // Set the Content-Type header to application/json
  xhr.setRequestHeader("Content-Type", "application/json");

  // Define the response handling logic
  xhr.onload = function () {
    if (xhr.status === 201) {
      alert("Registration successful!");
      window.location.href = "/login.html";
    } else {
      // Display an error alert and log the server response
      alert("Registration failed. Status: " + xhr.status);
      console.log("Error:", xhr.responseText);
    }
  };

  // Handle network errors
  xhr.onerror = function () {
    alert("Network error. Please check your connection and try again.");
  };

  // Send the data as a JSON string
  xhr.send(JSON.stringify(data));
});
