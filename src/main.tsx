/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { StrictMode, useEffect } from 'react';
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
import Tasks from './routes/Tasks';
import Chat from './routes/Chat';
import Invited from './routes/Invited';
import Admin from './routes/Admin';
import PrivateRoute from './components/RouteProtection/PrivateRoute';
import AdminRoute from './components/RouteProtection/AdminRoute';
import Changelog from './routes/Changelog';
import TasksV3 from './routes/TasksV3/TasksV3';
import Checklist from './routes/Checklist';
import ChecklistIndividual from './routes/ChecklistRoutes/ChecklistIndividual';

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
              <Tasks />
            </PrivateRoute>
          }>
          <Route
            path="metrics"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }>
          <Route
            path="overview"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="literature"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="journals"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="key_terms"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="grants"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="people"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="tables"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="figures"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="models"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="research_questions"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="research_paradigms"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="research_designs"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="analysis_techniques"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="analytic_designs"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="sampling"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="labs"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="tasks"
          element={
            <PrivateRoute>
              <Tasks />
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
