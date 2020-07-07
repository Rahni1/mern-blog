// set Auth Token in axios header after user logs in
// & remove it if user logs out
// so don't need to set auth token every time I make API request
import axios from 'axios'

const setAuthToken = token => {
if (token) {
    axios.defaults.headers.common["Authorization"] = token
} else {
    delete axios.defaults.headers.common["Authorization"]
}
}
export default setAuthToken