import React, { useEffect } from "react";
import { useEntryFeedStore } from "@app/stores/entryFeedStore";
import Note from "../Notes/Note/Note";

export default function FeedView({ connectedId }: any) {
  const getEntries = useEntryFeedStore((state: any) => state.getEntries);
  const entries = useEntryFeedStore((state: any) => state.entries);
  useEffect(() => {
    const getData = async () => {
      await getEntries(connectedId);
    };
    getData();
  }, []);

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
