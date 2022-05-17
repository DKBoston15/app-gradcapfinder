import React, { useState } from 'react';
import { Container, CustomTabMenu, CustomSidebar } from './styles';
import { useLocation, useNavigate } from 'react-router-dom';
import SectionsList from './SectionsList/SectionsList';

const tasksItems = [
  { label: 'Overview', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
];

export default function MobileBottomNavBar() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState(tasksItems);
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState();

  const tabChange = (e: any) => {
    setSelectedMenu(e.value.label);
    if (e.value.label === 'Overview') {
      navigate('/learn/overview');
    }
    if (e.value.label === 'Sections') {
      setVisibleBottom(true);
    }
  };

  return (
    <Container className="card">
      <CustomSidebar
        visible={visibleBottom}
        position="bottom"
        style={{ height: '100%' }}
        onHide={() => setVisibleBottom(false)}>
        {selectedMenu === 'Sections' && <SectionsList setVisibleBottom={setVisibleBottom} />}
      </CustomSidebar>
      {selectedItems && <CustomTabMenu model={selectedItems} onTabChange={(e) => tabChange(e)} />}
    </Container>
  );
}
