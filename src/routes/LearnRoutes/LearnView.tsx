import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Header } from './RouteStyles/learnview.styles';
import Paradigms from '@app/components/LearnPages/Paradigms';
import Questions from '@app/components/LearnPages/Questions';
import SamplingTechniques from '@app/components/LearnPages/SamplingTechniques';
import SamplingDesigns from '@app/components/LearnPages/SamplingDesigns';
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

export default function LearnView() {
  const location = useLocation();

  const HeaderText = () => {
    if (location.pathname === '/learn/research_paradigms') return <div>Paradigms</div>;
    if (location.pathname === '/learn/research_questions') return <div>Questions</div>;
    if (location.pathname === '/learn/sampling_techniques') return <div>Sampling Techniques</div>;
    if (location.pathname === '/learn/sampling_designs') return <div>Sampling Designs</div>;
    if (location.pathname === '/learn/analysis_designs') return <div>Designs</div>;
    if (location.pathname === '/learn/analysis_techniques') return <div>Techniques</div>;
    if (location.pathname === '/learn/empirical_model') return <div>Empirical Models</div>;
    if (location.pathname === '/learn/figures') return <div>Figures</div>;
    if (location.pathname === '/learn/tables') return <div>Tables</div>;
    if (location.pathname === '/learn/theoretical_models') return <div>Theoretical Models</div>;
    if (location.pathname === '/learn/authors') return <div>Authors</div>;
    if (location.pathname === '/learn/conceptual_models') return <div>Conceptual Models</div>;
    if (location.pathname === '/learn/key_terms') return <div>Key Terms</div>;
    if (location.pathname === '/learn/journals') return <div>Journals</div>;
  };

  const LearnPage = () => {
    if (location.pathname === '/learn/research_paradigms') return <Paradigms />;
    if (location.pathname === '/learn/research_questions') return <Questions />;
    if (location.pathname === '/learn/sampling_techniques') return <SamplingTechniques />;
    if (location.pathname === '/learn/sampling_designs') return <SamplingDesigns />;
    if (location.pathname === '/learn/analysis_designs') return <Designs />;
    if (location.pathname === '/learn/analysis_techniques') return <Techniques />;
    if (location.pathname === '/learn/empirical_model') return <EmpiricalModels />;
    if (location.pathname === '/learn/figures') return <Figures />;
    if (location.pathname === '/learn/tables') return <Tables />;
    if (location.pathname === '/learn/theoretical_models') return <TheoreticalModels />;
    if (location.pathname === '/learn/authors') return <Authors />;
    if (location.pathname === '/learn/conceptual_models') return <ConceptualModels />;
    if (location.pathname === '/learn/key_terms') return <KeyTerms />;
    if (location.pathname === '/learn/journals') return <Journals />;
  };

  return (
    <Container>
      <Header>{HeaderText()}</Header>
      {LearnPage()}
    </Container>
  );
}
