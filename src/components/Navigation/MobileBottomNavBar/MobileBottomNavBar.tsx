import React, { useEffect, useState } from 'react';
import { Container, CustomTabMenu, CustomSidebar } from './styles';
import { useLocation } from 'react-router-dom';
import ProjectsList from './ProjectsList/ProjectsList';
import SectionsList from './SectionsList/SectionsList';
import ItemsList from './ItemsList/ItemsList';

const literatureItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Literature', icon: 'pi pi-fw pi-calendar' },
];

const paradigmItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Paradigms', icon: 'pi pi-fw pi-calendar' },
];

const questionItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Questions', icon: 'pi pi-fw pi-calendar' },
];

const grantItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Grants', icon: 'pi pi-fw pi-calendar' },
];

const techniqueItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Techniques', icon: 'pi pi-fw pi-calendar' },
];

const designItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Designs', icon: 'pi pi-fw pi-calendar' },
];

const peopleItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'People', icon: 'pi pi-fw pi-calendar' },
];

const figureItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Figures', icon: 'pi pi-fw pi-calendar' },
];

const tableItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Tables', icon: 'pi pi-fw pi-calendar' },
];

const journalItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Journals', icon: 'pi pi-fw pi-calendar' },
];

const keytermItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Key Terms', icon: 'pi pi-fw pi-calendar' },
];

const labItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Labs', icon: 'pi pi-fw pi-calendar' },
];

const modelItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Models', icon: 'pi pi-fw pi-calendar' },
];

const samplingItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Sampling', icon: 'pi pi-fw pi-calendar' },
];

const overviewItems = [
  { label: 'Projects', icon: 'pi pi-fw pi-home' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
  { label: 'Sections', icon: 'pi pi-fw pi-calendar' },
];

export default function MobileBottomNavBar() {
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState();
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState();

  useEffect(() => {
    if (location.pathname.includes('overview')) {
      setSelectedItems(overviewItems);
    }
    if (location.pathname.includes('literature')) {
      setSelectedItems(literatureItems);
    }
    if (location.pathname.includes('research_paradigms')) {
      setSelectedItems(paradigmItems);
    }
    if (location.pathname.includes('research_questions')) {
      setSelectedItems(questionItems);
    }
    if (location.pathname.includes('grants')) {
      setSelectedItems(grantItems);
    }
    if (location.pathname.includes('analysis_techniques')) {
      setSelectedItems(techniqueItems);
    }
    if (location.pathname.includes('analytic_designs')) {
      setSelectedItems(designItems);
    }
    if (location.pathname.includes('people')) {
      setSelectedItems(peopleItems);
    }
    if (location.pathname.includes('figures')) {
      setSelectedItems(figureItems);
    }
    if (location.pathname.includes('journals')) {
      setSelectedItems(journalItems);
    }
    if (location.pathname.includes('tables')) {
      setSelectedItems(tableItems);
    }
    if (location.pathname.includes('key_terms')) {
      setSelectedItems(keytermItems);
    }
    if (location.pathname.includes('labs')) {
      setSelectedItems(labItems);
    }
    if (location.pathname.includes('models')) {
      setSelectedItems(modelItems);
    }
    if (location.pathname.includes('sampling')) {
      setSelectedItems(samplingItems);
    }
  }, [location]);

  const tabChange = (e: any) => {
    setSelectedMenu(e.value.label);
    setVisibleBottom(true);
  };

  return (
    <Container className="card">
      <CustomSidebar
        visible={visibleBottom}
        position="bottom"
        style={{ height: '100%' }}
        onHide={() => setVisibleBottom(false)}>
        {selectedMenu === 'Projects' && <ProjectsList setVisibleBottom={setVisibleBottom} />}
        {selectedMenu === 'Sections' && <SectionsList setVisibleBottom={setVisibleBottom} />}
        {(selectedMenu === 'Literature' ||
          selectedMenu === 'Paradigms' ||
          selectedMenu === 'Questions' ||
          selectedMenu === 'Grants' ||
          selectedMenu === 'Techniques' ||
          selectedMenu === 'Designs' ||
          selectedMenu === 'People' ||
          selectedMenu === 'Figures' ||
          selectedMenu === 'Journals' ||
          selectedMenu === 'Key Terms' ||
          selectedMenu === 'Tables' ||
          selectedMenu === 'Labs' ||
          selectedMenu === 'Models' ||
          selectedMenu === 'Sampling') && (
          <ItemsList setVisibleBottom={setVisibleBottom} selectedMenu={selectedMenu} />
        )}
      </CustomSidebar>
      {selectedItems && <CustomTabMenu model={selectedItems} onTabChange={(e) => tabChange(e)} />}
    </Container>
  );
}
