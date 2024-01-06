const getBtn = document.getElementById("get-btn");
const postBtn = document.getElementById("post-btn");

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { "Content-Type": "application/json" } : {},
  }).then((response) => {
    return response.json();
  });
};

const getData = () => {
  sendHttpRequest("GET", "https://reqres.in/api/users").then((responseData) => {
    console.log(responseData);
  });
};

const postData = () => {
  sendHttpRequest("POST", "https://reqres.in/api/register", {
    email: "najmul@gmail.com",
    passowrd: "123456",
  }).then((responseData) => {
    console.log(responseData);
  });
};

getBtn.addEventListener("click", getData);
postBtn.addEventListener("click", postData);
