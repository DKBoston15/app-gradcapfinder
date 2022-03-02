import React from "react";
import { supabaseClient } from "../../lib/client";

export default function ServiceOffering({ icon, text, link }: any) {
  const bookBuyLink =
    "https://www.amazon.com/Graduate-School-Marathon-Dane-Bozeman-ebook/dp/B08FZ1GBJG";

  async function openBook() {
    const { signedURL, error } = await supabaseClient.storage
      .from("book")
      .createSignedUrl("book.pdf", 60);
    // @ts-ignore
    window.open(signedURL, "_blank");
  }

  return (
    <div className="dark:bg-darkSlateGray bg-keyTermBlue px-6 pt-2 h-48 w-96 rounded-lg">
      <div className="flex justify-between items-center">
        {icon === "grad" && <img className="w-18" src="/graduation-hat.png" />}
        {icon === "studying" && (
          <img
            className={`w-16 ${icon === "studying" ? "mt-4" : ""}`}
            src="/studying.png"
          />
        )}
        {icon === "book" && (
          <img
            className={`w-32 ${icon === "book" ? "mt-4" : ""}`}
            src="/book-cover.png"
          />
        )}
        {icon === "book" && (
          <div>
            <button
              className={`font-bold text-white rounded-lg py-2 px-4 my-1 mr-1 h-10 text-md cursor-pointer bg-green dark:bg-primary hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
              onClick={() => window.open(bookBuyLink, "_blank")}
            >
              Buy
            </button>

            <button
              className={`font-bold text-white rounded-lg py-2 px-4 my-1 mr-1 h-10 text-md cursor-pointer bg-primary dark:bg-primary hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
              onClick={() => openBook()}
            >
              Download
            </button>
          </div>
        )}
        {icon != "book" && (
          <button
            className={`${
              icon === "studying" ? "mt-6" : ""
            } font-bold text-white rounded-lg py-2 px-4 my-1 mr-1 h-10 text-md cursor-pointer bg-primary dark:bg-primary hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
            onClick={() => window.open(link, "_blank")}
          >
            Join
          </button>
        )}
      </div>
      <div
        className={`text-lg ${icon === "studying" ? "mt-6" : ""} ${
          icon === "grad" ? "mt-4" : ""
        }`}
      >
        {text}
      </div>
    </div>
  );
}
