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
import '@fontsource/poppins'; // Defaults to weight 400.
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

render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="changelog" element={<Changelog />} />
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
          }
        />

        <Route
          path="tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }>
          <Route
            path="overview"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="today"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="upcoming"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="all"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="completed"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="personal"
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
            path="articles"
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
