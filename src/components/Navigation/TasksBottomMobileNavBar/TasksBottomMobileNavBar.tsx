import React, { useEffect, useState } from 'react';
import { Container, CustomTabMenu, CustomSidebar } from './styles';
import { useLocation, useNavigate } from 'react-router-dom';
import ViewsList from './ViewsList/ViewsList';

const tasksItems = [
  { label: 'Overview', icon: 'pi pi-fw pi-home' },
  { label: 'Views', icon: 'pi pi-fw pi-calendar' },
  { label: 'Personal', icon: 'pi pi-fw pi-calendar' },
];

export default function MobileBottomNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState(tasksItems);
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState();

  const tabChange = (e: any) => {
    setSelectedMenu(e.value.label);
    if (e.value.label === 'Overview') {
      navigate('/tasks/overview');
    }
    if (e.value.label === 'Personal') {
      navigate('/tasks/personal');
    }
    if (e.value.label === 'Views') {
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
        {selectedMenu === 'Views' && <ViewsList setVisibleBottom={setVisibleBottom} />}
      </CustomSidebar>
      {selectedItems && <CustomTabMenu model={selectedItems} onTabChange={(e) => tabChange(e)} />}
    </Container>
  );
}
