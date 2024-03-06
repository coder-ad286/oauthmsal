import React, { useEffect, useState, useRef } from 'react';
import { PublicClientApplication, EventType } from '@azure/msal-browser';

const config = {
  auth: {
    clientId: 'a8fbe2db-a903-4ca6-adeb-37702646e1ee',
    authority: 'https://login.microsoftonline.com/b2c53a8b-ac58-47ad-9335-28f1af7a2988',
    redirectUri: 'http://localhost:8000/auth/callback/',
},
};

const App = () => {
  const [accessToken, setAccessToken] = useState('');
  const msalInstanceRef = useRef(null);

  useEffect(() => {
    const initializeMsal = async () => {
      const instance = new PublicClientApplication(config);
      msalInstanceRef.current = instance;
    };

    initializeMsal();
  }, []);

  useEffect(() => {
    const handleRedirect = async () => {
      if (!msalInstanceRef.current) return;

      const response = await msalInstanceRef.current.handleRedirectPromise();
      if (response !== null) {
        setAccessToken(response.accessToken);
      }
    };

    handleRedirect();
  }, []);

  const login = async () => {
    if (!msalInstanceRef.current) return;

    await msalInstanceRef.current.loginPopup({
      scopes: ['user.read']
    });
  };

  const logout = async () => {
    if (!msalInstanceRef.current) return;

    await msalInstanceRef.current.logout();
    setAccessToken('');
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <p>Access Token: {accessToken}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};

export default App;
