import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import { useRouter } from "next/router";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signInWithGoogle = async () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithRedirect(provider)
      .catch((e) => {
        console.log(e);
      });
  };
  const signInWithEmailPassword = async () => {
    console.log(email);
    console.log(password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        router.push("/");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };
  const resetPassword = async () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("Password reset email sent!");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };
  useEffect(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        console.log(result);
        if (result.user !== null) {
          router.push("/");
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        console.log(errorCode, errorMessage);
        // ...
      });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex min-h-screen flex-col items-center lg:items-start">
        <img
          src="/logo.svg"
          alt="gradcapfinder logo"
          className="h-12 lg:h-20 mt-10 lg:mt-32 lg:ml-16"
        />
        <div className="font-poppins text-background font-bold text-center mt-16 lg:ml-16 lg:text-left">
          <h3 className="text-3xl lg:text-4xl">Login</h3>
          <h6 className="text-sm mt-2">
            Take the next step towards graduation
          </h6>
        </div>
        <div className="flex justify-center lg:w-96 lg:ml-16 mt-10 rounded-full border border-gray-300 p-2 pr-4 pl-4 hover:bg-gray-100 ">
          <img src="/search.svg" className="w-8" />
          <button className="ml-8 text-background font-medium">
            Sign In With Google
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:ml-16 mt-10">
          <div className="hidden lg:block">
            <hr className="mt-3" />
          </div>
          <div className="text-background">
            <p>Or sign in with email</p>
          </div>
          <div className="hidden lg:block">
            <hr className="mt-3" />
          </div>
        </div>
      </div>
      <div className="bg-background min-h-screen hidden lg:flex">
        <img
          src="/login-banner.svg"
          alt="login-banner"
          className="min-h-screen"
        />
      </div>
    </div>

    // <div
    //   style={{
    //     maxWidth: "320px",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   <form>
    //     <input
    //       type="email"
    //       onChange={(e) => {
    //         setEmail(e.target.value);
    //       }}
    //     />
    //     <input
    //       type="password"
    //       onChange={(e) => {
    //         setPassword(e.target.value);
    //       }}
    //     />
    //   </form>
    //   <button onClick={() => signInWithGoogle()}>Login With Google</button>
    //   <button onClick={() => signInWithEmailPassword()}>Login</button>
    //   <button onClick={() => resetPassword()}>Reset Password</button>
    // </div>
  );
}

export default Auth;
