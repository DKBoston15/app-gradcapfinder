import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { supabaseClient } from "../../lib/client";
import { useTheme } from "next-themes";

export default function Settings() {
  const [soundEffects, setSoundEffects] = useState(false);
  const user = supabaseClient.auth.user();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    async function getProfile() {
      try {
        let { data, error, status } = await supabaseClient
          .from("profiles")
          .select(`sound_effects`)
          .eq("id", user?.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setSoundEffects(data.sound_effects);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getProfile();
  }, [user]);

  return (
    <div className="w-full p-12 flex flex-col h-max-h-6xl">
      <h1 className="h-12 text-2xl font-semibold ml-4">Settings</h1>
      <hr className="my-4 mb-8 ml-4" />
      <div>
        <label className="flex items-center ml-4 mb-4">
          <span className="mr-6">Dark Mode (Work In Progress)</span>
          {/* @ts-ignore */}
          <Switch
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            onColor="#ee803c"
            checked={theme === "dark"}
            uncheckedIcon={false}
          />
        </label>
        <label className="flex items-center ml-4">
          <span className="mr-6">Sound Effects</span>
          <Switch
            onChange={() => setSoundEffects(!soundEffects)}
            checked={soundEffects}
            uncheckedIcon={false}
            onColor="#ee803c"
          />
        </label>
      </div>
    </div>
  );
}
