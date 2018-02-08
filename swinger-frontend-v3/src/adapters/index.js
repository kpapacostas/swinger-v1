const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

//############################################################################
//USERS

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

export const getAuth = data => {
  return fetch("http://localhost:3000/api/v1/auth", {
    headers: headers,
    method: "POST",
    body: JSON.stringify(data)
  }).then(resp => resp.json());
};

//############################################################################
//SHOW / SCENE / ROLE

export const fetchShow = showName => {
  let url = `http://localhost:3000/api/v1/shows/${showName}`;
  return fetch(url, {
    headers: headers,
    method: "GET"
  }).then(resp => resp.json());
};

export const createShow = (title, userId) => {
  const params = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ title, userId })
  };
  return fetch("http://localhost:3000/api/v1/shows", params).then(resp =>
    resp.json()
  );
};

export const createScene = (number, act, show) => {
  const params = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ number, act, show })
  };
  return fetch("http://localhost:3000/api/v1/scenes", params).then(resp =>
    resp.json()
  );
};

export const createRole = (name, showId) => {
  const params = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, showId })
  };
  return fetch("http://localhost:3000/api/v1/roles", params).then(resp =>
    resp.json()
  );
};

export const editShow = data => {
  const params = {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(data)
  };
  return fetch(`http://localhost:3000/api/v1/shows/${data.id}`, params).then(
    resp => resp.json()
  );
};

export const editRole = data => {
  console.log("in edit role");
  const params = {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(data)
  };
  return fetch(`http://localhost:3000/api/v1/roles/${data.id}`, params).then(
    resp => resp.json()
  );
};

export const editScene = data => {
  const params = {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(data)
  };
  return fetch(`http://localhost:3000/api/v1/scenes/${data.id}`, params).then(
    resp => resp.json()
  );
};

export const destroyShow = id => {
  const params = {
    method: "DELETE",
    headers: headers
  };
  return fetch(`http://localhost:3000/api/v1/shows/${id}`, params).then(resp =>
    resp.json()
  );
};

export const destroyRole = id => {
  const params = {
    method: "DELETE",
    headers: headers
  };
  return fetch(`http://localhost:3000/api/v1/roles/${id}`, params).then(resp =>
    resp.json()
  );
};

export const fetchRole = id => {
  const params = {
    method: "GET",
    headers: headers
  };
  return fetch(`http://localhost:3000/api/v1/roles/${id}`, params).then(resp =>
    resp.json()
  );
};
