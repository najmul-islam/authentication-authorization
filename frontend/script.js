const getBtn = document.getElementById("get-btn");
const postBtn = document.getElementById("post-btn");

const sendHttpRequest = (method, url) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = "json";

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
      const data = xhr.response;
      console.log(data);
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };

    xhr.send();
  });

  return promise;
};

const getData = () => {
  sendHttpRequest("GET", "https://reqres.in/api/users").then((responseData) => {
    console.log(responseData);
  });
};

const postData = () => {
  sendHttpRequest("POST", "https://reqres.in/api/register", {
    email: "test@test.com",
    password: "123456",
  })
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((err) => console.log(err));
};

getBtn.addEventListener("click", getData);
postBtn.addEventListener("click", postData);
