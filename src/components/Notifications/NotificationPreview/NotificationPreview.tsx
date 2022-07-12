import React, { useState, useEffect } from 'react';
import NotificationDialog from '../NotificationDialog/NotificationDialog';
import { Container, ImageContainer, TextContainer, Title, Date, CustomBadge } from './styles';
import { supabase } from '@app/supabase/index';

export default function NotificationPreview({ image, title, date, itemId }: any) {
  const [display, setDisplay] = useState(false);
  const [notification, setNotification] = useState();
  const [read, setRead] = useState(false);
  const user = supabase.auth.user();

  const getNotifications = async () => {
    await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user?.id)
      .eq('read', false)
      .eq('itemId', itemId)
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          if (data[0]) {
            setNotification(data[0]);
            if (data[0].read) {
              setRead(true);
            }
          }
        }
      });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const handleClick = async () => {
    setDisplay(true);
    await supabase
      .from('notifications')
      .update({
        read: true,
      })
      .eq('itemId', itemId);
    setRead(true);
  };

  return (
    <>
      <NotificationDialog display={display} setDisplay={setDisplay} itemId={itemId} title={title} />
      <Container onClick={() => handleClick()}>
        <ImageContainer>
          {image === 'quester' && <img src="/nav_logo_dark.png" width="100%" height="100%" />}
        </ImageContainer>
        <div>
          <Title>{title}</Title>
          <Date>{date}</Date>
        </div>
        {notification && <>{!read && <CustomBadge severity="danger" />}</>}
      </Container>
    </>
  );
}
