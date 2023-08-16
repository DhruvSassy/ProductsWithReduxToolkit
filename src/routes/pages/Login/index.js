import React from 'react';

import GoogleLoginBtn from '../../../components/GoogleLoginBtn';

import './index.css';

const Login = ({ onTokenReceived }) => {
 

  return (
    <div className="center-container">
      <button className="google-button">
        <GoogleLoginBtn
          buttonText="Login With Google"
          prompt={'select_account'} 
        />
      </button>
    </div>
  );
};

export default Login;
