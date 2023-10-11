import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';

const Nav = () => {
  const handleLogout = () => {
    googleLogout(); // Call the googleLogout function to log the user out
  };

//   [login, setLogin] = useState(true);


  return (
    <div className="overflow-hidden">
      <GoogleOAuthProvider clientId="383203663369-kje962erslia179i82nii7hvvhagtncq.apps.googleusercontent.com">
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-white text-2xl font-bold">Mood Karma</h1>
          </div>
          <div className="flex space-x-4">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log('Login Success:', credentialResponse);
                // You can handle the success callback here
              }}
              onError={() => {
                console.log('Login Failed');
                // Handle login failure here
              }}
            />
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={handleLogout} // Call the handleLogout function
            >
              Logout
            </button>
          </div>
        </nav>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Nav;
