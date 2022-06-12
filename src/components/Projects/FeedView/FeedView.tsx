import React, { useEffect, useState, useRef } from 'react';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import Note from '../Notes/Note/Note';
import { supabase } from '@app/supabase';
import Task from '../Tasks/Task/Task';
import { Container } from './style';
import { Toast } from 'primereact/toast';

export default function FeedView({ connectedId }: any) {
  const toast = useRef(null);
  const [loading, setLoading] = useState(true);
  const getEntries = useEntryFeedStore((state: any) => state.getEntries);
  const entries = useEntryFeedStore((state: any) => state.entries);
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    const tempFilteredLiterature = entries.filter((entry: any) => entry.completed_date === null);
    setFilteredEntries(tempFilteredLiterature);
    setLoading(false);
  }, [entries]);

  useEffect(() => {
    const getData = async () => {
      await getEntries(connectedId);
    };
    getData();
  }, [connectedId]);

  useEffect(() => {
    const realtimeProfileUpdates = supabase
      .from('feed_entries')
      .on('*', (payload) => {
        getEntries(connectedId);
      })
      .subscribe();
  }, []);

  const toastNotification = (type: string) => {
    if (type === 'completion') {
      toast.current.show({
        severity: 'success',
        summary: 'Task Completed',
        detail: '',
        life: 3000,
      });
    }
    if (type === 'deletion') {
      toast.current.show({
        severity: 'error',
        summary: 'Task Deleted',
        detail: '',
        life: 3000,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      {!loading && (
        <Container
          className="literatureFeedView"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}>
          {entries && (
            <>
              {filteredEntries.map((entry) => (
                <div key={entry.id}>
                  {/* @ts-ignore */}
                  {entry.category === 'note' ? (
                    //  @ts-ignore
                    <Note entry={entry} key={entry.id} />
                  ) : (
                    //  @ts-ignore
                    <Task
                      entry={entry}
                      key={entry.id}
                      editable={true}
                      link={false}
                      selectedProject={null}
                      toastNotification={toastNotification}
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </Container>
      )}
    </>
  );
}
