import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    // try{
    //   const resultsFromGoogle = await signInWithPopup(auth, provider);
  
    
    //   const res = await fetch(
    //     '/api/auth/google',{
    //       method: 'POST',
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body:JSON.stringify({
    //         name: resultsFromGoogle.user.displayName,
    //         email: resultsFromGoogle.user.email,
    //         googlePhotoUrl: resultsFromGoogle.user.photoURL,

    //       })
    //     })
    //     const data =await res.json()
    //     if(res.ok){
    //     dispatch(signInSuccess(data));
    //     navigate("/");
    //   }
    // } catch (error) {
    //   console.log( error);
    // }

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
  
      // Make POST request using axios
      const res = await axios.post('/api/auth/google', {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = res.data;
      if (res.status === 200) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}

export default OAuth;
