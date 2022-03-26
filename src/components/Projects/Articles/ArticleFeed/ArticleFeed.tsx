import React, { useState, useEffect } from "react";
import SplitAddArticleButton from "../SplitAddArticleButton/SplitAddArticleButton";
import { TabView, TabPanel } from "primereact/tabview";
import FeedView from "../../FeedView/FeedView";
import ActivityView from "../../ActivityView/ActivityView";
import { Container, Header, CustomTabView, HeaderTitle } from "./styles";
import NoteEditor from "../../Notes/NoteEditor/NoteEditor";
import { AnimatePresence } from "framer-motion";
export default function ArticleFeed({ selectedArticle }: any) {
  const [activeView, setActiveView] = useState(0);

  return (
    <AnimatePresence>
      <Container
        id="feed"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
      >
        {selectedArticle && (
          <>
            <Header>
              <HeaderTitle>{selectedArticle.title}</HeaderTitle>
              <SplitAddArticleButton selectedArticle={selectedArticle} />
            </Header>
            <CustomTabView
              activeIndex={activeView}
              onTabChange={(e) => setActiveView(e.index)}
            >
              <TabPanel header="Details">
                <NoteEditor connectedId={selectedArticle.id} />
                <FeedView connectedId={selectedArticle.id} />
              </TabPanel>
              <TabPanel header="Activity">
                <ActivityView />
              </TabPanel>
            </CustomTabView>
          </>
        )}
        {!selectedArticle && (
          <Header>
            <HeaderTitle>Add an Article</HeaderTitle>
            <SplitAddArticleButton selectedArticle={selectedArticle} />
          </Header>
        )}
      </Container>
    </AnimatePresence>
  );
}
