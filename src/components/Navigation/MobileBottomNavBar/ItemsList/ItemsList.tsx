import { useProjectStore } from '@app/stores/projectStore';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { useSamplingStore } from '@app/stores/samplingStore';
import { useGrantStore } from '@app/stores/grantStore';
import { useArticleStore } from '@app/stores/articleStore';
import { useTablesStore } from '@app/stores/tablesStore';

export default function ItemsList({ setVisibleBottom, selectedMenu }: any) {
  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const getArticles = useArticleStore((state: any) => state.getArticles);
  const getResearchParadigms = useResearchParadigmsStore(
    (state: any) => state.getResearchParadigms,
  );
  const getResearchQuestions = useResearchQuestionsStore(
    (state: any) => state.getResearchQuestions,
  );
  const getAnalysisTechniques = useAnalysisTechniquesStore(
    (state: any) => state.getAnalysisTechniques,
  );
  const getAnalyticDesigns = useAnalyticDesignsStore((state: any) => state.getAnalyticDesigns);
  const getPeople = usePeopleStore((state: any) => state.getPeople);
  const getFigures = useFigureStore((state: any) => state.getFigures);
  const getJournals = useJournalStore((state: any) => state.getJournals);
  const getKeyTerms = useKeyTermStore((state: any) => state.getKeyTerms);
  const getLabs = useLabsStore((state: any) => state.getLabs);
  const getModels = useModelsStore((state: any) => state.getModels);
  const getGrants = useGrantStore((state: any) => state.getGrants);
  const getSamplings = useSamplingStore((state: any) => state.getSamplings);
  const getTables = useTablesStore((state: any) => state.getTables);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const closeDropdown = async () => {
    setVisibleBottom(false);
  };

  const sectionMapper = {
    articles: 'articleId',
    research_paradigms: 'researchParadigmId',
    research_questions: 'researchQuestionId',
    sampling: 'samplingId',
    analytic_designs: 'analyticDesignId',
    analysis_techniques: 'analysisTechniqueId',
    grants: 'grantId',
    figures: 'figureId',
    tables: 'tableId',
    labs: 'labId',
    models: 'modelId',
    people: 'personId',
    key_terms: 'keyTermId',
    journals: 'journalId',
  };

  const setItems = async () => {
    console.log(await getArticles(selectedProject));
    if (selectedMenu === 'Articles') {
      setSelectedItems(await getArticles(selectedProject));
      setSelectedSection('articles');
    }
    if (selectedMenu === 'Paradigms') {
      setSelectedItems(await getResearchParadigms(selectedProject));
      setSelectedSection('research_paradigms');
    }
    if (selectedMenu === 'Questions') {
      setSelectedItems(await getResearchQuestions(selectedProject));
      setSelectedSection('research_questions');
    }
    if (selectedMenu === 'Grants') {
      setSelectedItems(await getGrants(selectedProject));
      setSelectedSection('grants');
    }
    if (selectedMenu === 'Techniques') {
      setSelectedItems(await getAnalysisTechniques(selectedProject));
      setSelectedSection('analysis_techniques');
    }
    if (selectedMenu === 'Designs') {
      setSelectedItems(await getAnalyticDesigns(selectedProject));
      setSelectedSection('analytic_designs');
    }
    if (selectedMenu === 'People') {
      setSelectedItems(await getPeople(selectedProject));
      setSelectedSection('people');
    }
    if (selectedMenu === 'Figures') {
      setSelectedItems(await getFigures(selectedProject));
      setSelectedSection('figures');
    }
    if (selectedMenu === 'Journals') {
      setSelectedItems(await getJournals(selectedProject));
      setSelectedSection('journals');
    }
    if (selectedMenu === 'Key Terms') {
      setSelectedItems(await getKeyTerms(selectedProject));
      setSelectedSection('key_terms');
    }
    if (selectedMenu === 'Labs') {
      setSelectedItems(await getLabs(selectedProject));
      setSelectedSection('labs');
    }
    if (selectedMenu === 'Tables') {
      setSelectedItems(await getTables(selectedProject));
      setSelectedSection('tables');
    }
    if (selectedMenu === 'Models') {
      setSelectedItems(await getModels(selectedProject));
      setSelectedSection('models');
    }
    if (selectedMenu === 'Sampling') {
      setSelectedItems(await getSamplings(selectedProject));
      setSelectedSection('sampling');
    }
  };

  const goTo = (item: any) => {
    const header = sectionMapper[selectedSection];
    setSearchParams({
      [header]: item.id,
      projectId: selectedProject,
    });
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
