import {API} from '../config'

export const read = id => {
    return fetch(`${API}/post/${id}`, {
        method: 'GET',
        Accept: "application/json",
        "Content-Type": "application/json",
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

