import { useEffect, useState } from "react";
import { supabaseClient } from "../lib/client";

// @ts-ignore
export default function CV({ url, size, onUpload }) {
  const [cvUrl, setCVUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showUploadButton, setShowUploadButton] = useState(false);

  useEffect(() => {
    if (url) {
      downloadCV(url);
      setShowUploadButton(false);
    } else {
      setShowUploadButton(true);
    }
  }, [url]);
  // @ts-ignore
  async function downloadCV(path) {
    try {
      const { signedURL, error } = await supabaseClient.storage
        .from("cvs")
        .createSignedUrl(url, 60);
      // @ts-ignore
      setCVUrl(signedURL);
    } catch (error) {
      // @ts-ignore
      console.log("Error downloading cv: ", error.message);
    }
  }

  // @ts-ignore
  async function uploadCV(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select a file to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabaseClient.storage
        .from("cvs")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
      setShowUploadButton(false);
    } catch (error) {
      // @ts-ignore
      alert(error.message);
    } finally {
      setUploading(false);
      setShowUploadButton(false);
    }
  }

  const openCV = async () => {
    const { signedURL, error } = await supabaseClient.storage
      .from("cvs")
      .createSignedUrl(url, 60);
    // @ts-ignore
    setCVUrl(signedURL);
    // @ts-ignore
    window.open(signedURL, "_blank");
  };

  return (
    <div className="flex justify-center items-center w-full space-x-12 p-8">
      {cvUrl && (
        <>
          <div
            className={`flex h-12 justify-center font-bold text-white rounded-xl py-2 px-6 text-md cursor-pointer bg-primary`}
          >
            <span
              onClick={() => openCV()}
              className="text-lg whitespace-nowrap"
            >
              View CV
            </span>
          </div>
        </>
      )}
      {showUploadButton && (
        <div
          style={{ width: size }}
          className="flex justify-center text-center"
        >
          <div
            className={`font-bold text-white rounded-xl py-2 px-6 text-md cursor-pointer bg-primary`}
          >
            <span className="whitespace-nowrap text-lg">Upload CV</span>
          </div>
          <input
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            type="file"
            id="cv"
            accept=".doc,.docx,.pdf"
            onChange={uploadCV}
            disabled={uploading}
          />
        </div>
      )}
      {!showUploadButton && (
        <div style={{ width: size }} className="">
          <label
            className="button primary cursor-pointer hover:transform hover:scale-105 pt-4"
            htmlFor="cv"
          >
            <div
              className={`flex h-12 justify-center font-bold text-white rounded-xl py-2 px-6 text-md cursor-pointer bg-primary`}
            >
              <span className="whitespace-nowrap text-lg">Update CV</span>
            </div>
          </label>
          <input
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            type="file"
            id="cv"
            accept=".doc,.docx,.pdf,.png,.jpg,.jpeg"
            onChange={uploadCV}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
}
