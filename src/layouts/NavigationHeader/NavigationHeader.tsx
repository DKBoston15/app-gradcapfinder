import React from 'react';
import {
  Container,
  PageTitle,
  SearchBar,
  QuickAddTask,
  Profile,
  RightSide,
  CustomInputText,
  NotificationBell,
  LeftSide,
  TabMenuContainer,
  SectionTitle,
  IconContainer,
  IconItem,
} from './styles';
import { useKBar } from 'kbar';
import './styles.css';
import AvatarIcon from '@app/components/Profile/Avatar/AvatarIcon';
import { TabMenu } from 'primereact/tabmenu';
import { useGeneralStore } from '@app/stores/generalStore';

export default function NavigationHeader({ title, subTitle, items }: any) {
  const activeIndex = useGeneralStore((state: any) => state.activeIndex);
  const setActiveIndex = useGeneralStore((state: any) => state.setActiveIndex);
  const setNavVisible = useGeneralStore((state: any) => state.setNavVisible);
  const navVisible = useGeneralStore((state: any) => state.navVisible);

  const { query } = useKBar();
  return (
    <Container>
      <LeftSide>
        <IconContainer>
          {!navVisible && <IconItem className="pi pi-bars" onClick={() => setNavVisible(true)} />}
        </IconContainer>

        <PageTitle>{title}</PageTitle>
        <TabMenuContainer>
          <SectionTitle>{subTitle}</SectionTitle>
          <TabMenu
            id="headerNavMenu"
            className="headerNavMenu"
            model={items}
            activeIndex={activeIndex}
            onTabChange={(e) => {
              setActiveIndex(e.index);
            }}
          />
        </TabMenuContainer>
      </LeftSide>
      <RightSide>
        <SearchBar onClick={() => query.toggle()}>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <CustomInputText disabled placeholder="Search" id="disabledSearchInput" />
          </span>
        </SearchBar>
        <QuickAddTask>
          <i
            className="pi pi-plus"
            style={{ fontSize: '0.8em', color: 'white', fontWeight: 'bold' }}
          />
        </QuickAddTask>
        <NotificationBell>
          <i className="pi pi-bell" style={{ fontSize: '1.4rem', marginTop: '0.05rem' }} />
        </NotificationBell>
        <Profile>
          <AvatarIcon size="small" />
        </Profile>
      </RightSide>
    </Container>
  );
}
