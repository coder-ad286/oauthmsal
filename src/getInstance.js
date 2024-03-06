import { Configuration } from 'msal';

const msalConfig = {
    auth: {
        clientId: 'a8fbe2db-a903-4ca6-adeb-37702646e1ee',
        authority: 'https://login.microsoftonline.com/b2c53a8b-ac58-47ad-9335-28f1af7a2988',
        redirectUri: 'http://localhost:8000/auth/callback/',
    },
};
const msalInstance = new Configuration(msalConfig);

export default msalInstance;