import React from 'react';
import GoogleLogin from '@leecheuk/react-google-login';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        if (response.profileObj && responseGoogle.onSuccess) {
            navigate('/');
        }
        console.log(response);
    }

    return (
        <div>
            <GoogleLogin
                clientId="242716011984-oordacustqqj5b3erur8en7b0vdo4q3k.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

export default Login;
