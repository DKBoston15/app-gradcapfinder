import { useRouter } from "next/router";
import { useState } from "react";
import { supabaseClient } from "../lib/client";

export default function PasswordRecoveryPage(props: any) {
  const [state, setState] = useState<"default" | "resetting">("default");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const router = useRouter();

  console.log(props.router);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      console.log("passwords do not match");
      return;
    }
    setState("resetting");
    const { error } = await supabaseClient.auth.update({ password });
    router.push("/sign-in");
  };

  return (
    <div className="flex flex-col w-md">
      <label htmlFor="email" className="text-background font-semibold mb-1">
        Enter Your Password
      </label>
      <input
        className="rounded-lg border-2 p-2"
        type="password"
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <label htmlFor="email" className="text-background font-semibold mb-1">
        Enter Your Password Again
      </label>
      <input
        className="rounded-lg border-2 p-2"
        type="password"
        id="password-2"
        onChange={(e) => {
          setPasswordRepeat(e.target.value);
        }}
      />
      <button
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
        className="mt-5 bg-primary text-secondary rounded-lg p-2 text-xl hover:bg-orangeHover"
      >
        Reset Password
      </button>
    </div>
  );
}
