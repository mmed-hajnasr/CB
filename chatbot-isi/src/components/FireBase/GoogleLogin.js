// GoogleLogin.js
import React from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function GoogleLogin() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('User:', user);
      // Redirect to another page after successful login
      navigate('/home');
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default GoogleLogin;
