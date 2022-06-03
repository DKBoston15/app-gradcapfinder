import React, { useRef, useEffect, useState } from 'react';
import { Container, IconContainer } from './styles';
import { Badge } from 'primereact/badge';
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import { supabase } from '@app/supabase/index';

export default function Notifications() {
  const op = useRef(null);
  const user = supabase.auth.user();
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user?.id)
      .eq('read', false)
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          setNotifications(data);
        }
      });
  };

  useEffect(() => {
    getNotifications();
    const realtimeNotificationUpdates = supabase
      .from('notifications')
      .on('*', (payload) => {
        getNotifications();
      })
      .subscribe();
  }, []);

  return (
    <>
      <Container>
        <div onClick={(e) => op.current.toggle(e)}>
          <IconContainer>
            <i className="pi pi-bell" p-overlay-badge style={{ fontSize: '1.5em' }}>
              {notifications.length > 0 && <Badge severity="danger"></Badge>}
            </i>
          </IconContainer>
        </div>
      </Container>
      <NotificationPopup op={op} />
    </>
  );
}
