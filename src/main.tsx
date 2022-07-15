/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { StrictMode, useLayoutEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/globalPage.styles';
import './styles/globals.css';
import './themes/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import '@fontsource/open-sans';
import 'intro.js/introjs.css';
// import 'intro.js/themes/introjs-modern.css';
import App from './App';
import Dashboard from './routes/Dashboard';
import Learn from './routes/Learn';
import Projects from './routes/Projects';
import Settings from './routes/Settings';
import Invited from './routes/Invited';
import Admin from './routes/Admin';
import PrivateRoute from './components/RouteProtection/PrivateRoute';
import AdminRoute from './components/RouteProtection/AdminRoute';
import Changelog from './routes/Changelog';
import TasksV3 from './routes/TasksV3/TasksV3';
import Checklist from './routes/Checklist';
import ChecklistIndividual from './routes/ChecklistRoutes/ChecklistIndividual';
import Overview from './routes/ProjectRoutes/Overview';
import Literature from './routes/ProjectRoutes/Literature';
import Metrics from './routes/TaskRoutes/Metrics';
import Journals from './routes/ProjectRoutes/Journals';
import KeyTerms from './routes/ProjectRoutes/KeyTerms';
import Grants from './routes/ProjectRoutes/Grants';
import People from './routes/ProjectRoutes/People';
import Tables from './routes/ProjectRoutes/Tables';
import Figures from './routes/ProjectRoutes/Figures';
import Models from './routes/ProjectRoutes/Models';
import ResearchQuestions from './routes/ProjectRoutes/ResearchQuestions';
import ResearchParadigms from './routes/ProjectRoutes/ResearchParadigms';
import AnalysisTechniques from './routes/ProjectRoutes/AnalysisTechniques';
import AnalyticDesigns from './routes/ProjectRoutes/AnalyticDesigns';
import Samples from './routes/ProjectRoutes/Samples';
import Labs from './routes/ProjectRoutes/Labs';
import NavigationLayout from './layouts/NavigationLayout';
import IndividualLiterature from './routes/ProjectRoutes/IndividualLiterature';
import IndividualResearchParadigm from './routes/ProjectRoutes/IndividualResearchParadigm';
import IndividualJournal from './routes/ProjectRoutes/IndividualJournal';
import IndividualKeyTerm from './routes/ProjectRoutes/IndividualKeyTerm';
import IndividualGrant from './routes/ProjectRoutes/IndividualGrant';
import IndividualPerson from './routes/ProjectRoutes/IndividualPerson';
import IndividualTable from './routes/ProjectRoutes/IndividualTable';
import IndividualFigure from './routes/ProjectRoutes/IndividualFigure';
import IndividualModel from './routes/ProjectRoutes/IndividualModel';
import IndividualResearchQuestion from './routes/ProjectRoutes/IndividualResearchQuestion';
import IndividualAnalysisTechnique from './routes/ProjectRoutes/IndividualAnalysisTechnique';
import IndividualSample from './routes/ProjectRoutes/IndividualSample';
import IndividualLab from './routes/ProjectRoutes/IndividualLab';
import CustomRouter from './CustomRouter';

render(
  <StrictMode>
    <CustomRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="changelog" element={<Changelog />} />
        <Route
          path="newlayout"
          element={
            <PrivateRoute>
              <NavigationLayout>New Layout</NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="checklists"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Checklists'}>
                <Checklist />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="checklists/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Checklist'}>
                <ChecklistIndividual />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route path="invited" element={<Invited />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Dashboard'}>
                <Dashboard />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="learn"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Learn'}>
                <Learn />
              </NavigationLayout>
            </PrivateRoute>
          }>
          <Route
            path="overview"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Overview'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="video_series"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Video Series'}></NavigationLayout>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="research"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Research'}></NavigationLayout>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="analysis"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Analysis'}></NavigationLayout>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="professionalism"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Professionalism'}></NavigationLayout>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="writing"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Writing'}></NavigationLayout>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="research_paradigms"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Research Paradigms'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="research_questions"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Research Questions'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="sample"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Sample'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="analysis_designs"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Analytic Designs'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="analysis_techniques"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Analysis Techniques'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="empirical_models"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Empirical Models'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="figures"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Figures'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="tables"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Tables'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="theoretical_models"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Theoretical Models'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="authors"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Authors'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="conceptual_models"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Conceptual Models'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="key_terms"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Key Terms'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="journals"
            element={
              <PrivateRoute>
                <NavigationLayout title={'Journals'}>
                  <Learn />
                </NavigationLayout>
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="tasks"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Tasks'} table>
                <TasksV3 />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="tasks/metrics"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Metrics'}>
                <Metrics />
              </NavigationLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="projects"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Projects'}>
                <Projects />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/overview"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Overview'}>
                <Overview />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/literature"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Literature'} subTitle={'Select Literature'} table>
                <Literature />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/literature/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Literature'} subTitle={'Select Literature'}>
                <IndividualLiterature />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/journals"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Journals'} subTitle={'Select Journal'} table>
                <Journals />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/journals/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Journals'} subTitle={'Select Journal'}>
                <IndividualJournal />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/key_terms"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Key Terms'} subTitle={'Select Journal'} table>
                <KeyTerms />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/key_terms/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Key Terms'}>
                <IndividualKeyTerm />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/grants"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Grants'} subTitle={'Select Journal'} table>
                <Grants />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/grants/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Grants'}>
                <IndividualGrant />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/people"
          element={
            <PrivateRoute>
              <NavigationLayout title={'People'} subTitle={'Select Journal'} table>
                <People />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/people/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'People'}>
                <IndividualPerson />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/tables"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Tables'} subTitle={'Select Journal'} table>
                <Tables />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/tables/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Tables'}>
                <IndividualTable />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/figures"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Figures'} subTitle={'Select Journal'} table>
                <Figures />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/figures/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Figures'}>
                <IndividualFigure />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/models"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Models'} subTitle={'Select Journal'} table>
                <Models />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/models/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Models'}>
                <IndividualModel />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/research_questions"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Research Questions'} subTitle={'Select Journal'} table>
                <ResearchQuestions />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/research_questions/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Research Questions'}>
                <IndividualResearchQuestion />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/research_paradigms"
          element={
            <PrivateRoute>
              <NavigationLayout
                title={'Research Paradigms'}
                subTitle={'Select Research Paradigm'}
                table>
                <ResearchParadigms />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/research_paradigms/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Research Paradigms'} subTitle={'Select Research Paradigm'}>
                <IndividualResearchParadigm />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/analysis_techniques"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Analysis Techniques'} subTitle={'Select Journal'} table>
                <AnalysisTechniques />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/analysis_techniques/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Analysis Techniques'}>
                <IndividualAnalysisTechnique />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/analytic_designs"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Analytic Designs'} subTitle={'Select Journal'} table>
                <AnalyticDesigns />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/analytic_designs/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Analytic Designs'}>
                <IndividualAnalysisTechnique />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/samples"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Samples'} subTitle={'Select Journal'} table>
                <Samples />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/sample/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Samples'}>
                <IndividualSample />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/labs"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Labs'} subTitle={'Select Journal'} table>
                <Labs />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/labs/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Labs'}>
                <IndividualLab />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </CustomRouter>
  </StrictMode>,
  document.getElementById('root'),
);
