import React from 'react';
import { useNavigate } from 'react-router-dom';

import GoogleLogin from '@leecheuk/react-google-login';
import { gapi } from 'gapi-script';

import NotiStackComponent from '../../../components/NotiStackComponent';

import './index.css';

const Login = ({ onTokenReceived }) => {
  const navigate = useNavigate();
  const notiComponent = NotiStackComponent();

  const clientId =
    '242716011984-oordacustqqj5b3erur8en7b0vdo4q3k.apps.googleusercontent.com';

  gapi.load('client:auth2', () => {
    gapi.auth2.init({ clientId: clientId });
  });

  const onSuccess = (res) => {
    const googleIdToken = res.tokenId;
    console.log('Google ID Token:', googleIdToken);
    localStorage.setItem('userName', res.profileObj.name); 
    console.log('res::', res.profileObj.name);
    localStorage.setItem('googleIdToken', googleIdToken);
    navigate('/');
    notiComponent.showSnackbar(
      `${res.profileObj.name} Login successfully!`,
      'success'
    );
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div className="center-container">
      <button className="google-button">
        <GoogleLogin
          style={{ backgroundColor: 'blue' }}
          clientId={clientId}
          buttonText="Login With Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          accessType={"offline"}
          prompt={'select_account'} 
          loginHint={"ABC"}
        />
      </button>
    </div>
  );
};

export default Login;
