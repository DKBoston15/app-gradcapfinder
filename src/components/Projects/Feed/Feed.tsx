import React, { useState } from 'react';
import { TabPanel } from 'primereact/tabview';
import FeedView from '../FeedView/FeedView';
import { Container, Header, CustomTabView, HeaderTitle } from './styles';
import NoteEditor from '../Notes/NoteEditor/NoteEditor';
import { AnimatePresence } from 'framer-motion';
import PeopleView from '../PeopleView/PeopleView';
import JournalView from '../JournalView/JournalView';
import KeyTermView from '../KeyTermView/KeyTermView';

export default function Feed(props: any) {
  const [activeView, setActiveView] = useState(0);
  return (
    <AnimatePresence>
      <Container
        id="feed"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}>
        {props.selectedItem && (
          <>
            <Header>
              <HeaderTitle>
                {props.selectedItem.first_name
                  ? `${props.selectedItem.first_name} ${
                      props.selectedItem.last_name != null ? props.selectedItem.last_name : ''
                    }`
                  : props.selectedItem.title
                  ? props.selectedItem.title
                  : props.selectedItem.name}
              </HeaderTitle>
              {props.children}
            </Header>
            <CustomTabView activeIndex={activeView} onTabChange={(e) => setActiveView(e.index)}>
              <TabPanel header="Details">
                <NoteEditor connectedId={props.selectedItem.id} personal={false} />
                <FeedView connectedId={props.selectedItem.id} />
              </TabPanel>
              <TabPanel header="People">
                <PeopleView connectedId={props.selectedItem.id} />
              </TabPanel>
              <TabPanel header="Journals">
                <JournalView connectedId={props.selectedItem.id} />
              </TabPanel>
              <TabPanel header="Key Terms">
                <KeyTermView connectedId={props.selectedItem.id} />
              </TabPanel>
            </CustomTabView>
          </>
        )}
        {!props.selectedItem && (
          <Header>
            <HeaderTitle>{props.header}</HeaderTitle>
            {props.children}
          </Header>
        )}
      </Container>
    </AnimatePresence>
  );
}
