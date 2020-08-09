import {API} from '../config'

export const postsByUser = (userId, token) => {
return fetch(`${API}/my/posts/${userId}`, {
    method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};