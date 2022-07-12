import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Header } from './RouteStyles/learnview.styles';
import Paradigms from '@app/components/LearnPages/Paradigms';
import Questions from '@app/components/LearnPages/Questions';
import Sample from '@app/components/LearnPages/Sample';
import Designs from '@app/components/LearnPages/Designs';
import Techniques from '@app/components/LearnPages/Techniques';
import EmpiricalModels from '@app/components/LearnPages/EmpiricalModels';
import Figures from '@app/components/LearnPages/Figures';
import Tables from '@app/components/LearnPages/Tables';
import TheoreticalModels from '@app/components/LearnPages/TheoreticalModels';
import Authors from '@app/components/LearnPages/Authors';
import ConceptualModels from '@app/components/LearnPages/ConceptualModels';
import KeyTerms from '@app/components/LearnPages/KeyTerms';
import Journals from '@app/components/LearnPages/Journals';
import Research from '@app/components/LearnPages/Research';
import Analysis from '@app/components/LearnPages/Analysis';
import Professionalism from '@app/components/LearnPages/Professionalism';
import Writing from '@app/components/LearnPages/Writing';

export default function LearnView() {
  const location = useLocation();

  const HeaderText = () => {
    switch (location.pathname) {
      case '/learn/research':
        return <div>Research</div>;
      case '/learn/writing':
        return <div>Writing</div>;
      case '/learn/analysis':
        return <div>Analysis</div>;
      case '/learn/professionalism':
        return <div>Professionalism</div>;
      case '/learn/research_paradigms':
        return <div>Paradigms</div>;
      case '/learn/research_questions':
        return <div>Questions</div>;
      case '/learn/samples':
        return <div>Samples</div>;
      case '/learn/analysis_designs':
        return <div>Designs</div>;
      case '/learn/analysis_techniques':
        return <div>Techniques</div>;
      case '/learn/empirical_models':
        return <div>Empirical Models</div>;
      case '/learn/figures':
        return <div>Figures</div>;
      case '/learn/tables':
        return <div>Tables</div>;
      case '/learn/theoretical_models':
        return <div>Theoretical Models</div>;
      case '/learn/authors':
        return <div>Authors</div>;
      case '/learn/conceptual_models':
        return <div>Conceptual Models</div>;
      case '/learn/key_terms':
        return <div>Key Terms</div>;
      case '/learn/journals':
        return <div>Journals</div>;
    }
  };

  const LearnPage = () => {
    switch (location.pathname) {
      case '/learn/research':
        return <Research />;
      case '/learn/writing':
        return <Writing />;
      case '/learn/analysis':
        return <Analysis />;
      case '/learn/professionalism':
        return <Professionalism />;
      case '/learn/research_paradigms':
        return <Paradigms />;
      case '/learn/research_questions':
        return <Questions />;
      case '/learn/samples':
        return <Sample />;
      case '/learn/analysis_designs':
        return <Designs />;
      case '/learn/analysis_techniques':
        return <Techniques />;
      case '/learn/empirical_models':
        return <EmpiricalModels />;
      case '/learn/figures':
        return <Figures />;
      case '/learn/tables':
        return <Tables />;
      case '/learn/theoretical_models':
        return <TheoreticalModels />;
      case '/learn/authors':
        return <Authors />;
      case '/learn/conceptual_models':
        return <ConceptualModels />;
      case '/learn/key_terms':
        return <KeyTerms />;
      case '/learn/journals':
        return <Journals />;
    }
  };

  return (
    <Container>
      <Header>{HeaderText()}</Header>
      {LearnPage()}
    </Container>
  );
}
