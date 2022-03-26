import React, { useEffect, useState } from "react";
import { useEntryFeedStore } from "@app/stores/entryFeedStore";
import Note from "../Notes/Note/Note";
import { supabase } from "@app/supabase";
import Task from "../Tasks/Task/Task";
import { Container } from "./style";

export default function FeedView({ connectedId }: any) {
  const getEntries = useEntryFeedStore((state: any) => state.getEntries);
  const entries = useEntryFeedStore((state: any) => state.entries);
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    const tempFilteredArticles = entries.filter(
      (entry: any) => entry.completed_date === null
    );
    setFilteredEntries(tempFilteredArticles);
  }, [entries]);

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
    <Container>
      {entries && (
        <>
          {filteredEntries.map((entry) => (
            <div key={entry.id}>
              {/* @ts-ignore */}
              {entry.category === "note" ? (
                //  @ts-ignore
                <Note entry={entry} key={entry.id} />
              ) : (
                //  @ts-ignore
                <Task entry={entry} key={entry.id} />
              )}
            </div>
          ))}
        </>
      )}
    </Container>
  );
}
