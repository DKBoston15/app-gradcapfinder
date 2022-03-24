import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import Avvvatars from "avvvatars-react";
import { FileUploadIconSmall, MainContainer } from "./styles";
import { useProfileStore } from "@app/stores/profileStore";
import AvatarIcon from "../Avatar/AvatarIcon";

export default function Avatar() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const user = supabase.auth.user();
  const updateAvatar = useProfileStore((state: any) => state.updateAvatar);

  async function update(avatar_url: any) {
    await updateAvatar(user?.id, avatar_url);
  }

  async function uploadAvatar(event: any) {
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

      update(filePath);
    } catch (error) {
      // @ts-ignore
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <MainContainer>
      <AvatarIcon />
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
    </MainContainer>
  );
}
