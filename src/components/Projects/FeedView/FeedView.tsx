import React, { useEffect } from "react";
import { useEntryFeedStore } from "@app/stores/entryFeedStore";
import Note from "../Notes/Note/Note";
import { supabase } from "@app/supabase";

export default function FeedView({ connectedId }: any) {
  const getEntries = useEntryFeedStore((state: any) => state.getEntries);
  const entries = useEntryFeedStore((state: any) => state.entries);
  useEffect(() => {
    const getData = async () => {
      await getEntries(connectedId);
    };
    getData();
  }, [connectedId]);

  useEffect(() => {
    const realtimeProfileUpdates = supabase
      .from("feed_entries")
      .on("*", (payload) => {
        getEntries(connectedId);
      })
      .subscribe();
  }, [connectedId]);

  return (
    <div>
      {entries && (
        <>
          {entries.map((entry) => (
            <Note entry={entry} />
          ))}
        </>
      )}
    </div>
  );
}
