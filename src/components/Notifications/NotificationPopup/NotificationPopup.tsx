import { Panel, Title, Menu, Footer, FooterLink } from './styles';
import NotificationPreview from '../NotificationPreview/NotificationPreview';
import React from 'react';

export default function NotificationPopup({ op }: any) {
  return (
    <Panel
      ref={op}
      breakpoints={{ '960px': '75vw', '640px': '100vw' }}
      style={{ width: '450px', marginTop: '25px' }}
      dismissable>
      <div>
        <Title>Notifications</Title>
        <Menu>
          <div>Home</div>
        </Menu>
        <div>
          <NotificationPreview
            image="quester"
            title="Welcome to the Quester Beta"
            date="June 3rd, 2022"
            itemId="0"
          />
        </div>
        <Footer>
          <FooterLink
            onClick={() => {
              window.open('https://trello.com/b/QS3QzNcx/quester-product-roadmap');
            }}>
            Roadmap
          </FooterLink>
          <FooterLink
            onClick={() => {
              window.open('https://www.app.quester.tech/changelog');
            }}>
            Changelog
          </FooterLink>
        </Footer>
      </div>
    </Panel>
  );
}
