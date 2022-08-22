import React, { useEffect, useState, useRef } from 'react';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import Note from '../Notes/Note/Note';
import { supabase } from '@app/supabase';
import { Container } from './style';
import { Toast } from 'primereact/toast';
import { useParams } from 'react-router-dom';

export default function FeedView({ connectedId }: any) {
  const toast = useRef(null);
  const [loading, setLoading] = useState(true);
  const feed_entries = useEntryFeedStore((state: any) => state.feed_entries);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    let tempFilteredEntries = feed_entries.filter((entry: any) => entry.project_id == projectId);
    tempFilteredEntries = tempFilteredEntries.filter(
      (entry: any) => entry.connected_id == connectedId,
    );
    tempFilteredEntries = tempFilteredEntries.sort((a, b) =>
      a.created_at > b.created_at ? -1 : 1,
    );
    setFilteredEntries(tempFilteredEntries);
    setLoading(false);
  }, [connectedId, feed_entries]);

  return (
    <>
      <Toast ref={toast} />
      {!loading && (
        <Container
          className="literatureFeedView"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}>
          {feed_entries && (
            <>
              {filteredEntries.map((entry) => (
                <div key={entry.id}>
                  {/* @ts-ignore */}
                  {entry.category === 'note' && <Note entry={entry} key={entry.id} />}
                </div>
              ))}
            </>
          )}
        </Container>
      )}
    </>
  );
}
