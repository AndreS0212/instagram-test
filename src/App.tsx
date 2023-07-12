import { useEffect, useState } from 'react';
import axios from 'axios';

const CLIENT_ID: number = 302527272340249;
const REDIRECT_URI: string = 'https://andres0212.github.io/instagram-test/';

type user = {
  id: string;
  username: string;
};
const InstagramAuth = () => {
  const [accessToken, setAccessToken] = useState('');
  const [userData, setUserData] = useState<user>({
    id: '',
    username: ''
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code')?.slice(0, -2);

    if (code) {
      handleAuthorizationCode(code);
    }
  }, []);

  const handleAuthorizationCode = async (code: string) => {
    console.log(code)
    const headers = {
      'ngrok-skip-browser-warning': true
    }
    try {
      const response = await axios.post('http://localhost:3000/instagram/access-token/', {
        code
      }, { headers });
      console.log(response.data)
      const { access_token } = response.data;
      setAccessToken(access_token);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGetUserData = async () => {
    try {
      const response = await axios.get(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
      setUserData(response.data);
      console.log(userData)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInstagramAuth = () => {
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  };

  return (
    <div>
      <h1>Instagram Authentication</h1>
      {accessToken ? (
        <div>
          <p>Access Token: {accessToken}</p>
          <button onClick={handleGetUserData}>Get User Data</button>
        </div>
      ) : (
        <button onClick={handleInstagramAuth}>Authenticate with Instagram</button>
      )}
      <div>
        {userData && (
          <div>
            <p>User ID: {userData.id}</p>
            <p>Username: {userData.username}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramAuth;