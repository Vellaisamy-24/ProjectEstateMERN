import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { app } from "../Firebase";
import axios from "axios";
const OAuth = () => {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      console.log(result.user.email);
      console.log(result.user.displayName);
      console.log(result.user.photoURL);
      const response = await axios.post(
        "http://localhost:5000/api/user/googleLogin",
        {
          userName: result.user.displayName,
          email: result.user.email,
          profile: result.user.photoURL,
        }
      );
      console.log(response.data);
      console.log(response.data?.message);
      console.log(response.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={(e) => handleGoogleLogin(e)}>
        Continue With Google
      </button>
    </div>
  );
};
export default OAuth;
