import {API} from '../config'

export const read = (slug, id) => {
    return fetch(`${API}/${slug}/${id}`, {
        method: 'GET',
        Accept: "application/json",
        "Content-Type": "application/json",
    })
    .then(response => {
        return response.json() 
    })
    .catch(err => console.log(err))
}
