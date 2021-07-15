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
        <div className="font-poppins text-background font-bold text-center mt-16 lg:mt-28 lg:ml-16 lg:text-left">
          <h3 className="text-3xl lg:text-4xl">Login</h3>
          <h6 className="text-sm mt-2">
            Take the next step towards graduation
          </h6>
        </div>
        <div className="flex justify-center lg:w-96 lg:ml-16 mt-10 rounded-full border border-gray-300 p-2 pr-4 pl-4 hover:bg-gray-100 ">
          <img src="/search.svg" className="w-8" />
          <button
            onClick={() => signInWithGoogle()}
            className="ml-8 text-background font-medium"
          >
            Sign In With Google
          </button>
        </div>
        <div className="lg:ml-16 mt-10">
          <div className="text-background font-semibold">
            <p>Or sign in with email</p>
          </div>
        </div>
        <div className="lg:ml-16 lg:w-96 w-60">
          <form className="flex flex-col h-10 mt-6">
            <label
              htmlFor="email"
              className="text-background font-semibold mb-1"
            >
              Email
            </label>
            <input
              className="rounded-lg border-2 p-2"
              type="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label
              htmlFor="password"
              className="text-background font-semibold mt-5 mb-1"
            >
              Password
            </label>
            <input
              className="rounded-lg border-2 p-2"
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <h6
              onClick={() => resetPassword()}
              className="text-background font-semibold mt-5 text-center lg:text-right"
            >
              Forgot Password?
            </h6>
            <button
              onClick={() => signInWithEmailPassword()}
              className="mt-5 bg-primary text-secondary rounded-lg p-2 text-xl hover:bg-orangeHover"
            >
              Login
            </button>
            <h6 className="text-background font-semibold mt-3 text-center lg:text-left">
              New User? <span className="text-primary">Get an Invite</span>
            </h6>
          </form>
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
  );
}

export default Auth;
