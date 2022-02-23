import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/client";
import { RiFileUploadLine } from "react-icons/ri";

// @ts-ignore
export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showUploadButton, setShowUploadButton] = useState(false);

  useEffect(() => {
    if (url) {
      downloadImage(url);
      setShowUploadButton(false);
    } else {
      setShowUploadButton(true);
    }
  }, [url]);
  // @ts-ignore
  async function downloadImage(path) {
    try {
      const { data, error } = await supabaseClient.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      // @ts-ignore
      const url = URL.createObjectURL(data);
      // @ts-ignore
      setAvatarUrl(url);
    } catch (error) {
      // @ts-ignore
      console.log("Error downloading image: ", error.message);
    }
  }

  // @ts-ignore
  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabaseClient.storage
        .from("avatars")
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

  return (
    <div>
      {avatarUrl ? (
        <img
          //@ts-ignore
          src={avatarUrl}
          alt="Avatar"
          className="inline object-cover w-48 h-48 mr-2 rounded-full"
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
      {showUploadButton && (
        <div
          style={{ width: size }}
          className="flex justify-center flex-col text-center"
        >
          <label
            className="button primary block cursor-pointer hover:transform hover:scale-105"
            htmlFor="avatar"
          >
            <span className="text-6xl bg-slateGray rounded-full flex justify-center items-center text-white w-36 h-36">
              <RiFileUploadLine />
            </span>
          </label>
          <input
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            type="file"
            id="avatar"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      )}
      {!showUploadButton && (
        <div className="flex justify-center flex-col text-center mb-8 items-center">
          <label
            className="button primary block cursor-pointer hover:transform hover:scale-105 pt-4"
            htmlFor="avatar"
          >
            <span className="whitespace-nowrap text-lg">
              Change Profile Picture
            </span>
          </label>
          <input
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            type="file"
            id="avatar"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
}
