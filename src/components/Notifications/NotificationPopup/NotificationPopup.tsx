import { Panel, Container, Title, Menu, MenuItem, NotificationContainer, Footer } from './styles';
import NotificationPreview from '../NotificationPreview/NotificationPreview';
import React from 'react';
import { Button } from 'primereact/button';

export default function NotificationPopup({ op }: any) {
  return (
    <Panel
      ref={op}
      breakpoints={{ '960px': '75vw', '640px': '100vw' }}
      style={{ width: '450px', marginTop: '25px' }}
      dismissable>
      <Container>
        <Title>Notifications</Title>
        <Menu>
          <MenuItem>Home</MenuItem>
        </Menu>
        <NotificationContainer>
          <NotificationPreview
            image="quester"
            title="Welcome to the Quester Beta"
            date="June 3rd, 2022"
            itemId="0"
          />
        </NotificationContainer>
        <Footer>
          <Button
            onClick={() => {
              window.location.replace('https://trello.com/b/QS3QzNcx/quester-product-roadmap');
            }}>
            Roadmap
          </Button>
        </Footer>
      </Container>
    </Panel>
  );
}
