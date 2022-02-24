import React from "react";
import { supabaseClient } from "../../lib/client";
import Dropdown from "../Dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Resources({ setCurrentPage }: any) {
  const user = supabaseClient.auth.user();
  return (
    <>
      <div className="absolute right-4 top-4">
        <Dropdown setCurrentPage={setCurrentPage} user={user} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full p-12 flex flex-col justify-between h-max-h-6xl">
        Resources
      </div>
    </>
  );
}
