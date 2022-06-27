/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { StrictMode } from 'react';
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

render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="changelog" element={<Changelog />} />
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
            path="empirical_model"
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
              <TasksV3 />
            </PrivateRoute>
          }
        />
        <Route
          path="tasks/metrics"
          element={
            <PrivateRoute>
              <Metrics />
            </PrivateRoute>
          }
        />

        <Route
          path="projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/overview"
          element={
            <PrivateRoute>
              <Overview />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/literature"
          element={
            <PrivateRoute>
              <Literature />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/literature/:id"
          element={
            <PrivateRoute>
              <Literature />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/journals"
          element={
            <PrivateRoute>
              <Journals />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/journals/:id"
          element={
            <PrivateRoute>
              <Journals />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/key_terms"
          element={
            <PrivateRoute>
              <KeyTerms />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/key_terms/:id"
          element={
            <PrivateRoute>
              <KeyTerms />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/grants"
          element={
            <PrivateRoute>
              <Grants />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/grants/:id"
          element={
            <PrivateRoute>
              <Grants />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/people"
          element={
            <PrivateRoute>
              <People />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/people/:id"
          element={
            <PrivateRoute>
              <People />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/tables"
          element={
            <PrivateRoute>
              <Tables />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/tables/:id"
          element={
            <PrivateRoute>
              <Tables />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/figures"
          element={
            <PrivateRoute>
              <Figures />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/figures/:id"
          element={
            <PrivateRoute>
              <Figures />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/models"
          element={
            <PrivateRoute>
              <Models />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/models/:id"
          element={
            <PrivateRoute>
              <Models />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/research_questions"
          element={
            <PrivateRoute>
              <ResearchQuestions />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/research_questions/:id"
          element={
            <PrivateRoute>
              <ResearchQuestions />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/research_paradigms"
          element={
            <PrivateRoute>
              <ResearchParadigms />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/research_paradigms/:id"
          element={
            <PrivateRoute>
              <ResearchParadigms />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/analysis_techniques"
          element={
            <PrivateRoute>
              <AnalysisTechniques />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/analysis_techniques/:id"
          element={
            <PrivateRoute>
              <AnalysisTechniques />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/analytic_designs"
          element={
            <PrivateRoute>
              <AnalyticDesigns />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/analytic_designs/:id"
          element={
            <PrivateRoute>
              <AnalyticDesigns />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/sampling"
          element={
            <PrivateRoute>
              <Samplings />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/sampling/:id"
          element={
            <PrivateRoute>
              <Samplings />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/labs"
          element={
            <PrivateRoute>
              <Labs />
            </PrivateRoute>
          }
        />
        <Route
          path="projects/:projectId/labs/:id"
          element={
            <PrivateRoute>
              <Labs />
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
