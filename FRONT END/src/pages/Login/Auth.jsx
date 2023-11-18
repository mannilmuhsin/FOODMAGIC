import React from "react";
import GoogleLogin from "react-google-login";

const GoogleAuthComponent = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // Handle the response, e.g., send it to your server for authentication
  };

  return (
    <div>
      <h2>Google Authentication Example</h2>
      <GoogleLogin
        clientId="214487133939-2h1bromcqlvgkvc4pt0gp56jpoq42f0u.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleAuthComponent;
