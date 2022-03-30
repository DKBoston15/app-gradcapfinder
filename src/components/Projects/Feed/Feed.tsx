import { useState } from "react";
import { TabPanel } from "primereact/tabview";
import FeedView from "../FeedView/FeedView";
import ActivityView from "../ActivityView/ActivityView";
import { Container, Header, CustomTabView, HeaderTitle } from "./styles";
import NoteEditor from "../Notes/NoteEditor/NoteEditor";
import { AnimatePresence } from "framer-motion";
import PeopleView from "../PeopleView/PeopleView";
import JournalView from "../JournalView/JournalView";
import KeyTermView from "../KeyTermView/KeyTermView";

export default function Feed(props: any) {
  const [activeView, setActiveView] = useState(0);

  return (
    <AnimatePresence>
      <Container
        id="feed"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
      >
        {props.selectedItem && (
          <>
            <Header>
              <HeaderTitle>{props.selectedItem.title}</HeaderTitle>
              {props.children}
            </Header>
            <CustomTabView
              activeIndex={activeView}
              onTabChange={(e) => setActiveView(e.index)}
            >
              <TabPanel header="Details">
                <NoteEditor connectedId={props.selectedItem.id} />
                <FeedView connectedId={props.selectedItem.id} />
              </TabPanel>
              <TabPanel header="Activity">
                <ActivityView />
              </TabPanel>
              <TabPanel header="People">
                <PeopleView />
              </TabPanel>
              <TabPanel header="Journals">
                <JournalView connectedId={props.selectedItem.id} />
              </TabPanel>
              <TabPanel header="Key Terms">
                <KeyTermView />
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
