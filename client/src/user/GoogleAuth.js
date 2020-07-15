import React from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import {API} from '../config'

const GoogleAuth = () => {
    const responseSuccessGoogle = (response) => {
axios({
    method: 'POST',
    url: `${API}/googlelogin`,
    data: {tokenId: response.tokenId}
}).then(response => {
console.log(response)

})
}
    const responseErrorGoogle = (response) => {

    }
    return (
        <div>
        <GoogleLogin
        clientId="715334328601-strku430pkh23o4c4fud19hetrj0djq9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />
        </div>
    )
}

export default GoogleAuth