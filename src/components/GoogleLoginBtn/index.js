import React from 'react';
import { useNavigate } from 'react-router-dom';

import GoogleLogin from '@leecheuk/react-google-login';

import NotiStackComponent from '../NotiStackComponent';

const GoogleLoginBtn = (props) => {
  const { buttonText, prompt } = props;

  const navigate = useNavigate();
  const notiComponent = NotiStackComponent();

  const clientId =
    '242716011984-oordacustqqj5b3erur8en7b0vdo4q3k.apps.googleusercontent.com';



  const onSuccess = (res) => {
    const googleIdToken = res.tokenId;
    localStorage.setItem('userName', res.profileObj.name);
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
    <GoogleLogin
      clientId={clientId}
      buttonText={buttonText}
      onSuccess={onSuccess}
      onFailure={onFailure}
      prompt={prompt}
    />
  );
};

export default GoogleLoginBtn;
