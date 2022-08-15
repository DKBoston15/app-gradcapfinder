import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Header } from './RouteStyles/learnview.styles';
import Paradigms from '@app/components/LearnPages/Paradigms';
import Questions from '@app/components/LearnPages/Questions';
import Designs from '@app/components/LearnPages/Designs';
import Techniques from '@app/components/LearnPages/Techniques';
import Figures from '@app/components/LearnPages/Figures';
import Tables from '@app/components/LearnPages/Tables';
import KeyTerms from '@app/components/LearnPages/KeyTerms';
import Research from '@app/components/LearnPages/Research';
import Analysis from '@app/components/LearnPages/Analysis';
import Professionalism from '@app/components/LearnPages/Professionalism';
import Writing from '@app/components/LearnPages/Writing';
import Samples from '@app/components/LearnPages/Samples';
import Models from '@app/components/LearnPages/Models';
import Researchers from '@app/components/LearnPages/Researchers';
import Labs from '@app/components/LearnPages/Labs';
import Articles from '@app/components/LearnPages/Articles';

export default function LearnView() {
  const location = useLocation();

  const HeaderText = () => {
    switch (location.pathname) {
      case '/knowledge_base/research':
        return <div>Research</div>;
      case '/knowledge_base/writing':
        return <div>Writing</div>;
      case '/knowledge_base/analysis':
        return <div>Analysis</div>;
      case '/knowledge_base/professionalism':
        return <div>Professionalism</div>;
      case '/knowledge_base/paradigms':
        return <div>Paradigms</div>;
      case '/knowledge_base/questions':
        return <div>Questions</div>;
      case '/knowledge_base/samples':
        return <div>Samples</div>;
      case '/knowledge_base/designs':
        return <div>Designs</div>;
      case '/knowledge_base/techniques':
        return <div>Techniques</div>;
      case '/knowledge_base/models':
        return <div>Models</div>;
      case '/knowledge_base/figures':
        return <div>Figures</div>;
      case '/knowledge_base/tables':
        return <div>Tables</div>;
      case '/knowledge_base/researchers':
        return <div>Researchers</div>;
      case '/knowledge_base/labs':
        return <div>Labs</div>;
      case '/knowledge_base/key_terms':
        return <div>Key Terms</div>;
      case '/knowledge_base/articles':
        return <div>Articles</div>;
    }
  };

  const LearnPage = () => {
    switch (location.pathname) {
      case '/knowledge_base/research':
        return <Research />;
      case '/knowledge_base/writing':
        return <Writing />;
      case '/knowledge_base/analysis':
        return <Analysis />;
      case '/knowledge_base/professionalism':
        return <Professionalism />;
      case '/knowledge_base/paradigms':
        return <Paradigms />;
      case '/knowledge_base/questions':
        return <Questions />;
      case '/knowledge_base/samples':
        return <Samples />;
      case '/knowledge_base/designs':
        return <Designs />;
      case '/knowledge_base/techniques':
        return <Techniques />;
      case '/knowledge_base/models':
        return <Models />;
      case '/knowledge_base/figures':
        return <Figures />;
      case '/knowledge_base/tables':
        return <Tables />;
      case '/knowledge_base/labs':
        return <Labs />;
      case '/knowledge_base/researchers':
        return <Researchers />;
      case '/knowledge_base/key_terms':
        return <KeyTerms />;
      case '/knowledge_base/articles':
        return <Articles />;
    }
  };

  return (
    <Container>
      <Header>{HeaderText()}</Header>
      {LearnPage()}
    </Container>
  );
}
