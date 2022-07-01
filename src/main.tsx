/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
import Chat from './routes/Chat';
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
import Samplings from './routes/ProjectRoutes/Samplings';
import Labs from './routes/ProjectRoutes/Labs';
import NavigationLayout from './layouts/NavigationLayout';

const items = [
  // {
  //   label: 'Tasks',
  //   command: () => {
  //     navigate('/tasks');
  //   },
  // },
  // {
  //   label: 'Metrics',
  //   command: () => {
  //     navigate('/tasks/metrics');
  //   },
  // },
];

// const literatureItems = [
//   {
//     label: 'List',
//     command: () => {
//       navigate('/tasks');
//     },
//   },
//   {
//     label: 'Details',
//     command: () => {
//       navigate('/tasks/metrics');
//     },
//   },
//   {
//     label: 'Tasks',
//     command: () => {
//       navigate('/tasks/metrics');
//     },
//   },
//   {
//     label: 'People',
//     command: () => {
//       navigate('/tasks/metrics');
//     },
//   },
//   {
//     label: 'Journals',
//     command: () => {
//       navigate('/tasks/metrics');
//     },
//   },
//   {
//     label: 'Key Terms',
//     command: () => {
//       navigate('/tasks/metrics');
//     },
//   },
// ];

render(
  <StrictMode>
    <BrowserRouter>
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
          path="checklist"
          element={
            <PrivateRoute>
              <Checklist />
            </PrivateRoute>
          }
        />
        <Route
          path="checklist/:id"
          element={
            <PrivateRoute>
              <ChecklistIndividual />
            </PrivateRoute>
          }
        />
        <Route
          path="tasksV3"
          element={
            <PrivateRoute>
              <TasksV3 />
            </PrivateRoute>
          }
        />
        <Route
          path="invited"
          element={
            <PrivateRoute>
              <Invited />
            </PrivateRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="learn"
          element={
            <PrivateRoute>
              <Learn />
            </PrivateRoute>
          }>
          <Route
            path="overview"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="video_series"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="research"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="analysis"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="professionalism"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="writing"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="research_paradigms"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="research_questions"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="sampling"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="analysis_designs"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="analysis_techniques"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="empirical_models"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="figures"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="tables"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="theoretical_models"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="authors"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="conceptual_models"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="key_terms"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="journals"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="tasks"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Tasks'}>
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
              <NavigationLayout title={'Literature'} subTitle={'Select Literature'}>
                <Literature />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/literature"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Literature'} subTitle={'Select Literature'}>
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
                <Literature />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/journals"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Journals'}>
                <Journals />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/journals"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Journals'}>
                <Journals />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/journals/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Journals'}>
                <Journals />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/key_terms"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Key Terms'}>
                <KeyTerms />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/key_terms"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Key Terms'}>
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
                <KeyTerms />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/grants"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Grants'}>
                <Grants />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/grants"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Grants'}>
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
                <Grants />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/people"
          element={
            <PrivateRoute>
              <NavigationLayout title={'People'}>
                <People />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/people"
          element={
            <PrivateRoute>
              <NavigationLayout title={'People'}>
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
                <People />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/tables"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Tables'}>
                <Tables />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/tables"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Tables'}>
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
                <Tables />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/figures"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Figures'}>
                <Figures />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/figures"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Figures'}>
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
                <Figures />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/models"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Models'}>
                <Models />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/models"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Models'}>
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
                <Models />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/research_questions"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Research Questions'}>
                <ResearchQuestions />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/research_questions"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Research Questions'}>
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
                <ResearchQuestions />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/research_paradigms"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Research Paradigms'}>
                <ResearchParadigms />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/research_paradigms"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Research Paradigms'}>
                <ResearchParadigms />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/research_paradigms/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Research Paradigms'}>
                <ResearchParadigms />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/analysis_techniques"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Analysis Techniques'}>
                <AnalysisTechniques />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/analysis_techniques"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Analysis Techniques'}>
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
                <AnalysisTechniques />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/analytic_designs"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Analytic Designs'}>
                <AnalyticDesigns />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/analytic_designs"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Analytic Designs'}>
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
                <AnalyticDesigns />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/sampling"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Samplings'}>
                <Samplings />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/sampling"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Samplings'}>
                <Samplings />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/sampling/:id"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Samplings'}>
                <Samplings />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/labs"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Labs'}>
                <Labs />
              </NavigationLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="projects/labs"
          element={
            <PrivateRoute>
              <NavigationLayout title={'Labs'}>
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
                <Labs />
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
          path="chat"
          element={
            <PrivateRoute>
              <Chat />
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
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root'),
);
