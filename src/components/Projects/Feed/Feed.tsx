import { useState } from "react";
import SplitAddArticleButton from "../Articles/SplitAddArticleButton/SplitAddArticleButton";
import { TabPanel } from "primereact/tabview";
import FeedView from "../FeedView/FeedView";
import ActivityView from "../ActivityView/ActivityView";
import { Container, Header, CustomTabView, HeaderTitle } from "./styles";
import NoteEditor from "../Notes/NoteEditor/NoteEditor";
import { AnimatePresence } from "framer-motion";

export default function Feed({ selectedItem, header }: any) {
  const [activeView, setActiveView] = useState(0);

  return (
    <AnimatePresence>
      <Container
        id="feed"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
      >
        {selectedItem && (
          <>
            <Header>
              <HeaderTitle>{selectedItem.title}</HeaderTitle>
              <SplitAddArticleButton selectedArticle={selectedItem} />
            </Header>
            <CustomTabView
              activeIndex={activeView}
              onTabChange={(e) => setActiveView(e.index)}
            >
              <TabPanel header="Details">
                <NoteEditor connectedId={selectedItem.id} />
                <FeedView connectedId={selectedItem.id} />
              </TabPanel>
              <TabPanel header="Activity">
                <ActivityView />
              </TabPanel>
            </CustomTabView>
          </>
        )}
        {!selectedItem && (
          <Header>
            <HeaderTitle>{header}</HeaderTitle>
            <SplitAddArticleButton selectedArticle={selectedItem} />
          </Header>
        )}
      </Container>
    </AnimatePresence>
  );
}
