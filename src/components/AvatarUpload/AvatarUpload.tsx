import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import Avvvatars from "avvvatars-react";
import { FileUploadIconSmall, MainContainer } from "./styles";

// @ts-ignore
export default function Avatar({ url, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const user = supabase.auth.user();

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
      const { data, error } = await supabase.storage
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

      let { error: uploadError } = await supabase.storage
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
    <MainContainer>
      {avatarUrl && (
        <div>
          <Avatar image={avatarUrl} shape="square" size="large" />
          <div>
            <label htmlFor="avatar">
              <span>
                <FileUploadIconSmall className="pi pi-upload" />
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
        </div>
      )}
      {!avatarUrl && (
        <div>
          <Avvvatars value={user?.email} style="shape" size={44} />
          <div>
            <label htmlFor="avatar">
              <span>
                <FileUploadIconSmall className="pi pi-upload" />
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
        </div>
      )}
    </MainContainer>
  );
}
