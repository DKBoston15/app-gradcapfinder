import { useEffect, useState } from "react";
import { Container } from "../styles/globalPage.styles";
import Layout from "../layouts/Layout";
import ProjectNavBar from "..//components/Navigation/ProjectNavBar/ProjectNavBar";
import { useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Overview from "./ProjectRoutes/Overview";
import AnalyticDesigns from "./ProjectRoutes/AnalyticDesigns";
import AnalysisTechniques from "./ProjectRoutes/AnalysisTechniques";
import Articles from "./ProjectRoutes/Articles";
import Authors from "./ProjectRoutes/Authors";
import Figures from "./ProjectRoutes/Figures";
import Journals from "./ProjectRoutes/Journals";
import KeyTerms from "./ProjectRoutes/KeyTerms";
import Labs from "./ProjectRoutes/Labs";
import Models from "./ProjectRoutes/Models";
import ResearchParadigms from "./ProjectRoutes/ResearchParadigms";
import ResearchQuestions from "./ProjectRoutes/ResearchQuestions";
import Tables from "./ProjectRoutes/Tables";
import SamplingDesigns from "./ProjectRoutes/SamplingDesigns";
import SamplingTechniques from "./ProjectRoutes/SamplingTechniques";
import { useProjectStore } from "@app/stores/projectStore";
import { useArticleStore } from "@app/stores/articleStore";
import { supabase } from "@app/supabase";

export default function Projects() {
  const getProjects = useProjectStore((state: any) => state.getProjects);
  let [searchParams, setSearchParams] = useSearchParams();
  const getArticles = useArticleStore((state: any) => state.getArticles);
  const [loading, setLoading] = useState(true);
  const selectedProject = useProjectStore(
    (state: any) => state.selectedProject
  );
  const setSelectedProject = useProjectStore(
    (state: any) => state.setSelectedProject
  );
  const projects = useProjectStore((state: any) => state.projects);
  const location = useLocation();
  const navigate = useNavigate();
  const user = supabase.auth.user();

  useEffect(() => {
    const getProjectData = async () => {
      const initialProjects = await getProjects();
      const projectId = searchParams.get("projectId");

      if (projectId) {
        const project = initialProjects.filter(
          (project: any) => project.id == projectId
        );
        setSelectedProject(projectId, project[0].name);
        await getArticles(projectId);
        setLoading(false);
      } else {
        setSelectedProject(initialProjects[0].id, initialProjects[0].name);
        const info = await getArticles(initialProjects[0].id);
        setLoading(false);
      }
    };
    getProjectData();
    if (location.pathname === "/projects") navigate("/projects/overview");

    const realtimeProfileUpdatesProjects = supabase
      .from("projects")
      .on("*", (payload) => {
        getProjects(user?.id);
      })
      .subscribe();

    const realtimeProfileUpdatesArticles = supabase
      .from("articles")
      .on("*", (payload) => {
        if (selectedProject) {
          getArticles(selectedProject);
        }
      })
      .subscribe();
  }, []);

  const SubPage = () => {
    if (location.pathname === "/projects") return <Overview />;
    if (location.pathname === "/projects/overview") return <Overview />;
    if (location.pathname === "/projects/analytic_designs")
      return (
        <AnalyticDesigns
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === "/projects/analysis_techniques")
      return (
        <AnalysisTechniques
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname.includes("/projects/articles"))
      return (
        <Articles
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === "/projects/authors") return <Authors />;
    if (location.pathname === "/projects/figures")
      return (
        <Figures
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === "/projects/journals") return <Journals />;
    if (location.pathname === "/projects/key_terms") return <KeyTerms />;
    if (location.pathname === "/projects/labs")
      return (
        <Labs
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === "/projects/models")
      return (
        <Models
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === "/projects/research_paradigms")
      return (
        <ResearchParadigms
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === "/projects/research_questions")
      return (
        <ResearchQuestions
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === "/projects/tables")
      return (
        <Tables
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === "/projects/sampling_designs")
      return (
        <SamplingDesigns
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    if (location.pathname === "/projects/sampling_techniques")
      return (
        <SamplingTechniques
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      );
    return <div>No Path</div>;
  };

  return (
    <Layout>
      <ProjectNavBar />
      {!loading && (
        <Container>
          <SubPage />
        </Container>
      )}
    </Layout>
  );
}
