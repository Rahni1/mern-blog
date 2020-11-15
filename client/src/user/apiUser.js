import { API } from "config";

export const postsByUser = (userId, token) => {
  return fetch(`${API}/my/posts/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const editPost = (userId, id, token, post) => {
  return fetch(`${API}/post/${userId}/${id}/edit`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })
    .then((response) => {
      return response.json(post);
    })
    .catch((err) => console.log(err));
};

export const deletePost = (id, userId, token) => {
  return fetch(`${API}/post/${id}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
