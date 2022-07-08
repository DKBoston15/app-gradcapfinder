import { useProjectStore } from '@app/stores/projectStore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Container, NavList, NavLink } from './styles';
import { useResearchParadigmsStore } from '@app/stores/researchParadigmsStore';
import { useResearchQuestionsStore } from '@app/stores/researchQuestionsStore';
import { useAnalysisTechniquesStore } from '@app/stores/analysisTechniquesStore';
import { useAnalyticDesignsStore } from '@app/stores/analyticDesignsStore';
import { usePeopleStore } from '@app/stores/peopleStore';
import { useFigureStore } from '@app/stores/figureStore';
import { useJournalStore } from '@app/stores/journalStore';
import { useKeyTermStore } from '@app/stores/keytermStore';
import { useLabsStore } from '@app/stores/labsStore';
import { useModelsStore } from '@app/stores/modelsStore';
import { useSamplesStore } from '@app/stores/samplesStore';
import { useGrantStore } from '@app/stores/grantStore';
import { useLiteratureStore } from '@app/stores/literatureStore';
import { useTablesStore } from '@app/stores/tablesStore';

export default function ItemsList({ setVisibleBottom, selectedMenu }: any) {
  const literature = useLiteratureStore((state: any) => state.literature);
  const research_paradigms = useResearchParadigmsStore((state: any) => state.research_paradigms);
  const research_questions = useResearchQuestionsStore((state: any) => state.research_questions);
  const analysis_techniques = useAnalysisTechniquesStore((state: any) => state.analysis_techniques);
  const analytic_designs = useAnalyticDesignsStore((state: any) => state.analytic_designs);
  const people = usePeopleStore((state: any) => state.people);
  const figures = useFigureStore((state: any) => state.figures);
  const journals = useJournalStore((state: any) => state.journals);
  const keyTerms = useKeyTermStore((state: any) => state.keyTerms);
  const labs = useLabsStore((state: any) => state.labs);
  const models = useModelsStore((state: any) => state.models);
  const grants = useGrantStore((state: any) => state.grants);
  const samples = useSamplesStore((state: any) => state.samples);
  const tables = useTablesStore((state: any) => state.tables);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const closeDropdown = async () => {
    setVisibleBottom(false);
  };

  const navigate = useNavigate();

  const { projectId } = useParams();

  const sectionMapper = {
    literature: 'literature',
    research_paradigms: 'research_paradigms',
    research_questions: 'research_questions',
    samples: 'samples',
    analytic_designs: 'analytic_designs',
    analysis_techniques: 'analysis_techniques',
    grants: 'grants',
    figures: 'figures',
    tables: 'tables',
    labs: 'labs',
    models: 'models',
    people: 'people',
    key_terms: 'keyTerms',
    journals: 'journals',
  };

  const setItems = async () => {
    if (selectedMenu === 'Literature') {
      setSelectedItems(literature);
      setSelectedSection('literature');
    }
    if (selectedMenu === 'Paradigms') {
      setSelectedItems(research_paradigms);
      setSelectedSection('research_paradigms');
    }
    if (selectedMenu === 'Questions') {
      setSelectedItems(research_questions);
      setSelectedSection('research_questions');
    }
    if (selectedMenu === 'Grants') {
      setSelectedItems(grants);
      setSelectedSection('grants');
    }
    if (selectedMenu === 'Techniques') {
      setSelectedItems(analysis_techniques);
      setSelectedSection('analysis_techniques');
    }
    if (selectedMenu === 'Designs') {
      setSelectedItems(analytic_designs);
      setSelectedSection('analytic_designs');
    }
    if (selectedMenu === 'People') {
      setSelectedItems(people);
      setSelectedSection('people');
    }
    if (selectedMenu === 'Figures') {
      setSelectedItems(figures);
      setSelectedSection('figures');
    }
    if (selectedMenu === 'Journals') {
      setSelectedItems(journals);
      setSelectedSection('journals');
    }
    if (selectedMenu === 'Key Terms') {
      setSelectedItems(keyTerms);
      setSelectedSection('key_terms');
    }
    if (selectedMenu === 'Labs') {
      setSelectedItems(labs);
      setSelectedSection('labs');
    }
    if (selectedMenu === 'Tables') {
      setSelectedItems(tables);
      setSelectedSection('tables');
    }
    if (selectedMenu === 'Models') {
      setSelectedItems(models);
      setSelectedSection('models');
    }
    if (selectedMenu === 'Samples') {
      setSelectedItems(samples);
      setSelectedSection('samples');
    }
  };

  const goTo = (item: any) => {
    const header = sectionMapper[selectedSection];
    navigate(`/projects/${projectId}/${header}/${item.id}`);
    closeDropdown();
  };

  useEffect(() => {
    const setData = async () => {
      await setItems();
    };
    setData();
  }, [selectedMenu]);

  return (
    <Container>
      <NavList>
        {selectedItems.map((item: any) => (
          <NavLink onClick={() => goTo(item)} key={item.id}>
            {item.title || item.name || `${item.first_name} ${item.last_name || ''}`}
          </NavLink>
        ))}
      </NavList>
    </Container>
  );
}
