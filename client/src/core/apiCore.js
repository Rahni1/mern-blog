import { API } from "../config";

export const read = (slug, id) => {
  return fetch(`${API}/api/post/${slug}/${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
