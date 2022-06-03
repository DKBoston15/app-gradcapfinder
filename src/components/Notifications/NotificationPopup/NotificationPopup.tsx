import { Panel, Container, Title, Menu, MenuItem, NotificationContainer } from './styles';
import NotificationPreview from '../NotificationPreview/NotificationPreview';

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
      </Container>
    </Panel>
  );
}
