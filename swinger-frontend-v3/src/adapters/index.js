const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const newUser = data => {
  return fetch("http://localhost:3000/api/v1/users", {
    headers: headers,
    method: "POST",
    body: JSON.stringify(data)
  });
};

export const fetchCurrentUser = () => {
  const token = localStorage.getItem("token");

  let url = `http://localhost:3000/api/v1/current_user`;

  return fetch(url, {
    headers: {
      Authorization: token
    },
    method: "GET"
  }).then(res => res.json());
};

export const fetchUsers = () => {
  return fetch("http://localhost:3000/api/v1/users", {
    headers: headers,
    method: "GET"
  }).then(resp => resp.json());
};

export const fetchShow = showName => {
  let url = `http://localhost:3000/api/v1/shows/${showName}`;
  return fetch(url, {
    headers: headers,
    method: "GET"
  }).then(resp => resp.json());
};

export const getAuth = data => {
  return fetch("http://localhost:3000/api/v1/auth", {
    headers: headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(resp => resp.json());
};
