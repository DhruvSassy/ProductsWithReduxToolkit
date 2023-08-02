import React from 'react';
import './index.css'

const Error404 = () => {
  return (
    <html className='headOfPage'>
      <body className='bodyOfPage'>
    <div className="section">
    <h1 className="error">404</h1>
    <div className="page">Ooops!!! The page you are looking for is not found</div>
    <a className="back-home" href="/">Back to home</a>
  </div>
  </body>
  </html>
  )
}

export default Error404