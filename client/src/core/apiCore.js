import {API} from '../config'

export const createPost = (post) => {
    return fetch(`${API}/blog/post/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};